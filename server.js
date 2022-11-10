const express = require('express')
const connectDB = require('./config/db')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const port = process.env.PORT


connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/products', require('./routes/productRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server is running on port ${port}.`))