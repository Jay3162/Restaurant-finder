
import React, { useRef, useEffect, useState, createRef } from 'react';
import style from './map.module.css'
// import ReactDOM from 'react-dom'

import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax


mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;

export function Map(props) {

    const [dataLoaded, setDataLoaded] = useState(false);
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(0);
    const [lat, setLat] = useState(51);
    const [zoom, setZoom] = useState(9);


    

      const coords = async () => {
        // confirm that json data is loaded
        await props
        if (props.businesses && props.businesses.length > 0) {
          await props.businesses.coordinates
          console.log(props.businesses[0].coordinates.longitude)

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

          // Map.current.on('load', () => {
          //   Map.current.loadImage(
          //     './images/blueMarker.png',
          //     (error, image) => {
          //       if (error) throw error;
          //       Map.current.addImage('custom-marker', image)
          //     }
          //   )
          // }) 
          // add source
          if (!Map.current.getSource('my-locations')) {
            Map.current.on('load', () => {
              Map.current.addSource("my-locations", {
                type: "geojson",
                data: json,
              })
            })
          }


          // add layer
          if (!Map.current.getLayer('my-layer')) {
            Map.current.on('load', () => {
              Map.current.addLayer({
                interactive: true,
                id: "my-layer",
                type: "symbol",
                source: "my-locations",
                layout: {
                  'visibility': 'visible',
                  'icon-image': 'bar-15',
                  'icon-size': 1.5
                  
                },
  
              })
            })
          }

        

          Map.current.on("mouseenter", "my-layer", e => {
            Map.current.getCanvas().style.cursor = "pointer";
          })

          Map.current.on("click", "my-layer", e => {

            
            // do something when user clicks on marker
            let images = new URL('./images/star.png', import.meta.url)


            var coordinates = e.features[0].geometry.coordinates.slice();
            var id = e.features[0].properties.id;
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
        // if (map.current) return; // initialize map only once
        Map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [lng, lat],
          zoom: zoom
        });
      });

      return (
        <div>
          <div ref={mapContainer} className={style["map-container"]} />
          
          
        </div>
      );
}

