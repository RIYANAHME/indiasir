const express = require('express');
const router = express.Router();
const User = require('../model/user');
// const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


// signUp

router.post('/signup',(req,res,next)=>{
    console.log("hello")
    bcrypt.hash(req.body.password,10,(err,hash)=>{
        if(err)
        {
            return res.status(500).json({
                error:err
            })
        }
        else
        {
            const user = new User({
                _id:new mongoose.Types.ObjectId,
                userName:req.body.userName,
                firstName:req.body.firstName,
                lastName:req.body.lastName,
                password:hash,
                userType:req.body.userType,
                email:req.body.email,
                phone:req.body.phone
            })
            user.save()
            .then(result=>{
                res.status(200).json({
                    newUser:result
                })
            })
            .catch(err=>{
                console.log(err);
                res.status(500).json({
                    error:err
                })
            })

        }
    })
})

//without bcrypt that mean direct password

// router.post('/signup',(req,res,next)=>{
//     const user = new User({
//                _id:new mongoose.Types.ObjectId,
//                userName:req.body.userName,
//                firstName:req.body.firstName,
//                lastName:req.body.lastName,
//                password:req.body.password,
//                userType:req.body.userType,
//                email:req.body.email,
//                phone:req.body.phone
//            })
//            user.save()
//            .then(result=>{
//                res.status(200).json({
//                    newUser:result
//                })
//            })
//            .catch(err=>{
//                console.log(err);
//                res.status(500).json({
//                    error:err
//                })
//            })
// })

// router.post('/login',(req,res,next)=>{
//     User.find({userName:req.body.userName,password:req.body.password})
//     .exec()
//     .then(user=>{
//         const token = jwt.sign({
//             userName:user[0].userName,
//             firstName:user[0].firstName,
//             lastName:user[0].lastName,
//             userType:user[0].userType
//         },
//         'this is also password',
//         {
//             expiresIn:"10h"
//         }
//         );
//         // console.log(token);
//         res.status(200).json({
//             userName:user[0].userName,
//             firstName:user[0].firstName,
//             lastName:user[0].lastName,
//             userType:user[0].userTyper,
//             email:user[0].email,
//             phone:user[0].phone,
//             token:token
//         })
//     })
// })

//without bcrypt that mean direct password


//login
router.post('/login',(req,res,next)=>{
    User.find({userName:req.body.userName})
    .exec()
    .then(user=>{
        if(user.length<1)
        {
            return res.status(401).json({
                msg:'user not exist'
            })
        }
        bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
            if(!result)
            {
                return res.status(401).json({
                    msg:'password matching fail'
                });
            }

            if(result)
            {
                const token = jwt.sign({
                    userName:user[0].userName,
                    firstName:user[0].firstName,
                    lastName:user[0].lastName,
                    userType:user[0].userType
                },
                'this is also password',
                {
                    expiresIn:"10h"
                }
                );
                // console.log(token);
                res.status(200).json({
                    userName:user[0].userName,
                    firstName:user[0].firstName,
                    lastName:user[0].lastName,
                    userType:user[0].userTyper,
                    email:user[0].email,
                    phone:user[0].phone,
                    token:token
                })
                
            }
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
})

module.exports = router;