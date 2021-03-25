import dotenv from 'dotenv'
dotenv.config()

import express from 'express'


const app: express.Application = express()


const start : Function = async () => {



    const PORT = process.env.PORT || 5000
    app.listen(PORT, () => console.log(`Server has been started on port: ${PORT}`))
}

start()





