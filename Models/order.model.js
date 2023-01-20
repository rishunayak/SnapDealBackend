const mongoose=require("mongoose");
const Product = require("./product.model");

const orderSchema=mongoose.Schema({
    id:String,
    products:[ {product:{type:mongoose.Schema.Types.ObjectId,ref:Product},quntity:Number} ],
})

const Order=mongoose.model("orders",orderSchema)

module.exports=Order;