const express =require('express')
const router =express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

//CREATE A USER USING : POST "/API/AUTH" Doesn't require auth


router.post('/',[
    body('name').isLength({min: 3}),
    body('password').isLength({min: 8}),
    body('email').isEmail(),
],(req,res)=>{
    const errors =validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    } 
    User.create({
        name:req.body.name,
        password:req.body.password,
        email:req.body.email
    }).then(user=>res.json(user))
    .catch(err=>  {console.log(err)
        res.json({error:'Please enter a valid entry'})
    });
    console.log("Successfull Send");
})

module.exports = router;