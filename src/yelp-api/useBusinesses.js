import React, { useState, useEffect } from 'react'
// import Config from "react-native-config"



export function BusinessSearch(term, location) {
    const [businesses, setBusinesses] = useState([]);
    const [searchParams, setSearchParams] = useState({term, location});

    // const apiKey = Config.YOUR_API_KEY
    useEffect(() => {
        setBusinesses([]);
        console.log(setBusinesses)
        const fetchData = async() => {
            try{
                const rawData = await fetch('https://yelp-backend.netlify.app/.netlify/functions/search?location='+`${location}`+'&term='+`${term}`)
                console.log(rawData)
                const resp = await rawData.json();
                setBusinesses(resp.businesses)
                console.log(resp.businesses)
                
            } catch(e) {
                console.error(e)
                console.log(e)
            }

        }
        fetchData();

    }, [searchParams])
    return [businesses, searchParams, setSearchParams]
}