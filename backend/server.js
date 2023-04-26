const app = require('./app')
const dotenv = require('dotenv')
const connectDatabase = require('./config/database')

// Handling uncaught exception
process.on('uncaughtException', (err) => {
    console.log(`Error : ${err.message}`)
    console.log(`Shutting down the server due to uncaught exception`)
})

// config
dotenv.config({path : "./config/config.env"})

// connect db
connectDatabase()

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is working on ${process.env.PORT}`)
})

// unhandled promise rejection
process.on('unhandledRejection', (err) => {
    console.log(`Error : ${err.message}`)
    console.log(`Shutting down the server due to unhandled promise rejection`)

    server.close(() => {
        process.exit()
    })
})