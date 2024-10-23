import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {authActions} from "../store/auth";
import { useDispatch } from "react-redux";
import axios from "axios";


const LogIn = () => {
  const [Values, SetValues] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate(); // Re-enable navigate
  const dispatch=useDispatch();
  const change = (e) => {
    const { name, value } = e.target;
    SetValues({ ...Values, [name]: value });
  };

  const submit = async () => {
    try {
      if (Values.username === "" || Values.password === "") {
        alert("Invalid credentials");
        return;
      }

      // Send the login request
      const response = await axios.post("http://localhost:5000/api/v1/sign-in", Values);

      // Save data to localStorage if login is successful
      dispatch(authActions.login());
      dispatch(authActions.changeRole(response.data.role));
      localStorage.setItem("id", response.data.id);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);

      // Navigate to another page (e.g., home) after successful login
      navigate("/profile"); // Adjust to your intended route

    } catch (error) {
      if (error.response) {
        console.log("Server responded with:", error.response.data);
        alert(error.response.data.message); // Display server error message if available
      } else {
        console.error("Login error:", error);
        alert("An error occurred during login. Please try again.");
      }
    }
  };

  return (
    <div className="h-screen w-screen bg-zinc-900 flex items-center justify-center">
      <div className="bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6">
        <p className="text-zinc-200 text-xl">Login</p>
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
            <button className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-400" onClick={submit}>
              Login
            </button>
            <p className="text-zinc-400">
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
