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

//get User By emailId
app.get("/user", async (req,res)=>{
  const userEmail=req.body.emailId;
  try{
    const users=await User.find({emailId:userEmail})
    if(users.length ===  0){
        res.status(404).send("User not found")
    }else{
        res.send(users);
    }
    
  }catch(err){
    res.status(400).send("Something went wrong" + err.message);
  }
}) 

//Get all the users from the dB
app.get("/feed",async (req,res)=>{
    try{
       const users=await User.find({})
      if(users.length ===  0){
        res.status(404).send("User not found")
      }else{
        res.send(users);
      }
    }catch(err){
      res.status(400).send("Something went wrong" + err.message);
    }
})

//Update the data of the user
app.patch("/user/:userId", async (req,res)=>{ 
    const userId=req.params?.userId;
    const data=req.body;
    try{

      const ALLOWED_UPDATES=[
        "photoUrl","about","gender","age","skills"
      ]
      const isUpdateAllowed=Object.keys(data).every((k)=>
       ALLOWED_UPDATES.includes(k)
      );
      if(!isUpdateAllowed){
       throw new Error("Update Not Allowed")
      }
      if(data?.skills.length>10){
        throw new Error("Skills cannot be more than 10")
      };

      await User.findByIdAndUpdate({_id:userId},data,{returnDocument:"after",runValidators:true});      
      res.send("User Updated Successfully")
    }catch(err){
       res.status(400).send("Something went wrong" + err.message);
    }
})

//Delete By Id
app.delete("/user",async (req,res)=>{
    const userId=req.body.userId;
    try{
       const user=await User.findByIdAndDelete(userId);
       res.send("User Deleted Successfully");
    }catch(err){
      res.status(400).send("Something went wrong" + err.message);
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