// "use client";
// import React, { useState, useEffect } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";



// const HeroCarousel = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [carouselItems, setCarouselItems] = useState([]);
// //   const carouselItems = [
// //     {
// //       id: 1,
// //       title: "Fashion Sale",
// //       subtitle: "Minimal Menz Style",
// //       description: "Consectetur adipiscing elit. Laborum fuga incidunt laboriosam voluptas iure, molestias dignissimos facilis",
// //       image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=500&fit=crop",
// //       category: "men"
// //     },
// //     {
// //       id: 2,
// //       title: "Summer Collection",
// //       subtitle: "Women's Fashion",
// //       description: "Discover the latest trends in women's fashion with our premium collection",
// //       image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=500&fit=crop",
// //       category: "women"
// //     },
// //     {
// //       id: 3,
// //       title: "Kids Special",
// //       subtitle: "Baby Fashion",
// //       description: "Comfortable and stylish clothing for your little ones",
// //       image: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=800&h=500&fit=crop",
// //       category: "baby"
// //     }
// //   ];

// //   useEffect(() => {
// //     const timer = setInterval(() => {
// //       setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
// //     }, 5000);
// //     return () => clearInterval(timer);
// //   }, []);



// useEffect(() => {
//     const fetchCarouselData = async () => {
//       try {
//         const response = await fetch("http://127.0.0.1:8000/home/carousel/", {
//           credentials: "include", // Include cookies if needed
//         });
//         const data = await response.json();
        
//         // Log each image URL
//         data.forEach((item, idx) => {
//           console.log(`Image ${idx + 1}:`, item.image);
//         });
  
//         setCarouselItems(data);
//       } catch (error) {
//         console.error("Failed to fetch carousel data:", error);
//       }
//     };
  
//     fetchCarouselData();
//   }, []);
  

//   useEffect(() => {
//     if (carouselItems.length === 0) return;

//     const timer = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
//     }, 5000);

   
      

//     return () => clearInterval(timer);
//   }, [carouselItems]);
//   const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
//   const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);

//   return (
//     <section className="relative h-96 md:h-[500px] overflow-hidden">
//     {carouselItems.map((item, index) => (
//       <div
//         key={item.id}
//         className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
//           index === currentSlide ? 'translate-x-0' : 
//           index < currentSlide ? '-translate-x-full' : 'translate-x-full'
//         }`}
//         // className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
//         //     index === currentSlide
//         //       ? 'translate-x-0'
//         //       : index < currentSlide
//         //       ? '-translate-x-full'
//         //       : 'translate-x-full'
//         //   }`}
          
//       >
//         <div className="relative h-full bg-gradient-to-r from-gray-50 to-gray-100">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
//             <div className="flex items-center h-full">
//               <div className="w-full lg:w-1/2 space-y-6">
//                 <div className="text-pink-500 font-medium text-lg italic">
//                   {item.title}
//                 </div>
//                 <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
//                   {item.subtitle}
//                 </h1>
//                 <p className="text-gray-600 text-lg max-w-lg">
//                   {item.description}
//                 </p>
//                 <button className="bg-black text-white px-8 py-3 font-medium uppercase tracking-wide hover:bg-gray-800 transition-colors">
//                   Shop Now
//                 </button>
//               </div>
//               <div className="hidden lg:block w-1/2">
//                 <img
//                   src={item.image}
                 
//                   alt={item.subtitle}
//                   className="w-full h-96 object-cover rounded-lg"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     ))}

//     {/* Carousel Controls */}
//     <button
//       onClick={prevSlide}
//       className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-colors"
//     >
//       <ChevronLeft className="h-6 w-6 text-gray-800" />
//     </button>
//     <button
//       onClick={nextSlide}
//       className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-colors"
//     >
//       <ChevronRight className="h-6 w-6 text-gray-800" />
//     </button>

//     {/* Carousel Indicators */}
//     <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
//       {carouselItems.map((_, index) => (
//         <button
//           key={index}
//           onClick={() => setCurrentSlide(index)}
//           className={`w-3 h-3 rounded-full transition-colors ${
//             index === currentSlide ? 'bg-black' : 'bg-white/50'
//           }`}
//         />
//       ))}
//     </div>
//   </section>
//   );
// };

// export default HeroCarousel;


"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // 📌 STATIC FRONTEND DATA (Replace with whatever backend sends)
  const carouselItems = [
    {
      id: 1,
      title: "Fashion Sale",
      subtitle: "Minimal Menz Style",
      description:
        "Consectetur adipiscing elit. Laborum fuga incidunt laboriosam voluptas iure, molestias dignissimos facilis",
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=500&fit=crop",
      category: "men",
    },
    {
      id: 2,
      title: "Summer Collection",
      subtitle: "Women's Fashion",
      description:
        "Discover the latest trends in women's fashion with our premium collection",
      image:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=500&fit=crop",
      category: "women",
    },
    {
      id: 3,
      title: "Kids Special",
      subtitle: "Baby Fashion",
      description:
        "Comfortable and stylish clothing for your little ones",
      image:
        "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=800&h=500&fit=crop",
      category: "baby",
    }
  ];

  // Auto slide change
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % carouselItems.length);

  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);

  return (
    <section className="relative h-96 md:h-[500px] overflow-hidden">
      {carouselItems.map((item, index) => (
        <div
          key={item.id}
          className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
            index === currentSlide
              ? "translate-x-0"
              : index < currentSlide
              ? "-translate-x-full"
              : "translate-x-full"
          }`}
        >
          <div className="relative h-full bg-gradient-to-r from-gray-50 to-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
              <div className="flex items-center h-full">
                <div className="w-full lg:w-1/2 space-y-6">
                  <div className="text-pink-500 font-medium text-lg italic">
                    {item.title}
                  </div>

                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                    {item.subtitle}
                  </h1>

                  <p className="text-gray-600 text-lg max-w-lg">
                    {item.description}
                  </p>

                  <button className="bg-black text-white px-8 py-3 font-medium uppercase tracking-wide hover:bg-gray-800 transition-colors">
                    Shop Now
                  </button>
                </div>

                <div className="hidden lg:block w-1/2">
                  <img
                    src={item.image}
                    alt={item.subtitle}
                    className="w-full h-96 object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-colors"
      >
        <ChevronLeft className="h-6 w-6 text-gray-800" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-colors"
      >
        <ChevronRight className="h-6 w-6 text-gray-800" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {carouselItems.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? "bg-black" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
