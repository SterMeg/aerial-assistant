const jwt = require('jsonwebtoken')
const { SECRET } = require('../utils/constants')
const tokenService = require('../utils/tokenservice')

const issueToken = async (req, res, next) => {
    const { password } = req.body
    const { user } = req
    const match = user.comparePassword(password)

    if (match) {
        req.token = tokenService.create(user)
        next()
    } else {
        next(new Error('unauthorized'))
    }
}

const verifyToken = async (req, res, next) => {
    const authHeader = req.get('authorization')
    if (!authHeader) {
        next(new Error('unauthorized'))
    }

    const token = authHeader.split(' ')[1]
    console.log(token)
    try {
        const decoded = await jwt.verify(token, SECRET)
        if (decoded) {
            req.token = decoded
        }
        next()
    } catch (e) {
        next(new Error('unauthorized'))
    }
}

module.exports = {
    issueToken,
    verifyToken
}