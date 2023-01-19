const mongoose=require("mongoose");
const Product = require("./product.model");

const orderSchema=mongoose.Schema({
    id:String,
    product:[{type:mongoose.Schema.Types.ObjectId,ref:Product}],
})

const Order=mongoose.model("orders",orderSchema)

module.exports=Order;