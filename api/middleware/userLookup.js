const User = require('../models/user.js');

const findUserById = async (req, res, next) => {
    const { id } = req.token.user
    try {
        const doc = await User.findById(id)
        if (!doc) next(new Error('not found'))
        req.user = doc
        next()
    } catch (e) {
        next(new Error(e))
    }
}

const findUserByEmail = async (req, res, next) => {
    const { email } = req.body

    if (!email) {
        next(new Error('unauthorized'))
    }

    try {
        const doc = await User.findOne({ email })
        if (!doc) {
            next(new Error('not found'))
        }
        req.user = doc
        next()
    } catch (e) {
        next(e)
    }
}

module.exports = {
    findUserById,
    findUserByEmail
}