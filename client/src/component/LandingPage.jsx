import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllVideogames } from "../actions";
import styles from './LandingPage.module.css'



export default  function LandingPage() {
    const active = useSelector((state)=> state.allVideogames)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getAllVideogames())
    },[dispatch])
    return(
        <div className={styles['landing']}>
        <h1 className={styles['title']}>GAMER ZONE</h1>
        <Link to="/home">
        { active.length>0 && <button className={styles['btn']}>PRESS START</button>
        }
        </Link>
        </div>
    )
}