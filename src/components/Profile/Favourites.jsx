
import React, { useState, useEffect } from "react";
import axios from "axios";
import BookCard from "../BookCard/BookCard";

const Favourites = () => {
  const [FavouriteBooks, setFavouriteBooks] = useState([]);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:5000/api/v1/get-favourite-books",
        { headers }
      );
      console.log(response.data);
      setFavouriteBooks(response.data.data);
    };
    fetch();
  }, []);

  // Function to handle book removal from the list
  const handleRemove = (bookId) => {
    setFavouriteBooks((prevBooks) => prevBooks.filter((book) => book._id !== bookId));
  };

  return (
   <>
          {FavouriteBooks.length === 0 && (
      <div className="flex flex-col items-center justify-center w-full h-screen ">
        <img
          src="https://st2.depositphotos.com/4520249/7735/v/950/depositphotos_77354402-stock-illustration-favorite-star-icon.jpg"
          alt="No Favourites"
          className="w-24 h-24 mb-4"
        />
        <div className="text-5xl font-semibold text-zinc-500">
          No Favourite Books
        </div>
      </div>
    )}

    <div className="grid grid-cols-3 gap-4">
      {FavouriteBooks &&
        FavouriteBooks.map((item, i) => (
          <div key={i}>
            <BookCard data={item} favourite={true} onRemove={handleRemove} />
          </div>
        ))}
    </div>
    </>
  );
  
};

export default Favourites;

