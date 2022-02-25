import React, { useState, useEffect } from 'react'
// import Config from "react-native-config"



export function BusinessSearch(term, location) {
    const [businesses, setBusinesses] = useState([]);
    const [searchParams, setSearchParams] = useState({term, location});

    // const apiKey = Config.YOUR_API_KEY
    useEffect(() => {
        setBusinesses([]);
        
        const fetchData = async() => {
            try{
                const rawData = await fetch('https://yelp-backend.netlify.app/.netlify/functions/search?location='+`${location}`+'&term='+`${term}`)
                // const rawData = await fetch('https://api.yelp.com/v3/businesses/search?term='+`${term}`+`&${location}`, {
                //     headers: {
                //         Authorization: 'Bearer ' + process.env.REACT_APP_YOUR_API_KEY,
                //         Origin: 'https://api.yelp.com',
                //         'Access-Control-Allow-Origin': '*',
                //         withCreditials: true
                //     }
                // })
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