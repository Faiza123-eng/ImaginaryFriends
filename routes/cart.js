const router = require("express").Router();
const mongoose = require("mongoose");
const User = require("../models/user");
const { authenticateToken } = require("./userAuth");
const express = require("express");
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Add book to cart
router.put("/add-to-cart", authenticateToken, async (req, res) => {
  try {
    const { bookid, id } = req.headers;

    // Find the user by ID
    const userData = await User.findById(id);

    // Ensure that the cart field exists and is an array
    if (!userData.cart || !Array.isArray(userData.cart)) {
      userData.cart = []; // Initialize cart if undefined or not an array
    }

    // Check if the book is already in the cart
    const isBookInCart = userData.cart.includes(bookid);
    if (isBookInCart) {
      return res.json({
        status: "Success",
        message: "Book is already in cart",
      });
    }

    // Add the book to the user's cart
    await User.findByIdAndUpdate(id, {
      $push: { cart: bookid },
    });

    return res.json({
      status: "Success",
      message: "Book added to cart",
    });
  } catch (error) {
    console.error("Error adding to cart:", error);
    return res.status(500).json({ message: "An error occurred", error: error.message });
  }
});
//remove from cart
router.put("/remove-from-cart/:bookid", authenticateToken, async (req, res) => {
    try {
      const { bookid } = req.params;
      const {id} =req.headers;
      await User.findByIdAndUpdate(id,{
        $pull: {cart:bookid},
      });
      return res.json({
        status:"Succes",
        message:"Book removed from cart",
       });
    }catch(error){
        return res.status(500).json({message:"Internal Server error"});
    }
});
//get a cart for particular user
router.get("/get-user-cart", authenticateToken, async (req, res) => {
    try {
      const { id } = req.headers;
      
      // Fetch user and populate the cart (which references Book)
      const userData = await User.findById(id).populate("cart");
  
      if (!userData) {
        return res.status(404).json({ message: "User not found" });
      }
  
      if (!userData.cart || userData.cart.length === 0) {
        return res.json({ status: "Success", data: [] });
      }
  
      // Reverse the cart and return it
      const cart = userData.cart.reverse();
      return res.json({
        status: "Success",
        data: cart,
      });
    } catch (error) {
      return res.status(500).json({ message: "An error occurred", error: error.message });
    }
  });
  //Payment Gateway  ;removed this thing coz we don't need any extra app for this
// const app = express();
// app.use(express.json());

router.post("/create-payment-intent", async (req, res) => {  {/*require in same router */}
  console.log("Received request for payment intent");
  const { amount } = req.body;

  try {
      const paymentIntent = await stripe.paymentIntents.create({
          amount,
          currency: "usd",
      });

      res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
      console.error("Error creating payment intent:", error);
      res.status(500).json({ error: "Payment failed" });
  }
});

module.exports = router;
