const router = require("express").Router();
const User = require("../models/user");
const {authenticateToken}=require("./userAuth");
//Add book to favourite
router.put("/add-book-to-favourite", authenticateToken, async (req, res) => {
    try{
        const { bookid, id}=req.headers;
        const userData = await User.findById(id);
        const isBookFavourite =userData.favourites.includes (bookid);
        if (isBookFavourite) {
            return res.status (200).json({ message: "Book is already in favourites" });
        }
        await User.findByIdAndUpdate(id, { $push: { favourites: bookid } });
        res.status(200).json({message:"Book added to favourite"});
    }
    catch (error) {
    res.status(500).json({ message: "Internal server error" });
    I}
    });
    // Remove book from favourite
router.put("/remove-book-from-favourite", authenticateToken, async (req, res) => {
    try{
         const { bookid, id}=req.headers;
         const userData = await User.findById(id);
         const isBookFavourite =userData.favourites.includes (bookid);
         if (isBookFavourite) {
          await User.findByIdAndUpdate(id, { $pull: { favourites: bookid } });
            }
        res.status(200).json({message:"Book removed from favourite"});
        }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
        }
    });
router.get("/get-favourite-books", authenticateToken, async (req, res) => {
        try {
            const { id } = req.headers;
            const userData = await User.findById(id).populate('favourites');  // Assuming favourites is an array of book IDs
            const favouriteBooks = userData.favourites; // This should now contain full book details
            return res.json({
                status: "Success",
                data: favouriteBooks,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "An error occurred" });
        }
    });
    

module.exports=router;