import React from "react";
import { useDispatch } from "react-redux";
import { orderByR } from "../actions";
import styles from './OrderA.module.css'


export default function OrderR({setCurrentPage ,setOrder}) {
    const dispatch = useDispatch()
    function handleRating(e) {
        e.preventDefault()
        setCurrentPage(1)
        setOrder(`order ${e.target.value}`)
        dispatch(orderByR(e.target.value))
    }
    return(
        <>
        <select className={styles['btn-order']} onChange={(e)=>handleRating(e)}>
            <option value="+">Rating +</option>
            <option value="-">Rating - </option>
        </select>
        </>
    )
}