import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Product } from '../data/products';
import { motion, AnimatePresence } from 'motion/react';

export interface CartItem extends Product {
  cartQuantity: number;
}

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onAddToCart: (product: Product) => void;
  onRemoveFromCart: (productId: string) => void;
}

export function CartSidebar({ isOpen, onClose, cartItems, onAddToCart, onRemoveFromCart }: CartSidebarProps) {
  const itemTotal = cartItems.reduce((total, item) => total + (item.greenPrice * item.cartQuantity), 0);
  const totalMrp = cartItems.reduce((total, item) => total + (item.mrp * item.cartQuantity), 0);
  const totalDiscount = totalMrp - itemTotal;
  const deliveryFee = itemTotal > 0 && itemTotal < 200 ? 30 : 0;
  const finalTotal = itemTotal + deliveryFee;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
          />
          
          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full max-w-md bg-gray-50 shadow-xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="bg-white px-4 py-4 border-b flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900 flex items-center">
                <ShoppingBag className="w-5 h-5 mr-2" />
                My Cart ({cartItems.reduce((acc, item) => acc + item.cartQuantity, 0)} items)
              </h2>
              <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <ShoppingBag className="w-16 h-16 mb-4 text-gray-300" />
                  <p className="text-lg font-medium">Your cart is empty</p>
                  <p className="text-sm mt-1">Add items to start shopping</p>
                  <button 
                    onClick={onClose}
                    className="mt-6 bg-[#4CAF50] text-white px-6 py-2 rounded-lg font-medium hover:bg-green-600 transition-colors"
                  >
                    Browse Products
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="bg-white p-3 rounded-lg shadow-sm flex gap-4">
                    <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-800 line-clamp-1">{item.name}</h4>
                        <p className="text-xs text-gray-500">{item.quantity}</p>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="font-bold text-gray-900">₹{item.greenPrice * item.cartQuantity}</div>
                        <div className="flex items-center bg-gray-100 rounded-lg h-8 border border-gray-200">
                          <button 
                            onClick={() => onRemoveFromCart(item.id)}
                            className="w-8 h-full flex items-center justify-center text-gray-600 hover:bg-gray-200 rounded-l-lg transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center font-medium text-sm">{item.cartQuantity}</span>
                          <button 
                            onClick={() => onAddToCart(item)}
                            className="w-8 h-full flex items-center justify-center text-[#4CAF50] hover:bg-green-100 rounded-r-lg transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Bill Details & Checkout */}
            {cartItems.length > 0 && (
              <div className="bg-white border-t p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                <h3 className="font-semibold text-gray-800 mb-3">Bill Details</h3>
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Item Total</span>
                    <span className="line-through text-xs mr-1 text-gray-400">₹{totalMrp}</span>
                    <span>₹{itemTotal}</span>
                  </div>
                  {totalDiscount > 0 && (
                    <div className="flex justify-between text-[#4CAF50]">
                      <span>Green Discount</span>
                      <span>-₹{totalDiscount}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Fee</span>
                    <span>{deliveryFee === 0 ? <span className="text-[#4CAF50]">FREE</span> : `₹${deliveryFee}`}</span>
                  </div>
                  {deliveryFee > 0 && (
                    <div className="text-xs text-gray-500 italic">
                      Add ₹{200 - itemTotal} more for free delivery
                    </div>
                  )}
                  <div className="border-t pt-2 mt-2 flex justify-between font-bold text-lg text-gray-900">
                    <span>To Pay</span>
                    <span>₹{finalTotal}</span>
                  </div>
                </div>
                
                <button className="w-full bg-[#4CAF50] text-white py-3 rounded-xl font-bold text-lg hover:bg-green-600 transition-colors shadow-md flex items-center justify-center">
                  Proceed to Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
