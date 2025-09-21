

"use client";
import React, { useState ,useEffect} from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Heart, Star, ShoppingCart, Truck, Shield, RotateCcw, ChevronLeft, ChevronRight, Plus, Minus } from 'lucide-react';
import Header from '@/app/components/Header';

const ProductPage = () => {
    const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [wishlist, setWishlist] = useState(new Set());
  const [activeTab, setActiveTab] = useState('details');
  const [product, setProduct] = useState(null); 
  const [csrfToken, setCsrfToken] = useState(null);
  const [cartItems, setCartItems] = useState(new Map());
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  console.log("product id params",id);
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

// useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const res = await fetch(`http://127.0.0.1:8000/products/${id}/`);
//         if (!res.ok) throw new Error('Failed to fetch product');
//         const data = await res.json();
//         setProduct(data);
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     if (id) fetchProduct();
//   }, [id]);

useEffect(() => {
  const fetchProduct = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/products/${id}/`, {
        credentials: 'include', // ✅ This is required to send cookies (sessionid)
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken 
        },
      });
      if (!res.ok) throw new Error('Failed to fetch product');
      const data = await res.json();
      setProduct(data);
    } catch (err) {
      console.error(err);
    }
  };

  if (id) fetchProduct();
}, [id,csrfToken]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      const res = await fetch(`http://127.0.0.1:8000/products/${id}/recommendations/`);
      const data = await res.json();
      console.log("recommendation data ",data);
      setRecommendedProducts(data);
      // setIsLoading(false);
    };

    fetchRecommendations();
  }, [id]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/products/wishlist/', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken  // Optional for GET, but doesn't hurt
          },
        });
  
        if (!response.ok) throw new Error('Failed to fetch wishlist');
        const data = await response.json();
        
        // Assuming response is a list of wishlist items with a `product` field
        const wishlistProductIds = new Set(data.map(item => item.product.id));
        setWishlist(wishlistProductIds);
      } catch (err) {
        console.error(err);
      }
    };
  
    fetchWishlist();
  }, []);



  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/products/cart/', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
          },
        });
    
        if (!response.ok) throw new Error('Failed to fetch cart');
        const data = await response.json();
    
        const cartMap = new Map();
        data.forEach(item => {
          cartMap.set(item.product.id, item.id);  // product.id => cart.id
        });
    
        setCartItems(cartMap);
      } catch (err) {
        console.error('Error fetching cart items:', err);
      }
    };
    if (csrfToken) fetchCartItems();
  }, [csrfToken]);
  
  const reviews = product?.product_reviews || [];
  if (!product) {
    return (
      <>
        <Header />
        <div className="p-10 text-center text-gray-600">Loading product...</div>
      </>
    );
  }

