
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookCard from '../components/BookCard/BookCard';
import Loader from "../components/Loader/Loader";

const AllBooks=()=> {
  const [Data, setData] = useState([]); // Default to an empty array

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/get-all-books');
        setData(response.data.data);  // Set Data here
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
    fetchBooks();
  }, []);

  return (
    <div className='bg-zinc-900 px-4'><h4 className='text-3xl text-yellow-100 ml-5 font-semibold'>All Books</h4>
    {!Data && <div className='flex items-center my-8'> <Loader /></div>}
    <div className='my-4 grid text-yellow-100 grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4'>
      {Data.length > 0 ? (
        Data.map((item, i) => (
          <div key={i}>
            <BookCard data={item} /> 
          </div>
        ))
      ) : (
        <p className='text-yellow-100'>No recent books available</p>  // This is shown if there's no data
      )}
    </div></div>
  )
}
export default AllBooks;