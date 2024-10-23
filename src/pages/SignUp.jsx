import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from"axios";

const SignUp = () => {
  const [Values,SetValues]=useState({
    username:"",
    email:"",
    password:"",
    address:"",
  });
  const navigate=useNavigate();
  const change=(e)=>{
    const {name,value}=e.target;
     SetValues({...Values,[name]:value})
  }
  const submit = async () => {
    try {
      // Check if any fields are empty
      if (Values.username === "" || Values.email === "" || Values.password === "" || Values.address === "") {
        alert("All fields are required");
        return;
      }

      // Send the POST request to the backend
      const response = await axios.post("http://localhost:5000/api/v1/sign-up", Values);

      // Alert user with the backend response message
      alert(response.data.message);

      // If the request is successful, navigate to login page
      navigate("/LogIn");

    }
    catch (error) {
      if (error.response) {
        console.log("Server responded with:", error.response.data);
        alert(error.response.data.message); // If the backend provides a message
      } else {
        console.log(error);
      }
    }
    
  }

  return (
    <div className="h-screen w-screen bg-zinc-900 flex items-center justify-center"> 
      <div className="bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6">
        <p className="text-zinc-200 text-xl">Sign Up</p>
        <div className="mt-4">
          <div>
            <label htmlFor="username" className="text-zinc-400">
              Username
            </label>
            <input
              type="text"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="username"
              name="username"
              required
              value={Values.username}
              onChange={change}
            />
          </div>
          <div className="mt-4">
            <label htmlFor="email" className="text-zinc-400">
              Email
            </label>
            <input
              type="email"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="xyz@example.com"
              name="email"
              required
              value={Values.email}
              onChange={change}
            />
          </div>
          <div className="mt-4">
            <label htmlFor="password" className="text-zinc-400">
              Password
            </label>
            <input
              type="password"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="password"
              name="password"
              required
              value={Values.password}
              onChange={change}
            />
          </div>
          <div className="mt-4">
            <label htmlFor="address" className="text-zinc-400">
              Address
            </label>
            <textarea
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              rows="5"
              placeholder="address"
              name="address"
              required
              value={Values.address}
              onChange={change}
            />
          </div>
          <div className="mt-4">
            <button className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-400 " onClick={submit}>
              Sign Up
            </button>
            <p className="text-zinc-400">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
