const express =require('express')
const router =express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt =require('bcryptjs');
const jwt=require('jsonwebtoken');

const JWT_SECRET="abhedagarwal%male";


//CREATE A USER USING : POST "/API/AUTH" Doesn't require auth

router.post('/createuser',[
    body('name').isLength({min: 3}),
    body('password').isLength({min: 8}),
    body('email').isEmail(),
],async (req,res)=>{
    const errors =validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    } 

    console.log(req.body.email);
    
    try
    {let user =await User.findOne({email: req.body.email});
    if(user){
        return res.status(400).json({errors:"Sorry user exists"});
    }

    const salt=await bcrypt.genSalt(10);
    const secpass=await bcrypt.hash(req.body.password,salt);
    user =await User.create({
        name:req.body.name,
        password:secpass,
        email:req.body.email
    });
    const data= {
        user:{
            id:user.id
        }
    }
    const authtoken=jwt.sign(data,JWT_SECRET);
    console.log(authtoken);
    
    res.json({authtoken});
}
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})
//CREATE A USER USING : POST "/API/AUTH" Doesn't require auth

router.post('/login',[
    body('password','Enter a password').exists(),
    body('email','Enter a valid email').isEmail(),
],async (req,res)=>{
    const errors =validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    } 

    const {email,password}=req.body;
    try{
        let user=await User.findOne({email});
        if(!user){
            return res.status(400).json({error:"Sorry Enter correct credentials"});
        }
        const passwordcompare=bcrypt.compare(password,user.password);
        if(!passwordcompare){
            return res.status(400).json({error:"Sorry Enter correct credentials"});
        }
        const payload={
            user:{
                id:user.id
            }
        }
        const authtoken=jwt.sign(payload,JWT_SECRET);
        res.json({authtoken});
    }
    catch(e){
        console.error(e.message);
        res.status(500).send("Internal server error");
    }
})
//ROUTE 3: Get logged in details using POST"/api/auth/"
router.post('./getuser',fetchuser,async(req,res)=>{
    try{
        userId="todo";
        const user=await User.findById(userId).select("-password")
    }
    catch(error){
        console.error(e.message);
        res.status(500).send("Internal server error");
    }
})
module.exports = router;