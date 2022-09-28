import React from "react";
import { useDispatch } from "react-redux";
import { filterByCreated } from "../actions";
import styles from './OrderA.module.css'



export default function FilterCreate({setOption, setCurrentPage}) {
const dispatch = useDispatch()

    function handleChangeCreate(e) {
        e.preventDefault()
        setOption({
            active: e.target.value
        })
        setCurrentPage(1)
        dispatch(filterByCreated(e.target.value))
        
    }

    return(
        
        <>
        <label> Created by: </label>
            <select className={styles['btn-order']} onChange={(e)=>handleChangeCreate(e)}>
                <option value="ALL">All</option>
                <option value="API">Api</option>
                <option value="DB">Db</option>
            </select>
        </>
    )
}