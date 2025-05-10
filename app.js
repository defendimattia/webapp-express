const express = require("express")
const app = express()
const port = process.env.SERVER_PORT
const moviesRouter = require("./routers/moviesRoutes")
const errorsHandler = require("./middlewares/errorsHandler")
const notFound = require("./middlewares/notFound")

app.use(express.static('public'))

app.get("/", (req, res) => {
    res.send("init")
})

app.use("/api/movies", moviesRouter)

app.use(notFound)
app.use(errorsHandler)

app.listen(port, () => {
    console.log("CHECK! express on port " + port)
})