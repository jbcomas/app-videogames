const axios = require("axios");
const { Videogame , Genre } = require('../db');
const { API_KEY } = process.env;


function may(str) {
    let name = str.toLowerCase()
   return name.charAt(0).toUpperCase() + name.slice(1)
}
const getV = () => {
   
    let promise = []
    let page = [1, 2, 3 , 4 ,5]
        page.forEach((el) =>
            promise.push(new Promise((resolve, reject) => {
            resolve(axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${el}`))
            }).then(res => res.data.results)
              .then(videogame => videogame.map((el) => {
                    return {
                        id: el.id,
                        name: may(el.name),
                        rating: el.rating,
                        image: el.background_image,
                        genres: el.genres.map((el) => el.name),
                        fromDb: false
                    }
                })).catch((error) =>
                    console.error('Error in getV:', error.message)))
        )
    let all = Promise.all(promise).then(videogame => videogame.flat())
    return all
}


// const getApi = async () => {
//     try {
//         const aux1 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=1&page_size=40`).then((res)=> res.data.results)
//         const aux2 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=25&page_size=40`).then((res)=> res.data.results)
//         const aux3 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=35&page_size=20`).then((res)=> res.data.results)
//         const api = [...aux1, ...aux2, ...aux3]
//         const allVideogames = api?.map(el => {
//             let { name, id, released, rating, platforms, background_image, genres } = el
//             return {
//                 id: id,
//                 name: may(name),
//                 rating: rating,
//                 image: background_image,
//                 genres: genres.map((el) =>el.name),
//                 fromDb: false
//             }
//         })
//         return allVideogames
//     } catch (error) {
//         console.error("Error in getApi:", error.message);
//     }
// }


const getDb = async () => {
    try {
    return (
    await Videogame.findAll({
        include:{
            model: Genre,
            attributes: ['name'],
            through: {
                attributes: []
            },
          
        }
    })
    ).map((el) => {
        const json = el.toJSON();
        
        return {
          ...json,
          genres: json.genres.map((el) => el.name),
        };
      });
}catch(error){
    console.error("Error in getDb:", error.message)
}
}


const getAllVideogames = async () => {
    try {
      const videogames = await getV()
      const videogamesDb = await getDb()
      return [...videogames, ...videogamesDb];
    } catch (error) {
      console.error("Error in getAllVideogames:", error.message);
    }
    
  };

  const getVideogamesName = async (name) =>{
    try{
    const game = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}&page_size=15`).then((res)=> res.data.results)
    const videogames = game?.map( el =>  {
        let { name , id , released, rating, platforms, background_image, genres} = el
            return {
                id: id,
                name: may(name),
                released: released,
                rating: rating,
                platforms: platforms.map(el=> el.platform.name),
                image: background_image,
                genres: genres.map(el => el.name),
                fromDb: false
            }
    })
     const db = await Videogame.findAll({
        where:{ name: name} 
    })
    const games = [...db,...videogames]
    
    return games
}catch(error){
    console.error("Error in getVideogamesName:", error.message)
}
  }

  const getVideogameById = async (id) => {
      try{
        const gameById = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`).then((res)=> res.data)
        if(gameById){
            const {id, name , released , rating, platforms, background_image ,genres , description} = gameById
            return [{
                id: id,
                name: may(name),
                description: description,
                released: released,
                rating: rating,
                platforms: platforms.map(el=> el.platform.name),
                image: background_image,
                genres: genres.map(el => el.name),
                fromDb: false
            }]
        }
    }catch(error)
    {
    console.error("Error in getVideogameById:", error.message)
}  }

const createdVideogame = async (
    name,
    description,
    released,
    rating,
    platforms,
    image,
    fromDb,
    genres
) => {
    try {
        const newGame = await Videogame.create({
            name: may(name),
            description,
            released,
            rating,
            platforms,
            image,
            fromDb
        })
        
         await Genre.findAll({
            where: {
                name: genres
            }
        }).then((res) => newGame.addGenre(res))
        
        return "Videogame Create"
        
    } catch (error) {
        console.error("Error in createdVideogame:", error.message)
    }
}

const createGenres = async () => {
    try {
    const genre = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`).then((res)=> res.data.results)
    genre.forEach((el)=>{
        Genre.findOrCreate({
            where:{
                name: el.name
            }
        })
    })
    return Genre.findAll()
}catch(error){
    console.error("Error in getGenres:", error.message );
}
}
 const deleteVideogame = async (id) => {
     try {
         await Videogame.destroy({
             where:
             {
                 id: id,
             },
         });
         
         return "Videogame delete"

     } catch (error) {
         console.error("Error in deleteVideogame:", error.message)
     }
 }

 const updateVideogame = async (id , videogame) => {
    try{
       await Videogame.update(videogame,{
            where: {
                id: id
            }
        })
        const updateGame = await getDb().then((res) => res.filter((el) => id === el.id))
        return updateGame
    }catch(error){
        console.error("Error in updateVideogame:", error.message)
    }
 }


 const getPlatforms = async () => { 
    try {
        const info = [],
        promise = [],
        pages = [1, 2];
        pages.forEach((page) => promise.push(
            axios.get(`https://api.rawg.io/api/platforms?page=${page}&key=${API_KEY}`)
                .then(res => res.data.results)
                .then(platforms => platforms.map(({ name }) => name))
                .then(platforms => info.push(...platforms))
                
        ));
       await Promise.all(promise);
    
        return info;
    } catch (error) {
        console.error("Error in getPlatforms: ", error.message)
    }
 
};


  module.exports = {
      getAllVideogames,
      getDb,
      getVideogamesName,
      getVideogameById,
      createdVideogame,
      createGenres,
      deleteVideogame,
      updateVideogame,
      getPlatforms,getV

  }
