const express = require("express")
const env = require('dotenv').config()
const {connectDB} = require('./config/db')


const app = express()
const port = process.env.LOCAL_DOMAIN || 3000
connectDB()


app.use(express.json())
app.use(express.urlencoded({extended: true,}))
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/users/tickets', require('./routes/ticketRoutes'))


app.listen(port, console.log(`locally running on ${port}`))


