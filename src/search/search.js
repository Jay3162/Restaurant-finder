import { React } from "react";
import { BusinessSearch } from "../yelp-api/useBusinesses.js";
import UseReactRouter from 'use-react-router'
import { Map } from '../map/map.js'


export function Search() {
    //takes user inputted values and uses them to make the api call for the business searches
    const {location} = UseReactRouter();
    const query = new URLSearchParams(location.search);
    const term = query.get("term");
    const locationParam = query.get("location");
    const [businesses] = BusinessSearch(term, locationParam)
    


    return (
        <div>       
            <Map businesses={businesses}/>
        </div>
        
    )
    
}