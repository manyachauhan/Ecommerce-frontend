'use client';
import React, { useState, useEffect } from "react";

import SalesCarousel from './components/salesCarousel';
import ShopByCategory from './components/ShopByCategory';
import Header from '../components/Header';
import FeaturedProducts from './components/FeaturedProducts';

const MensPage = () => {
  const [storeData, setStoreData] = useState({
    salesCarousel: [],
    featuredProducts: [],
    categories: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
   
      try {
        const response = await fetch("http://127.0.0.1:8000/store/men/", {
          credentials: "include", // Include cookies if needed
        });
        const data = await response.json();
        console.log("men data",data);
        setStoreData(data);
        console.log("sakes carousl",storeData.salesCarousel);
      } catch (error) {
        console.error("Failed to fetch carousel data:", error);
      }
    };

    fetchData();
  }, []);
  console.log("sakes carousl outside usefeect",storeData.salesCarousel);

  return (
    <main>
        <Header/>
      {/* <SalesCarousel />
      <ShopByCategory/>
      <FeaturedProducts/> */}
            <SalesCarousel salesCarousel={storeData.salesCarousel} />
      <ShopByCategory categories={storeData.categories} />
      <FeaturedProducts featuredProducts={storeData.featuredProducts} />

     
    </main>
  );
};

export default MensPage;
