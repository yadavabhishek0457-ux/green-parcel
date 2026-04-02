import React from 'react';
import { Plus, Minus, Star } from 'lucide-react';
import { Product } from '../data/products';

export interface ProductCardProps {
  product: Product;
  cartQuantity: number;
  onAddToCart: (product: Product) => void;
  onRemoveFromCart: (productId: string) => void;
  onProductClick: (product: Product) => void;
  averageRating: number;
  reviewCount: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  cartQuantity, 
  onAddToCart, 
  onRemoveFromCart,
  onProductClick,
  averageRating,
  reviewCount
}) => {
  const discountPercentage = Math.round(((product.mrp - product.greenPrice) / product.mrp) * 100);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-green-900/5 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group">
      <div 
        className="relative pt-[75%] overflow-hidden cursor-pointer"
        onClick={() => onProductClick(product)}
      >
        <img
          src={product.imageUrl}
          alt={product.name}
          className="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {discountPercentage > 0 && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-sm">
            {discountPercentage}% OFF
          </div>
        )}
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-1.5">
          <div className="text-xs font-medium text-[#4CAF50] uppercase tracking-wide">{product.category}</div>
          {reviewCount > 0 && (
            <div className="flex items-center text-xs font-bold text-gray-600 bg-gray-50 px-1.5 py-0.5 rounded">
              <Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
              {averageRating.toFixed(1)}
            </div>
          )}
        </div>
        <h3 
          className="font-bold text-gray-900 mb-1 line-clamp-2 leading-tight cursor-pointer hover:text-green-700 transition-colors"
          onClick={() => onProductClick(product)}
        >
          {product.name}
        </h3>
        <div className="text-sm text-gray-500 mb-4 font-medium">{product.quantity}</div>
        
        <div className="mt-auto flex items-end justify-between">
          <div>
            <div className="text-xs text-gray-400 line-through font-medium">₹{product.mrp}</div>
            <div className="text-xl font-extrabold text-gray-900">₹{product.greenPrice}</div>
          </div>
          
          {cartQuantity > 0 ? (
            <div className="flex items-center bg-[#4CAF50] text-white rounded-xl h-10 shadow-sm shadow-green-200">
              <button 
                onClick={() => onRemoveFromCart(product.id)}
                className="w-9 h-full flex items-center justify-center hover:bg-green-600 rounded-l-xl transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center font-bold text-sm">{cartQuantity}</span>
              <button 
                onClick={() => onAddToCart(product)}
                className="w-9 h-full flex items-center justify-center hover:bg-green-600 rounded-r-xl transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => onAddToCart(product)}
              className="bg-green-50 border border-green-200 text-green-700 hover:bg-[#4CAF50] hover:text-white hover:border-[#4CAF50] font-bold rounded-xl px-5 py-2 transition-all duration-200 text-sm shadow-sm"
            >
              Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
