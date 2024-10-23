
const mongoose=require("mongoose");
const order=new mongoose.Schema(
    {
        user:{
            type:mongoose.Types.ObjectId,
            ref: "user",//to know which user has ordered book
        },
        book:{
            type:mongoose.Types.ObjectId,
            ref: "books",//to know which user has ordered book
        },
        status:{
            type:String,
            ref: "Order Placed",//to know which user has ordered book
            enum:["Order Placed","Out for Delivery","Delivered","Cancelled"],
        },
    
    },
    {timestamps: true});
 module.exports=mongoose.model("order",order);
