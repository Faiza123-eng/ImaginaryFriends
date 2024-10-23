const mongoose=require("mongoose");
const conn= async()=>{
    try{
       await mongoose.connect(`${process.env.URI}`);//to connect with database
       console.log("Connected to Database");
    }catch(error){
        console.log(error);//if encountering error
    }

};
conn();