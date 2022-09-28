import React from "react";
import styles from "./Loading.module.css"
import img from "../img/Slow-mac-loading-spinning-whee-unscreen.gif"

export default function Loading() {
    return(
        <div>
        <img className={styles["gif"]} src={img} alt="loading" />
        </div>
    )
}

// https://learn.g2.com/hs-fs/hubfs/Slow-mac-loading-spinning-wheel.gif?width=75&name=Slow-mac-loading-spinning-wheel.gif