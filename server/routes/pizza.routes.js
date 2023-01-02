const express = require('express')
const Pizza = require('../models/Pizza')
const router = express.Router({mergeParams: true})

router.get('/', async (req, res)=>{
    try{
        const list = await Pizza.find()
        res.status(200).send(list)
        console.log(list)
    }catch (e) {
        res.status(500).json({
            message: 'На сервере произошла ошибка. Попробуйте позже'
        })
    }
})

module.exports = router
