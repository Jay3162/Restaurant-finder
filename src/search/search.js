import { React } from "react";
import { BusinessSearch } from "../yelp-api/useBusinesses.js";
import UseReactRouter from 'use-react-router'
import { Map } from '../map/map.js'





 
export function Search() {
    const {location} = UseReactRouter();
    const query = new URLSearchParams(location.search);
    const term = query.get("term");
    const locationParam = query.get("location");
    const [businesses] = BusinessSearch(term, locationParam)
    console.log(term)
    console.log(locationParam)
    


    return (
        <div>       
            <Map businesses={businesses}/>
        </div>
        
    )
    
}