const express = require('express');
const connectDB=require("./config/database")
const app = express();
const User=require("./models/user")

app.post("/signup",async (req,res)=>{
    //Creating the new instance of the user model
    const user=new User({
        firstName:"Shivi",
        lastName:"Chauhan",
        emailId:"chauhanshivi887@gmail.com",
        password:"shivi@123",
        age:21
    });
    try{
         await user.save();
       res.send("User Added Succesfully")
    }catch(err){
        res.status(400).send("Error saving the user"+err.message);
    }
   
})



connectDB()
  .then(()=>{
   console.log("database connection established")
 }).catch((err)=>{
    console.error("database cannot be connected!!");
 })

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
});