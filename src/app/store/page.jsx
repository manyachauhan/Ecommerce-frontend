"use client";
import React, { useState, useEffect } from 'react';
import { Search, Filter, Grid, List, ChevronDown, Star, Heart, ShoppingBag } from 'lucide-react';
import Header from '@/app/components/Header';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

const ProductPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(true);
  const [sortBy, setSortBy] = useState('popularity');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [csrfToken, setCsrfToken] = useState(null);
  const [wishlist, setWishlist] = useState(new Set());
//   const { gender, category } = useParams();
const searchParams = useSearchParams();
const gender = searchParams.get('gender');
const category = searchParams.get('category');
const query = searchParams.get('q'); 
const [cartItems, setCartItems] = useState(new Map());


console.log("gender",gender);
console.log("category",category);
const [products, setProducts] = useState([]);


  const brands = ['Allen Solly', 'Van Heusen', 'Levi\'s', 'Fabindia', 'H&M', 'Arrow'];
  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
  const colors = ['white', 'blue', 'black', 'beige', 'navy', 'pink', 'multi'];


useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
  
      const queryParams = new URLSearchParams();
  
      // Always include filters if present
      if (query) queryParams.append('q', query);
      if (gender) queryParams.append('gender', gender);
      if (category) queryParams.append('category', category);
      if (priceRange[1]) queryParams.append('max_price', priceRange[1]);
      if (sortBy) queryParams.append('sort_by', sortBy);
  
      selectedBrands.forEach(brand => queryParams.append('brands[]', brand));
      selectedSizes.forEach(size => queryParams.append('sizes[]', size));
      selectedColors.forEach(color => queryParams.append('colors[]', color));
  
      const url = `http://127.0.0.1:8000/products/?${queryParams.toString()}`;
  
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error('Failed to fetch products');
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchProducts();
  }, [query, gender, category, priceRange, selectedBrands, selectedSizes, selectedColors, sortBy]);
  
  
  
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

  console.log("wishliast csrf",csrfToken);
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
  
  const handleBrandChange = (brand) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const handleSizeChange = (size) => {
    setSelectedSizes(prev => 
      prev.includes(size) 
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
  };

  const handleColorChange = (color) => {
    setSelectedColors(prev => 
      prev.includes(color) 
        ? prev.filter(c => c !== color)
        : [...prev, color]
    );
  };

  const ProductCard = ({ product }) => {
    const isInCart = cartItems.has(product.id);
  
    return (
      <Link href={`/products/${product.id}`}>

      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 group overflow-hidden">
        <div className="relative overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <button 
            // onClick={() => toggleWishlist(product.id)}
            onClick={(e)=>{
              e.preventDefault(); 
              e.stopPropagation(); 
              toggleWishlist(product.id);
            }}
            className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
          >
            <Heart 
              size={16} 
              className={wishlist.has(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-500'}
            />
          </button>
          {product.discount > 0 && (
            <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 text-xs font-medium rounded">
              {product.discount}% OFF
            </div>
          )}
        </div>
        
        <div className="p-4">
          <div className="text-xs text-gray-500 mb-1">{product.brand}</div>
          <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-2">{product.name}</h3>
          
          <div className="flex items-center gap-1 mb-2">
            <div className="flex items-center gap-1">
              <Star size={12} className="fill-yellow-400 text-yellow-400" />
              <span className="text-xs text-gray-600">{product.rating}</span>
            </div>
            <span className="text-xs text-gray-400">({product.reviews})</span>
          </div>
          
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm font-semibold text-gray-900">₹{product.price}</span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-gray-500 line-through">₹{product.originalPrice}</span>
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex gap-1">
              {product.colors.slice(0, 3).map((color, idx) => (
                <div 
                  key={idx}
                  className={`w-4 h-4 rounded-full border-2 border-gray-200 ${
                    color === 'white' ? 'bg-white' :
                    color === 'blue' ? 'bg-blue-500' :
                    color === 'black' ? 'bg-black' :
                    color === 'beige' ? 'bg-yellow-100' :
                    color === 'navy' ? 'bg-blue-900' :
                    color === 'pink' ? 'bg-pink-300' :
                    'bg-gradient-to-r from-red-400 via-yellow-400 to-blue-400'
                  }`}
                />
              ))}
            </div>
  
            <button 
  onClick={(e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleCart(product.id);
  }}
  className={`flex items-center gap-1 px-3 py-1.5 rounded text-xs transition-colors ${
    isInCart 
      ? 'bg-green-100 text-green-800 border border-green-500'
      : 'bg-gray-900 text-white hover:bg-gray-800'
  }`}
>
  <ShoppingBag size={12} />
  {isInCart ? 'Remove' : 'Add'}
</button>

          </div>
        </div>
      </div>
      </Link>
    );
  };
  

  

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
    <>
  <Header/>
    <div className="min-h-screen bg-gray-50">
     
        <div className="max-w-7xl mx-auto px-4 py-4">
            
          <div className="flex items-center justify-between">
            <div>
           
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-sm border text-gray-700  border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="popularity text-gray-700">Popularity</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Customer Rating</option>
                  <option value="newest">Newest First</option>
                </select>
              </div>
              
              <div className="flex items-center border border-gray-300 rounded">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-gray-900 text-white' : 'text-gray-600'}`}
                >
                  <Grid size={16} />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-gray-900 text-white' : 'text-gray-600'}`}
                >
                  <List size={16} />
                </button>
              </div>
            </div>
          </div>




        </div>


      <div className="w-full mx-auto px-6 ">
        <div className="flex gap-6 ">

          <div className={`${showFilters ? 'w-72' : 'w-0'} transition-all duration-300  overflow-hidden`}>
            <div className="bg-white rounded-lg shadow-sm p-6  sticky top-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-700">Filters</h2>
                <button 
                  onClick={() => setShowFilters(!showFilters)}
                  className="p-1 hover:bg-gray-100 text-gray-700 rounded"
                >
                  <Filter size={16} />
                </button>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-3 text-gray-700">Price Range</h3>
                <div className="space-y-3">
                  <input 
                    type="range"
                    min="0"
                    max="5000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>₹0</span>
                    <span>₹{priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Brand Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-3 text-gray-700">Brand</h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {brands.map(brand => (
                    <label key={brand} className="flex items-center text-gray-700 text-sm">
                      <input 
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => handleBrandChange(brand)}
                        className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      {brand}
                    </label>
                  ))}
                </div>
              </div>

              {/* Size Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-3 text-gray-700">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => handleSizeChange(size)}
                      className={`px-3 py-1 text-xs border rounded ${
                        selectedSizes.includes(size) 
                          ? 'bg-gray-900 text-white border-gray-900' 
                          : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-3 text-gray-700">Color</h3>
                <div className="flex flex-wrap gap-2">
                  {colors.map(color => (
                    <button
                      key={color}
                      onClick={() => handleColorChange(color)}
                      className={`w-8 h-8 rounded-full border-2 ${
                        selectedColors.includes(color) 
                          ? 'border-gray-900' 
                          : 'border-gray-300'
                      } ${
                        color === 'white' ? 'bg-white' :
                        color === 'blue' ? 'bg-blue-500' :
                        color === 'black' ? 'bg-black' :
                        color === 'beige' ? 'bg-yellow-100' :
                        color === 'navy' ? 'bg-blue-900' :
                        color === 'pink' ? 'bg-pink-300' :
                        'bg-gradient-to-r from-red-400 via-yellow-400 to-blue-400'
                      }`}
                      title={color}
                    />
                  ))}
                </div>
              </div>

              <button className="w-full bg-gray-900 text-white py-2 rounded text-sm hover:bg-gray-800 transition-colors">
                Apply Filters
              </button>
            </div>
          </div>

          <div className="flex-1  pt-6">
            {!showFilters && (
              <button 
                onClick={() => setShowFilters(true)}
                className="mb-4 flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border hover:bg-gray-50"
              >
                <Filter size={16} />
                Show Filters
              </button>
            )}
            
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1'
            }`}>
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <button className="bg-white border border-gray-300 px-6 py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                Load More Products
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ProductPage;