// import dependencies and initialize the express app
const express = require('express')
require('dotenv').config()
const app = express()
const cors = require("cors")
const path = require('path')
const port = process.env.PORT || 5009

// import local files
const novice = require('./routes/novice')
const users = require('./routes/users')

// configurations
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  methods: ["GET", "POST"],
}))

// actual routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"))
})

app.use('/novice', novice)
app.use('/users', users)

// start the express server
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
