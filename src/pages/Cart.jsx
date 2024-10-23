// with stripe
import React, { useEffect, useState } from 'react';
import Loader from "../components/Loader/Loader";
import axios from "axios";
import { AiFillDelete } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

const Cart = () => {
  const navigate = useNavigate();
  const [Cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };


  useEffect(() => {
        const fetch = async () => {
          try {
            const response = await axios.get('http://localhost:5000/api/v1/get-user-cart', { headers });
            setCart(response.data.data);
          } catch (error) {
            console.error("Error fetching cart data:", error);
          } finally {
            setLoading(false);
          }
        };
    
        fetch();
      }, []);

  // Function to delete item from the cart
const deleteItem = async (bookid) => {
  try {
    await axios.put(`http://localhost:5000/api/v1/remove-from-cart/${bookid}`, {}, { headers });
    setCart((prevCart) => prevCart.filter((item) => item._id !== bookid));
  } catch (error) {
    console.error("Error removing item from cart:", error);
  }
};

  // Function to handle payment and place an order
  const placeOrder = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/v1/create-payment-intent", {
        amount: totalAmount * 100, // Stripe expects amount in cents
      });
      setClientSecret(response.data.clientSecret);
      setShowPaymentForm(true);
    } catch (error) {
      console.error("Error creating payment intent:", error);
    }
  };

  // Handle Stripe payment submission
  const handleSubmitPayment = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    if (error) {
      console.error("Payment failed:", error);
      alert("Payment failed, please try again.");
    } else if (paymentIntent.status === "succeeded") {
      setPaymentSuccess(true);
      alert("Payment successful!");
      navigate("/profile/orderHistory");
    }
  };

  const totalAmount = Cart.reduce((acc, item) => acc + item.price, 0);
  const totalItems = Cart.length;

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {Cart.length === 0 ? (
            <div className="h-screen w-full bg-zinc-800">
              <div className="h-[100%] flex items-center justify-center flex-col">
                <h1 className="text-5xl lg:text-6xl font-semibold">Empty Cart</h1>
                <img 
                  src="https://c7.alamy.com/comp/PXPFT5/empty-cart-for-products-and-goods-on-a-white-background-PXPFT5.jpg" 
                  alt="Empty cart"
                  className="lg:h-[50vh] text-zinc-200 mb-6 mt-6 font-semibold"
                />
              </div>
            </div>
          ) : (
            <div className="bg-zinc-900 p-6 rounded-lg shadow-lg">
              <h1 className="text-6xl font-bold text-white mb-8 text-center">Your Cart</h1>
              {Cart.map((item) => (
                <div
                  className="w-full my-4 rounded-lg flex flex-col md:flex-row p-4 bg-zinc-800 justify-between items-center shadow-md"
                  key={item._id}
                >
                  <img 
                    src={item.url}
                    alt={item.title}
                    className="h-[20vh] md:h-[10vh] object-cover rounded-lg"
                  />
                  <div className="w-full md:w-auto mx-4">
                    <h1 className="text-2xl text-zinc-100 font-semibold text-start mt-2 md:mt-8">{item.title}</h1>
                    <p className="text-normal text-zinc-300 mt-2 hidden lg:block">{item.desc.slice(0, 100)}...</p>
                    <p className="text-normal text-zinc-300 mt-2 hidden md:block lg:hidden">{item.desc.slice(0, 65)}...</p>
                    <p className="text-normal text-zinc-300 mt-2 block md:hidden">{item.desc.slice(0, 100)}...</p>
                  </div>
                  <div className="flex mt-4 w-full md:w-auto items-center justify-between">
                    <h2 className="text-zinc-100 text-3xl font-semibold flex">${item.price}</h2>
                    <button
                      className="bg-red-100 text-red-700 border border-red-700 rounded p-2 ms-12"
                      onClick={() => deleteItem(item._id)}
                    >
                      <AiFillDelete />
                    </button>
                  </div>
                </div>
              ))}

              <div className="mt-6 p-4 bg-zinc-800 rounded-lg shadow-md">
                <h2 className="text-2xl text-white font-semibold">Your Order</h2>
                <div className="flex justify-between mt-4">
                  <span className="text-zinc-300">Total Amount:</span>
                  <span className="text-zinc-100">${totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-zinc-300">Number of Books:</span>
                  <span className="text-zinc-100">{totalItems}</span>
                </div>
                <button
                  className="mt-4 w-full bg-green-600 text-white font-bold py-2 rounded hover:bg-green-700 transition duration-300"
                  onClick={placeOrder}
                >
                  Place Order
                </button>
              </div>

              {showPaymentForm && (
                <div className="mt-6 p-4 bg-zinc-800 rounded-lg shadow-md">
                  <h2 className="text-2xl text-white font-semibold">Enter Payment Details</h2>
                  <form onSubmit={handleSubmitPayment} className="mt-4">
                    <CardElement className="p-4 bg-white rounded shadow-sm" />
                    <button
                      className="mt-4 w-full bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700 transition duration-300"
                      type="submit"
                      disabled={!stripe}
                    >
                      Pay Now
                    </button>
                  </form>
                </div>
              )}

              {paymentSuccess && (
                <div className="mt-6 p-4 bg-green-600 rounded-lg shadow-md">
                  <h2 className="text-xl text-white font-semibold">Payment Successful! Redirecting...</h2>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Cart;


