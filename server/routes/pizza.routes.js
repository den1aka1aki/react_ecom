const express = require('express')
const Pizza = require('../models/Pizza')
const router = express.Router({mergeParams: true})

router.get('/', async (req, res)=>{
    try{
        const list = await Pizza.find()
        res.status(200).send(list)
    }catch (e) {
        res.status(500).json({
            message: 'На сервере произошла ошибка. Попробуйте позже'
        })
    }
})

router.patch('/:pizzaId', async (req, res) => {
    try {
        const { pizzaId } = req.params

        if (pizzaId === req.pizza._id) {
            const updatedPizza = await Pizza.findByIdAndUpdate(pizzaId, req.body, {new: true})
            res.send(updatedPizza)
        } else {
            res.status(401).json({message: 'Unauthorized'})
        }
    } catch (e) {
        res.status(500).json({
            message: 'На сервере произошла ошибка. Попробуйте позже'
        })
    }
})

module.exports = router
