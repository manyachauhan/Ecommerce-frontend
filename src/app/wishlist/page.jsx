"use client";
import React, { useState, useEffect } from 'react';
import { Heart, ShoppingCart, X, Star, Eye, Share2, Filter } from 'lucide-react';
import Header from '../components/Header';
import ProtectedRoute from '../components/ProtectedRoute';

import { useAuth } from '@/context/AuthContext';


const WishlistPage = () => {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [wishlistItems, setWishlistItems] = useState([]);
  const [csrfToken, setCsrfToken] = useState(null);
  const [cartItems, setCartItems] = useState(new Set());
  const { user } = useAuth();
  console.log("user",user);


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


  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await fetch('http://127.0.0.1:8000/products/wishlist/', {
          method: 'GET',
          credentials: 'include', // Include cookies if auth required
          headers: {
            'Content-Type': 'application/json',
            // Add Authorization if needed:
            // 'Authorization': `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error('Failed to fetch wishlist');

        const data = await res.json();

        const products = data.map(item => ({
          id: item.product.id,
          name: item.product.name,
          brand: item.product.brand,
          price: item.product.price,
          originalPrice: item.product.original_price,
          discount: item.product.discount,
          rating: item.product.rating,
          reviews: item.product.reviews,
          image: item.product.image,
          inStock: true, // You can adjust this if your backend provides it
        }));

        setWishlistItems(products);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      }
    };

    fetchWishlist();
  }, []);

 
  const removeFromWishlist = async (productId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/products/wishlist/${productId}/`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'X-CSRFToken': csrfToken,
        },
      });
  
      if (!response.ok) throw new Error('Failed to remove from wishlist');
  
      // Update local state
      setWishlistItems((prev) => prev.filter((item) => item.id !== productId));
      console.log('Removed from wishlist:', productId);
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };
  

  

  // const addToCart = async (item) => {
  //   try {
  //     const response = await fetch('http://127.0.0.1:8000/products/cart/', {
  //       method: 'POST',
  //       credentials: 'include',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'X-CSRFToken': csrfToken,
  //       },
  //       body: JSON.stringify({ product_id: item.id }),
  //     });
  
  //     if (!response.ok) throw new Error('Failed to add to cart');
  //     console.log('Added to cart:', item.name);
  //   } catch (error) {
  //     console.error('Error adding to cart:', error);
  //   }
  // };
 
  const addToCart = async (item) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/products/cart/', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
        body: JSON.stringify({ product_id: item.id }),
      });
  
      if (!response.ok) throw new Error('Failed to add to cart');
  
      console.log('Added to cart:', item.name);
  
      // Update cartItems state
      setCartItems((prev) => new Set(prev).add(item.id));
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };
  
 
  const filteredItems = wishlistItems.filter(item => {
    if (filter === 'in-stock') return item.inStock;
    if (filter === 'out-of-stock') return !item.inStock;
    return true;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });
  if (!user) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="bg-white shadow-md rounded-lg p-10 text-center max-w-md">
            <Heart className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Login Required</h2>
            <p className="text-gray-600 mb-6">
              Please login to view or add items to your wishlist.
            </p>
            <a
              href="/login"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Login Now
            </a>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
    <Header/>
    <ProtectedRoute>
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Heart className="w-8 h-8 text-red-500 fill-current" />
                My Wishlist
              </h1>
              <p className="text-gray-600 mt-1">{wishlistItems.length} items saved for later</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors">
                <Share2 className="w-4 h-4" />
                Share List
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Sort */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Filter className="w-5 h-5 text-gray-500" />
            <select 
              value={filter} 
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300  rounded-lg focus:outline-none text-black focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Items</option>
              <option value="in-stock">In Stock</option>
              <option value="out-of-stock">Out of Stock</option>
            </select>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Sort by:</span>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Wishlist Items */}
        {sortedItems.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Your wishlist is empty</h3>
            <p className="text-gray-600 mb-6">Start adding items you love to keep track of them</p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedItems.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group">
                <div className="relative">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {item.discount && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
                      -{item.discount}%
                    </div>
                  )}
                  <button 
                    onClick={() => removeFromWishlist(item.id)}
                    className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                  >
                    <X className="w-4 h-4 text-gray-600" />
                  </button>
                  {!item.inStock && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="text-white font-semibold text-lg">Out of Stock</span>
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500 font-medium">{item.brand}</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">{item.rating}</span>
                      <span className="text-sm text-gray-400">({item.reviews})</span>
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 mb-3 line-clamp-2">{item.name}</h3>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl font-bold text-gray-900">${item.price}</span>
                    {item.originalPrice && (
                      <span className="text-lg text-gray-500 line-through">${item.originalPrice}</span>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <button 
                      onClick={() => addToCart(item)}
                      // disabled={!item.inStock}
                      disabled={!item.inStock || cartItems.has(item.id)}

                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                        item.inStock 
                          ? 'bg-blue-600 text-white hover:bg-blue-700' 
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      <ShoppingCart className="w-4 h-4" />
                      {/* {item.inStock ? 'Add to Cart' : 'Out of Stock'} */}
                      {cartItems.has(item.id) ? 'Added to Cart' : 'Add to Cart'}

                    </button>
                    <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <Eye className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Continue Shopping */}
        {sortedItems.length > 0 && (
          <div className="text-center mt-12">
            <button className="bg-gray-900 text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium">
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
    </ProtectedRoute>
    </>
  );
};

export default WishlistPage;