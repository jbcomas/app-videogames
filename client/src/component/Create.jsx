import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createVideogames } from "../actions";
import styles from './create.module.css'
import { Link, useHistory } from "react-router-dom"
import errors from './Error.module.css'

export default function Create() {
    const dispatch = useDispatch()
    const history = useHistory()
    const allGenres = useSelector((state)=>state.genres)
    const allPlatforms = useSelector((state)=>state.platforms)
    const [input, setInput]= useState({
        name:'',
        description:'',
        released: '',
        rating: '',
        platforms:[],
        image: '',
        genres:[],
    })
    const [error, setError]= useState({
    
        name:'',
        description:'',
        released: '',
        rating: '',
        platforms:[],
        image: '',
        genres:[],
    })

    let date = new Date()
    let day = date.getDate()
    let month = date.getMonth()
        month += 1
    let year = date.getFullYear()
    let today = `${year}-${(month < 10) ?`0${month}`:month}-${day}`
    function validate(input) {
        let error = {}
      
        if (!input.name) {
            error.name = 'Se requiere un nombre'
        }else if(!/^([A-Za-z0-9]\s*)+$/.test(input.name)){
            alert('ingresa un nombre valido que solo contenga letras/numeros')
        }
        if (!input.description) {
            error.description = 'Se requiere un description'
        } 
        if (!input.released) {
            error.released = 'Se requiere un released'
        }else if(!/^\d{4}([-/.])(0?[1-9]|1[1-2])\1(3[01]|[12][0-9]|0?[1-9])$/.test(input.released)){
            error.released = 'Se requiere una fecha valida'
        } 
        if(input.rating < 1 || input.rating> 10){ 
            error.rating = 'ingresa una valor '
        }else if(!/^[0-9]{1}$/.test(input.rating)){
            error.rating = 'ingresa una valor entre 1 y 9 para rating'
        }
        if (!input.image) {
            error.image = 'Se requiere una url para la imagen'
        }else if(!/^https?:\/\/[\w-]+(\.[\w-]+)+[/#?]?.*$/.test(input.image)){
            error.image = 'Url invalida'
        } 
        if (input.genres.length === 0) {
            error.genres = 'Se requiere minimo un genero'
        } 
        // else if(input.genres.length > 2){
        //     error.genres = 'Ingresa solo dos generos'
        // }  
        if (input.platforms.length === 0) {
            error.platforms = 'Se requiere minimo una plataforma'
        } 
        // else if(input.platforms.length > 2){
        //     error.platforms = 'Ingresa solo dos plataformas'
        // } 

        return error
    }
    function handleSelect(e){
        const repeat = input[e.target.name]?.includes(e.target.value)
        if(repeat){
            alert(`${e.target.name} name: ${e.target.value}  ya existe`)
            // const filter = input[e.target.name].filter((el)=> el !== e.target.value)
            // setInput({
            //     ...input,
            //     [e.target.name]: filter
            // })
        }else {
            setInput({
                ...input,
                [e.target.name]: [...input[e.target.name] , e.target.value]
            })
        }
      
        setError(validate({
            ...input,
            [e.target.name]: [...input[e.target.name] , e.target.value]
        }))
    }
    function removeSelect(e) {
        const repeat = input[e.target.name]?.includes(e.target.value)
        if(repeat){
            const filter = input[e.target.name].filter((el)=> el !== e.target.value)
            setInput({
                ...input,
                [e.target.name]: filter
            })
    }
    }   

    function handleChangeInput(e) {
        e.preventDefault()
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setError(validate({
            ...input,
            [e.target.name]: e.target.value

        }))
    }
    function hanldeSubmit(e) {
        e.preventDefault()
        dispatch(createVideogames(input))
        setInput({
            name: '',
            description: '',
            released: '',
            rating: '',
            platforms: [],
            image: '',
            fromDb: true,
            genres: [],
        })
        history.push('/home')
    }
    return(
        <div className={styles['create']}>
            <Link to='/home'>
            <button className={styles['btn-back']}>back</button>
            </Link>
        <form onSubmit={(e)=>hanldeSubmit(e)} className={styles['create-form']}>
            <h1>create your Videogames</h1>
            <label>Name: </label>
            <input 
                
                    type="text"
                    name="name"
                    value={input.name}
                    onChange={(e) => handleChangeInput(e)}
            />
            {error.name && <p className={errors['input']}>{error.name}</p>}
            <label>Image: </label>
            <input 
                    onChange={(e) => handleChangeInput(e)}
                    name="image"
                    value={input.image}
                    placeholder="https://media.rawg.io/media/screenshots/ed6/ed6f91a6ec54be79d4ce183b9b0ba60b.jpg"
                    type={'url'}
                    disabled={error.name || !input.name}
             />
             {error.image && <p className={errors['input']}>{error.image}</p>}
            <label>Description:</label>
            <textarea 
                    onChange={(e) => handleChangeInput(e)}
                    name="description"
                    value={input.description} cols="70" rows="10"
                    placeholder="description"
                    disabled={error.image || !input.image}
                    >
                        
            </textarea>
            {error.description && <p className={errors['input']}>{error.description}</p>}
            <label>Released:</label>
            <input 
                    onChange={(e) => handleChangeInput(e)}
                    name="released"
                    value={input.released}
                    type="date"
                    min={today}
                    disabled={error.description || !input.description}
             />
            {error.released && <p className={errors['input']}>{error.released}</p>}
            <label>Rating: </label>
            <input 
                    onChange={(e) => handleChangeInput(e)}
                    name="rating"
                    value={input.rating}
                    type="number"
                    disabled={error.released || !input.released}
             />
             {error.rating && <p className={errors['input']}>{error.rating}</p>}
            <label>genres:</label>
                <select
                    name="genres"
                    onChange={(e) => handleSelect(e)}
                    disabled={error.rating || !input.rating}
                >{allGenres?.map((el) =>
                    <option
                        key={el.id}
                        value={el.name}>
                        {el.name}
                    </option>)}
                </select>
                {error.genres && <p className={errors['input']}>{error.genres}</p>}
                <ul>{input.genres?.map(el => <li key={el}>{el} <button onClick={(e)=>removeSelect(e)} value={el} name={'genres'} type={'button'}>x</button></li>)}</ul>
                <label>platforms:</label>
                <select
                    name="platforms"
                    onChange={(e) => handleSelect(e)}
                    disabled={error.genres || input.genres.length<1}
                >{allPlatforms?.map((el) =>
                    <option
                        key={el}
                        value={el}>
                        {el}
                    </option>)}
                </select>
                {error.platforms && <p className={errors['input']}>{error.platforms}</p>}
            <ul>{input.platforms?.map(el => <li key={el}>{el} <button onClick={(e)=>removeSelect(e)} value={el} name={'platforms'} type={'button'}>x</button></li> )}</ul>
            <button className={styles['btn']}
                    disabled={error.platforms || !input.name || !input.image || !input.description || !input.released || input.rating<1 || input.genres.length<1 || input.platforms.length<1 }
                    type="submit">
                Create</button>
            </form>
        </div>
    )
}
