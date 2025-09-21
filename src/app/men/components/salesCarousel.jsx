
"use client";
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

// const salesCarousel = [
//   {
//     id: 1,
//     title: "MEGA SALE",
//     subtitle: "Up to 70% OFF",
//     description: "Premium Men's Collection - Limited Time Offer",
//     image: "https://plus.unsplash.com/premium_photo-1664876514393-43d54a364888?q=80&w=2912&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     discount: "70% OFF",
//     cta: "Shop Now"
//   },
//   {
//     id: 2,
//     title: "SUMMER COLLECTION",
//     subtitle: "Buy 2 Get 1 Free",
//     description: "Casual & Formal Wear for Every Occasion",
//     image: "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     discount: "Buy 2 Get 1",
//     cta: "Explore"
//   },
//   {
//     id: 3,
//     title: "NEW ARRIVALS",
//     subtitle: "Fresh Styles",
//     description: "Latest Fashion Trends for Modern Men",
//     // image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=500&fit=crop",
//     image: "https://plus.unsplash.com/premium_photo-1669688174106-05f7334f1e64?q=80&w=3164&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     discount: "30% OFF",
//     cta: "View All"
//   }
// ];

const SalesCarousel =  ({ salesCarousel })  => {
  const [currentSlide, setCurrentSlide] = useState(0);
  console.log("carousel page",salesCarousel);

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setCurrentSlide((prev) => (prev + 1) % salesCarousel.length);
  //   }, 5000);
  //   return () => clearInterval(timer);
  // }, []);

  useEffect(() => {
    if (!salesCarousel || salesCarousel.length === 0) return;
  
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % salesCarousel.length);
    }, 5000);
  
    return () => clearInterval(timer);
  }, [salesCarousel]);
  

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % salesCarousel.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + salesCarousel.length) % salesCarousel.length);
  };

  return (
    <section className="relative h-80 md:h-96 overflow-hidden">
      {salesCarousel.map((item, index) => (
        <div
          key={item.id}
          className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
            index === currentSlide ? 'translate-x-0' : 
            index < currentSlide ? '-translate-x-full' : 'translate-x-full'
          }`}
        >
          <div className="relative h-full bg-gradient-to-r from-blue-600 to-purple-700">
            <div className="absolute inset-0">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover  opacity-40"
              />
            </div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
              <div className="flex items-center h-full">
                <div className="text-white space-y-4">
                  <div className="inline-block bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {item.discount}
                  </div>
                  <h1 className="text-3xl md:text-5xl font-bold">{item.title}</h1>
                  <h2 className="text-2xl md:text-3xl font-medium">{item.subtitle}</h2>
                  <p className="text-lg opacity-90 max-w-lg">{item.description}</p>
                  <button className="bg-white text-black px-8 py-3 font-bold uppercase tracking-wide hover:bg-gray-100 transition-colors">
                    {item.cta}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {salesCarousel.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default SalesCarousel;
