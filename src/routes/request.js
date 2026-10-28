const express=require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequestModel = require("../models/connectionRequest");
const User=require("../models/user")

const requestRouter=express.Router();

requestRouter.post("/request/send/:status/:toUserId",userAuth,async(req,res)=>{
    try{
      const fromUserId=req.user._id;
      const toUserId=req.params.toUserId;
      const status=req.params.status;

      const allowedstatus=["ignored","interested"];
      if(!allowedstatus.includes(status)){
        return res.status(400).json({message:"Invalid Status Type " + status})
      }



      const toUser=await User.findById(toUserId);
      if(!toUser){
        return res.status(404).json({message:"User Not Found!!"})
      }
      //If there is an existing connection request
      const existingConnectionRequest=await ConnectionRequestModel.findOne({
        $or: [
            {fromUserId,toUserId},
            {fromUserId:toUserId,toUserId:fromUserId}
        ],
      });
      if(existingConnectionRequest){
        res.status(400).send({message:"Connection Request Already Exist!!"})
      }

      const connectionRequest=new ConnectionRequestModel({
         fromUserId,
         toUserId,
         status
      });
      const data=await connectionRequest.save();
      res.json({
        message:"Connection request sent  successfully",
        data
      })

    }catch(err){
        console.error(err.stack)
        res.status(400).send("ERROR " + err.message);
    }
})

requestRouter.post("/request/review/:status/:requestId",userAuth, async (req,res)=>{
  try{
     const loggedInUser=req.user;
     const{status,requestId}=req.params;
     const allowedStatus=["accepted","rejected"];
     if(!allowedStatus){
      return res.status(400).json({message:"Status not allowed"});
     }

     const connectionRequest= await ConnectionRequestModel.findOne({
      _id:requestId,
      toUserId: loggedInUser,
      status: "interested",
     });
     if(!connectionRequest){
      return res.status(404).json({message:"Connection Request Not Found!"})
     }

     connectionRequest.status=status;
     const data=connectionRequest.save();
     res.json({message:"Connection Request " + status,data})
  }catch(err){
     res.status(400).send("ERROR: " + err.message);
  }
})
module.exports=requestRouter