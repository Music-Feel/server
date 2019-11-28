const User = require('../models/user')
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class userController {    
    
    static register(req, res, next) {
        const {email, password} = req.body
        User.
            create({
                email,
                password,
            })
            .then(user => {
                res.status(201).json({
                    message : `user succesfully created`,
                    user,
                })
            })
            .catch(next)
    }
    
    static login(req, res, next) {
        User.findOne({ 
            email : req.body.email
        })
        .then(user => {            
            if (user) { 
                let valid = comparePassword(req.body.password, user.password) 
                if ( valid ) {               
                    let token = generateToken(user)  
                    let {email,_id} = user
                    res.json({
                        message : 'login succes',
                        token : token,
                        user : {
                            email,
                            _id
                        }                        
                    })
                } else {                    
                    next({
                        status: 403,
                        message: 'Wrong Password'
                    })
                }
            } else {
                next({
                    status : 404,
                    message : 'user not found'
                })
            } 
        })
        .catch(next)
    }

    static loginGoogle(req, res, next) { 
        let { email} = req.decoded
        User.findOne({
            email : email
        })
        .then( user => {
            let password = email+'tes'
            if (!user) {
                return User.create({
                    email, 
                    password})
            } else {
                return user
            }
        })
        .then(user => {      
            let {email,_id} = user      
            let token = generateToken(user)  
            res.json({
                status : 200,
                message : 'login success',
                token : token,
                user : {
                    email,
                    _id
                }  
            })                     
        })
        .catch(next)                    
    }    
}

module.exports = userController