const mongoose=require("mongoose")

const productSchema=mongoose.Schema({
    name:String,
    price:Number,
    offPrice:Number,
    image:String,
    rating:Number,
    size:Array,
    category:String,
    subCategory:String
})

const Product=mongoose.model("products",productSchema)

module.exports=Product;