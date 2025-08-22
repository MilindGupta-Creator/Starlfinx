'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToCart = useCallback(async () => {
    if (isAddingToCart) return;
    
    setIsAddingToCart(true);
    
    // Simulate API call delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));
    
    addToCart(product);
    setIsAddingToCart(false);
  }, [addToCart, product, isAddingToCart]);

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  const originalPrice = product.price / (1 - product.discountPercentage / 100);
  const savings = originalPrice - product.price;

  return (
    <div 
      className="group bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Image Container */}
      <div className="relative h-48 w-full overflow-hidden">
        {isImageLoading && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          className={`object-cover transition-opacity duration-300 ${
            isImageLoading ? 'opacity-0' : 'opacity-100'
          }`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onLoad={handleImageLoad}
          priority={index < 4}
        />
        
        {/* Discount Badge */}
        {product.discountPercentage > 0 && (
          <div className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg">
            -{Math.round(product.discountPercentage)}% OFF
          </div>
        )}

        

        {/* Stock Status */}
        <div className="absolute bottom-3 left-3">
          {product.stock > 0 ? (
            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
              In Stock ({product.stock})
            </span>
          ) : (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              Out of Stock
            </span>
          )}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-5 flex flex-col h-full">
        {/* Category Badge */}
        <div className="mb-2">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
            {product.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
          {product.title}
        </h3>
        
        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {product.description}
        </p>
        
        {/* Price and Rating */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            {product.discountPercentage > 0 && (
              <div className="flex flex-col">
                <span className="text-sm text-gray-500 line-through">
                  ${originalPrice.toFixed(2)}
                </span>
                <span className="text-xs text-green-600 font-medium">
                  Save ${savings.toFixed(2)}
                </span>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg 
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating) 
                      ? 'text-yellow-400' 
                      : 'text-gray-300'
                  }`} 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-gray-600 font-medium">
              {product.rating}
            </span>
          </div>
        </div>
        
        {/* Brand */}
        <div className="mb-4">
          <span className="text-sm text-gray-500">
            Brand: <span className="font-medium text-gray-700">{product.brand}</span>
          </span>
        </div>
        
        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={isAddingToCart || product.stock === 0}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 mt-auto ${
            isAddingToCart || product.stock === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 active:scale-95'
          }`}
        >
          {isAddingToCart ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Adding...</span>
            </div>
          ) : product.stock === 0 ? (
            'Out of Stock'
          ) : (
            'Add to Cart'
          )}
        </button>
      </div>

      
    </div>
  );
}
