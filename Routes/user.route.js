const express=require("express")

const bcrypt = require('bcrypt');
const app=express.Router()
const jwt = require('jsonwebtoken');
const User = require("../Models/user.model");
const authentication = require("../middleware/authentication");

app.post("/register",async(req,res)=>
{
    const {email,mobile,name,dob,password}=req.body

    try
    {
        const exist=await User.findOne({email:email})

        if(exist)
        {
            res.send("User Alredy Register")
        }
        else
        {
            bcrypt.hash(password, 5, async(err, hashPassword)=> {
                    
                if(err)
                {
                    res.send(err)
                }
                else
                {
                    try
                    {
                        await User.create({email,mobile,name,dob,password:hashPassword})
                        res.send({msg:"Successfully Registered"})
                    }
                    catch(e)
                    {
                       res.send(e)
                    }
                }
            });

        }
    }
    catch(e)
    {
        res.send(e)
    }

    

})






app.post("/login",async(req,res)=>
{
    const {email,password}=req.body
    
    try
    {
        const exist=await User.findOne({email:email})
        console.log(exist)
        if(exist)
        {
            bcrypt.compare(password,exist.password, function(err, result) {
                if(result)
                {
                    const token=jwt.sign({ id: exist._id }, 'auth');
                    res.send({token:token})
                   
                }
                else{
                    res.send("Wrong Credntials")
                    
                   }
            });
        }
        else
        {
            res.send("Email Doesn't Exist")
        }
    }
    catch(e)
    {
        res.send(e);
    }
})

app.use(authentication)

app.get("/",async(req,res)=>
{
    const id=req.body.id

    try
    {
        const userData=await User.findOne({_id:id})
        res.send(userData)
    }
    catch(e)
    {
        res.send(e)
    }

})







module.exports=app