const express = require('express')
const app = express()
const activities = require('./routes/activities')
const connectDB = require('./db/connect')
const notFound = require('./middleware/notFound')
const errorHandler = require('./middleware/errorHandler')
require('dotenv').config()

app.use(express.static('./public'))
app.use(express.json())
app.use('/api/v1/activities', activities)
app.use(notFound)
app.use(errorHandler)

const port = 3000

const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URI)
        app.listen(port, console.log(`Server listening on port ${port}`))
    } catch (error) {
        console.log(`Encountered an error:\n${error}`)
    }
}

start()