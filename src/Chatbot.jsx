import React, { useState, useRef, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';

const Chatbot = ({ storeName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Initial greeting message
      setMessages([{
        text: `Welcome to ${storeName}! How can I assist you with your book shopping today?`,
        user: false,
        suggestions: ["What books do you offer?", "How do I purchase?", "Tell me about your store"]
      }]);
    }
  }, [isOpen, storeName]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim() === '') return;

    const userMessage = { text: inputMessage, user: true };
    setMessages(prev => [...prev, userMessage]);

    // Bot response logic
    const botResponse = getBotResponse(inputMessage, storeName);
    setTimeout(() => {
      setMessages(prev => [...prev, { text: botResponse.text, user: false, suggestions: botResponse.suggestions }]);
    }, 500);

    setInputMessage('');
  };

  const getBotResponse = (message, storeName) => {
    const lowerCaseMessage = message.toLowerCase();
    if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi')) {
      return {
        text: `Hello! Welcome to ${storeName}. How can I assist you today?`,
        suggestions: ["What books do you offer?", "How do I purchase?", "Tell me about your store"]
      };
    } else if (lowerCaseMessage.includes('books') || lowerCaseMessage.includes('offer')) {
      return {
        text: `At ${storeName}, we offer a wide range of books across various genres. Would you like to know about any specific category?`,
        suggestions: ["Fiction books", "Non-fiction books", "Children's books"]
      };
    } else if (lowerCaseMessage.includes('purchase') || lowerCaseMessage.includes('buy')) {
      return {
        text: "To purchase a book, simply browse our catalog, select the book you want, add it to your cart, and proceed to checkout. You'll need an account to complete the purchase.",
        suggestions: ["How to create an account", "View cart", "Payment methods"]
      };
    } else if (lowerCaseMessage.includes('about') || lowerCaseMessage.includes('store')) {
      return {
        text: `${storeName} is an online bookstore dedicated to bringing the joy of reading to everyone. We offer a vast selection of books and pride ourselves on our user-friendly platform.`,
        suggestions: ["Our features", "Book categories", "Customer support"]
      };
    } else {
      return {
        text: `I'm not sure about that. Can you ask something about our books, purchasing process, or ${storeName} features?`,
        suggestions: ["Book categories", "How to purchase", "About our store"]
      };
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInputMessage(suggestion);
    handleSendMessage({ preventDefault: () => {} });
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600 transition duration-300"
        >
          Chat with {storeName}
        </button>
      )}
      {isOpen && (
        <div className="absolute bottom-0 right-0 w-80 bg-white rounded-lg shadow-xl border border-gray-300">
          <div className="h-96 flex flex-col">
            <div className="bg-blue-500 text-white p-2 rounded-t-lg flex justify-between items-center">
              <h3 className="text-lg font-semibold">{storeName} Chatbot</h3>
              <button
                onClick={toggleChat}
                className="text-white hover:text-gray-200 transition duration-300 p-0 bg-transparent border-none focus:outline-none"
              >
                <IoClose size={24} />
              </button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto">
              {messages.map((msg, index) => (
                <div key={index} className={`mb-2 ${msg.user ? 'text-right' : 'text-left'}`}>
                  <span className={`inline-block p-2 rounded-lg ${msg.user ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
                    {msg.text}
                  </span>
                  {!msg.user && msg.suggestions && (
                    <div className="mt-2">
                      {msg.suggestions.map((suggestion, i) => (
                        <button
                          key={i}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="mr-2 mb-2 px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSendMessage} className="border-t border-gray-300 p-2">
              <div className="flex bg-blue-500 rounded-lg overflow-hidden">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-grow p-2 bg-white text-gray-700 placeholder-gray-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 transition duration-300"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
