const jwt=require("jsonwebtoken")
const User=require("../models/user")

const userAuth=async (req,res,next)=>{
   console.log(typeof next)
try{ 
 const {token}=req.cookies;
 if(!token){
    throw new Error("Token is not valid")
 }
 const decodedObj=await jwt.verify(token,"Dev@Tinder");

 const {_id}=decodedObj;

 const user=await User.findById(_id);
 if(!user){
    throw new Error("User Not Found");
 }
 req.user=user
 next();
}catch(err){
    console.error(err.stack);
    res.status(404).send("ERROR: " + err.message);
 }

}
module.exports={userAuth};
