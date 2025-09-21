"use client";
import React, { useState,useEffect } from 'react';
import { ArrowLeft, ShoppingCart, Minus, Plus, X } from 'lucide-react';
import Header from '../components/Header';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProtectedRoute from '../components/ProtectedRoute';

const CartPage = () => {

  const [itemToRemove, setItemToRemove] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [csrfToken, setCsrfToken] = useState(null);
  const stripePromise = loadStripe("pk_test_51RkkH2RubHXmPfT70ljzcEbENR2smZb1DOuanOSZcmUOAWQ90TGe8ARBwh21Zh2VJxv1M0mgkPLCUrAm8mulm2qf00zpl2YzRB"); 
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

  const confirmRemoveItem = async () => {
    if (!itemToRemove) return;
    try {
      await fetch(`http://127.0.0.1:8000/products/cart/${itemToRemove.id}/`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
      });
  
      setCartItems(items => items.filter(item => item.id !== itemToRemove.id));
      setShowConfirmModal(false);
      setItemToRemove(null);
    } catch (err) {
      console.error("Error removing item:", err);
      alert("Failed to remove item from cart.");
    }
  };
  
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/products/cart/', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken
          }
        });
        const data = await response.json();
        const formatted = data.map(item => ({
          id: item.id,
          quantity: item.quantity,
          name: item.product.name,
          price: item.product.price,
          size: item.product.sizes[0], // or however you're storing selected size
          color: item.product.colors[0], // same here
          image: item.product.image,
        }));
        setCartItems(formatted);
      } catch (err) {
        console.error('Failed to fetch cart data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  


  

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const handleCheckout = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/payment/create-payment/', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
        body: JSON.stringify({
          amount: total * 100  // `total` is in ₹, convert to paisa
        })
      });
      console.log("orignal response",response);
  
      const data = await response.json();
      console.log("data json response",data);
  
      if (data.checkout_url) {
        window.location.href = data.checkout_url;
      } else {
        throw new Error(data.error || "Checkout session failed");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Something went wrong during checkout.");
    }
  };

  return (
    <>
    <Header/>
    <ProtectedRoute>
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button className="flex items-center text-gray-600 hover:text-gray-800">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Continue Shopping
          </button>
          <div className="flex items-center text-gray-800">
            <ShoppingCart className="w-6 h-6 mr-2" />
            <span className="text-xl font-semibold">Shopping Cart</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Your Items ({totalItems})
            </h2>
            
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {/* Product Image */}
                    
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                      
                      {/* Product Details */}
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 text-lg">{item.name}</h3>
                        <p className="text-gray-600 text-sm mt-1">
                          Color: {item.color} Size: {item.size}
                        </p>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center mt-3 space-x-3">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                          >
                            <Minus className="w-4 h-4 text-gray-600" />
                          </button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                          >
                            <Plus className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Price and Remove */}
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-800">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                        <div className="text-sm text-gray-500">
                          ${item.price.toFixed(2)} each
                        </div>
                      </div>
                      {/* <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-red-500 p-2"
                      >
                        <X className="w-5 h-5" />
                      </button> */}

<button
  onClick={() => {
    setItemToRemove(item);
    setShowConfirmModal(true);
  }}
  className="text-gray-400 hover:text-red-500 p-2"
>
  <X className="w-5 h-5" />
</button>

                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white mt-14 rounded-lg shadow-sm border border-gray-200 p-6 sticky top-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Order Summary</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({totalItems} items)</span>
                  <span className="font-semibold text-black">${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-green-600 font-semibold">Free</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-semibold text-black">${tax.toFixed(2)}</span>
                </div>
                
                <hr className="my-4" />
                
                <div className="flex justify-between text-xl font-bold">
                  <span className='text-gray-600'>Total</span>
                  <span className='text-black'>${total.toFixed(2)}</span>
                </div>
                
                {/* <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 mt-6">
                  Proceed to Checkout
                </button> */}
                <button
  onClick={handleCheckout}
  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 mt-6"
>
  Proceed to Checkout
</button>

                
                <p className="text-sm text-gray-500 text-center mt-4">
                  Secure checkout with SSL encryption
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-700">Secure Payment</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-700">Free Returns</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-700">24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
      {showConfirmModal && (
  <>
    {/* Overlay: covers entire screen, semi-transparent black */}
    <div className="fixed inset-0 bg-black opacity-20 z-40"></div>

    {/* Modal: centered content above overlay */}
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Remove Item</h3>
        <p className="text-gray-600 mb-6">
          Are you sure you want to remove <strong>{itemToRemove?.name}</strong> from the cart?
        </p>

        <div className="flex justify-end space-x-4">
          <button
            onClick={() => {
              setShowConfirmModal(false);
              setItemToRemove(null);
            }}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={confirmRemoveItem}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  </>
)}



    </div>
    </ProtectedRoute>
    </>
  );
};

export default CartPage;

