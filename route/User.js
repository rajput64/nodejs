const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../model/userSchema')

router.post('/signup',(req,res,next)=>{
    bcrypt.hash(req.body.password,10,(err,hash)=>{
        if(err){
            return res.status(500).json({error : err})
        }else{
            const user = new User({
                _id: new mongoose.Types.ObjectId,
                name: req.body.name,
                email:req.body.email,
                password:hash
            })
            user.save()
            .then(result=>{
                //console.log(result)
                res.status(200).json({
                    new_user: result
                })
            }).catch(err=>{
                res.status(500).json({
                    error:err
                })
            })
        }
    })
})

router.post('/login',(req,res,next)=>{
    User.find({email:req.body.email})
    .exec()
    .then(user=>{//user get in array
        if(user.length<1){
            return res.status(401).json({
                msg:' user not exist'
            })
        }else{
        bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
            if(!result){
                return res.status(401).json({
                    msg: "password not match"
                })
            }
            if(result){
                const token = jwt.sign({
                    username: user[0].username,
                    email:user[0].email,
                    userType:user[0].usertype
                },'secretkey-jsonwebtoken',{expiresIn:"24h"});
                res.status(200).json({
                    username:user[0].username,
                    email:user[0].email,
                    userType: user[0].usertype,
                    token:token
                })
            }
        })
        }
    }).catch(err=>{
        res.status(401).json({
            error: "something went wrong"
        })
    })
})


module.exports = router;