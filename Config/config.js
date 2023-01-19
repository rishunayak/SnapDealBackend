const mongoose=require("mongoose")

const connect=mongoose.connect(process.env.mongoDB)

module.exports=connect