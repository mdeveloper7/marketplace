const mongoose = require('mongoose')
const { REGEX } = require('../utils/globals')
const Schema = mongoose.Schema

const CategorySchema = new Schema({
    name: {
        required: true,
        type: String,
        maxlength: 50
    },
    description: String,
    active: {
        type: Boolean,
        default: true
    }
}, { collection: 'categories' })