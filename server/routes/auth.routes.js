const express = require('express')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const {check, validationResult } = require('express-validator')
const tokenService = require('../services/token.service')
const router = express.Router({mergeParams: true})

router.post('/signUp', [
    check('email', 'Некорректный email').isEmail(),
    check('password', 'минимальная длина пароля 8 символов').isLength({min: 8}),
    async (req, res) =>{
try{
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        return res.status(400).json({
            error: {
                message: 'INVALID_DATA',
                code: 400,
                errors: errors.array()
            }
        })
    }

    const {email, password} = req.body
    const existingUser = await User.findOne({email})
    if(existingUser){
        return res.status(400).json({
            error: {
                message: 'EMAIL_EXISTS',
                code: 400
            }
        })
    }
    const hashedPassword = await bcrypt.hash(password, 12)

    const newUser =await User.create({
        ...req.body,
        password: hashedPassword
    })

    const tokens = tokenService.generate({_id: newUser._id})
    await tokenService.save(newUser._id, tokens.refreshToken)
    res.status(201).send({...tokens, userId: newUser._id})

}catch (e) {
    res.status(500).json({
        message: 'На сервере произошла ошибка. Попробуйте позже'
    })
}
}])

router.post('/sighInWithPassword', async (req, res) =>{




})

router.post('/token', async (req, res) =>{

})
module.exports = router
