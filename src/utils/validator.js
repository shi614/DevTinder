const validator=require("validator")

const validateSignUpData=(req)=>{
  const {firstName,lastName,emailId,password}=req.body;
  if(!firstName || !lastName){
    throw new Error("Name is not valid")
  }else if(!validator.isEmail(emailId)){
    throw new Error("Enter a Valid emailId")
  } else if(!validator.isStrongPassword(password)){
    throw new Error("Enter a Strong Password")
  }
};

module.exports={
    validateSignUpData
}