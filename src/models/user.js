const mongoose=require("mongoose");
const validator=require("validator")

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
})
module.exports=mongoose.model("User",userSchema);