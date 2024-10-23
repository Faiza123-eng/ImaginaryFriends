import React, { useState } from "react";

const AllOrders = () => {
  // Static book order data (mocked from your input)
  const [orders, setOrders] = useState([
    {
      _id: "670bd4d32d56fb6f45efc3fb",
      url: "https://m.media-amazon.com/images/I/51p1h1Xl7WL.jpg",
      title: "Design Patterns",
      author: "Erich Gamma and John Vlissides",
      price: 400,
      desc: "This book introduces design patterns that can be used to solve common problems in software design.",
      language: "English",
      status: "Delivered",
    },
    {
      _id: "670bd9e8c7969569449c772d",
      url: "https://m.media-amazon.com/images/I/718bo4F0KPL._SL1254_.jpg",
      title: "Blockchain Basics",
      author: "Daniel Drescher",
      price: 550,
      desc: "Blockchain technology is becoming one of the most transformative technologies.",
      language: "English",
      status: "Out for Delivery",
    },
    {
      _id: "670bd9f3c7969569449c7730",
      url: "https://m.media-amazon.com/images/I/71Sht-Ib-lL._SL1360_.jpg",
      title: "Mastering Blockchain",
      author: "Imran Bashir",
      price: 650,
      desc: "In 'Mastering Blockchain,' Imran Bashir provides a comprehensive deep dive into blockchain technology.",
      language: "English",
      status: "Cancelled",
    },
    // Add more orders as necessary
  ]);

  // Handle status change
  const handleStatusChange = (e, id) => {
    const { value } = e.target;
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order._id === id ? { ...order, status: value } : order
      )
    );
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-semibold text-gray-700 mb-6">All Orders</h1>
      <div className="grid grid-cols-1 gap-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="p-4 bg-gray-100 rounded shadow-md flex justify-between items-center"
          >
            <div className="flex items-center">
              <img
                src={order.url}
                alt={order.title}
                className="w-24 h-24 object-cover rounded mr-4"
              />
              <div>
                <h2 className="text-lg text-gray-600 font-bold">{order.title}</h2>
                <p className="text-sm text-gray-600">Author: {order.author}</p>
                <p className="text-sm text-gray-600">Price: ${order.price}</p>
                <p className="text-sm text-gray-600">
                  Language: {order.language}
                </p>
                <p className="text-sm text-gray-600">
                  Description: {order.desc}
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <select
                value={order.status}
                onChange={(e) => handleStatusChange(e, order._id)}
                className={`p-2 rounded text-white font-semibold ${
                  order.status === "Delivered"
                    ? "bg-green-500"
                    : order.status === "Out for Delivery"
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }`}
              >
                <option value="Delivered" className="bg-white text-black">
                  Delivered
                </option>
                <option
                  value="Out for Delivery"
                  className="bg-white text-black"
                >
                  Out for Delivery
                </option>
                <option value="Cancelled" className="bg-white text-black">
                  Cancelled
                </option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllOrders;
