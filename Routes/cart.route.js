const express=require("express")
const bcrypt = require('bcrypt');
const app=express.Router()
const jwt = require('jsonwebtoken');
const authentication = require("../middleware/authentication");
const Cart = require("../Models/cart.model");
const User = require("../Models/user.model");

app.use(authentication)

app.get("/",async(req,res)=>
{
    try
    {
        const getData=await Cart.findOne({id:req.body.id}).populate("products.product")
        res.send(getData)
    }
    catch(e)
    {
        res.send(e)
    }
   
})

app.post("/addToCart",async(req,res)=>
{
    const {id,product}=req.body

    try
    {
        const exist=await Cart.findOne({id:id})
        if(exist)
        {

            const check=exist.products.find((ele)=>
            {
                if(ele.product==product.product)
                {
                    ele.quntity=ele.quntity+1;
                    return true
                }
            })
          
            if(check!=undefined)
            {
                try
                {
                    await Cart.findOneAndUpdate({_id:exist._id},exist)
                    res.send({msg:"Updated"})
                }
                catch(e)
                {
                    res.send(e)
                }
                
            }
            else
            {
                exist.products=[...exist.products,product];
                try
                {
                   await Cart.findByIdAndUpdate({_id:exist._id},exist)
                   res.send({msg:"Add To Cart"});
                }
                catch(e)
                {
                    res.send(e)
                }

            }
            
          
            
        }
        else
        {
            try
            {
                await Cart.create({id,products:[product]})
                res.send({msg:"Add To Cart"});
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