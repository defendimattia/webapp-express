const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
    res.send("movies list")
})

router.get("/:id", (req, res) => {
    res.send("single movie details")
})

module.exports = router