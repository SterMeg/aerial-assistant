const express = require('express')
const router = express.Router();
const Move = require('../models/move');

router.get('/', (req, res) => {
    const category = req.query.category;

    Move.find({ category })
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

router.post('/', (req, res) => {
    const { name, category, notes, entranceIds } = req.body;
    const move = new Move({ name, category, notes, entranceIds })
    move
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