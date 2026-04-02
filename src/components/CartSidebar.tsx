import { useState } from 'react';
import { X, Plus, Minus, ShoppingBag, MapPin, CreditCard, ArrowLeft, CheckCircle2, ShieldCheck } from 'lucide-react';
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
  onClearCart: () => void;
  onPolicyClick: (type: 'return' | 'privacy') => void;
}

type CheckoutStep = 'cart' | 'checkout' | 'success';

export function CartSidebar({ isOpen, onClose, cartItems, onAddToCart, onRemoveFromCart, onClearCart, onPolicyClick }: CartSidebarProps) {
  const [step, setStep] = useState<CheckoutStep>('cart');
  const [address, setAddress] = useState('');
  const [billingOption, setBillingOption] = useState('cod');
  const [isAgreed, setIsAgreed] = useState(false);

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep('cart');
      if (step === 'success') {
        onClearCart();
        setAddress('');
        setBillingOption('cod');
        setIsAgreed(false);
      }
    }, 300);
  };

  const itemTotal = cartItems.reduce((total, item) => total + (item.greenPrice * item.cartQuantity), 0);
  const totalMrp = cartItems.reduce((total, item) => total + (item.mrp * item.cartQuantity), 0);
  const totalDiscount = totalMrp - itemTotal;
  const deliveryFee = itemTotal > 0 && itemTotal < 200 ? 30 : 0;
  const finalTotal = itemTotal + deliveryFee;

  const handleCheckout = () => {
    setStep('checkout');
  };

  const handlePlaceOrder = () => {
    const phoneNumber = "919770883796";
    let message = "📦 *New Order from Green Parcel Website*%0A%0A";
    message += "*Order Details:*%0A";
    cartItems.forEach(item => {
      message += `• ${item.cartQuantity}x ${item.name} (${item.quantity}) - ₹${item.greenPrice * item.cartQuantity}%0A`;
    });
    message += `%0A💰 *Total Amount:* ₹${finalTotal}%0A`;
    message += `📍 *Delivery Address:*%0A${address}%0A`;
    message += `💳 *Payment Method:* ${billingOption.toUpperCase()}%0A`;
    message += `%0A_Quality wahi, jo ek Maa chunti hai._`;
    
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    setStep('success');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
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
              <AnimatePresence mode="wait">
                {step === 'checkout' ? (
                  <motion.button 
                    key="checkout" 
                    initial={{ opacity: 0, x: -10 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    exit={{ opacity: 0, x: 10 }} 
                    onClick={() => setStep('cart')} 
                    className="flex items-center text-gray-600 hover:text-gray-900"
                  >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    <h2 className="text-lg font-bold text-gray-900">Checkout</h2>
                  </motion.button>
                ) : step === 'success' ? (
                  <motion.h2 
                    key="success" 
                    initial={{ opacity: 0, x: -10 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    exit={{ opacity: 0, x: 10 }} 
                    className="text-lg font-bold text-gray-900 flex items-center"
                  >
                    Order Placed
                  </motion.h2>
                ) : (
                  <motion.h2 
                    key="cart" 
                    initial={{ opacity: 0, x: -10 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    exit={{ opacity: 0, x: 10 }} 
                    className="text-lg font-bold text-gray-900 flex items-center"
                  >
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    My Cart ({cartItems.reduce((acc, item) => acc + item.cartQuantity, 0)} items)
                  </motion.h2>
                )}
              </AnimatePresence>
              <button onClick={handleClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <AnimatePresence mode="wait">
              {step === 'success' ? (
                <motion.div 
                  key="success-step"
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="flex-1 flex flex-col items-center justify-center p-6 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
                  >
                    <CheckCircle2 className="w-20 h-20 text-green-500 mb-4" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Order Successful!</h3>
                  <p className="text-gray-600 mb-8">Your fresh groceries will be delivered soon.</p>
                  <button 
                    onClick={handleClose}
                    className="bg-[#4CAF50] text-white px-8 py-3 rounded-xl font-bold text-lg hover:bg-green-600 transition-colors shadow-md"
                  >
                    Continue Shopping
                  </button>
                </motion.div>
              ) : step === 'checkout' ? (
                <motion.div 
                  key="checkout-step"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex-1 flex flex-col overflow-hidden"
                >
                  <div className="flex-1 overflow-y-auto p-4 space-y-6">
                    {/* Address Section */}
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                      <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-[#4CAF50]" />
                        Delivery Address
                      </h3>
                      <textarea 
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Enter your full delivery address..."
                        className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none resize-none h-24"
                      />
                    </div>

                    {/* Billing Option Section */}
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                      <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                        <CreditCard className="w-4 h-4 mr-2 text-[#4CAF50]" />
                        Payment Method
                      </h3>
                      <div className="space-y-3">
                        <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                          <input 
                            type="radio" 
                            name="billing" 
                            value="cod" 
                            checked={billingOption === 'cod'}
                            onChange={() => setBillingOption('cod')}
                            className="w-4 h-4 text-green-600 focus:ring-green-500"
                          />
                          <span className="ml-3 text-sm font-medium text-gray-700">Cash on Delivery</span>
                        </label>
                        <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                          <input 
                            type="radio" 
                            name="billing" 
                            value="card" 
                            checked={billingOption === 'card'}
                            onChange={() => setBillingOption('card')}
                            className="w-4 h-4 text-green-600 focus:ring-green-500"
                          />
                          <span className="ml-3 text-sm font-medium text-gray-700">Credit / Debit Card</span>
                        </label>
                        <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                          <input 
                            type="radio" 
                            name="billing" 
                            value="upi" 
                            checked={billingOption === 'upi'}
                            onChange={() => setBillingOption('upi')}
                            className="w-4 h-4 text-green-600 focus:ring-green-500"
                          />
                          <span className="ml-3 text-sm font-medium text-gray-700">UPI (Google Pay, PhonePe)</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Place Order Footer */}
                  <div className="bg-white border-t p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                    <div className="flex justify-between font-bold text-lg text-gray-900 mb-4">
                      <span>Total to Pay</span>
                      <span>₹{finalTotal}</span>
                    </div>

                    {/* Trust Badge */}
                    <div className="flex items-center justify-center gap-2 mb-4 bg-green-50 py-2 rounded-lg border border-green-100">
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                      <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">100% Freshness Guaranteed or Money Back</span>
                    </div>

                    {/* Policy Agreement */}
                    <div className="mb-4">
                      <label className="flex items-start cursor-pointer group">
                        <div className="relative flex items-center">
                          <input 
                            type="checkbox" 
                            checked={isAgreed}
                            onChange={(e) => setIsAgreed(e.target.checked)}
                            className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                          />
                        </div>
                        <span className="ml-2 text-xs text-gray-500 leading-tight">
                          I agree to the <button onClick={() => onPolicyClick('return')} className="text-emerald-600 font-bold hover:underline">Return & Refund Policy</button>
                        </span>
                      </label>
                    </div>

                    <div className="space-y-3">
                      <button 
                        onClick={handlePlaceOrder}
                        disabled={!address.trim() || !isAgreed}
                        className="w-full bg-[#4CAF50] text-white py-3 rounded-xl font-bold text-lg hover:bg-green-600 transition-colors shadow-md flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Confirm & Place Order
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="cart-step"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex-1 flex flex-col overflow-hidden"
                >
                  {/* Cart Items */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {cartItems.length === 0 ? (
                      <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="flex flex-col items-center justify-center h-full text-gray-500"
                      >
                        <ShoppingBag className="w-16 h-16 mb-4 text-gray-300" />
                        <p className="text-lg font-medium">Your cart is empty</p>
                        <p className="text-sm mt-1">Add items to start shopping</p>
                        <button 
                          onClick={handleClose}
                          className="mt-6 bg-[#4CAF50] text-white px-6 py-2 rounded-lg font-medium hover:bg-green-600 transition-colors"
                        >
                          Browse Products
                        </button>
                      </motion.div>
                    ) : (
                      <AnimatePresence mode="popLayout">
                        {cartItems.map((item) => (
                          <motion.div 
                            layout
                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, x: -20 }}
                            transition={{ type: 'spring', bounce: 0.4, duration: 0.5 }}
                            key={item.id} 
                            className="bg-white p-3 rounded-lg shadow-sm flex gap-4"
                          >
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
                                  <motion.span 
                                    key={item.cartQuantity}
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="w-8 text-center font-medium text-sm flex items-center justify-center"
                                  >
                                    {item.cartQuantity}
                                  </motion.span>
                                  <button 
                                    onClick={() => onAddToCart(item)}
                                    className="w-8 h-full flex items-center justify-center text-[#4CAF50] hover:bg-green-100 rounded-r-lg transition-colors"
                                  >
                                    <Plus className="w-3 h-3" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    )}
                  </div>

                  {/* Bill Details & Checkout */}
                  {cartItems.length > 0 && (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white border-t p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]"
                    >
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
                      
                      <button 
                        onClick={handleCheckout}
                        className="w-full bg-[#4CAF50] text-white py-3 rounded-xl font-bold text-lg hover:bg-green-600 transition-colors shadow-md flex items-center justify-center"
                      >
                        Proceed to Checkout
                      </button>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
