`use strict`
const Order = require('../models/order')

class orderController{
    
    static create(req, res, next) {
        let { name, price } = req.body
        Order.
            create({
                name,
                price,                
            })                   
            .then( order => {
                res.status(201).json({
                    order : order,
                    message : 'order succesfully added'
                })
            })
            .catch(next)
    }    

    static findAll(req, res, next) {     
        console.log('masuk findall', req.user.id)   
        Order.
            find({
                user : req.user.id
            })
            .then(orders => {  
                res.json(orders)                
            })
            .catch(next)
    }

    static findOne(req, res, next) {
        console.log('masuk find one')
        Order.
            findById(req.params.id)
            .then(order => {      
                if (order) {
                    res.json(order)
                } else {
                    next({
                        status : 404,
                        message : 'order not found'
                    })
                }          
            })
            .catch(next)
    }

    static destroy(req, res, next) {
        Order.
            findByIdAndDelete(req.params.id)
            .then( order => {
                if (order) {
                    res.json({
                        order : order,
                        message : "order succesfully deleted"
                    })
                } else {
                    next({
                        status : 404,
                        message : 'order not found'
                    })
                }
                
            })
            .catch(next)

    }   

    static update(req, res, next) {
        let { name, price } = req.body
        Order.findOneAndUpdate({ _id : req.params.id}, {name, price}, {new : true, runValidators: true})
        .then(order => {
            if (order) {
                res.json({
                    order : order,
                    message : 'order succesfully updated'
                })
            } else {
                next({
                    status : 404,
                    message : 'order not found'
                })
            }
        })
        .catch(next)
    }   
}

module.exports = orderController