const express = require('express');
const router = express.Router();
const Student = require('../model/studentSchema')
const mongoose = require('mongoose')
const checkAuth = require('../middleware/check-auth')

//get
router.get('/',checkAuth, (req,res,next)=>{
   Student.find()
   .then(result=>{
    res.status(200).json({
        studentData:result
    });
   }).catch(err=>{
    console.log(err)
    res.status(500).json({
        error:err
    })
   })
})



//post
router.post('/',async(req,res,next)=>{
    console.log(req.body)
    const student = new Student({
        _id: new mongoose.Types.ObjectId,
        name:req.body.name,
        email: req.body.email,
        gender: req.body.gender
    })
    student.save()
    .then(result=>{
        console.log(result);
        res.status(200).json({
            newStudent: result
        })
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
})


router.get('/:id',(req,res,next)=>{
    //console.log(req.params.id)
    Student.findById(req.params.id)
    .then(result=>{
        res.status(200).json({
            student: result
        })
    }).catch(err=>{
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
})


//delete
router.delete('/:id',(req,res,next)=>{
    Student.remove({_id:req.params.id})
    .then(result=>{
        res.status(200).json({
            msg: "remove success"
        })
    }).catch(err=>{
        res.status(500).json({
            error: err
        })
    })
})

//update name
router.put("/:id",(req,res,next)=>{
    Student.findOneAndUpdate({_id:req.params.id},{
        $set:{
            name:req.body.name,
            email: req.body.email,
            gender: req.body.gender
        }
    })
    .then(result=>{
        res.status(200).json({
            update: result
        })
    }).catch(err=>{
        res.status(500).json({
            error: err
        })
    })
})

module.exports = router;