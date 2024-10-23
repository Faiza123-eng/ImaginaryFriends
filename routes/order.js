const router = require("express").Router();
const User = require("../models/user");
const {authenticateToken}=require("./userAuth");
const Book=require("../models/book");
const Order=require("../models/order");


router.post("/place-order", authenticateToken, async (req, res) => {
    try {
      const { id } = req.headers; // User ID from headers
      const { order } = req.body; // Order details from request body
  
      // Loop over each book in the order and create an order record
      for (const orderData of order) {
        const newOrder = new Order({ user: id, book: orderData._id });
        const orderDataFromDb = await newOrder.save();
  
        // Add the saved order to the user's orders
        await User.findByIdAndUpdate(id, {
          $push: { orders: orderDataFromDb._id },
        });
  
        // Clear the cart after placing the order
        await User.findByIdAndUpdate(id, {
          $pull: { cart: orderData._id },
        });
      }
  
      return res.json({
        status: "Success",
        data: "Order placed Successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "An error occurred" });
    }
  });
  
//get history of particular user
  // router.get("/get-order-history", authenticateToken, async (req, res) => {
  //   try {
  //     const { id } = req.headers; // User ID from headers
  
  //     // Find the user and populate the "orders" field with book details
  //     const userData = await User.findById(id).populate({
  //       path: "orders",
  //       populate: { path: "book" }, // Populate the "book" field in each order
  //     });
      
  
  //     // Reverse the order history to show most recent orders first
  //     const ordersData = userData.orders.reverse();
  
  //     return res.json({
  //       status: "Success",
  //       data: ordersData,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     return res.status(500).json({ message: "An error occurred" });
  //   }
  // });
  router.get("/get-order-history", authenticateToken, async (req, res) => {
    try {
      const { id } = req.headers; // User ID from headers
  
      // Find the user and populate the "orders" field with book details
      const userData = await User.findById(id).populate({
        path: "orders",
        populate: { path: "book" }, // Populate the "book" field in each order
      });
  
      // Log the fetched data to check if books are populated
      console.log("Order history data:", userData.orders);
  
      // Reverse the order history to show most recent orders first
      const ordersData = userData.orders.reverse();
  
      return res.json({
        status: "Success",
        data: ordersData,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "An error occurred" });
    }
  });
  
  
//get all orders
router.get("/get-all-orders", authenticateToken, async (req, res) => {
    try {
    const userData = await Order.find()
    .populate({
    path: "book",
   })
    -populate({
        path: "user",
    })
    .sort({ createdAt: -1 });
    return res.json({
       status: "Success",
       data: userData,
    });
    } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occurred" });
}
});

//update order by admin
router.put("/update-status/:id", authenticateToken, async (req, res) => {
  try {
    const {id}=req.params;
    await Order.findByIdAndUpdate(id, { status: req.body.status }); 
    return res.json({
      status: "Success",
      message: "Status Updated Successfully",
    });
  } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "An error occurred" });
    }
});
module.exports=router;