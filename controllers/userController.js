const User = require('../models/user')
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const feelingApi = require('../api/feeling')
const qs = require('querystring')
const getQuote = require('../api/getQuote')

class userController {    

    
    static getQuote(req, res, next) {
        let myEmotion
        let { text } = req.body
        //if (text != undefined) textEmotion = text
        let reqData = {
            text,
            api_key : process.env.PARALLELDOTS_KEY
        }
        let objData = {}
        feelingApi({
            method: 'POST',
            url: '/v5/emotion',
            data: qs.stringify(reqData)
        })
        //.then(({ data }) => {
        //     let emotion
        //     let dominant = 0
        //     for(let key in data.emotion){
        //         if(data.emotion[key]>dominant){
        //             dominant = data.emotion[key]
        //             emotion = key
        //         }
        //     }
        //     objData['emotion'] = emotion
        // let emotObj = {
        //     happy: [ 36, 28, 99, 10752, 14, 27, 878, 53, 10751],
        //     sad: [ 35, 10751, 14, 10402],
        //     angry:  [ 35, 10749, 14, 10402],
        //     excited: [ 36, 28, 12, 18, 10749, 14, 27, 9648, 878, 53, 10752],
        //     fear : [ 35, 14, 10402],
        //     indifferent : [ 36, 28, 12, 35, 80, 99, 18, 10751, 10749, 14, 27, 10402, 9648, 878, 10770, 53, 10752, 37]
        // }
        // let movieCode
        // for (let key in emotObj) {
        //     if (emotion == key) {
        //         let randNum = Math.floor(Math.random()*emotObj[key].length)
        //         movieCode = emotObj[key][randNum]
        //     }
        // }
        // return TmdbAPI({
        //     method: 'get',
        //     url: `/discover/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&with_genres=${movieCode}&page=${page}`
        // })
        .then ( ({data}) => {
            //objData['list'] = data
            //let emotion = data.emotion
            let emotion
            let dominant = 0
            for(let key in data.emotion){
                if(data.emotion[key]>dominant){
                    dominant = data.emotion[key]
                    emotion = key
                }
            }
            //objData['emotion'] = emotion
            //console.log(emotion)
            myEmotion = emotion
            //res.status(200).json(emotion)
            return getQuote({
                    method: 'GET',
                //url: '/v5/emotion',
                //data: qs.stringify(reqData)
                })
            
         })
        // })
        .then(({data}) => {
            console.log(data.results[0])
            let quotes = data.results.filter(quote => {
                return quote.quoteText.includes(myEmotion)
            })
            res.status(200).json({quotes, myEmotion})
        })
        .catch(next)
    }
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