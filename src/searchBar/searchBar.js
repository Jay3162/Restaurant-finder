import React, {useState} from 'react'
import style from './searchBar.module.css'
import { FaSearch } from 'react-icons/fa'


export function SearchBar(props) {
    // 
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
                <div >
                    <input placeholder="food" className={style["inputBar"]} onChange={(e) => setTerm(e.target.value)}></input>
                    
                    {/* value={term} */}
                </div>
                <div>
                    <input placeholder="location" className={style["inputBar2"]} onChange={(e) => setLocation(e.target.value)}></input>
                    
                    {/* value={location} */}
                </div>
                
                <div>
                    <button className={style["Go_btn"]} onClick={Submit}><FaSearch className={style["icon"]} /></button>
                    </div>
            </form>

    )

}