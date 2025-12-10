
  

// 'use client';
// import React, { useState, useEffect } from "react";

// const Trending = () => {
//   const [trendingItems, setTrendingItems] = useState([]);
//   const [recentlyViewed, setRecentlyViewed] = useState([]);
//   const [csrfToken, setCsrfToken] = useState(null);

//   // Fetch trending items
//   useEffect(() => {
//     const fetchTrending = async () => {
//       try {
//         const response = await fetch("http://127.0.0.1:8000/home/trending/", {
//           credentials: "include",
//         });
//         const data = await response.json();
//         setTrendingItems(data);
//       } catch (error) {
//         console.error("Failed to fetch trending data:", error);
//       }
//     };
//     fetchTrending();
//   }, []);
//   useEffect(() => {
//     const fetchCsrfToken = async () => {
//       try {
//         const response = await fetch('http://127.0.0.1:8000/login/csrf/', {
//           credentials: 'include',
//         });
//         const data = await response.json();
//         setCsrfToken(data.csrfToken);
//       } catch (error) {
//         console.error('Error fetching CSRF token:', error);
//       }
//     };

//     fetchCsrfToken();
//   }, []);

//   // Fetch recently viewed items
//   useEffect(() => {
//     const fetchRecentlyViewed = async () => {
//       try {
//         const response = await fetch("http://127.0.0.1:8000/products/recently-viewed/", {
//           credentials: "include",
//           headers: {
//             'Content-Type': 'application/json',
//             'X-CSRFToken': csrfToken 
//           },
//         });
//         if (!response.ok) throw new Error("Not logged in or error fetching");
//         const data = await response.json();
//         setRecentlyViewed(data);
//       } catch (error) {
//         console.warn("Recently viewed not available:", error.message);
//       }
//     };
//     fetchRecentlyViewed();
//   }, []);

//   // Reusable product card
//   const ProductCard = ({ item }) => (
//     <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer h-full flex flex-col">
//       <img
//         src={item.image}
//         alt={item.name}
//         className="w-full h-80 object-cover"
//       />
//       <div className="p-4">
//         <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
//         <p className="text-sm text-gray-500">{item.category}</p>
//       </div>
//     </div>
//   );

//   return (
//     <section className="py-16 bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Trending Section */}
//         <div className="text-center mb-12">
//           <h2 className="text-3xl font-bold text-gray-900 mb-4">Trending This Week</h2>
//         </div>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-20">
//           {trendingItems.map((item, index) => (
//             <ProductCard key={index} item={item} />
//           ))}
//         </div>

//         {/* Recently Viewed Section */}
//         {recentlyViewed.length > 0 && (
//           <>
//             <div className="text-center mb-8">
//               <h2 className="text-2xl font-bold text-gray-900 mb-2">Recently Viewed</h2>
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
//               {recentlyViewed.map((item, index) => (
//                 <ProductCard key={`recent-${index}`} item={item} />
//               ))}
//             </div>
//           </>
//         )}
//       </div>
//     </section>
//   );
// };

// export default Trending;

'use client';
import React, { useState, useEffect, useRef } from "react";

