const express = require('express')
const router = express.Router({mergeParams: true})

router.use('/auth', require('./auth.routes'))
router.use('/pizza', require('./pizza.routes'))

module.exports = router
