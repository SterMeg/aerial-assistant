'use strict';

const server = require('./api/server');
const { PORT, DB_URI } = require('./api/utils/constants');
const mongoose = require('mongoose')

server.listen(PORT, async () => {
    await mongoose.connect(DB_URI)
    console.log(`App listening on port ${PORT}`)
});
