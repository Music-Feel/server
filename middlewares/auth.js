'use strict'
const { verifyToken } = require('../helpers/jwt')
const User = require('../models/user')
const Order = require('../models/order')

module.exports = {
    authenticate : (req, res, next) => {
        console.log('masuk authenticate')
        console.log(req.body)
        try {    
            const user = verifyToken(req.headers.token)   
            console.log(user.id, 'ini user ====================')         
            User.findById(user.id)
            .then (user => {
                console.log(user, 'hasil search')
                if (user) {
                    console.log(user, 'user founded')
                    req.user = user
                    next()
                } else {
                    next({
                        message : 'user not Found',
                        status : 404
                    })
                }
                
            })     
            
        } catch(err) {  
            next(err)    
        }
    },
    authorize : (req, res, next) => {
        console.log('masuk authorize',req.params.id, req.user.id)
        Order.findById(req.params.id)
            .then(order => {
                console.log(order)
                if (order) {   
                    if (String(order.user) == req.user._id) {
                        next()
                    } else {
                        next({
                            status : 401,
                            message : 'Not Authorized'
                        })
                    }
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