const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);
  };



  const toggleWishlist = async (productId) => {
    try {
      const isAlreadyWishlisted = wishlist.has(productId);
      const newWishlist = new Set(wishlist);
  
      if (!isAlreadyWishlisted) {
        // Send POST request to add to wishlist
        const response = await fetch('http://127.0.0.1:8000/products/wishlist/', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken 
          },
          
          body: JSON.stringify({ product_id:productId }),
        });
  
        if (!response.ok) throw new Error('Failed to add to wishlist');
        newWishlist.add(productId);
      } 
      else {
        // Send DELETE request to remove from wishlist
        const response = await fetch(`http://127.0.0.1:8000/products/wishlist/${productId}/`, {
          method: 'DELETE',
          credentials: 'include',
          headers: {
            'X-CSRFToken': csrfToken 
          },
        });
  
        if (!response.ok) throw new Error('Failed to remove from wishlist');
        newWishlist.delete(productId);
      }
  
  
      setWishlist(newWishlist);
    } catch (err) {
      console.error(err);
    }
  };

  // const toggleCart = async (productId) => {
  //   const isAlreadyInCart = cartItems.has(productId);
  //   const updatedCart = new Set(cartItems);
  
  //   try {
  //     if (!isAlreadyInCart) {
  //       // Add to cart via POST
  //       const response = await fetch('http://127.0.0.1:8000/products/cart/', {
  //         method: 'POST',
  //         credentials: 'include',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'X-CSRFToken': csrfToken
  //         },
  //         body: JSON.stringify({ product_id: productId })
  //       });
  
  //       if (!response.ok) throw new Error('Failed to add to cart');
  //       updatedCart.add(productId);
  //     } else {
  //       // Remove from cart via DELETE
  //       const response = await fetch(`http://127.0.0.1:8000/products/cart/${productId}/`, {
  //         method: 'DELETE',
  //         credentials: 'include',
  //         headers: {
  //           'X-CSRFToken': csrfToken
  //         }
  //       });
  
  //       if (!response.ok) throw new Error('Failed to remove from cart');
  //       updatedCart.delete(productId);
  //     }
  
  //     setCartItems(updatedCart);
  //   } catch (err) {
  //     console.error('Error toggling cart:', err);
  //   }
  // };

  const toggleCart = async (productId) => {
    const isAlreadyInCart = cartItems.has(productId);
    const updatedCart = new Map(cartItems);
  
    try {
      if (!isAlreadyInCart) {
        // Add to cart
        const response = await fetch('http://127.0.0.1:8000/products/cart/', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
          },
          body: JSON.stringify({ product_id: productId }),
        });
  
        if (!response.ok) throw new Error('Failed to add to cart');
        const newItem = await response.json(); // assuming it returns the new cart item
  
        updatedCart.set(productId, newItem.id);  // store productId -> cartItemId
      } else {
        // Remove from cart using cart item ID
        const cartItemId = cartItems.get(productId);
        const response = await fetch(`http://127.0.0.1:8000/products/cart/${cartItemId}/`, {
          method: 'DELETE',
          credentials: 'include',
          headers: {
            'X-CSRFToken': csrfToken,
          },
        });
  
        if (!response.ok) throw new Error('Failed to remove from cart');
        updatedCart.delete(productId);
      }
  
      setCartItems(updatedCart);
    } catch (err) {
      console.error('Error toggling cart:', err);
    }
  };
  
  return (
//     <>
//     <Header/>
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {/* Image Gallery */}
//           <div className="space-y-4">
//             <div className="relative group">
//               <img
//                 src={product.images[selectedImage]}
//                 alt={product.name}
//                 className="w-full h-96 lg:h-[600px] object-cover rounded-lg shadow-lg"
//               />
//               <button
//                 onClick={prevImage}
//                 className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
//               >
//                 <ChevronLeft className="w-5 h-5 text-black" />
//               </button>
//               <button
//                 onClick={nextImage}
//                 className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
//               >
//                 <ChevronRight className="w-5 h-5 text-black" />
//               </button>
//             </div>
            
//             <div className="flex space-x-2">
//               {product.images.map((image, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setSelectedImage(index)}
//                   className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
//                     selectedImage === index ? 'border-pink-500' : 'border-gray-200'
//                   }`}
//                 >
//                   <img
//                     src={image}
//                     alt={`${product.name} ${index + 1}`}
//                     className="w-full h-full object-cover"
//                   />
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Product Details */}
//           <div className="space-y-6">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
//               <p className="text-lg text-gray-600 mb-4">{product.brand}</p>
              
//               <div className="flex items-center space-x-4 mb-4">
//                 <div className="flex items-center space-x-1">
//                   <Star className="w-5 h-5 text-yellow-400 fill-current" />
//                   <span className="font-semibold text-gray-500" >{product.rating}</span>
//                   <span className="text-gray-500">({product.reviews} reviews)</span>
//                 </div>
//               </div>

//               <div className="flex items-center space-x-4 mb-6">
//                 <span className="text-3xl font-bold text-gray-900">₹{product.price}</span>
//                 <span className="text-xl text-gray-500 line-through">₹{product.originalPrice}</span>
//                 <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
//                   {product.discount}% OFF
//                 </span>
//               </div>
//             </div>

