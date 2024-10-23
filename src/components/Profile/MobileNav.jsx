import React from 'react';
import { Link } from 'react-router-dom';
import {useSelector} from "react-redux";

const MobileNav = () => {
  const role=useSelector((state)=>state.auth.role);
  return (
    <>
              {role==="user" && (
                <div className='w-full flex-col items-center justify-center hidden lg:flex'>
                    <Link
                    to="/profile"
                    className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all'
                    >
                        Favourites
                    </Link>
                    <Link 
                    to="/profile/orderHistory"
                    className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all'>
                        order History
                    </Link>
                    <Link
                    to="/profile/settings"
                    className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all'>
                        Settings
                    </Link>
                </div>
            )}
             {role==="user" && (
                <div className='w-full flex-col items-center justify-center hidden lg:flex'>
                    <Link
                    to="/profile"
                    className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all'
                    >
                        All Orders
                    </Link>
                    <Link 
                    to="/profile/add-book"
                    className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all'>
                        Add Book
                    </Link>
                    
                </div>
            )}
    </>
  )
}

export default MobileNav