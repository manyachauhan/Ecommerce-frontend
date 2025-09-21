"use client";


import { Filter, Grid, List, Heart } from "lucide-react";



import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';


const FeaturedProducts = ({

  featuredProducts
}) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [viewMode, setViewMode] = useState('grid');
    const [selectedCategory, setSelectedCategory] = useState('all');
console.log(" womenfeatured product",featuredProducts);

    // const featuredProducts = [
    //     {
    //       id: 1,
    //       name: "Classic Denim Jacket",
    //       price: "$89.99",
    //       originalPrice: "$129.99",
    //       image: "https://images.unsplash.com/photo-1630417250655-a2e072d77ea5?q=80&w=3135&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //       rating: 4.5,
    //       reviews: 124,
    //       badge: "SALE"
    //     },
    //     {
    //       id: 2,
    //       name: "Premium Cotton T-Shirt",
    //       price: "$29.99",
    //       originalPrice: "$39.99",
    //       image: "https://images.unsplash.com/photo-1652794118671-c56680d1a8f7?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dHNoaXJ0cyUyMHdvbWVuJTIwbW9kZWx8ZW58MHx8MHx8fDA%3D",
    //       rating: 4.8,
    //       reviews: 89,
    //       badge: "HOT"
    //     },
    //     {
    //       id: 3,
    //       name: "Slim Fit Formal Shirt",
    //       price: "$49.99",
    //       originalPrice: "$69.99",
    //       image: "https://images.unsplash.com/photo-1600089286015-fa904ad1b4bf?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNoaXJ0cyUyMHdvbWVufGVufDB8fDB8fHww",
    //       rating: 4.6,
    //       reviews: 156,
    //       badge: "NEW"
    //     },
    //     {
    //       id: 4,
    //       name: "Casual Chino Pants",
    //       price: "$59.99",
    //       originalPrice: "$79.99",
    //       image: "https://images.unsplash.com/photo-1746729769934-c62c0b54bd25?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cGFudHMlMjB3b21lbnxlbnwwfHwwfHx8MA%3D%3D",
    //       rating: 4.4,
    //       reviews: 92,
    //       badge: "SALE"
    //     },
    //     {
    //       id: 5,
    //       name: "Leather Sneakers",
    //       price: "$99.99",
    //       originalPrice: "$139.99",
    //       image: "https://images.unsplash.com/photo-1732708875657-814b6a6fd8fe?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c2hvZXMlMjB3b21lbnxlbnwwfHwwfHx8MA%3D%3D",
    //       rating: 4.7,
    //       reviews: 203,
    //       badge: "TRENDING"
    //     },
    //     {
    //       id: 6,
    //       name: "Athletic Hoodie",
    //       price: "$69.99",
    //       originalPrice: "$89.99",
    //       image: "https://plus.unsplash.com/premium_photo-1674420731085-d9477e051a3e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Z3ltJTIwd2VhcnxlbnwwfHwwfHx8MA%3D%3D",
    //       rating: 4.3,
    //       reviews: 67,
    //       badge: "SALE"
    //     }
    //   ];
    
      
    const renderStars = (rating) => {
        return [...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ));
      };
  return (
    <>
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>

          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
              <Filter className="h-5 w-5" />
              <span>Filter</span>
            </button>
            <div className="flex rounded-lg border border-gray-300">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 ${viewMode === "grid" ? "bg-gray-100" : ""}`}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 ${viewMode === "list" ? "bg-gray-100" : ""}`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <div
          className={`grid gap-6 ${
            viewMode === "grid"
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : "grid-cols-1"
          }`}
        >
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow group"
            >
              <div className="relative aspect-square overflow-hidden rounded-t-lg">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 left-2">
                  <span
                    className={`px-2 py-1 text-xs font-bold text-white rounded ${
                      product.badge === "SALE"
                        ? "bg-red-500"
                        : product.badge === "NEW"
                        ? "bg-green-500"
                        : product.badge === "HOT"
                        ? "bg-orange-500"
                        : "bg-purple-500"
                    }`}
                  >
                    {product.badge}
                  </span>
                </div>
                <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50">
                  <Heart className="h-4 w-4 text-gray-600" />
                </button>
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    {renderStars(product.rating)}
                  </div>
                  <span className="ml-2 text-sm text-gray-500">
                    ({product.reviews})
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-gray-900">
                      {product.price}
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      {product.originalPrice}
                    </span>
                  </div>
                  <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-black text-white px-8 py-3 font-medium uppercase tracking-wide hover:bg-gray-800 transition-colors">
            View All Products
          </button>
        </div>
      </div>
    </section>

<section className="py-16 bg-white">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Popular Brands</h2>
  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
    {['Nike', 'Adidas', 'Puma', 'Levi\'s', 'H&M', 'Zara'].map((brand, index) => (
      <div key={index} className="bg-gray-100 rounded-lg p-6 text-center hover:bg-gray-200 transition-colors cursor-pointer">
        <div className="text-2xl font-bold text-gray-600">{brand}</div>
      </div>
    ))}
  </div>
</div>
</section>
</>
  );
};

export default FeaturedProducts;
