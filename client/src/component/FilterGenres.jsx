import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByGenre } from "../actions";
import styles from './OrderA.module.css'



export default function FilterGenres({option , setCurrentPage}) {
    const dispatch = useDispatch()
    const genres = useSelector((state)=>state.genres)


    function handleChangeGenre(e) {
        e.preventDefault()
        setCurrentPage(1)
        dispatch(filterByGenre(e.target.value , option))
    }

    return(
        <>
        <label> Genres: </label>
            <select className={styles['btn-order']} onChange={(e)=>handleChangeGenre(e)}>
            <option key={'ALL'} value={'ALL'}>All</option>

                {
                    genres?.map((el) => {
                        return (
                            
                            <option key={el.name} value={el.name}>{el.name}</option>
                        )
                    })
                }
            </select>

        </>
    )
}