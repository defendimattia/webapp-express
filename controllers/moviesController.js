const connection = require("../data/movies-db")

function index(req, res) {

    sql = "SELECT * FROM movies"
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: "Database query failed" })
        res.json(results.map(result => ({ ...result, image_path: process.env.PUBLIC_PATH + "movies/" + result.image })))
    })
}


function show(req, res) {

    const { id } = req.params

    sql = "SELECT * FROM movies WHERE id = ?"
    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: "Database query failed" })
        if (results.length === 0) return res.status(404).json({ error: "Movie not found" })

        const movie = { ...results[0], image_path: process.env.PUBLIC_PATH + "movies/" + results[0].image }

        sqlReview = "SELECT * FROM reviews WHERE movie_id = ?"

        connection.query(sqlReview, [id], (err, results) => {
            if (err) return res.status(500).json({ error: "Database query failed" })

            movie.reviews = results

            res.json(movie)
        })
    })
}


function movieReview(req, res) {

    const { id } = req.params
    const { name, vote, text } = req.body
    sql = "INSERT INTO `movies_db`.`reviews` (`movie_id`, `name`, `vote`, `text`) VALUES (?, ?, ?, ?);"

    connection.query(sql, [id, name, vote, text], (err, results) => {
        if (err) return res.status(500).json({ error: "Database query failed" })

        res.status(201).json({ message: "Review created successfully!" })
    })
}



module.exports = {
    index,
    show,
    movieReview
}