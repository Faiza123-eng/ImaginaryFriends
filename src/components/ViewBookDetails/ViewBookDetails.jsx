import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from "../Loader/Loader";
import { Link,useParams,useNavigate } from 'react-router-dom';
import { GrLanguage } from "react-icons/gr";
import {FaHeart,FaShoppingCart} from "react-icons/fa";
import {useSelector} from "react-redux";
import {FaEdit} from "react-icons/fa";
import {MdOutlineDelete} from "react-icons/md";


const ViewBookDetails = () => {
  const navigate = useNavigate();
  const {id}=useParams();
  const [Data, setData] = useState([]); // Default to an empty array
  const isLoggedIn=useSelector((state)=>state.auth.isLoggedIn);
  const role=useSelector((state)=>state.auth.role);
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/get-book-by-id/${id}`);
        console.log(response);
        setData(response.data.data);  
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
    fetchBooks();
  }, []);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid:id,
};

  const handleFavourite=async()=>{
    const response=await axios.put("http://localhost:5000/api/v1/add-book-to-favourite",{},{headers});
    alert(response.data.message);
  }
  const handleCart=async()=>{
    const response=await axios.put("http://localhost:5000/api/v1/add-to-cart",{},{headers});
    alert(response.data.message);
  }
  const deleteBook=async()=>{
    const response=await axios.delete("http://localhost:5000/api/v1/delete-book",{headers});
    alert(response.data.message);
    navigate("/all-books")
  }

  return (
  <>
    {Data &&(
        <div className="px-4 md:px-12 py-8 bg-zinc-900 flex flex-col lg:flex-row gap-8 items-start"> 
          <div className="bg-zinc-800 rounded p-12 flex flex-col lg:flex-row justify-around ">
            {" "}
            <div className='flex  justify-around'>
              <img src={Data.url} alt="/" className='h-[50vh] md:h-[60vh] lg:h-[70vh] rounded object-cover'/>
              {isLoggedIn===true && role==="user" && (<div className='flex flex-col md:flex-row items-center justify-between lg:justify-start mt-8 lg:mt-0'>
                  <button className='bg-white rounded lg:rounded-full ml-8 text-3xl p-4 mb-4 text-red-700 flex items-center justify-center'onClick={handleFavourite}><FaHeart/><span className="ms-4 block lg:hidden">Favourites</span></button>
                  <button className='bg-blue-500 rounded lg:rounded-full ml-8 text-3xl p-4 mb-4 text-white flex items-center justify-center' onClick={handleCart}><FaShoppingCart/><span className="ms-4 block lg:hidden">Add To Cart</span></button>
                </div>
                )}
                {isLoggedIn===true && role==="admin" && (<div className='flex flex-col md:flex-row items-center justify-between lg:justify-start mt-8 lg:mt-0'>
                  <Link to={`/UpdateBook/${id}`} className='bg-white rounded lg:rounded-full ml-8 text-3xl p-4 mb-4 flex items-center justify-center'><FaEdit/><span className="ms-4 block lg:hidden">Edit Book</span></Link>
                  <button className='bg-white rounded lg:rounded-full ml-8 text-3xl p-4 mb-4 text-red-700 flex items-center justify-center' onClick={deleteBook}><MdOutlineDelete/><span className="ms-4 block lg:hidden" >Delete Book</span></button>
                </div>
                )}
            </div>
          </div>
          <div className="p-4 w-full lg:w-3/6">
            <h1 className="text-4x1 text-zinc-300 font-semibold">{Data.title}</h1>
            <p className="text-zinc-400 mt-1">by {Data.author}</p>
            <p className="text-zinc-500 mt-4 text-x1">{Data.desc}</p>
            <p className="flex mt-4 items-center justify-start text-zinc-400"> 
              <GrLanguage className="me-3" /> {Data.language}
            </p>
            <p className="mt-4 text-zinc-100 text-3xl font-semibold">
              Price: ${Data.price} {""}
            </p> 
          </div>
          </div>
  
    )}
    {!Data && (
      <div className='h-screen bg-zinc-900 flex items-center justify-center'><Loader/>{" "}</div>
    )}
  </>
    );
};

export default ViewBookDetails;