import React from 'react';
import Hero from '../components/Home/Hero';
import RecentlyAdded from '../components/Home/RecentlyAdded';
import AllBooks from "../pages/AllBooks";

const Home=() =>{
  return (
    <>
      <Hero/>
      <RecentlyAdded/>
      <AllBooks/>
    </>
    
  )
}
export default Home;
