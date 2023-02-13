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
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use('/api', routes)
const PORT = config.get('port') ?? 8080
// if (process.env.NODE_ENV === "production") {
//     app.use("/", express.static(path.join(__dirname, "client")));
//
//     const indexPath = path.join(__dirname, "client", "index.html");
//
//     app.get("*", (req, res) => {
//         res.sendFile(indexPath);
//     });
// }
async function start(){
    try{
        mongoose.connection.once('open', () => {
            initDatabase();
        })
            await mongoose.connect(config.get('mongoUri'))
            console.log(chalk.green(`MongoDB is connected on ${PORT}`))
           await app.listen(process.env.PORT || 8080, () =>
            console.log(chalk.green(`Server has been started on port ${PORT}`))
        )
    } catch (e) {
        console.log(chalk.red(e.message))
        process.exit(1)
    }
}

start()
