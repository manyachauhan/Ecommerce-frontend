"use client"
import react,{useEffect, useState} from 'react';
// import SalesCarousel from './components/SalesCarousel';
import SalesCarousel from './components/salesCarousel';
import ShopByCategory from './components/ShopByCategory';
import Header from '../components/Header';
import FeaturedProducts from './components/FeaturedProducts';

const BabyPage = () => {
  const[storeData, setStoreData]=useState({
    salesCarousel:[],
    featuredProducts:[],
    categories: []

  })
  useEffect(()=>{
    const fetchData=async()=>{
try{
  const response=await fetch ("http://127.0.0.1:8000/store/baby/",{
    credentials:"include",
  });
  const data=await response.json();
  console.log("women  data",data);
  console.log("sakes women ",data.salesCarousel);
  setStoreData(data);
}
catch(error)
{
  console.error("Failed to fetch carousel data:", error);

}
    };
    fetchData();
  },[]);
  return (
    <main>
        <Header/>
      <SalesCarousel salesCarousel={storeData.salesCarousel} />
      <ShopByCategory categories={storeData.categories}/>
      <FeaturedProducts featuredProducts={storeData.featuredProducts}/>
      {/* Import and use other components like Categories, FeaturedProducts here */}
    </main>
  );
};

export default BabyPage;
