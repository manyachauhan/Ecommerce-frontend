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

  // const categories = [
  //   {
  //     id: 1,
  //     name: "T-Shirts",
  //     image: "https://images.unsplash.com/photo-1652794121301-63e284fb31c0?q=80&w=3164&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     count: "120+ Items",
  //     slug: "tshirts"
  //   },
  //   {
  //     id: 2,
  //     name: "Shirts",
  //     image: "https://images.unsplash.com/photo-1722171783935-9940ced1e4f4?q=80&w=3047&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     count: "85+ Items",
  //     slug: "shirts"
  //   },
  //   {
  //     id: 3,
  //     name: "Jeans",
  //     image: "https://images.unsplash.com/photo-1509003124559-eb6678fe452b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     count: "95+ Items",
  //     slug: "jeans"
  //   },
  //   {
  //     id: 4,
  //     name: "Jackets",
  //     image: "https://images.unsplash.com/photo-1575383596664-30f4489f9786?q=80&w=3175&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     count: "45+ Items",
  //     slug: "jackets"
  //   },
  //   {
  //     id: 5,
  //     name: "Pants",
  //     image: "https://images.unsplash.com/photo-1616178193482-4dad15347c26?q=80&w=3136&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     count: "70+ Items",
  //     slug: "pants"
  //   },

  //   {
  //     id: 6,
  //     name: "Shoes",
  //     image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop",
  //     count: "110+ Items",
  //     slug: "shoes"
  //   },
  //   {
  //     id: 7,
  //     name: "Accessories",
  //     image: "https://plus.unsplash.com/premium_photo-1724075323544-64a09f14f80b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHdvbWVuJTIwYWNjZXNvcmllc3xlbnwwfHwwfHx8MA%3D%3D",
  //     count: "60+ Items",
  //     slug: "accessories"
  //   },
  //   {
  //     id: 8,
  //     name: "Sportswear",
  //     image: "https://images.unsplash.com/photo-1606902965551-dce093cda6e7?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c3BvcnRzJTIwd2VhcnxlbnwwfHwwfHx8MA%3D%3D",
  //     count: "80+ Items",
  //     slug: "sportswear"
  //   }
  // ];
  console.log("women categoreis",categories);
  const nextCategorySlide = () => {
    setCategorySlide((prev) => Math.min(prev + 1, Math.ceil(categories.length / 4) - 1));
  };

  const prevCategorySlide = () => {
    setCategorySlide((prev) => Math.max(prev - 1, 0));
  };


  const handleCategoryClick = (categorySlug) => {
    // Hardcoded 'men' for example; you can dynamically change based on selected section
    // router.push(`/product/women/${categorySlug}`);
    router.push(`/store?gender=women&category=${categorySlug}`);
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
