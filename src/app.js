const express = require('express');
const connectDB=require("./config/database")
const app = express();
const User=require("./models/user")

app.use(express.json());

app.post("/signup",async (req,res)=>{
    // console.log(req.body)
    //Creating the new instance of the user model
    const user=new User(req.body);
    try{
         await user.save();
         res.send("User Added Succesfully")
    }catch(err){
        res.status(400).send("Error saving the user"+err.message);
    }
   
 });



connectDB()
  .then(()=>{
   console.log("database connection established")
 }).catch((err)=>{
    console.error("database cannot be connected!!");
 })

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
});