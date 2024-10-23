import React from 'react';
import { Link } from 'react-router-dom';
import { FaGripLines } from "react-icons/fa";
import { useState } from 'react';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const links = [
        {
            title: "Home",
            link: "/",
        },
        {
            title: "All Books",
            link: "/all-books",
        },
        {
            title: "Cart",
            link: "/cart",
        },
        {
            title: "Profile",
            link: "/profile",
        },
        {
            title: "Admin Profile",
            link: "/profile",
        },
    ];

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const role=useSelector((state)=>state.auth.role);
    if (isLoggedIn === false) {
        links.splice(2, 2); // Hide Cart and Profile for unlogged user
    }
    if (isLoggedIn === true &&role==="user") {
        links.splice(4, 1); // Hide Cart and Profile for unlogged user
    }
    if (isLoggedIn === true &&role==="admin") {
        links.splice(3, 1); // Hide Cart and Profile for unlogged user
    }
    const [MobileNav, setMobileNav] = useState("hidden");

    return (
        <>
            <nav className="z-50 relative flex bg-zinc-700 text-white px-8 py-4 items-center justify-between border-b border-gray-600 shadow-md">
                <Link to="/" className="flex items-center gap-2">
                    <img
                        className="h-13 w-12 "
                        src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png"
                        alt="logo"
                    />
                    <h1 className="text-2x1 font-semibold text-white">Imaginary Friends</h1> 
                </Link>

                <div className="nav-links-bookheaven block md:flex items-center gap-6 text-xl">
                    <div className="hidden md:flex gap-6">
                        {links.map((items, i) => (

                            <Link
                                to={items.link}
                                className={`text-white hover:text-blue-400 transition-all duration-300 ${items.title === "Cart" || items.title === "Profile" || items.title==="Admin Profile" ? 'border border-blue-500 px-3 py-1 rounded' : ''}`}
                                key={i}
                            >
                                {items.title}
                            </Link>
                        ))}
                    </div>

                    {isLoggedIn === false && (
                        <div className="hidden md:flex gap-4">
                            <Link
                                to="/LogIn"
                                className="px-5 py-1 border border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-white transition-all duration-300"
                            >
                                LogIn
                            </Link>
                            <Link
                                to="/SignUp"
                                className="px-5 py-1 bg-blue-500 text-white rounded hover:bg-white hover:text-blue-500 transition-all duration-300"
                            >
                                SignUp
                            </Link>                   
                        </div>
                    )}

                    <button className="text-white block md:hidden bg-zinc-800 text-2xl hover:text-zinc-400" onClick={() => { MobileNav === "hidden" ? setMobileNav("block") : setMobileNav("hidden") }}>
                        <FaGripLines />
                    </button>
                </div>
            </nav>

            {/* Mobile Navigation */}
            <div className={`${MobileNav} bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}>
                {links.map((items, i) => (
                    <Link 
                        to={items.link}
                        className={`text-white hover:text-blue-400 transition-all duration-300 ${items.title === "Profile" || items.title === "Cart" ? 'border border-blue-500 px-3 py-1 rounded' : ''}`}
                        key={i}
                    >
                        {items.title} 
                    </Link>
                ))}

                <Link
                    to="/LogIn"
                    className="px-8 py-2 mb-8 border border-blue-500 text-3xl text-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
                >
                    LogIn
                </Link>
                <Link
                    to="/SignUp"
                    className="px-8 py-2 mb-8 bg-blue-500 text-3xl font-semibold text-white rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
                >
                    SignUp
                </Link>
            </div>
        </>
    );
};

export default Navbar;