const Trending = () => {
  // const [trendingItems, setTrendingItems] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [csrfToken, setCsrfToken] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef(null);
  const autoSlideRef = useRef(null);

  const trendingItems = [
    {
      id: 1,
      title: "Men's Jacket",
      category: "Men",
      image:
        "https://plus.unsplash.com/premium_photo-1673735186578-1a6cd08b8100?w=900&auto=format&fit=crop&q=60",
    },
    {
      id: 2,
      title: "Women's Dress",
      category: "Women",
      image:
        "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=3088&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "Cute Baby Outfit",
      category: "Baby",
      image:
        "https://images.unsplash.com/photo-1735417195510-72a06fce8e65?q=80&w=3087&auto=format&fit=crop",
    },
    {
      id: 4,
      title: "Fashion Accessories",
      category: "Fashion",
      image:
        "https://images.unsplash.com/photo-1569388330292-79cc1ec67270?q=80&w=2940&auto=format&fit=crop",
    },
  ];


  // Fetch trending items
  // useEffect(() => {
  //   const fetchTrending = async () => {
  //     try {
  //       const response = await fetch("http://127.0.0.1:8000/home/trending/", {
  //         credentials: "include",
  //       });
  //       const data = await response.json();
  //       setTrendingItems(data);
  //     } catch (error) {
  //       console.error("Failed to fetch trending data:", error);
  //     }
  //   };
  //   fetchTrending();
  // }, []);

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/login/csrf/', {
          credentials: 'include',
        });
        const data = await response.json();
        setCsrfToken(data.csrfToken);
      } catch (error) {
        console.error('Error fetching CSRF token:', error);
      }
    };
    fetchCsrfToken();
  }, []);

  // Fetch recently viewed items
  useEffect(() => {
    const fetchRecentlyViewed = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/products/recently-viewed/", {
          credentials: "include",
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken 
          },
        });
        if (!response.ok) throw new Error("Not logged in or error fetching");
        const data = await response.json();
        setRecentlyViewed(data);
      } catch (error) {
        console.warn("Recently viewed not available:", error.message);
      }
    };
    fetchRecentlyViewed();
  }, [csrfToken]);

  // Auto-slide functionality
  useEffect(() => {
    if (recentlyViewed.length > 4) {
      autoSlideRef.current = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % Math.ceil(recentlyViewed.length / 4));
      }, 3000); // Change slide every 3 seconds

      return () => clearInterval(autoSlideRef.current);
    }
  }, [recentlyViewed.length]);

  // Manual slide control
  const goToSlide = (slideIndex) => {
    setCurrentSlide(slideIndex);
    // Reset auto-slide timer
    if (autoSlideRef.current) {
      clearInterval(autoSlideRef.current);
      autoSlideRef.current = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % Math.ceil(recentlyViewed.length / 4));
      }, 3000);
    }
  };

  const nextSlide = () => {
    const totalSlides = Math.ceil(recentlyViewed.length / 4);
    goToSlide((currentSlide + 1) % totalSlides);
  };

  const prevSlide = () => {
    const totalSlides = Math.ceil(recentlyViewed.length / 4);
    goToSlide((currentSlide - 1 + totalSlides) % totalSlides);
  };

  // Reusable product card with enhanced styling
  const ProductCard = ({ item, isCarousel = false }) => (
    <div className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer group ${isCarousel ? 'mx-2' : ''}`}>
      <div className="relative overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors">
            <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">{item.name}</h3>
        <p className="text-sm text-gray-500 mb-3 capitalize">{item.category}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className={`w-4 h-4 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-xs text-gray-500 ml-1">(4.2)</span>
          </div>
          <button className="text-blue-600 text-sm font-medium hover:text-blue-800 transition-colors">
            View Details
          </button>
        </div>
      </div>
    </div>
  );

  const totalSlides = Math.ceil(recentlyViewed.length / 4);

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trending Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-black mb-4 bg-clip-text ">
            Trending This Week
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {trendingItems.map((item, index) => (
            <ProductCard key={index} item={item} />
          ))}
        </div>

        {/* Recently Viewed Carousel Section */}
        {recentlyViewed.length > 0 && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-black mb-2 bg-clip-text">
                  Recently Viewed
                </h2>
                <p className="text-gray-600">Continue where you left off</p>
              </div>
              
              {/* Navigation Controls */}
              {/* {recentlyViewed.length > 4 && (
                <div className="flex items-center space-x-3">
                  <button
                    onClick={prevSlide}
                    className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={nextSlide}
                    className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              )} */}
{recentlyViewed.length > 4 && (
  <div className="flex items-center space-x-3">
    <button
      onClick={prevSlide}
      className="p-3 rounded-full bg-gradient-to-r from-gray-600 to-gray-800 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    <button
      onClick={nextSlide}
      className="p-3 rounded-full bg-gradient-to-r from-gray-600 to-gray-800 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>
  </div>
)}


            </div>

            {/* Carousel Container */}
            <div className="relative overflow-hidden">
              <div 
                ref={carouselRef}
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {Array.from({ length: totalSlides }, (_, slideIndex) => (
                  <div key={slideIndex} className="w-full flex-shrink-0">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                      {recentlyViewed
                        .slice(slideIndex * 4, slideIndex * 4 + 4)
                        .map((item, index) => (
                          <ProductCard 
                            key={`recent-${slideIndex}-${index}`} 
                            item={item} 
                            isCarousel={true}
                          />
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Slide Indicators */}
            {recentlyViewed.length > 4 && (
              <div className="flex justify-center mt-8 space-x-2">
                {Array.from({ length: totalSlides }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide 
                        ? 'bg-gradient-to-r from-gray-600 to-gray-800 scale-125' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Auto-slide indicator */}
            {recentlyViewed.length > 4 && (
              <div className="flex items-center justify-center mt-4 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  {/* <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div> */}
                  {/* <span>Auto-sliding every 3 seconds</span> */}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Trending;

  