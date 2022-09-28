import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getVideogamesByID , clear } from '../actions/index.js'
import { Link } from "react-router-dom"
import Loading from "./Loading.jsx"
import styles from './Detail.module.css'


export default function Detail(props) {
const { id } = props.match.params
const dispatch = useDispatch()
const detail = useSelector((state)=>state.detail)
useEffect(() => {
    dispatch(getVideogamesByID(id))
    return dispatch(clear())
},[])

return (
    <div className={styles['container-details']}>
               
    <div className={styles['card-details']}>{ detail.length>0 ? detail.map((el)=> {
        let { name, image , genres , rating , released , platforms , description} = el
        return (
            
            <div key={el.id}>
                 <Link to='/home'>
                <button className={styles['back-btn']}>Back</button>
                </Link>
                <div>
                <img className={styles['card__image-container']} src={image} alt='not found' />
                </div>
                <div>
                <h1 >{name}</h1>
                {
                    <p dangerouslySetInnerHTML={{ __html: description }} />
                }
               
                </div>
                <div >
                <h4>Released: <span>{released}</span></h4>
                <h4>Rating:  <span>{rating}</span></h4>
                <h4>Genres:
                        {genres?.map((el) => <li className={styles['card__genre']} key={el}>{` ${el} `}</li>)}</h4>
                <h4 >Platforms:
                        <ul >{platforms?.map((el) => <li className={styles['card__genre']} key={el}>{` ${el} `}</li>)}</ul> </h4>

               
                </div>
            </div>  
        )})
      
         : <Loading/>
                }
                

         </div>
         </div>
    )
}