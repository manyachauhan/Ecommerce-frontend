// const categories = [ /* your categories array */ ];
'use client';
import React, { useState, useEffect } from "react";
const Categories = () => {

    const categories = [
        {
          title: "Men's Fashion",
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
          link: "/men"
        },
        {
          title: "Women's Fashion",
          image: "https://images.unsplash.com/photo-1511130558090-00af810c21b1?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          link: "/women"
        },
        {
          title: "Baby Fashion",
          image: "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=400&h=300&fit=crop",
          link: "/baby"
        }
      ];


    // const [categories, setCategories] = useState([]);

    //   useEffect(() => {
    //     const fetchCategories = async () => {
    //       try {
    //         const response = await fetch("http://127.0.0.1:8000/home/categories/", {
    //           credentials: "include", // Include cookies if needed
    //         });
    //         const data = await response.json();
            
    //         // Log each image URL
    //         data.forEach((item, idx) => {
    //           console.log(`Image ${idx + 1}:`, item.image);
    //         });
      
    //         setCategories(data);
    //       } catch (error) {
    //         console.error("Failed to fetch carousel data:", error);
    //       }
    //     };
      
    //     fetchCategories();
    //   }, []);
      return (
  <section className="py-16 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {categories.map((category, index) => (
          <div key={index} className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
            <img
              src={category.image}
              alt={category.title}
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors">
              <div className="absolute bottom-6 left-6">
                <h3 className="text-white text-xl font-bold">{category.title}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
      );
    };

export default Categories;