//             {/* Size Selection */}
//             <div>
//               <h3 className="text-lg font-semibold mb-3 text-black">Size</h3>
//               <div className="flex space-x-2">
//                 {product.sizes.map((size) => (
//                   <button
//                     key={size}
//                     onClick={() => setSelectedSize(size)}
//                     className={`w-12 h-12 rounded-lg border-2 font-semibold transition-all ${
//                       selectedSize === size
//                         ? 'border-pink-500 bg-pink-50 text-pink-700'
//                         : 'border-gray-200 text-gray-400 hover:border-gray-300'
//                     }`}
//                   >
//                     {size}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Quantity */}
//             <div>
//               <h3 className="text-lg font-semibold mb-3 text-black">Quantity</h3>
//               <div className="flex items-center space-x-4">
//                 <div className="flex items-center border text-gray-400 border-gray-300 rounded-lg">
//                   <button
//                     onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                     className="p-2 hover:bg-gray-100 rounded-l-lg"
//                   >
//                     <Minus className="w-4 h-4" />
//                   </button>
//                   <span className="px-4 py-2 font-semibold">{quantity}</span>
//                   <button
//                     onClick={() => setQuantity(quantity + 1)}
//                     className="p-2 hover:bg-gray-100 rounded-r-lg"
//                   >
//                     <Plus className="w-4 h-4" />
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex space-x-4">
        

// <button 
//   onClick={() => toggleCart(product.id)}
//   className="flex-1 bg-pink-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-pink-700 transition-colors flex items-center justify-center space-x-2"
// >
//   <ShoppingCart className="w-5 h-5" />
//   <span>{cartItems.has(product.id) ? 'Remove from Cart' : 'Add to Cart'}</span>

// </button>

//               <button
//                 onClick={()=>{
//                   toggleWishlist(product.id);
//                   setIsWishlisted(!isWishlisted);
//                 }
//                 }
//                 className={`p-3 rounded-lg border-2 transition-colors ${
//                   wishlist.has(product.id)
//                     ? 'border-pink-500 bg-pink-50 text-pink-600'
//                     : 'border-gray-300 text-gray-400 hover:border-gray-400'
//                 }`}
//               >
//                 <Heart className={`w-6 h-6 ${wishlist.has(product.id) ? 'fill-current' : ''}`} />
//               </button>
//             </div>



//             {/* Delivery Info */}
//             <div className="bg-white rounded-lg p-4 text-gray-600 space-y-3">
//               <div className="flex items-center space-x-3">
//                 <Truck className="w-5 h-5 text-green-600" />
//                 <span className="text-sm">Free delivery on orders above ₹999</span>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <RotateCcw className="w-5 h-5 text-blue-600" />
//                 <span className="text-sm">30-day return policy</span>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <Shield className="w-5 h-5 text-purple-600" />
//                 <span className="text-sm">100% authentic products</span>
//               </div>
//             </div>

//             <div>
//         <h2 className="text-xl font-bold mb-4">You may also like</h2>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           {recommendedProducts.map((rec) => (
//             <Link key={rec.id} href={`/products/${rec.id}`}>
//               <div className="bg-white p-3 rounded shadow hover:shadow-md transition">
//                 <img src={rec.image} alt={rec.name} className="w-full h-40 object-cover mb-2" />
//                 <div className="text-sm font-medium">{rec.name}</div>
//                 <div className="text-xs text-gray-600">{rec.brand}</div>
//                 <div className="text-sm font-semibold">₹{rec.price}</div>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>
//           </div>
//         </div>

//         {/* Product Details Tabs */}
//         <div className="mt-12">
//           <div className="border-b border-gray-200">
//             <nav className="flex space-x-8">
//               {['details', 'reviews'].map((tab) => (
//                 <button
//                   key={tab}
//                   onClick={() => setActiveTab(tab)}
//                   className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
//                     activeTab === tab
//                       ? 'border-pink-500 text-pink-600'
//                       : 'border-transparent text-gray-500 hover:text-gray-700'
//                   }`}
//                 >
//                   {tab}
//                 </button>
//               ))}
//             </nav>
//           </div>

