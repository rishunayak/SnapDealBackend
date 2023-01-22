const jwt = require('jsonwebtoken');
const User = require('../Models/user.model');

const admin=(req,res,next)=>
{
    const token=req.headers.token

    jwt.verify(token,"auth",async(err,decorded)=>
    {
        if(err)
        {
            res.send(`Login Frist ${err}`)
        }
        else
        {
            req.body.id=decorded.id  
            const {isAdmin}=await User.findOne({_id:decorded.id})
            if(isAdmin)
            {
              next()
            }
            else
            {
                res.send("You are Not Authorized")
            } 
           
       }

    })
}
module.exports=admin