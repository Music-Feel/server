`use strict`
const { Schema, model } = require('mongoose')

const orderSchema = new Schema({
    city : {
        type: String,
        required: [true, 'you must fill the city name'],
    },    
    date : {
        type : Date,
        required : [true, 'you must fill the date'],
    },    
    user : {type : Schema.Types.ObjectId, ref: 'User' },
    sentDate : {
        type : Date,
        required : [true, 'you must fill the date'],
    },
    sentCity : {
        type: String,
        required: [true, 'you must fill the city name'],
    },
})

const Order = model('Order', orderSchema)
module.exports = Order