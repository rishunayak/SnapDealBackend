const mongoose=require("mongoose");
const Product = require("./product.model");
const User = require("./user.model");

const orderSchema=mongoose.Schema({
    id:{type:mongoose.Schema.Types.ObjectId,ref:User},
    products:[ {product:{type:mongoose.Schema.Types.ObjectId,ref:Product},quntity:Number} ],
})

const Order=mongoose.model("orders",orderSchema)

module.exports=Order;