const express = require("express");
const router = express.Router();
const {  createGenres } = require("../controllers/Controllers");

router.get("/", async (req, res) => {
  const genres = await createGenres()
  return res.status(200).send(genres)
})

module.exports = router;