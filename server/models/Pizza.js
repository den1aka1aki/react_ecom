const {Schema, model} = require('mongoose')

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    ingredients: {
        type: Array,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    vote: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = model('Pizza', schema)
