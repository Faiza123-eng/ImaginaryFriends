import React, { useState, useRef, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';

const Chatbot = ({ storeName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);

  const toggleChat = () => setIsOpen(!isOpen);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Initial greeting message
      setMessages([
        {
          text: `Welcome to ${storeName}! How can I assist you with your book shopping today?`,
          user: false,
          suggestions: [
            'What books do you offer?',
            'How do I purchase?',
            'Tell me about your store'
          ]
        }
      ]);
    }
  }, [isOpen, storeName]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim() === '') return;

    const userMessage = { text: inputMessage, user: true };
    setMessages((prev) => [...prev, userMessage]);

    // Bot response logic
    const botResponse = getBotResponse(inputMessage, storeName);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: botResponse.text, user: false, suggestions: botResponse.suggestions }
      ]);
    }, 500);

    setInputMessage('');
  };

  const getBotResponse = (message, storeName) => {
    const lowerCaseMessage = message.toLowerCase();
    // Expanded questions
    if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi')) {
      return {
        text: `Hello! Welcome to ${storeName}. How can I assist you today?`,
        suggestions: ['What books do you offer?', 'How do I purchase?', 'Tell me about your store']
      };
    } else if (lowerCaseMessage.includes('books') || lowerCaseMessage.includes('offer')) {
      return {
        text: `At ${storeName}, we offer a wide range of books across various genres. Would you like to know about any specific category?`,
        suggestions: ['Fiction books', 'Non-fiction books', "Children's books"]
      };
    } else if (lowerCaseMessage.includes('purchase') || lowerCaseMessage.includes('buy')) {
      return {
        text: 'To purchase a book, simply browse our catalog, add the book to your cart, and proceed to checkout.',
        suggestions: ['How to create an account', 'View cart', 'Payment methods']
      };
    } else if (lowerCaseMessage.includes('about') || lowerCaseMessage.includes('store')) {
      return {
        text: `${storeName} is an online bookstore offering a vast selection of books. What would you like to know more about?`,
        suggestions: ['Our features', 'Book categories', 'Customer support']
      };
    } else if (lowerCaseMessage.includes('recommend')) {
      return {
        text: 'I recommend trying our Fiction and Mystery section if you enjoy engaging stories!',
        suggestions: ['Tell me about Fiction', 'Show me bestsellers', 'Give me a book suggestion']
      };
    } else if (lowerCaseMessage.includes('return') || lowerCaseMessage.includes('refund')) {
      return {
        text: 'For returns and refunds, please check our store policies. Would you like me to direct you to that page?',
        suggestions: ['View store policies', 'How to process a return', 'Contact support']
      };
    } else {
      return {
        text: `I'm not sure about that. Can you ask something about our books, purchasing process, or ${storeName} features?`,
        suggestions: ['Book categories', 'How to purchase', 'About our store']
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
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300"
        >
          Chat with {storeName}
        </button>
      )}

      {isOpen && (
        <div className="relative w-96 bg-white rounded-lg shadow-lg border border-gray-300">
          <div className="h-96 flex flex-col">
            <div className="bg-blue-600 text-white p-4 flex justify-between items-center rounded-t-lg">
              <h3 className="text-lg font-bold">{storeName} Chatbot</h3>
              <button
                onClick={toggleChat}
                className="text-blue-600 hover:text-gray-200 transition-all"
              >
                <IoClose size={24} />
              </button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-4 ${msg.user ? 'text-right' : 'text-left'}`}
                >
                  <span
                    className={`inline-block px-4 py-2 rounded-lg ${
                      msg.user
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-800'
                    }`}
                  >
                    {msg.text}
                  </span>
                  {!msg.user && msg.suggestions && (
                    <div className="mt-2">
                      {msg.suggestions.map((suggestion, i) => (
                        <button
                          key={i}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="mr-2 px-3 py-1 bg-blue-200 text-blue-700 rounded-full text-sm hover:bg-blue-300"
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
            <form onSubmit={handleSendMessage} className="border-t border-gray-300 p-3">
              <div className="flex">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-grow p-2 rounded-lg border border-gray-300 focus:outline-none"
                />
                <button
                  type="submit"
                  className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
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
