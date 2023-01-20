const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const chalk = require('chalk')
const cors = require('cors')
const path = require('path')
const initDatabase = require('./startUp/initDatabase')
const routes = require('./routes')

mongoose.set('strictQuery', false);

const app = express();
const PORT = config.get('port') ?? 3000
app.use(express.json())
app.use(express.urlencoded({extended: false}))
// app.use(cors())
app.use('/api', routes)
if (process.env.NODE_ENV === 'production'){
    app.use('/', express.static(path.join(__dirname, 'client')))
    const indexPath = path.join(__dirname, 'client', 'index.html')
    app.get('*', (req, res) => {
        res.sendFile(indexPath)
    })
}
async function start(){
    try{
        mongoose.connection.once('open', () => {
            initDatabase();
        })
            await mongoose.connect(config.get('mongoUri'))
            console.log(chalk.green(`MongoDB is connected on ${PORT}`))
           await app.listen(PORT, () =>
            console.log(chalk.green(`Server has been started on port ${PORT}`))
        )
    } catch (e) {
        console.log(chalk.red(e.message))
        process.exit(1)
    }
}

start()
