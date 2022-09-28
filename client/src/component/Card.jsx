import React from "react";
import { Link } from "react-router-dom";
import styles from './Card.module.css'





export default function Card({ name ,image, genres, id, fromDb , rating}){


    return (

        <div className={styles['card']}>
            
                <div>
                    <figure className={styles['card__caption']} >
                    { fromDb ? <button>x</button> : ''}
                        
                        <img className={styles['card__image-container']} src={image} alt='not found' />
                        
                        <figcaption>
                            <h1 className={styles['card__name']}>{name}</h1>
                             <label>Rating</label>   
                            <h2>{rating}</h2>
                            { 
                            genres?.map((el)=>{
                                return(
                                   
                                    <h3 key={el} className={styles['card__genre']}>{el}</h3>
                                    
                                )})
                               } 
                               <Link to={`/home/${id}`} className={styles['more']} >
                          <button className={styles['more-btn']}>read more</button>
                          </Link>
                        </figcaption>
                    </figure>
                </div>
         </div>
    )
}

            