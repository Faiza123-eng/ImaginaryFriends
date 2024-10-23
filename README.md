# React + Vite
Imaginary Friends
# Overview
This project is an Online Book Store application that allows users to browse, purchase, and manage their book collections. It includes both a Frontend (React-based) and a Backend (Node.js/Express) setup with a MongoDB atlas database. Stripe has been integrated for payment processing.
# Features
1.User Authentication (Sign Up, Log In)
2.Book listing and details view
3.Add to cart and cart management
4.Admin panel for managing books
5.Secure payments with Stripe

# Installation

### Backend
To set up the backend, the following dependencies are required:

- **Express**: A Node.js framework for building web applications.
  `npm install express`
  

- **MongoDB**: MongoDB Atlas is used for data storage. Set up a MongoDB cluster and create a project named 
  `npm install mongoose`
  

- **Nodemon**: Used to automatically restart the server when files change during development.
  `npm install nodemon`
 

- **Bcrypt**: For hashing user passwords to ensure security in case the database gets hacked.
  `npm install bcryptjs`
 

- **JWT (jsonwebtoken)**: For handling user authentication through JSON Web Tokens.
 ` npm install jsonwebtoken`


- **Stripe**: For payment processing. Replace `YOUR_STRIPE_SECRET_KEY` with your actual Stripe secret key in the `env`
  `npm install stripe`

### Frontend
The frontend is built using **React**, and the following packages are necessary:

- **Vite**: For setting up the React project.
  `npm install vite@latest`

- **Tailwind CSS**: For styling the UI.
 ` npm install -D tailwindcss postcss autoprefixer`

- **React Router DOM**: For routing in the React app.
  `npm install react-router-dom`

- **Axios**: For making HTTP requests to the backend (API integration).
  `npm install axios`

- **Redux Toolkit & React Redux**: For state management.
  `npm install @reduxjs/toolkit react-redux`

- **React Icons**: For adding icons to the UI.
  `npm install react-icons  `

- **Stripe (React)**: For integrating the Stripe payment gateway on the frontend.
  `npm install @stripe/react-stripe-js @stripe/stripe-js`

## Setup and Installation

### Backend
1. Navigate to the `Backend` folder.
2. Run the following command to install dependencies:
   `npm install`

3. To start the server with **nodemon**, use:`
   `nodemon app.js`

4. The backend will be accessible at `localhost:5000`.

### Frontend
1. Navigate to the `Frontend` folder.
2. Run the following command to install dependencies:
   `npm install`

3. To start the React app, use:
   `npm run dev`

4. The frontend will be accessible at `localhost:3000` (or as per Vite's default configuration).

## Database Setup (MongoDB Atlas)
- Create a MongoDB project called `bookstore`.
- Create a new cluster, and add IP addresses for network access.
- Use the credentials provided during the MongoDB setup in your environment configuration file (`.env`).

## Notes
- Ensure to install **CORS** to resolve cross-origin issues between frontend and backend.
  `npm install cors`

- If you encounter errors such as `nodemon.ps1 cannot be loaded due to script restrictions`, run the following command in PowerShell:
  `Set-ExecutionPolicy RemoteSigned -Scope CurrentUser`

This `README.md` provides a complete guide to setting up and running your Online Book Store project. Let me know if any further details are required!


# Dependencies
Dependencies
Backend
express: Web framework for Node.js
mongoose: MongoDB object modeling tool
bcryptjs: For hashing passwords
jsonwebtoken: For JWT authentication
nodemon: For automatically restarting the server during development
stripe: For payment processing
Frontend
react: For building the user interface
axios: For making HTTP requests to the backend
react-router-dom: For client-side routing
@reduxjs/toolkit: For state management
react-redux: To connect Redux to React
react-icons: For using icons
@stripe/react-stripe-js: For integrating Stripe payment processing
@stripe/stripe-js: Stripe's official JavaScript SDK for the frontend
tailwindcss: For styling components
API Endpoints
User Authentication
POST /api/v1/signup: Register a new user.
POST /api/v1/login: Log in an existing user.
Books
GET /api/v1/books: Fetch all books.
GET /api/v1/books/:id: Fetch details of a specific book.
POST /api/v1/books: (Admin) Add a new book.
PUT /api/v1/books/:id: (Admin) Update book details.
DELETE /api/v1/books/:id: (Admin) Delete a book.
Cart
GET /api/v1/cart: Get user cart items.
POST /api/v1/cart/add: Add a book to the cart.
DELETE /api/v1/cart/remove/:id: Remove a book from the cart.
Payments
POST /api/v1/create-payment-intent: Create a Stripe payment intent.

# Author
https://github.com/Faiza123-eng



