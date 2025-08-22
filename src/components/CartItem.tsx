'use client';

import Image from 'next/image';
import { CartItem as CartItemType } from '@/types';
import { useCart } from '@/context/CartContext';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity } = item;

  const handleQuantityChange = (newQuantity: number) => {
    updateQuantity(product.id, newQuantity);
  };

  const handleRemove = () => {
    removeFromCart(product.id);
  };

  return (
    <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm border">
      <div className="relative h-20 w-20 flex-shrink-0">
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          className="object-cover rounded-md"
          sizes="80px"
        />
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-semibold text-gray-900 truncate">
          {product.title}
        </h3>
        <p className="text-sm text-gray-600 truncate">
          {product.brand}
        </p>
        <div className="flex items-center space-x-2 mt-1">
          <span className="text-lg font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          {product.discountPercentage > 0 && (
            <span className="text-sm text-gray-500 line-through">
              ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
            </span>
          )}
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <button
          onClick={() => handleQuantityChange(quantity - 1)}
          className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors duration-200"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>
        
        <span className="w-12 text-center font-semibold text-gray-900">
          {quantity}
        </span>
        
        <button
          onClick={() => handleQuantityChange(quantity + 1)}
          className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors duration-200"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
      
      <div className="text-right">
        <div className="text-lg font-bold text-gray-900">
          ${(product.price * quantity).toFixed(2)}
        </div>
        <button
          onClick={handleRemove}
          className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors duration-200"
        >
          Remove
        </button>
      </div>
    </div>
  );
}





