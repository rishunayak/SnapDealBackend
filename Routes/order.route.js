const express=require("express")
const app=express.Router()
const authentication = require("../middleware/authentication");
const Order = require("../Models/order.model");

app.use(authentication)

app.get("/",async(req,res)=>
{
    try
    {
        const getData=await Order.findOne({id:req.body.id}).populate("products.product").populate("id")
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
        {console.log(exist)
            exist.products=[...exist.products,...product];
            console.log(exist)
            try
            {
                await Order.findOneAndUpdate({_id:exist._id},exist)
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
                await Order.create({id,product:[...product]})
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