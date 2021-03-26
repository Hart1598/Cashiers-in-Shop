import dotenv from 'dotenv'
dotenv.config()



import express from 'express'
import db from './db'


const app: express.Application = express()


const start : Function = async () => {
    try{
        await db.authenticate()
        await db.sync()

        const PORT = process.env.PORT || 5000
        app.listen(PORT, () => console.log(`Server has been started on port: ${PORT}`))
    }
    catch (e) {
        console.log(e)
    }
}

start()





