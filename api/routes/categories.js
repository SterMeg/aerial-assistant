const express = require('express')
const router = express.Router();
const Categories = require("../models/categories")
const { verifyToken } = require('../middleware/auth');

router.get("/", verifyToken, (req, res) => {
    const { user } = req.token;
    console.log(user);
    Categories.find({ user: user.id })
        .then(docs => {
            res.status(200).send({
                message: "success", 
                payload: docs
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message })
        });
})

router.post('/', verifyToken, (req, res) => {
    const { name } = req.body
    const { user } = req.token
    const categories = new Categories({
        name,
        user: user.id
    });
    categories
        .save()
        .then(doc => {
            res.status(200).send({ message: "success", payload: doc })
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        })
})

router.delete('/:id', async(req, res, next) => {
    const { id } = req.params

    try {
        const doc = await Categories.findByIdAndRemove({ _id: id })
        res.status(202).send({ data: [doc]})
    } catch(e) {
        next(e)
    }
})

module.exports = router;