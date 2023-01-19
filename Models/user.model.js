const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    email:{type:String,required:true},
    mobile:{type:Number,required:true},
    name:{type:String,required:true},
    dob:{type:String,required:true},
    password:{type:String,required:true},
    isAdmin:Boolean
})

const User=mongoose.model("users",userSchema)

module.exports=User;