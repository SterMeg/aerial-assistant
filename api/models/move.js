const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const moveSchema = new Schema({
    name: { 
        type: String,
        required: true 
    },
    category: {type: Schema.Types.ObjectId, ref: 'categories'},
    date: {
        type: Date,
        default: new Date()
    },
    entranceIds: {
        type: Array
    },
    notes: {
        type: String
    }
})

module.exports = mongoose.model('move', moveSchema);