const jwt = require('jsonwebtoken');

const authentication=(req,res,next)=>
{
    const token=req.headers.token

    jwt.verify(token,"auth",(err,decorded)=>
    {
        if(err)
        {
            res.send("Login Frist")
        }
        else
        {
            req.body.id=decorded.id  
            next()
       }

    })
}
module.exports=authentication