//           <div className="mt-8">
//             {activeTab === 'details' && (
//               <div className="bg-white rounded-lg p-6">
//                 <h3 className="text-xl font-semibold mb-4 text-black">Product Details</h3>
//                 <p className="text-gray-600 mb-6">{product.description}</p>
                
//                 <h4 className="text-lg font-semibold mb-3 text-black">Features</h4>
//                 <ul className="space-y-2">
//                   {product.features.map((feature, index) => (
//                     <li key={index} className="flex items-center space-x-2">
//                       <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
//                       <span className="text-gray-700">{feature}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//             {activeTab === 'reviews' && (
//               <div className="bg-white rounded-lg p-6">
//                 <div className="flex items-center justify-between mb-6">
//                   <h3 className="text-xl font-semibold text-black">Customer Reviews</h3>
//                   <div className="flex items-center space-x-2">
//                     <Star className="w-5 h-5 text-yellow-400 fill-current" />
//                     <span className="font-semibold text-gray-500">{product.rating}</span>
//                     <span className="text-gray-500">({product.reviews} reviews)</span>
//                   </div>
//                 </div>
                
//                 <div className="space-y-6">
//                   {reviews.map((review) => (
//                     <div key={review.id} className="border-b border-gray-200 pb-4">
//                       <div className="flex items-center justify-between mb-2">
//                         <div className="flex items-center space-x-2">
//                           <span className="font-semibold text-black">{review.name}</span>
//                           <div className="flex">
//                             {[...Array(5)].map((_, i) => (
//                               <Star
//                                 key={i}
//                                 className={`w-4 h-4 ${
//                                   i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
//                                 }`}
//                               />
//                             ))}
//                           </div>
//                         </div>
//                         <span className="text-sm text-gray-500">{review.date}</span>
//                       </div>
//                       <p className="text-gray-700">{review.comment}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//     </>

