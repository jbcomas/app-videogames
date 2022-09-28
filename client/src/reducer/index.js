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

const initialState = {
    allVideogames: [],
    videogames: [],
    genres: [],
    detail: [],
    platforms:[]
}

 function rootReducer(state = initialState, action) {
    const  createFilter = state.allVideogames
    const  createApi = createFilter.filter(el => el.fromDb === false)
    const  createDb = createFilter.filter(el => el.fromDb === true)
    const stateOption = action.active === 'DB' ? createDb : action.active === 'API' ? createApi : createFilter
    const videogames = state.videogames


        switch (action.type) {
            case GET_ALLVIDEOGAMES:
                
                return {
                    ...state,
                    allVideogames: action.payload,
                    videogames: action.payload
                }
            case GET_VIDEOGAMES_BY_NAME:
                return {
                    ...state,
                    videogames: action.payload
                }
            case GET_VIDEOGAMES_BY_ID:
                return {
                    ...state,
                    detail: action.payload
                }
            case GET_GENRES:
                return {
                    ...state,
                    genres: action.payload
                }
            case GET_PLATFORMS:
                return {
                    ...state,
                    platforms: action.payload
                }
            case ORDER_A:
                const orderA =  videogames.sort((a, b) => {
                    return (action.payload === 'ASC') ? (a.name > b.name) ? 1 : (a.name < b.name) ? -1 : 0 
                    : (a.name < b.name) ? 1 : (a.name > b.name) ? -1 : 0});
                return {
                    ...state,
                    videogames: orderA
                }
            case ORDER_R:
                const orderR = videogames.sort((a, b) => (action.payload === '-') ? a.rating - b.rating : b.rating - a.rating)
                return {
                    ...state,
                    videogames: orderR
                }
            case FILTER_BY_GENRE:
               
                const genrsFilter = action.payload === 'ALL' && action.active === 'DB'  ? createDb 
                                  : action.payload === 'ALL' && action.active === 'API' ? createApi
                                  : action.payload === 'ALL' && action.active === 'ALL' ? createFilter
                                  : stateOption.filter(el => el.genres.includes(action.payload))
                return {
                    ...state,
                    videogames: genrsFilter
                }
            case FILTER_BY_CREATED:
                
                const  createdFilter = action.payload === 'ALL' ? createFilter : action.payload === 'API' ? createApi : createDb
                return {
                    ...state,
                    videogames: createdFilter,
                }
            case CLEAR:
                return {
                    ...state,
                    detail:[],
                }
            case CREATE:
                return {
                    ...state,
                }
                    
        
            default:
            return state
        }
    
}

export default rootReducer;