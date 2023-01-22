const express=require("express")
const app=express.Router()
const authentication = require("../middleware/authentication");
const Order = require("../Models/order.model");

app.use(authentication)

app.get("/",async(req,res)=>
{
    try
    {
        const getData=await Order.find({id:req.body.id}).populate("products.product","id")
        res.send(getData)
    }
    catch(e)
    {
        res.send("error")
    }
   
})


app.post("/done",async(req,res)=>
{
    const {id,product}=req.body

    try
    {
        const exist=await Order.findOne({id:id})
        if(exist)
        {
            exist.product=[...exist,...product];
            try
            {
                await Order.findByIdAndUpdate({_id:exist._id},exist)
                res.send({msg:"Order Placed Successfully"});
            }
            catch(e)
            {
                res.send(e)
            }
            
        }
        else
        {
            try
            {
                await Order.create({id,products:[...product]})
                res.send({msg:"Order Placed Successfully"});
            }
            catch(e)
            {
                res.send(e)
            }
            
        }
    }
    catch(e)
    {
        res.send(e)
    }
    
   
})

module.exports=app