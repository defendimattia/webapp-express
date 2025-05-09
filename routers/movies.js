const express = require("express")
const router = express.Router()
const connection = require("../data/book-db")

router.get("/", (req, res) => {

    sql = "SELECT * FROM movies"
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: "Database query failed" })
        res.json(results)
    })
})

router.get("/:id", (req, res) => {

    const id = req.params.id

    sql = "SELECT * FROM movies WHERE id = ?"
    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: "Database query failed" })
        if (results.length === 0) return res.status(404).json({ error: "Movie not found" })
        res.json(results[0])
    })
})


module.exports = router