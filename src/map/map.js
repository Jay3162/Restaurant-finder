import {FaStar, FaStarHalfAlt, FaMapMarkerAlt} from 'react-icons/fa'
import {FiLoader} from 'react-icons/fi'
import React, { useRef, useEffect, useState, createRef } from 'react';
import style from './map.module.css'

// import ReactDOM from 'react-dom'

import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax


mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;

export function Map(props) {

  // set initial values for mapbox components 
    const [dataLoaded, setDataLoaded] = useState(false);
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(0);
    const [lat, setLat] = useState(51);
    const [zoom, setZoom] = useState(9);
    const [newLng, setNewLng] = useState()
    const [newLat, setNewLat] = useState()
  

    // onClick function will take the lat and lng coordinates the first search result and move the user's view to that the coordinate's location at a slightly higher zoom level
    const goToLocation = async() => {
      await props.businesses
      if (props.businesses) {
        Map.current.panTo([props.businesses[0].coordinates.longitude, props.businesses[0].coordinates.latitude])
        setNewLng(props.businesses[0].coordinates.longitude)
        setNewLat(props.businesses[0].coordinates.latitude)
        
        
        const lngLat = [newLng, newLat]
        console.log(lngLat)
        Map.current.jumpTo({
          'center': lngLat,
          'zoom': 12
        })
        
      }
      if (!Map.current.getSource('my-locations')) {
        window.location.reload()
      }

    }

      const coords = async () => {
        // confirm that json data is loaded
        await props
        if (props.businesses && props.businesses.length > 0) {
          await props.businesses.coordinates


          setDataLoaded(true);
          
          // convert data to geojson

          let json = {
            type: "FeatureCollection",
            features: []
            
          };
          let apiData = props.businesses
          apiData.forEach(poi => {
            json.features.push({
              type: "Feature",
              properties: {
                id: poi.id,
                image: poi.image_url,
                name: poi.name,
                address: poi.location.display_address,
                rating: poi.rating
                
    
              },
              geometry: {
                type: "Point",
                coordinates: [poi.coordinates.longitude, poi.coordinates.latitude]
              }
            });
          });

          // add source
          if (!Map.current.getSource('my-locations')) {
            Map.current.on('load', () => {
              Map.current.addSource("my-locations", {
                type: "geojson",
                data: json,
              })
            })
          }
          // let markerImg = new URL('./images/blueMarker.png', import.meta.url)
          let markerImg = require('./images/blueMarker.png')
          // check that current layer is not in effect then define and load new data on new symbol layer
          if (!Map.current.getLayer('my-layer')) {
            Map.current.on('load', () => {
              Map.current.loadImage(
                markerImg, 
                (error, image) => {
                  if (error) throw error;

                  Map.current.addImage('marker', image);
                  Map.current.addLayer({ 
                    interative: true,
                    id: 'my-layer',
                    source: 'my-locations',
                    type: "symbol",
                    layout: {
                      'visibility': 'visible',
                      'icon-image': 'marker',
                      'icon-size': 1
                    }
                  })
                  
                }
              )
            })
          }

          Map.current.on("mouseenter", "my-layer", e => {
            Map.current.getCanvas().style.cursor = "pointer";
          })

          Map.current.on("click", "my-layer", e => {

            
            // do something when user clicks on marker


            var coordinates = e.features[0].geometry.coordinates.slice();
            var html =  '<b>' + '<h2>' + e.features[0].properties.name + '</h2>' + '</b>' + '<p>' + e.features[0].properties.address + '</p>' + '<p>' + 'Avg review score: ' + '<b>' + e.features[0].properties.rating + '/5' + '</b>' + '</p>'
          
            var popupContent = window.document.createElement("div");


            popupContent.innerHTML = html;
            
            new mapboxgl.Popup({ closeButton: false, closeOnClick: true })
              .setLngLat(coordinates)
              
              .setDOMContent(popupContent)
              
              .addTo(Map.current);
          });
          
          
        }
      }

      coords()
      useEffect(() => {
        if (map.current) return; // initialize map only once
        Map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [lng, lat],

          zoom: zoom
          
        });

      },[]);

      return (
        <div>

          <div ref={mapContainer} className={style["map-container"]} />
          {!dataLoaded ? <button className={style["location-btn"]}><FiLoader/></button> : <button className={style["location-btn"]} onClick={goToLocation}><FaMapMarkerAlt/></button>} 
        </div>
      );
}

