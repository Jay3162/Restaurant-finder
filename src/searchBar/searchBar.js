import React, {useState} from 'react'
import style from './searchBar.module.css'
import { FaSearch } from 'react-icons/fa'


export function SearchBar(props) {

    const [term, setTerm] = useState(props.term || '')
    const [location, setLocation] = useState(props.location || '')

    function Submit(e) {
        if (typeof props.search === 'function') {
            props.search(term, location) 
        }
        e.preventDefault()
        console.log(term, location)

    }


    return (
            <form className={style["container"]} onSubmit={Submit}>
                <div >
                    <input placeholder="food" className={style["inputBar"]} onChange={(e) => setTerm(e.target.value)}></input>
                    <button className={style["btn"]} disabled={true}><FaSearch className={style["icon2"]}/></button>
                    {/* value={term} */}
                </div>
                <div>
                    <input placeholder="location" className={style["inputBar2"]} onChange={(e) => setLocation(e.target.value)}></input>
                    <button className={style["btn2"]} disabled={true}><FaSearch className={style["icon2"]}/></button>
                    {/* value={location} */}
                </div>
                
                <div>
                    <button className={style["Go_btn"]} onClick={Submit}><FaSearch className={style["icon"]} /></button>
                    </div>
            </form>

    )

}