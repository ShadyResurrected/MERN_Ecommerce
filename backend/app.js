const cookieParser = require("cookie-parser")
const express = require("express")
const app = express()
const errorMiddleware = require('./middleware/error')

app.use(express.json())
app.use(cookieParser())

// Routes
const product = require('./routes/productRoute')
const user = require('./routes/userRoute')
const order = require('./routes/orderRoute')

app.use('/api/v1', product)
app.use('/api/v1', user)
app.use('/api/v1', order)


// middleware for error
app.use(errorMiddleware)

module.exports = app