const express = require("express");
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser')

const JWT_SECRET = "Itisasecrettokenbyinotebook";

// ROUTE 1: Create a User using: POST "/api/auth/createuser". No login required
router.post('/createuser',[
    body('name',"Enter a valid name").isLength({min:2}),
    body('email',"Enter a valid email").isEmail(),
    body('password',"Password must be atleast 5 characters").isLength({min:5})
],async (req,res)=>{
    let success = false;
    // If there are errors,return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        success = false
        return res.status(400).json({success,errors: errors.array()});
      }
    try{
        //   Check whether the user with this eamill exists already
    let user = await User.findOne({email: req.body.email});
    if(user){
        success = false;
        return res.status(400).json({success,error : "Sorry a user with this email already exists!!!"})
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password,salt);
    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password:secPass,
    });
    const data = {
        id : user.id
    }
    const authToken = jwt.sign(data,JWT_SECRET);

    // res.json({"Success":"Account created successfully"})
    success = true;
    res.json({success,authToken})
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
    // .then(user=>res.json(user)).catch(err=>res.json({error:"Please enter a unique value for email ",message: err.message})) //used when async and await is not used to resolve promise of create user.
})

// ROUTE 2: Authnenticate a User using: POST "/api/auth/login".No login required
router.post('/login',[
    body('email',"Enter a valid email").isEmail(),
    body('password',"Password cannot be blank").exists(),
],async (req,res)=>{
    // If there are errors,return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
      }
    try{
        const {email,password} = req.body;
        let success = false;
        let user = await User.findOne({email});
        if(!user){
            success = false
            return res.status(400).json({success, error: "Please try to login with correct credentials"});
        }
        const passwordCompare = await bcrypt.compare(password,user.password);
        if(!passwordCompare){
            success = false
            return res.status(400).json({success, error: "Please try to login with correct credentials"});
        }
        const data = {
            id : user.id
        }
        const authToken = jwt.sign(data,JWT_SECRET);
        success = true
        res.json({success,authToken})
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
})

// ROUTE 3: Get loggedin user details using: POST "/api/auth/getuser".Login required
router.post('/getuser', fetchuser ,async (req,res)=>{
try{
    userId = req.user;
    const user = await User.findById(userId).select("-password")
    res.send(user)
}
catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
})
module.exports = router