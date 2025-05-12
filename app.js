const express = require("express")
const app = express()
const port = process.env.SERVER_PORT
const cosr = require("cors")

// routers
const moviesRouter = require("./routers/moviesRoutes")

// middlewares
const errorsHandler = require("./middlewares/errorsHandler")
const notFound = require("./middlewares/notFound")

app.use(cors({
    origin: process.env.FE_APP
}))

// middleware static asstets
app.use(express.static('public'))


// welcome page
app.get("/", (req, res) => {
    res.send("init")
})


// movies
app.use("/api/movies", moviesRouter)


// use 500
app.use(errorsHandler)
// use 404
app.use(notFound)


app.listen(port, () => {
    console.log("CHECK! express on port " + port)
})