const mongoose=require("mongoose");
const validator=require("validator")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

const userSchema=mongoose.Schema({
    firstName:{
        type: String,
        required:true,
        minLength: 4,
        maxLength: 20
    },
    lastName:{
        type: String
    },
    emailId:{
        type: String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        validator(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email Address" + value);
            };
        }
    },
    password:{
        type: String,
        required:true,
        validator(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter Strong Password" + value);
            };
        }
    },
    age:{
        type:Number,
        min: 18
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","other"].includes(value)){
                throw new Error("Gender data is not valid");
            }
        }
    },
    photoUrl:{
        type:String,
        validator(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid Url Address" + value);
            };
        }
    },
    about:{
        type:String,
        default:"This is the default about of the user"
    },
    skills:{
        type:[String]
    }
},{
    timestamps: true
});

userSchema.methods.getJWT=async function(){
    const user=this;
    const token= await jwt.sign({_id:user._id},"Dev@Tinder",{
        expiresIn:"7d"
    });
    return token;
};

userSchema.methods.validatePassword=async function (passwordInputByUser) {
    const user=this;
    const passwordHash=user.password
    const isPasswordValid=await bcrypt.compare(
        passwordInputByUser,passwordHash
    );
    return isPasswordValid;
}
module.exports=mongoose.model("User",userSchema);