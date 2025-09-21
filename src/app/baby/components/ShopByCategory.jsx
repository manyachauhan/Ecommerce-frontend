"use client"; // since it uses state and hooks




import React, { useState, useEffect } from 'react';
import { Search, Heart, ShoppingCart, ChevronLeft, ChevronRight, Menu, X, Star, Filter, Grid, List } from 'lucide-react';
import { useRouter } from 'next/navigation';


const ShopByCategory = ({
//   categories,
//   categorySlide,
//   prevCategorySlide,
//   nextCategorySlide,
categories
}) => {

    const [categorySlide, setCategorySlide] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();

  const handleCategoryClick = (categorySlug) => {
    // Hardcoded 'men' for example; you can dynamically change based on selected section
    // router.push(`/product/baby/${categorySlug}`);
    router.push(`/store?gender=baby&category=${categorySlug}`);
  };
  // const categories = [
  //   {
  //     id: 1,
  //     name: "Frocks",
  //     image: "https://images.unsplash.com/photo-1578461267832-60dbe4969f01?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YmFieSUyMGdpcmwlMjBmcm9ja3N8ZW58MHx8MHx8fDA%3D",
  //     count: "120+ Items",
  //     slug: "tshirts"
  //   },
  //   {
  //     id: 2,
  //     name: "Rompers",
  //     image: "https://images.unsplash.com/photo-1744424751772-15cf9a001bd7?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cm9tcGVyJTIwYmFiaWVzfGVufDB8fDB8fHww",
  //     count: "85+ Items",
  //     slug: "shirts"
  //   },
  //   {
  //     id: 3,
  //     name: "Skirts",
  //     image: "https://images.unsplash.com/photo-1662711976309-7a738f6fd307?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHNraXJ0JTIwYmFieSUyMGdpcmxzfGVufDB8fDB8fHww",
  //     count: "95+ Items",
  //     slug: "jeans"
  //   },
  //   {
  //     id: 4,
  //     name: "Sweaters",
  //     image: "https://images.unsplash.com/photo-1728720370579-e34e2a560c01?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGNoaWxkJTIwY2xvdGhlc3xlbnwwfHwwfHx8MA%3D%3D",
  //     count: "70+ Items",
  //     slug: "pants"
  //   },
  //   {
  //     id: 5,
  //     name: "Tshirts",
  //     image: "https://images.unsplash.com/photo-1604482858862-1db908a653e4?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8a2lkcyUyMGNsb3RofGVufDB8fDB8fHww",
  //     count: "45+ Items",
  //     slug: "jackets"
  //   },
  //   {
  //     id: 6,
  //     name: "Shoes",
  //     image: "https://images.unsplash.com/photo-1575479874070-d265a6e748b2?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHNob2VzJTIwYmFieXxlbnwwfHwwfHx8MA%3D%3D",
  //     count: "110+ Items",
  //     slug: "shoes"
  //   },
  //   {
  //     id: 7,
  //     name: "Accessories",
  //     image: "https://images.unsplash.com/photo-1616540732763-6a2368545a54?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGhhaXJiYW5kcyUyMGJhYnklMjBnaXJsfGVufDB8fDB8fHww",
  //     count: "60+ Items",
  //     slug: "accessories"
  //   },
  //   {
  //     id: 8,
  //     name: "Wollen collection",
  //     image: "https://images.unsplash.com/photo-1678739250880-91f47ba0ddb9?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bmlnaHQlMjBzdWl0JTIwYmFiaWVzfGVufDB8fDB8fHww",
  //     count: "80+ Items",
  //     slug: "sportswear"
  //   }
  // ];
  const nextCategorySlide = () => {
    setCategorySlide((prev) => Math.min(prev + 1, Math.ceil(categories.length / 4) - 1));
  };

  const prevCategorySlide = () => {
    setCategorySlide((prev) => Math.max(prev - 1, 0));
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Shop by Category
        </h2>

        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${categorySlide * 100}%)` }}
            >
              {Array.from({ length: Math.ceil(categories.length / 4) }).map(
                (_, slideIndex) => (
                  <div key={slideIndex} className="w-full flex-shrink-0">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      {categories
                        .slice(slideIndex * 4, slideIndex * 4 + 4)
                        .map((category) => (
                          <div
                            key={category.id}
                            onClick={() => handleCategoryClick(category.slug)}
                            className="group cursor-pointer bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-4 text-center"
                          >
                            <div className="aspect-square mb-4 overflow-hidden rounded-lg">
                              <img
                                src={category.image}
                                alt={category.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-1">
                              {category.name}
                            </h3>
                            <p className="text-sm text-gray-500">{category.count}</p>
                          </div>
                        ))}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          {categorySlide > 0 && (
            <button
              onClick={prevCategorySlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white shadow-lg p-2 rounded-full hover:bg-gray-50"
            >
              <ChevronLeft className="h-6 w-6 text-gray-600" />
            </button>
          )}

          {categorySlide < Math.ceil(categories.length / 4) - 1 && (
            <button
              onClick={nextCategorySlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white shadow-lg p-2 rounded-full hover:bg-gray-50"
            >
              <ChevronRight className="h-6 w-6 text-gray-600" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default ShopByCategory;
