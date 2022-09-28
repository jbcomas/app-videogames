import  React  from "react";
import { Link } from "react-router-dom"
import { useEffect, useState } from 'react'
import { useSelector , useDispatch } from 'react-redux'
import {
    getAllVideogames,
    getGenrs,
    getVideogamesByName,
    getPlatforms
} from "../actions/index.js";
import Card from "./Card";
import styles from "./Home.module.css"
import SearchBar from "./SearchBar.jsx";
import FilterCreate from "./FilterCreate.jsx";
import FilterGenres from "./FilterGenres.jsx";
import OrderA from "./OrderA.jsx";
import OrderR from "./OrderR.jsx";
import Paginated from "./Paginated.jsx";
import Loading from "./Loading.jsx";




export default function Home() {
    const dispatch = useDispatch()
    const all = useSelector((state) => state.videogames)
    const [order , setOrder]= useState('')
    const [option , setOption] = useState({ active: 'ALL'})

    const [currentPage,setCurrentPage] = useState(1)
    const videogamePerPage = 15
    const indexLast = currentPage * videogamePerPage 
    const indexFirst = indexLast  -  videogamePerPage 
    const currentVideogame = all.slice(indexFirst, indexLast) 
                                
    const paginated = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
 
    function handleClick(e) {
        e.preventDefault()
        setCurrentPage(1)
        dispatch(getAllVideogames())
    }

    useEffect(() => {
        dispatch(getAllVideogames())
    }, [dispatch])


    useEffect(() => {
        dispatch(getPlatforms())
        dispatch(getGenrs())
    }, [dispatch])

    return (
        <div className={styles['home']}>
            <h1 className={styles['title']}>HenryGames 🎮</h1>
            <div className={styles['nav']}>
                <div >
                <button className={styles['btn']} onClick={(e)=>handleClick(e)} >Home</button>
                <FilterCreate  setOption={setOption} setCurrentPage={setCurrentPage}/>
                <FilterGenres option={option} setCurrentPage={setCurrentPage}/>
                <OrderA setCurrentPage={setCurrentPage} setOrder={setOrder}/>
                <OrderR setCurrentPage={setCurrentPage} setOrder={setOrder}/>
                </div>
                <div>
            <Link to="/videogames">
                <button className={styles['btn']}>create videogame 🔧</button>
            </Link>
            </div>
            <div>
            <SearchBar setCurrentPage={setCurrentPage} getVideogamesByName={getVideogamesByName} />
            </div>
            </div>
            
            <hr />
            
            <Paginated currentPage={currentPage} videogamePerPage={videogamePerPage} all={all.length} paginated={paginated} />
            <div className={styles['cards']}>
                <div className={currentVideogame.length > 0? styles['card'] : styles["loading"]} >
                    {
                        
                        currentVideogame.length>0 ?currentVideogame.map((el) => {
                            const { name, image, genres, id, rating, fromDb } = el
                            return (
                                <Card
                                    key={id} 
                                    name={name}
                                    image={image}
                                    genres={genres}
                                    id={id}
                                    rating={rating}
                                    fromDb={fromDb}
                                     />
                            )
                        }): <Loading />
                    }
                </div>
            </div>
        </div>
    )
    
}