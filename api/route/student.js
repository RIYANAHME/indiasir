const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Student = require('../model/student');
const checkadmin = require('../middleware/admin');

// student get 

router.get('/', (req,res,next)=>{
    Student.find()
    .select('_id studentName fname roll dob')
    .then(result=>{
        res.status(200).json({
            student:result
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
});

// get student by id 
router.get('/:id',(req,res,next)=>{
    const _id = req.params.id;
    Student.find({_id})
    .select('_id studentName fname roll dob')
    .then(result=>{
        res.status(200).json({
            student:result
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
});

// get student by roll  
router.get('/roll/:roll',(req,res,next)=>{
    const studentRoll = req.params.roll;
    Student.find({rollNo:studentRoll})
    .select('_id studentName fname roll dob')
    .then(result=>{
        res.status(200).json({
            student:result
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
});

// post new student
router.post('/',(req,res,next)=>{
    console.log(req.body);
    student = new Student({
        _id:new mongoose.Types.ObjectId,
        studentName: req.body.studentName,
        fname:req.body.fname,
        roll:req.body.roll,
        dob:req.body.dob
    });

    student.save()
    .then(result=>{
        console.log(result);
        res.status(200).json({
            new_Student:result
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    });
});

// update student 
router.put('/:id',(req,res,next)=>{
    console.log(req.params.id);
    Student.findOneAndUpdate({_id:req.params.id},{
        $set:{
            studentName:req.body.studentName,
            fname:req.body.fname,
            rollNo:req.body.rollNo,
            dob:req.body.dob
        }
    })
    .then(result=>{
        res.status(200).json({
            updatedStudent:result
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
})

// student deleted
router.delete('/:id',(req,res,next)=>{
    const studentId = req.params.id;
    Student.remove({_id:studentId})
    .then(result=>{
        res.status(200).json({
            message:result
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
})

module.exports = router;