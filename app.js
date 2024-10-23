const express = require("express");
const app = express();
const cors=require("cors");
require("dotenv").config();
require("./conn/conn");
const user=require("./routes/user");
const Books=require("./routes/book");
const Favourite = require("./routes/favourite");
const Cart=require("./routes/cart");
const Order=require("./routes/order");

app.use(cors()); //i wrote cors instead of cors() that's why wasn't showing existing books

app.use(express.json()); //to tell the format

const cartRoutes = require('./routes/cart');
app.use('/api/v1', cartRoutes);

//routers
app.use("/api/v1",user);
app.use("/api/v1",Books);//adding route is so imp it causes error
app.use("/api/v1", Favourite); 
app.use("/api/v1",Cart);
app.use("/api/v1",Order);

//to check server
// app.get("/",(req,res)=>{
//     res.send("Hello from Backend side")
// });
//creating port
app.listen(process.env.PORT,()=>{
    console.log(`Server Started ${process.env.PORT}`);
});
