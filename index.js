require("dotenv").config()
const express=require("express")
const cors=require("cors")
const connect = require("./Config/config")
const app=express()
const user=require("./Routes/user.route")
const product=require("./Routes/product.route")
const cart=require("./Routes/cart.route")
const order=require("./Routes/order.route")
app.use(express.json())
app.use(cors({origin:"*"}))
app.use("/products",product);
app.use("/users",user);
app.use("/carts",cart);
app.use("/orders",order);





app.get("/",(req,res)=>
{
    res.send("Welcome to server")
})

app.listen(process.env.PORT,async()=>
{
    await connect
    console.log("server Started")
})

