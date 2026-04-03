import React, { useState } from 'react';
import { X, Star, Plus, Minus, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product, Review } from '../data/products';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  reviews: Review[];
  onAddReview: (productId: string, review: Omit<Review, 'id' | 'date'>) => void;
  cartQuantity: number;
  onAddToCart: (product: Product) => void;
  onRemoveFromCart: (productId: string) => void;
}

export function ProductModal({
  product,
  isOpen,
  onClose,
  reviews,
  onAddReview,
  cartQuantity,
  onAddToCart,
  onRemoveFromCart
}: ProductModalProps) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [userName, setUserName] = useState('');

  if (!product) return null;

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim() || !userName.trim()) return;
    
    onAddReview(product.id, {
      rating,
      comment,
      userName
    });
    
    setComment('');
    setUserName('');
    setRating(5);
  };

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : '0.0';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-4xl bg-white rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-500 hover:text-gray-800 z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Product Image & Basic Info */}
            <div className="w-full md:w-1/2 bg-gray-50 flex flex-col">
              <div className="h-64 md:h-96 relative">
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
                    <p className="text-gray-500">{product.quantity}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">₹{product.greenPrice}</div>
                    <div className="text-sm text-gray-400 line-through">₹{product.mrp}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex items-center text-yellow-400">
                    <Star className="w-5 h-5 fill-current" />
                    <span className="ml-1 text-gray-700 font-bold">{averageRating}</span>
                  </div>
                  <span className="text-gray-400 text-sm">({reviews.length} reviews)</span>
                </div>

                <div className="mt-auto pt-6">
                  {cartQuantity === 0 ? (
                    <button 
                      onClick={() => onAddToCart(product)}
                      className="w-full bg-[#4CAF50] text-white py-3 rounded-xl font-bold text-lg hover:bg-green-600 transition-colors flex items-center justify-center"
                    >
                      <ShoppingBag className="w-5 h-5 mr-2" />
                      Add to Cart
                    </button>
                  ) : (
                    <div className="flex items-center justify-between bg-green-50 rounded-xl p-2 border border-green-200">
                      <button 
                        onClick={() => onRemoveFromCart(product.id)}
                        className="w-12 h-12 flex items-center justify-center text-green-700 hover:bg-green-100 rounded-lg transition-colors"
                      >
                        <Minus className="w-5 h-5" />
                      </button>
                      <span className="text-xl font-bold text-green-800">{cartQuantity}</span>
                      <button 
                        onClick={() => onAddToCart(product)}
                        className="w-12 h-12 flex items-center justify-center text-green-700 hover:bg-green-100 rounded-lg transition-colors"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="w-full md:w-1/2 flex flex-col border-t md:border-t-0 md:border-l border-gray-100 bg-white">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-xl font-bold text-gray-900">Customer Reviews</h3>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {reviews.length === 0 ? (
                  <div className="text-center text-gray-500 py-8">
                    No reviews yet. Be the first to review!
                  </div>
                ) : (
                  reviews.map(review => (
                    <div key={review.id} className="border-b border-gray-50 pb-6 last:border-0 last:pb-0">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-bold text-gray-800">{review.userName}</span>
                        <span className="text-xs text-gray-400">{review.date}</span>
                      </div>
                      <div className="flex text-yellow-400 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'text-gray-200'}`} />
                        ))}
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">{review.comment}</p>
                    </div>
                  ))
                )}
              </div>

              {/* Add Review Form */}
              <div className="p-6 bg-gray-50 border-t border-gray-100">
                <h4 className="font-bold text-gray-900 mb-4">Write a Review</h4>
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className={`p-1 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'} hover:scale-110 transition-transform`}
                        >
                          <Star className="w-6 h-6 fill-current" />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <input 
                      type="text" 
                      placeholder="Your Name" 
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-sm"
                      required
                    />
                  </div>
                  <div>
                    <textarea 
                      placeholder="What did you think about this product?" 
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-sm resize-none h-24"
                      required
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-gray-900 text-white py-2.5 rounded-lg font-bold hover:bg-gray-800 transition-colors"
                  >
                    Submit Review
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
