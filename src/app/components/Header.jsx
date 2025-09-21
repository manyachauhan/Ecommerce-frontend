"use client";
import React, { useState ,useEffect} from "react";
import { useRouter } from 'next/navigation';
import { Search, Heart, ShoppingCart, Menu, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";


const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Men', href: '/men' },
  { name: 'Women', href: '/women' },
  { name: 'Baby Collection', href: '/baby' }
];

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const router = useRouter();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [csrfToken, setCsrfToken] = useState(null);
  const [query, setQuery] = useState('');
  const { logout } = useAuth();


  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && query.trim()) {
      router.push(`/store?q=${encodeURIComponent(query)}`);

    }
  };

  const handleClick = () => {
    setLiked(!liked);
    router.push('/wishlist');
  };
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
  const handleLogout = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/login/logout/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken || '',
        },
        credentials: 'include', // Required for cookies to be sent
     
      });
console.log("response",response);
      if (response.ok) {
        const data = await response.json();
        logout();
        console.log("response data",data);
        console.log('Logout successful:', data);
        router.push("/login");
        // redirect or update UI here
      } else {
        const errorData = await response.json();
        console.error('Login failed:', errorData);
        alert('Login failed: ' + errorData.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };


  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
    {/* Top Header */}
    {/* <div className="border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-2 text-sm text-gray-600">
          <div className="flex space-x-4">
            <a href="#" className="hover:text-gray-900">About Us</a>
            <a href="#" className="hover:text-gray-900">Privacy</a>
            <a href="#" className="hover:text-gray-900">FAQ</a>
            <a href="#" className="hover:text-gray-900">Careers</a>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-gray-900">My Wishlist</a>
            <a href="#" className="hover:text-gray-900">Track Your Order</a>
          </div>
        </div>
      </div>
    </div> */}

    {/* Main Header */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center py-4">
        {/* Logo */}
        <div className="flex items-center">
          <div className="text-2xl font-bold text-gray-900">
            StyleHub
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Right Side Icons */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="hidden lg:flex items-center bg-gray-100 rounded-full px-4 py-2">
            <Search className="h-4 w-4 text-gray-500 mr-2" />
            {/* <input
              type="text"
              placeholder="Search products..."
              className="bg-transparent outline-none text-sm w-48"
            /> */}
               <input
        type="text"
        placeholder="Search products..."
        className="bg-transparent outline-none text-sm text-black w-48"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyPress}
      />
          </div>
          
          {/* Search Icon for smaller screens */}
          <button className="lg:hidden p-2 hover:bg-gray-100 rounded-full">
            <Search className="h-5 w-5 text-gray-600" />
          </button>

            <div className="relative inline-block group">
      <button
        className={`p-2 rounded-full relative transition-colors duration-300 ${
          liked ? "text-red-600 bg-red-300" : "text-gray-600 hover:text-red-600"
        }`}
        onClick={handleClick}
        aria-label="Go to wishlist"
      >
        <Heart className="h-5 w-5" />
      </button>

      {/* Tooltip */}
      <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Wishlist
      </span>
    </div>

          {/* Cart */}
          <button className="p-2 hover:bg-gray-100 rounded-full relative"
          onClick={()=>router.push('/cart')}
          >
            <ShoppingCart className="h-5 w-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              0
            </span>
          </button>

          {/* Avatar with dropdown */}
<div className="relative">
  <button
    onClick={() => setShowUserMenu((prev) => !prev)}
    className="ml-2 mt-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
  >
    <img
      src="/profile.png" // replace with actual user image or default avatar
      alt="User Avatar"
      className="w-12 h-12 rounded-full object-cover"
    />
  </button>

  {/* Dropdown */}
  {showUserMenu && (
    <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-50">
      <button
        onClick={() => {
          setShowUserMenu(false);
          router.push("/login"); // ✅ redirect to login page
        }}
        className="w-full text-left px-4 py-2 text-sm text-black hover:bg-gray-100"
      >
        Login
      </button>
      <button

          onClick={handleLogout}
        // }}
        className="w-full text-left px-4 py-2 text-black text-sm hover:bg-gray-100"
      >
        Logout
      </button>
    </div>
  )}
</div>


          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-gray-100 rounded-full"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5 text-gray-600" />
            ) : (
              <Menu className="h-5 w-5 text-gray-600" />
            )}
          </button>
        </div>
      </div>
    </div>

    {/* Mobile Menu */}
    {isMobileMenuOpen && (
      <div className="md:hidden bg-white border-t border-gray-200">
        <nav className="px-4 py-4 space-y-2">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="block py-2 text-gray-700 hover:text-gray-900 font-medium"
            >
              {item.name}
            </a>
          ))}
        </nav>
      </div>
    )}
  </header>
  );
};

export default Header;
