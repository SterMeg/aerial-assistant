const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const { findUserById } = require('../middleware/userLookup')

router.get('/me', verifyToken, findUserById, (req, res, next) => {
  res.status(200).send({ data: [req.user] })
});

module.exports = router;
