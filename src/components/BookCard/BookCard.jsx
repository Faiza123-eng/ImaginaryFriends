// import React from 'react';
// import {Link} from "react-router-dom";

// const BookCard = ({data,favourite}) => {
//   const headers = {
//     id: localStorage.getItem("id"),
//     authorization: `Bearer ${localStorage.getItem("token")}`,
//     bookid:data._id,
//   };
//   const handleRemoveBook=async()=>{
//     const response=await axios.put("http://localhost:5000/api/v1/remove-book-from-favourite",{},{headers});
//     console.log(response.data.data);
//   };
//   return (
//    <div className="bg-zinc-800 rounded p-4 flex flex-col" >
//       <Link to={`/view-book-details/${data._id}`}>
//       <div className="bg-zinc-800 rounded-lg shadow-lg p-6 flex flex-col items-center transition-transform transform hover:scale-105">
//         <div className="bg-zinc-900 rounded-lg flex items-center justify-center shadow-md">
//           <img src={data.url} alt='/' className='h-[30vh] object-cover' />
//        </div>
//       <h2 className='mt-4 text-2xl font-bold text-white text-center'>{data.title}</h2>
//       <p className='mt-1 text-zinc-400 font-medium text-center'>by {data.author}</p>
//       <p className='mt-2 text-zinc-200 font-semibold text-xl'>₨ {data.price}</p>
//       <button className='bg-yellow-50 text-xl px-4 py-2 rounded border border-yellow-500 text-yellow-500 mt-4'>Remove From Favourite</button>
//    </div>
//   </Link>
//       {favourite && (
//         <button
//          className='bg-yellow-50 px-4 py-2 rounded border border-yellow-500 text-yellow-500 mt-4'
//          onClick={handleRemoveBook}
//          >
//           Remove From Favourite
//           </button>
//       )}
//       <div />
//       </div>
//       );
// };

// export default BookCard;
import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const BookCard = ({ data, favourite, onRemove }) => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: data._id,
  };

  const handleRemoveBook = async () => {
    try {
      const response = await axios.put(
        "http://localhost:5000/api/v1/remove-book-from-favourite",
        {},
        { headers }
      );
      console.log(response.data.message);

      // Call the onRemove function to update the UI
      onRemove(data._id);
      
    } catch (error) {
      console.error("Error removing book from favourites:", error);
    }
  };

  return (
    <div className="bg-zinc-800 rounded p-4 flex flex-col">
      <Link to={`/view-book-details/${data._id}`}>
        <div className="bg-zinc-800 rounded-lg shadow-lg p-6 flex flex-col items-center transition-transform transform hover:scale-105">
          <div className="bg-zinc-900 rounded-lg flex items-center justify-center shadow-md">
            <img src={data.url} alt="/" className="h-[30vh] object-cover" />
          </div>
          <h2 className="mt-4 text-2xl font-bold text-white text-center">{data.title}</h2>
          <p className="mt-1 text-zinc-400 font-medium text-center">by {data.author}</p>
          <p className="mt-2 text-zinc-200 font-semibold text-xl">₨ {data.price}</p>
        </div>
      </Link>
      {favourite && (
        <button
          className="bg-yellow-50 px-4 py-2 rounded border border-yellow-500 text-yellow-500 mt-4"
          onClick={handleRemoveBook}
        >
          Remove From Favourite
        </button>
      )}
    </div>
  );
};

export default BookCard;

