const express = require('express');
const router = express.Router();
const User = require('../models/user.js')
const { issueToken } = require('../middleware/auth')
const { findUserByEmail } = require('../middleware/userLookup')

router.post('/login', findUserByEmail, issueToken, async (req, res, next) => {
    const { token } = req
    if (token) {
        res.status(200).json({ token })
    } else {
        next(new Error('internal server error'))
    }
}) 

router.post('/signup', (req, res) => {
    const { email, password } = req.body
    const user = new User({ email, password })
    user
        .save()
        .then(doc => {
            res.status(200).json({
                message: 'success',
                payload: doc
            })
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
})

module.exports = router