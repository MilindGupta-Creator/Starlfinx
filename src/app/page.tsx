'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { Product } from '@/types';
import ProductCard from '@/components/ProductCard';
import SearchAndFilter from '@/components/SearchAndFilter';
import { GridSkeleton } from '@/components/LoadingSkeleton';
import ErrorBoundary from '@/components/ErrorBoundary';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Extract unique categories and brands for filtering
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(products.map(product => product.category))];
    return uniqueCategories.sort();
  }, [products]);

  const brands = useMemo(() => {
    const uniqueBrands = [...new Set(products.map(product => product.brand))];
    return uniqueBrands.sort();
  }, [products]);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulate network delay for better UX
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const response = await fetch('https://dummyjson.com/products');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setProducts(data.products);
      setFilteredProducts(data.products);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err instanceof Error ? err.message : 'Failed to load products. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleFilteredProducts = useCallback((filtered: Product[]) => {
    setFilteredProducts(filtered);
  }, []);

  const handleRetry = () => {
    fetchProducts();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <div className="h-8 bg-gray-200 rounded-lg animate-pulse mb-2 w-64"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-96"></div>
          </div>
          <GridSkeleton count={8} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="mb-6">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
              <svg className="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Products</h2>
            <p className="text-gray-600 mb-6">{error}</p>
          </div>

          <div className="space-y-3">
            <button 
              onClick={handleRetry}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
            >
              Try Again
            </button>
            
            <button 
              onClick={() => window.location.reload()} 
              className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors duration-200 font-medium"
            >
              Refresh Page
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Discover Amazing Products
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl">
              Explore our curated collection of premium products with competitive prices, 
              exclusive discounts, and exceptional quality.
            </p>
            
            {/* Stats */}
            <div className="flex flex-wrap gap-6 mt-6">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">
                  {products.length} Products Available
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600">
                  {categories.length} Categories
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="text-sm text-gray-600">
                  {brands.length} Brands
                </span>
              </div>
            </div>
          </div>

          {/* Search and Filter */}
          <SearchAndFilter
            products={products}
            onFilteredProducts={handleFilteredProducts}
            categories={categories}
            brands={brands}
          />

          {/* Products Grid */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                Products ({filteredProducts.length})
              </h2>
              {filteredProducts.length !== products.length && (
                <button
                  onClick={() => setFilteredProducts(products)}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                >
                  Clear Filters
                </button>
              )}
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product, index) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Products Found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search criteria or filters to find what you are looking for.
                </p>
                <button
                  onClick={() => setFilteredProducts(products)}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                >
                  View All Products
                </button>
              </div>
            )}
          </div>

          {/* Footer CTA */}
          {filteredProducts.length > 0 && (
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-center text-white">
              <h3 className="text-2xl font-bold mb-2">Ready to Shop?</h3>
              <p className="text-blue-100 mb-6">
                Add items to your cart and enjoy our premium shopping experience
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200">
                  Continue Shopping
                </button>
                <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-colors duration-200">
                  View Cart
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
}
