const pizzasMock = require('../mock/pizzas.json')
const Pizza = require('../models/Pizza')
const chalk = require("chalk");

module.exports = async () => {
  const pizza = await Pizza.find()
    if(pizza.length !== pizzasMock.length) {
       await createInitialEntity(Pizza, pizzasMock)
        console.log(chalk.red('DB updated'))
    }
}

async function createInitialEntity(Model, data){
    await Model.collection.drop()
    return Promise.all(
        data.map( async item => {
            try{
                delete item._id
                const newItem = new Model(item)
                await newItem.save()
                return newItem
            }catch (e) {
                console.log(chalk.red(e))
            }
        })
    )
}
