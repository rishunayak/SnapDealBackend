const express=require("express")

const bcrypt = require('bcrypt');
const app=express.Router()
const jwt = require('jsonwebtoken');
const Product = require("../Models/product.model");
const admin = require("../middleware/admin");





app.get("/shoes",async(req,res)=>
{

    const {subCategory,rating,price}=req.query
    let filter={category:"shoes"}
    
    if(subCategory)
    {
        filter={...filter,subCategory:subCategory}
    }
    if(rating)
    {
        filter={...filter,rating:{$gte:rating}}
    }

    if(price)
    {
        try
        {
           const data=await Product.find(filter).sort(price) 
           res.send(data) 
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
           const data=await Product.find(filter)
           res.send(data)
        }
        catch(e)
        {
            res.send(e)
        }
    }
   
})


app.get("/trending",async(req,res)=>
{


    let filter={category:"trending"}

        try
        {
           const data=await Product.find(filter)
           res.send(data)
        }
        catch(e)
        {
            res.send(e)
        }
    
   
})



app.get("/tshirt",async(req,res)=>
{
    const {subCategory,rating,price}=req.query
    let filter={category:"tShirt"}
    
    if(subCategory)
    {
        filter={...filter,subCategory:subCategory}
    }
    if(rating)
    {
        filter={...filter,rating:{$gte:rating}}
    }

    if(price)
    {
        try
        {
           const data=await Product.find(filter).sort(price) 
           res.send(data) 
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
           const data=await Product.find(filter)
           res.send(data)
        }
        catch(e)
        {
            res.send(e)
        }
    }
   
})


app.get("/skinCare",async(req,res)=>
{
    const {subCategory,rating,price}=req.query
    let filter={category:"Skin Care"}
    
    if(subCategory)
    {
        filter={...filter,subCategory:subCategory}
    }
    if(rating)
    {
        filter={...filter,rating:{$gte:rating}}
    }
    console.log(filter)

    if(price)
    {
        try
        {
           const data=await Product.find(filter).sort(price) 
           res.send(data) 
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
           const data=await Product.find(filter)
           res.send(data)
        }
        catch(e)
        {
            res.send(e)
        }
    }
   
})


app.get("/sarees",async(req,res)=>
{
    const {subCategory,rating,price}=req.query
    let filter={category:"sarees"}

    if(subCategory)
    {
        filter={...filter,subCategory:subCategory}
    }
    if(rating)
    {
        filter={...filter,rating:{$gte:rating}}
    }

    if(price)
    {
        try
        {
           const data=await Product.find(filter).sort(price) 
           res.send(data) 
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
           const data=await Product.find(filter)
           res.send(data)
        }
        catch(e)
        {
            res.send(e)
        }
    }

    
})

app.get("/:id",async(req,res)=>
{
    const id=req.params.id

    try
    {
        const getData=await Product.findOne({_id:id})
        res.send(getData)
    }
    catch(e)
    {
        res.send(e)
    }
})







app.use(admin)



app.post("/addProduct",async(req,res)=>
{
    try
    {
       await Product.create(req.body);
       res.send({msg:"Product Added"})
    }
    catch(e)
    {
        res.send(e)
    }
})

app.get("/edit/:id",async(req,res)=>
{
    const id=req.params.id

    try
    {
        const getData=await Product.findOne({_id:id})
        res.send(getData)
    }
    catch(e)
    {
        res.send(e)
    }
})


app.delete("/deleteProduct/:id",async(req,res)=>
{
    try
    {
       const id=req.params.id
       await Product.findOneAndDelete({_id:id});
       res.send({msg:"Product Deleted Successfully"})
    }
    catch(e)
    {
        res.send(e)
    }
})

app.patch("/edit/:id",async(req,res)=>
{
    try
    {
       const id=req.params.id
       await Product.findOneAndUpdate({_id:id},req.body);
       res.send({msg:"Product Updated Successfully"})
    }
    catch(e)
    {
        res.send(e)
    }
})

app.get("/",async(req,res)=>
{

   const {page=1,search}=req.query
  // console.log(req.query)
   if(search)
   {
    const data=await Product.find({name:{$regex:search}}).limit(10).skip(10*(page-1))
    res.send(data)
   }
   else
   {
    const data=await Product.find().limit(10).skip(10*(page-1)) 
    res.send(data)
   }

   
})


module.exports=app 