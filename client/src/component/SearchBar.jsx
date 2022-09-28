import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import styles from './SearchBar.module.css'

export default function SearchBar({getVideogamesByName,  setCurrentPage}) {
    const dispatch = useDispatch()
    const [ name, setName ] = useState('')

    function hanldeChange(e) {
        e.preventDefault()
        setName(e.target.value)
    }
    function handleClick(e) {
        e.preventDefault()
        setName('')
        setCurrentPage(1)
        dispatch(getVideogamesByName(name))

    }
    return (
        <>
            <input  className={styles['btn']} placeholder="Search..." value={name} type="text" onChange={(e)=> hanldeChange(e)} />
            <button className={styles['btn-search']}  type={'submit'}  onClick={(e)=> handleClick(e)}>Search</button>
            
        </>
    )
}



