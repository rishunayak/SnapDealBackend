require("dotenv").config()
const express=require("express")
const cors=require("cors")
const connect = require("./Config/config")
const app=express()
const user=require("./Routes/user.route")
const product=require("./Routes/product.route")
const cart=require("./Routes/cart.route")
app.use(express.json())
app.use(cors())
app.use("/products",product);
app.use("/users",user);
app.use("/carts",cart);





app.get("/",(req,res)=>
{
    res.send("Welcome to server")
})

app.listen(process.env.PORT,async()=>
{
    await connect
    console.log("server Started")
})

