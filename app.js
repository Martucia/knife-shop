const express = require("express")
const mongoose = require("mongoose")
const config = require("config")
const authRouter = require("./routes/auth.routes")
const catalogRouter = require("./routes/catalog.routes")
const PORT = config.get('port')
const corsMiddleware = require('./middleware/cors.middleware')
var fs = require('fs')
var imgPath = '/path/images';

const app = express()

app.use(corsMiddleware)
app.use(express.json())
app.use("/api/auth", authRouter)
app.use("/api/catalog", catalogRouter)


const start = async () => {
    try {
        await mongoose.connect(config.get("mongoUri"), {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        app.listen(PORT, () => {
            console.log('Server started on port ', PORT)
        })
    } catch (e) {
        console.log(e)
    }
}

start()