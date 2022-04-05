import React from 'react'
import { SearchBar } from '../searchBar/searchBar'
import style from './landingPage.module.css'
import useReactRouter from 'use-react-router'




export function LandingPage() {
    const bckgndImg = new URL('./images/pexels.jpg', import.meta.url)
    
    const {history} = useReactRouter()
    function Search(term, location) {
        const encodedTerm = encodeURI(term)
        const encodedLocation = encodeURI(location)
        console.log(encodedTerm)
        console.log(encodedLocation)
        console.log(`/search?location=${location}&term=${term}`)
        history.push(`/search?location=${location}&term=${term}`)

    }




    return (
        <div>
            
            <img className={style["background1"]} src={bckgndImg}></img>,
            <SearchBar search={Search}/>
            <div className={style["rectangle"]}></div>
        </div>

    
    )
}