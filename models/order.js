`use strict`
const { Schema, model } = require('mongoose')

const orderSchema = new Schema({
    name : {
        type: String,
        required: [true, 'you must fill the product name'],
    },    
    price : {
        type : Number,
        required : [true, 'you must fill the price'],
    },    
    user : {type : Schema.Types.ObjectId, ref: 'User' },
})

const Order = model('Order', orderSchema)
module.exports = Order