<>
    <Header/>
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative group">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-96 lg:h-[600px] object-cover rounded-lg shadow-lg"
              />
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronLeft className="w-5 h-5 text-black" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronRight className="w-5 h-5 text-black" />
              </button>
            </div>
            
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index ? 'border-pink-500 ring-2 ring-pink-200' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <p className="text-lg text-gray-600 mb-4">{product.brand}</p>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="font-semibold text-gray-700">{product.rating}</span>
                  <span className="text-gray-500">({product.reviews} reviews)</span>
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-gray-900">₹{product.price}</span>
                <span className="text-xl text-gray-500 line-through">₹{product.originalPrice}</span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                  {product.discount}% OFF
                </span>
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900">Size</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-lg border-2 font-semibold transition-all ${
                      selectedSize === size
                        ? 'border-pink-500 bg-pink-50 text-pink-700'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900">Quantity</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-gray-100 text-gray-600 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-3 font-semibold text-gray-900 bg-gray-50 min-w-[60px] text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-gray-100 text-gray-600 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button 
                onClick={() => toggleCart(product.id)}
                className="flex-1 bg-pink-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-pink-700 transition-colors flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>{cartItems.has(product.id) ? 'Remove from Cart' : 'Add to Cart'}</span>
              </button>

              <button
                onClick={()=>{
                  toggleWishlist(product.id);
                  setIsWishlisted(!isWishlisted);
                }}
                className={`p-3 rounded-lg border-2 transition-all shadow-lg hover:shadow-xl ${
                  wishlist.has(product.id)
                    ? 'border-pink-500 bg-pink-50 text-pink-600'
                    : 'border-gray-300 text-gray-400 hover:border-gray-400 hover:bg-gray-50'
                }`}
              >
                <Heart className={`w-6 h-6 ${wishlist.has(product.id) ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Delivery Info */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <h4 className="font-semibold text-gray-900 mb-4">Delivery & Returns</h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-full">
                    <Truck className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="text-sm text-gray-700">Free delivery on orders above ₹999</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <RotateCcw className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="text-sm text-gray-700">30-day return policy</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-100 rounded-full">
                    <Shield className="w-5 h-5 text-purple-600" />
                  </div>
                  <span className="text-sm text-gray-700">100% authentic products</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {['details', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
                    activeTab === tab
                      ? 'border-pink-500 text-pink-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="mt-8">
            {activeTab === 'details' && (
              <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100">
                <h3 className="text-2xl font-semibold mb-6 text-gray-900">Product Details</h3>
                <p className="text-gray-600 mb-8 leading-relaxed">{product.description}</p>
                
                <h4 className="text-lg font-semibold mb-4 text-gray-900">Key Features</h4>
                <ul className="space-y-3">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700 leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-semibold text-gray-900">Customer Reviews</h3>
                  <div className="flex items-center space-x-2 bg-gray-50 px-4 py-2 rounded-full">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="font-semibold text-gray-700">{product.rating}</span>
                    <span className="text-gray-500">({product.reviews} reviews)</span>
                  </div>
                </div>
                
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-100 pb-6 last:border-b-0">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                            <span className="font-semibold text-pink-600 text-sm">{review.name.charAt(0)}</span>
                          </div>
                          <div>
                            <span className="font-semibold text-gray-900 block">{review.name}</span>
                            <div className="flex mt-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* You May Also Like Carousel Section */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">You May Also Like</h2>
              <p className="text-gray-600">Discover more products similar to your taste</p>
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={() => {
                  const container = document.getElementById('recommendations-carousel');
                  container.scrollBy({ left: -300, behavior: 'smooth' });
                }}
                className="p-2 rounded-full bg-white border border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all shadow-sm"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <button 
                onClick={() => {
                  const container = document.getElementById('recommendations-carousel');
                  container.scrollBy({ left: 300, behavior: 'smooth' });
                }}
                className="p-2 rounded-full bg-white border border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all shadow-sm"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
          
          <div 
            id="recommendations-carousel"
            className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {recommendedProducts.map((rec) => (
              <Link key={rec.id} href={`/products/${rec.id}`}>
                <div className="flex-shrink-0 w-72 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group cursor-pointer">
                  <div className="relative overflow-hidden">
                    <img 
                      src={rec.image} 
                      alt={rec.name} 
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300" 
                    />
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="p-2 bg-white/90 hover:bg-white rounded-full shadow-sm">
                        <Heart className="w-4 h-4 text-gray-600 hover:text-pink-500 transition-colors" />
                      </button>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-pink-600 transition-colors truncate">
                      {rec.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">{rec.brand}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-gray-900">₹{rec.price}</span>
                        {rec.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">₹{rec.originalPrice}</span>
                        )}
                      </div>
                      {rec.discount && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                          {rec.discount}% OFF
                        </span>
                      )}
                    </div>
                    {rec.rating && (
                      <div className="flex items-center space-x-1 mt-2">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium text-gray-700">{rec.rating}</span>
                        <span className="text-xs text-gray-500">({rec.reviews || 0})</span>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
            
            {/* Show more cards indicator */}
            <div className="flex-shrink-0 w-72 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl border-2 border-dashed border-pink-200 flex items-center justify-center group cursor-pointer hover:border-pink-300 transition-colors">
              <div className="text-center p-8">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-pink-200 transition-colors">
                  <ChevronRight className="w-8 h-8 text-pink-600" />
                </div>
                <p className="text-pink-700 font-semibold mb-1">View More</p>
                <p className="text-pink-600 text-sm">Similar Products</p>
              </div>
            </div>
          </div>
          
          {/* Scroll indicators */}
          <div className="flex justify-center mt-6 space-x-1">
            {[...Array(Math.ceil(recommendedProducts.length / 4))].map((_, i) => (
              <div key={i} className="w-2 h-2 bg-gray-300 rounded-full"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ProductPage;