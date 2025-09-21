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
    // router.push(`/product/men/${categorySlug}`);
    router.push(`/store?gender=men&category=${categorySlug}`);

  };
  console.log("categories",categories);
  // const categories = [
  //   {
  //     id: 1,
  //     name: "T-Shirts",
  //     image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop",
  //     count: "120+ Items",
  //     slug: "tshirts"
  //   },
  //   {
  //     id: 2,
  //     name: "Shirts",
  //     image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=300&h=300&fit=crop",
  //     count: "85+ Items",
  //     slug: "shirts"
  //   },
  //   {
  //     id: 3,
  //     name: "Jeans",
  //     image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=300&fit=crop",
  //     count: "95+ Items",
  //     slug: "jeans"
  //   },
  //   {
  //     id: 4,
  //     name: "Pants",
  //     image: "https://celio.in/cdn/shop/files/DOLINUS_NATURAL_1.jpg?v=1748610651",
  //     count: "70+ Items",
  //     slug: "pants"
  //   },
  //   {
  //     id: 5,
  //     name: "Jackets",
  //     image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=300&fit=crop",
  //     count: "45+ Items",
  //     slug: "jackets"
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
  //     image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop",
  //     count: "60+ Items",
  //     slug: "accessories"
  //   },
  //   {
  //     id: 8,
  //     name: "Sportswear",
  //     image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop",
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
