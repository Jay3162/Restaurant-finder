import { useState, useEffect } from 'react'
// import Config from "react-native-config"



export function BusinessSearch(term, location) {
    const [businesses, setBusinesses] = useState([]);
    const [searchParams, setSearchParams] = useState({term, location});

    useEffect(() => {
        setBusinesses([]);
        // make api call based on user provided input and store values inside businesses variable
        const fetchData = async() => {
            try{
                const rawData = await fetch('https://yelp-backend.netlify.app/.netlify/functions/search?location='+`${location}`+'&term='+`${term}`)

                const resp = await rawData.json();
                setBusinesses(resp.businesses)
                
            } catch(e) {
                console.error(e)
            }

        }
        fetchData();

    }, [searchParams])
    return [businesses, searchParams, setSearchParams]
}