import React from "react";
import { useDispatch } from "react-redux";
import { orderByA } from "../actions";
import styles from './OrderA.module.css'


export default function OrderA({setCurrentPage, setOrder}) {
const dispatch = useDispatch()
    function handleOrderA(e) {
        e.preventDefault()
        setOrder(`order ${e.target.value}`)
        setCurrentPage(1)
        dispatch(orderByA(e.target.value))
    }
  
    return(
        <>
        <label > Order: </label>
        <select className={styles['btn-order']} onChange={(e)=> handleOrderA(e)}>
            <option value="ASC">A-Z</option>
            <option value="DSC">Z-A</option>
        </select>
        </>
    )
}
