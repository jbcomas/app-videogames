const { Router } = require('express');
const {
    getAllVideogames,
    getVideogamesName,
    getVideogameById,
    getDb,
    createdVideogame,
    deleteVideogame,
    updateVideogame,
    getV
} = require('../controllers/Controllers.js')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// router.get("/", async (req, res) => {
//     const name = req.query.name
//     const allVideogames = await getAllVideogames()
//     if (name) {
//         const videogameByName = await getVideogamesName(name)
//         if (videogameByName.length !== 0) {
//             return res.status(200).send(videogameByName)
//         } else {
//             const videogameDbByName = await getDb().then((res) =>
//                 res.filter((el) => el.name.toLowerCase().trim() === name.toLowerCase().trim()));
//             if (videogameDbByName)
//                 return res.status(200).send(videogameDbByName);
//             else
//                 return res.status(404).send(`videogame con este nombre ${name} no se ha encontrado`);
//         }
//     } else {
//         if (allVideogames.length > 0)
//             return res.status(200).send(allVideogames);
//         else {

//             return res.status(404).send('upsss');

//         }
//     }
    
// })
router.get("/", async (req, res) => {
    const name = req.query.name
    const allVideogames = await getAllVideogames()
    const videogameByName = await getVideogamesName(name)
    if (name) { (videogameByName === null) ? res.status(200).send(allVideogames)
                                    : res.status(200).send(videogameByName)
    }else 
    return res.status(200).send(allVideogames)
})


router.get("/:id", async (req, res) => {
    const id = req.params.id
    const videogame = await getVideogameById(id)
    const gameByIdDb = await getDb().then((res) => res.filter((el) => id === el.id))
    videogame ? res.status(200).send(videogame)
              : (gameByIdDb.length>0) ? res.status(200).send(gameByIdDb)
              : res.status(404).send(`Videogame con este id ${id} no se ha encontrado`);
})



router.post("/", async (req, res) => {
    const {
        name,
        description,
        released,
        rating,
        platforms,
        image,
        fromDb,
        genres
    } = req.body
     const newGame = await createdVideogame(
        name,
        description,
        released,
        rating,
        platforms,
        image,
        fromDb,
        genres
     )
     return res.status(200).send(newGame)
    
})

router.put("/:id", async (req, res) => {
    const id = req.params.id
    const videogame = req.body
    const gameUpdate = await updateVideogame(id,videogame )
    res.status(200).send(gameUpdate)
})
router.delete("/:id", async (req, res) => {
    const id = req.params.id
    const deleteGame = deleteVideogame(id)
    return res.status(200).send(deleteGame)
})

module.exports = router;
