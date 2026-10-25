const express=require("express")
const User=require("../models/user")
const {validateSignUpData}=require("../utils/validator")
const bcrypt = require("bcrypt");
const authRouter=express.Router();

authRouter.post("/signup",async (req,res)=>{
  try{
    // Validation of data
    validateSignUpData(req);
    //Encrypt the Password
    const {firstName,lastName,emailId,password}=req.body
    const passwordHash=await bcrypt.hash(password,5)
    console.log(passwordHash)
    //Creating the new instance of the user model
      const user=new User({
        firstName,
        lastName,
        emailId,
        password:passwordHash
      });
    
         await user.save();
         res.send("User Added Succesfully")
  }catch(err){
        res.status(400).send("ERROR: " + err.message);
    }
   
});


authRouter.post("/login",async (req,res)=>{
   try{
     const {emailId,password} = req.body;
     const user=await User.findOne({emailId:emailId})
     if(!user){
      throw new Error("Invalid credentials");
     }
     const isPasswordValid=await user.validatePassword(password)
     if(isPasswordValid){
      const token=await user.getJWT();

      res.cookie("token",token);
      res.send("Login Successful");
     }else{
      throw new Error("Invalid credential ")
     }

   }catch(err){
      res.status(400).send("ERROR: " + err.message);
   }
})

module.exports=authRouter