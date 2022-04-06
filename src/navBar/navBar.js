import React from 'react'
import style from './navBar.module.css'
import { SearchBar } from '../searchBar/searchBar.js'

export function NavBar() {
    return (
        
        <div className={style["navBar"]}>
            <SearchBar className={style["searchBar"]}/>
        </div>
    )
}