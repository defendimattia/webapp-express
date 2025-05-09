const express = require("express")
const app = express()
const port = 3000

app.get("/", (req, res) => {
    res.send("init")
})

app.listen(port, () => {
    console.log("CHECK! express on port " + port)
})