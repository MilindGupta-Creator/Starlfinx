'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const { getCartCount, getCartTotal } = useCart();
  const cartCount = getCartCount();
  const cartTotal = getCartTotal();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showCartPreview, setShowCartPreview] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg' 
        : 'bg-white shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                Starlfinx
              </span>
              <span className="text-xs text-gray-500 -mt-1">Premium Store</span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="relative text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium group"
            >
              Products
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            
            <Link 
              href="/cart" 
              className="relative text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium group"
            >
              Cart
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </nav>

          {/* Cart Icon with Preview */}
          <div className="relative">
            <Link 
              href="/cart" 
              className="relative flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 group"
              onMouseEnter={() => setShowCartPreview(true)}
              onMouseLeave={() => setShowCartPreview(false)}
            >
              <div className="relative">
                <svg 
                  className="w-6 h-6 text-gray-700 group-hover:text-blue-600 transition-colors duration-200" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" 
                  />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold shadow-lg animate-pulse">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </div>
              
              <div className="hidden md:block">
                <div className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors duration-200">
                  Cart
                </div>
                {cartCount > 0 && (
                  <div className="text-xs text-gray-500">
                    ${cartTotal.toFixed(2)}
                  </div>
                )}
              </div>
            </Link>

            {/* Cart Preview Dropdown */}
            {showCartPreview && cartCount > 0 && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-50">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">Cart Preview</h3>
                  <span className="text-sm text-gray-500">{cartCount} items</span>
                </div>
                
                <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
                  <div className="text-sm text-gray-600">
                    Total: <span className="font-semibold text-gray-900">${cartTotal.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Link
                    href="/cart"
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200 text-center"
                  >
                    View Cart
                  </Link>
                  <button className="px-3 py-2 text-gray-500 hover:text-gray-700 transition-colors duration-200">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation (Hidden by default) */}
      <div className="md:hidden bg-white border-t border-gray-200">
        <div className="px-4 py-2 space-y-1">
          <Link 
            href="/" 
            className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
          >
            Products
          </Link>
          <Link 
            href="/cart" 
            className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
          >
            Cart ({cartCount})
          </Link>
        </div>
      </div>
    </header>
  );
}
