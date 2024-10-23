import React from "react";
import { Link } from "react-router-dom";

const UserOrderHistory = () => {
  // Static order history data
  const OrderHistory = [
    {
      id: 1,
      book: {
        id: "670bd4d32d56fb6f45efc3fb",
        url: "https://m.media-amazon.com/images/I/51p1h1Xl7WL.jpg",
        title: "Design Patterns",
        author: "Erich Gamma and John Vlissides",
        price: "$400",
        desc: "This book introduces design patterns that can be used to solve common challenges in software design.",
      },
      status: "Delivered",
    },
    {
      id: 2,
      book: {
        id: "670bd9e8c7969569449c772d",
        url: "https://m.media-amazon.com/images/I/718bo4F0KPL._SL1254_.jpg",
        title: "Blockchain Basics",
        author: "Daniel Drescher",
        price: "$550",
        desc: "Blockchain technology is becoming one of the most transformative technologies of our time.",
      },
      status: "Order placed",
    },
    {
      id: 3,
      book: {
        id: "670bd9f3c7969569449c7730",
        url: "https://m.media-amazon.com/images/I/71Sht-Ib-lL._SL1360_.jpg",
        title: "Mastering Blockchain",
        author: "Imran Bashir",
        price: "$650",
        desc: "In 'Mastering Blockchain,' Imran Bashir provides a comprehensive deep dive into blockchain concepts.",
      },
      status: "Canceled",
    },
    {
      id: 4,
      book: {
        id: "670bd9fdc7969569449c7733",
        url: "https://m.media-amazon.com/images/I/81KpjloJJZL._SL1500_.jpg",
        title: "Clean Code",
        author: "Robert C. Martin",
        price: "$500",
        desc: "'Clean Code' is a must-read for software developers looking to improve the quality of their code.",
      },
      status: "Delivered",
    },
  ];

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      {OrderHistory.length === 0 ? (
        <div className="h-[80vh] p-4 text-zinc-100">
          <div className="h-[100%] flex flex-col items-center justify-center">
            <h1 className="text-5xl font-semibold text-zinc-500 mb-8">
              No Order History
            </h1>
            <img
              src="https://cdn-icons-png.flaticon.com/128/9961/9961218.png"
              alt="No order history"
              className="h-[20vh] mb-8"
            />
          </div>
        </div>
      ) : (
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold mb-8">Your Order History</h1>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {OrderHistory.map((items, i) => (
              <div
                key={items.id}
                className="bg-gray-800 rounded-lg shadow-lg p-6 hover:bg-gray-700 transition duration-300"
              >
                <img
                  src={items.book.url}
                  alt={items.book.title}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <h2 className="text-2xl font-semibold mb-2">
                  <Link
                    to={`/view-book-details/${items.book.id}`}
                    className="hover:text-blue-400"
                  >
                    {items.book.title}
                  </Link>
                </h2>
                <p className="text-sm text-gray-400 mb-1">{items.book.author}</p>
                <p className="text-sm text-gray-400 mb-4">{items.book.desc}</p>
                <div className="flex justify-between items-center">
                  <p className="font-bold text-lg">{items.book.price}</p>
                  <p
                    className={`font-semibold ${
                      items.status === "Delivered"
                        ? "text-green-500"
                        : items.status === "Order placed"
                        ? "text-yellow-400"
                        : "text-red-500"
                    }`}
                  >
                    {items.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserOrderHistory;
