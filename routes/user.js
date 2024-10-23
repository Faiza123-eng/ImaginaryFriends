const router = require("express").Router();
const User = require("../models/user");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const {authenticateToken}=require("./userAuth");

// Sign Up
router.post("/sign-up", async (req, res) => {
    try {
        const { username, email, password, address } = req.body;

        // Username length check
        if (username.length < 4) {
            return res.status(400).json({ message: "Username length should be greater than 3" });
        }

        // Check if username already exists
        const existingUsername = await User.findOne({ username: username });
        if (existingUsername) {
            return res.status(400).json({ message: "Username already exists" });
        }

        // Check if email already exists
        const existingEmail = await User.findOne({ email: email });
        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Password length check
        if (password.length <= 5) {
            return res.status(400).json({ message: "Password length should be greater than 5" });
        }
        const hashpass=await bcrypt.hash(password,10);//till 10 digit convert into #

        const newUser = new User({
            username,
            email,
            password:hashpass,
            address,
        });
        await newUser.save(); // Save new user

        return res.status(201).json({ message: "Signup successful" }); // 201 for success
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});
//log in or sign in functionality
router.post("/sign-in", async (req, res) => {
    try{
        const{username,password}=req.body;
        const existingUser= await User.findOne({username});
        if(!existingUser){
            res.status(400).json({message:"Invalid Crediential"});
        }
        await bcrypt.compare(password,existingUser.password,(err,data)=>{
            if(data){
                const authClaims=[{name:existingUser.username},
                {role:existingUser.role},
              ];
                const token=jwt.sign({authClaims},"bookstore123",{expiresIn:"30d",})//secret key
                return res.status(200).json({ id:existingUser.id,role:existingUser.role,token:token});
            }
            else{
                return res.status(400).json({ message: "Invalid credential"});
            }
        });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});
//To get user information
router.get("/get-user-information", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        
        // Check if ID is provided in the headers
        if (!id) {
            return res.status(400).json({ message: "User ID is required in headers" });
        }

        // Find the user by ID and exclude the password field
        const data = await User.findById(id).select('-password');

        // Check if the user exists
        if (!data) {
            return res.status(404).json({ message: "User not found" });
        }

        // Return the user data
        return res.status(200).json(data);
    } catch (error) {
        console.error("Error in /get-user-information:", error); // For debugging
        return res.status(500).json({ message: "Internal server error" });
    }
});

//to update address
router.put("/update-address",authenticateToken,async(req,res)=>{
    try{
        const {id}=req.headers;
        const {address}=req.body;
        await User.findByIdAndUpdate(id,{address:address});
        res.status(200).json({message:"Address updated successgfully"}); 
    }
    
    catch(error){
        res.status(500).json({message:"Internal server error"});
    }
})

module.exports = router;
