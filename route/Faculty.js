const express = require('express')
const router = express.Router()
const Faculty = require('../model/facultySchema')
const mongoose = require('mongoose')

router.get('/',async (req,res,next)=>{
    Faculty.find()
    .then(result=>{
        res.status(200).json({
            facultyData:result
        })
    }).catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
})

router.get('/:id',async (req,res,next)=>{
    Faculty.findById(req.params.id)
    .then(result=>{
        res.status(200).json({
            Faculty: result
        })
    }).catch(err=>{
        res.status(500).json({
            error:err
        })
    })
})

router.post('/',async (req,res,next)=>{
    console.log(req.body)
    const faculty = new Faculty({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        subject: req.body.subject
    })
    faculty.save()
    .then(result=>{
        console.log(result);
        res.status(200).json({
            newfaculty: result
        })
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
})


module.exports = router;