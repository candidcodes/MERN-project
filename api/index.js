require('module-alias/register')

const express = require('express')
const { config } = require('dotenv')
const mongoose  = require('mongoose')
const {User, Review, Product, Order, Detail, Category} = require('./models')
const routes = require('./routes')
const cors = require('cors')

config()

const port = process.env.API_PORT || 5000
const mongo = process.env.MONGO_DB

const app = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded())

app.use(routes)

app.use((error, req, res, next) => {
    if('message' in error && typeof error.message == 'string' && error.message.startsWith('ENOENT')){
        error.message = 'file not found'
    }
    res.status(error.status || 400)
    res.send({
        message : error.message || 'Problem while processing request',
        errors : error.errors
    })
})

app.listen(port, async()=> {
    console.log(`server started at http://localhost:${port}`)
    console.log('press ctrl + c to stop')

    await mongoose.connect(mongo)
    console.log("mongo db connected")

    // const users = await User.find()
    // console.log(users)

    // const category = await Category.find()
    // console.log(category)

    // const review = await Review.find()
    // console.log(review)


})