require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const app = express()
const PORT = process.env.PORT||5000
const sequelize = require('./DB')
const models = require('./Models/models')

app.use(express.json())
app.use(cookieParser())
app.use(cors())
const start = async () =>{
    try{
        await sequelize.authenticate()
        await sequelize.sync()

        app.listen(PORT,()=> console.log(`server started on port: ${PORT}`))
    }
    catch (e){
        console.log(e)
    }
}
start()