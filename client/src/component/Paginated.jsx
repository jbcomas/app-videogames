import React from "react";
import styles from "./Paginated.module.css"

export default function Paginated({currentPage ,videogamePerPage, all ,paginated }) {
    const pageNumber = []


            for (let i = 0; i <Math.ceil(all/videogamePerPage); i++) {
                pageNumber.push(i + 1)
            }
    return (
            <nav className={styles['nav']}>
                <ul className={styles["ul"]}>
                    {
                        pageNumber && pageNumber.map((number) => (
                            <li className={styles["li"]} key={number}>
                                <button  className={styles["page"]}  onClick={()=> paginated(number)}>{number}</button>
                            </li>
                        ))
                    }
                </ul>
            </nav>
    )
}