import axios from 'axios'
import {
    GET_ALLVIDEOGAMES,
    GET_VIDEOGAMES_BY_NAME,
    GET_VIDEOGAMES_BY_ID,
    GET_GENRES,
    ORDER_A,
    ORDER_R,
    FILTER_BY_GENRE,
    FILTER_BY_CREATED,
    CLEAR,
    CREATE,
    GET_PLATFORMS
} from '../const/index.js'

export function getAllVideogames(){ 
    return async function (dispatch){

        const Videogames = await axios.get("http://localhost:3001/games").then(res=>res.data)

        return dispatch ({
            type: GET_ALLVIDEOGAMES,
            payload: Videogames
        })
    }
}
export function getVideogamesByID(id){ 
    return async function (dispatch){

        const Videogame = await axios.get(`http://localhost:3001/games/${id}`).then(res=>res.data)

        return dispatch ({
            type: GET_VIDEOGAMES_BY_ID,
            payload: Videogame
        })
    }
}
export function getVideogamesByName(name){ 
    return async function (dispatch){

        const Videogames = await axios.get(`http://localhost:3001/games?name=${name}`).then(res=>res.data)

        return dispatch ({
            type: GET_VIDEOGAMES_BY_NAME,
            payload: Videogames
        })
    }
}
export function getGenrs(){ 
    return async function (dispatch){

        const genres = await axios.get(`http://localhost:3001/genres`).then(res=>res.data)

        return dispatch ({
            type: GET_GENRES,
            payload: genres
        })
    }
}
export function getPlatforms(){ 
    return async function (dispatch){

        const platforms = await axios.get(`http://localhost:3001/platforms`).then(res=>res.data)

        return dispatch ({
            type: GET_PLATFORMS,
            payload: platforms
        })
    }
}
export function createVideogames(payload){ 
    return async function (dispatch){

        const create = await axios.post(`http://localhost:3001/games`,payload)
        alert(create.data)
        console.log(payload);
        return dispatch ({
            type: CREATE,
            payload: create
        })
    }
}



export function orderByA(value){
    
    return {
            type: ORDER_A,
            payload: value
        }
}
export function orderByR(value){
    
    return {
            type: ORDER_R,
            payload: value
        }
}

export function filterByGenre(value, option) {
    return {
        type: FILTER_BY_GENRE,
        payload: value,
        active: option.active
    }

}
export function filterByCreated(value) {
    return {
        type: FILTER_BY_CREATED,
        payload: value
    }

}
export function clear() {
    return {
        type: CLEAR,
    }

}
