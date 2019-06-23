'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const router = require('./routes')
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(router)

module.exports = app;
