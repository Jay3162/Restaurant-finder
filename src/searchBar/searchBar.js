import React, {useState} from 'react'
import style from './searchBar.module.css'
import { FaSearch } from 'react-icons/fa'


export function SearchBar(props) {
    // allows user to enter the data to begin the api call to Yelp
    const [term, setTerm] = useState(props.term || '')
    const [location, setLocation] = useState(props.location || '')

    function Submit(e) {
        if (typeof props.search === 'function') {
            props.search(term, location) 
        }
        e.preventDefault()

    }


    return (
            <form className={style["container"]} onSubmit={Submit}>
                <div className={style["input-wrapper"]}>
                    <div >
                        <input placeholder="food" data-testid="foodInput" className={style["inputBar"]} onChange={(e) => setTerm(e.target.value)}></input>
                    </div>
                    <div>
                        <input placeholder="location" data-testid="locationInput" className={style["inputBar2"]} onChange={(e) => setLocation(e.target.value)}></input>   
                    </div>
                </div>
                <div>
                    <button className={style["Go_btn"]} data-testid="submit-button" onClick={Submit}><FaSearch className={style["icon"]}/></button>
                    </div>
            </form>

    )

}