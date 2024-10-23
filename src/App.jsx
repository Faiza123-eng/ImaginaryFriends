import {React,useEffect} from 'react'; 
import Home from "./pages/Home";
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import {Routes, Route} from "react-router-dom";
import AllBooks from './pages/AllBooks';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn'; 
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import ViewBookDetails from './components/ViewBookDetails/ViewBookDetails';
import { useDispatch,useSelector } from 'react-redux';
import {authActions} from "./store/auth";
import Favourites from './components/Profile/Favourites';
import Settings from './components/Profile/Settings';
import UserOrderHistory from './components/Profile/UserOrderHistory';
import AllOrders from './pages/AllOrders';
import AddBook from './pages/AddBook';
import UpdateBook from './pages/UpdateBook';
import Chatbot from './components/Chatbot';
import { loadStripe } from "@stripe/stripe-js"; // Import loadStripe from Stripe
import { Elements } from "@stripe/react-stripe-js";



const App = () => {
  const dispatch = useDispatch();
  const role=useSelector((state) => state.auth.role);
    useEffect(() => {
      if(
        localStorage.getItem("id") &&
        localStorage.getItem("token") &&
        localStorage.getItem("role")
        ) {
        dispatch(authActions.login());
        dispatch (authActions.changeRole(localStorage.getItem("role")));
    }
    }, []);
  const stripePromise = loadStripe("pk_test_51PXhiARtq8jPAZFghiFNVw8CeDCX1z2F9p0lrNV4NpliGoMoOHYXRkspyH4DOBPixuVzfMNO8oyxlwLDicSbe4Ds003wWdDVGg");
  return (
    <div className="flex flex-col min-h-screen">{/*added classname*/} 
     
        <Navbar />
      <main className="flex-grow">{/*added by Areeha*/}
      <Elements stripe={stripePromise}>
        <Routes>
          <Route exact path="/" element={<Home />}/>
          <Route exact path="/all-books" element={<AllBooks />}/>
          <Route exact path="/cart" element={<Cart />}/>
          <Route exact path="/profile" element={<Profile />}>
            {role==="user" ?<Route index  element={<Favourites/>}/>:<Route index  element={<AllOrders/>}/>}
            {role==="admin" && <Route path="/profile/add-book" element= {< AddBook/>}/>}
            <Route path="/profile/orderHistory" element= {< UserOrderHistory/>}/>
           <Route path="/profile/settings" element= {<Settings/>}/>
          </Route>
          <Route exact path="/SignUp" element={<SignUp />}/>
          <Route exact path="/LogIn" element={<LogIn />}/>
          <Route path="updateBook/:id" element={<UpdateBook />}/>
          <Route path="view-book-details/:id" element={<ViewBookDetails />}/>
          
        </Routes>
      </Elements>
        </main>{/*added by Areeha*/}
      <Chatbot storeName="Imaginary Friends" />{/*added by Areeha*/}
        <Footer />
        
     
    </div>
  );
}

export default App;

