const { Router } = require('express');
const { getPlatforms } = require('../controllers/Controllers');


const router = Router()

router.get("/", async (req, res) => {
    
    const allPlatforms = await  getPlatforms()
    if (allPlatforms) {
            return res.status(200).send(allPlatforms)
        } else {
                return res.status(404).send('Error in platforms');
        }
    
})

module.exports = router;