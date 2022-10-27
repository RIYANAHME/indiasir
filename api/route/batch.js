const express = require('express');
const router = express.Router();

// batch get 

router.get('/', (req,res,next)=>{
    res.status(200).json({
        message:'get all batch'
    })
});

// get batch by id 
router.get('/:id',(req,res,next)=>{
    console.log(req.params.id);
    res.status(200).json({
        message:'get batch by id',
        studentId:req.params.id
    });
});

// get student by phone  
router.get('/phone/:phone',(req,res,next)=>{
    console.log(req.params.phone);
    res.status(200).json({
        message:'get batch by phone',
        studentId:req.params.phone
    });
});

// post new student
router.post('/',(req,res,next)=>{
    console.log(req.body);
    res.status(200).json({
        message:'new batch added'
    })
});

// update student 
router.put('/:id',(req,res,next)=>{
    console.log(req.params.id);
    res.status(200).json({
        message:'batch updated'
    })
})

// student deleted
router.delete('/:id',(req,res,next)=>{
    res.status(200).json({
        message:'batch deleted'
    })
})

module.exports = router;