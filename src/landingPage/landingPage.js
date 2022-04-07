import React from 'react'
import { SearchBar } from '../searchBar/searchBar.js'
import style from './landingPage.module.css'
import useReactRouter from 'use-react-router'




export function LandingPage() {
    // Change term and location should it contain spaces so that the url works and the user can search for restaurants in places like new york
    const {history} = useReactRouter()
    function Search(term, location) {
        const encodedTerm = encodeURI(term)
        const encodedLocation = encodeURI(location)
        history.push(`/search?location=${encodedLocation}&term=${encodedTerm}`)

    }
    
    return (
        <div>
            <img className={style["background1"]}></img>,
            <SearchBar search={Search}/>
            <div className={style["rectangle"]}></div>
        </div>

    
    )
}