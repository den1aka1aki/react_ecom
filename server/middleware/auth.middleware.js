const tokenService = require('../services/token.service')
module.exports = (req, res, next) => {
    if (req.method=== 'OPTIONS') {
        return next ()
    }

    try{
        const token = req.headers.authorization.split(' ')[i]
        if (!token){
            return res.status(401).json({
                message: 'Message Unauthorized'
            })
        }
        const data = tokenService.validateAccess(token)
        req.user = data
        next()
    }catch (e) {
        if (!data){
            return res.status(401).json({
                message: 'Message Unauthorized'
            })
        }
    }
}
