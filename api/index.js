const express = require('express')
const { config } = require('dotenv')
const mongoose  = require('mongoose')

config()

const port = process.env.API_PORT || 5000
const mongo = process.env.MONGO_DB

const app = express()

app.use(express.json())
app.use(express.urlencoded())

app.use((error, req, res, next) => {
    res.status(error.status || 400)
    res.send({
        message: error.message || 'Problem while processing request'
    })
})

app.listen(port, async()=> {
    console.log(`server started at http://localhost:${port}`)
    console.log('press ctrl + c to stop')

    await mongoose.connect(mongo)
    console.log("mongo db connected")
})