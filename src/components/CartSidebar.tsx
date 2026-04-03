import { useState } from 'react';
import { X, Plus, Minus, ShoppingBag, MapPin, CreditCard, ArrowLeft, CheckCircle2, ShieldCheck, User, Phone, Banknote, Receipt } from 'lucide-react';
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
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [address, setAddress] = useState('');
  const [billingOption, setBillingOption] = useState('cod');
  const [isAgreed, setIsAgreed] = useState(false);

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep('cart');
      if (step === 'success') {
        onClearCart();
        setCustomerName('');
        setCustomerPhone('');
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
    let message = "📦 *NEW ORDER CONFIRMED*%0A%0A";
    
    message += "*Customer Details:*%0A";
    message += `👤 Name: ${customerName}%0A`;
    message += `📞 Phone: ${customerPhone}%0A`;
    message += `📍 Address: ${address}%0A%0A`;

    message += "*Order Details:*%0A";
    cartItems.forEach(item => {
      message += `• ${item.cartQuantity}x ${item.name} (${item.quantity}) - ₹${item.greenPrice * item.cartQuantity}%0A`;
    });
    
    message += `%0A💰 *Total Amount:* ₹${finalTotal}%0A`;
    message += `💳 *Payment Method:* ${billingOption.toUpperCase()}%0A`;
    message += `⏳ *Payment Status:* PENDING (COD)%0A`;
    
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
                  <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-gray-50/50">
                    {/* Mini Order Summary */}
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                      <h3 className="font-bold text-gray-800 mb-3 flex items-center text-sm uppercase tracking-wider">
                        <Receipt className="w-4 h-4 mr-2 text-[#4CAF50]" />
                        Order Summary
                      </h3>
                      <div className="flex gap-3 overflow-x-auto pb-2 snap-x hide-scrollbar">
                        {cartItems.map(item => (
                          <div key={item.id} className="snap-start shrink-0 w-16 flex flex-col items-center">
                            <div className="relative w-14 h-14 bg-gray-50 rounded-xl border border-gray-100 p-1 mb-1">
                              <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover rounded-lg" />
                              <span className="absolute -top-2 -right-2 bg-[#4CAF50] text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                                {item.cartQuantity}
                              </span>
                            </div>
                            <span className="text-[10px] text-gray-500 truncate w-full text-center">{item.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Delivery Details Section */}
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                      <h3 className="font-bold text-gray-800 mb-4 flex items-center text-sm uppercase tracking-wider">
                        <MapPin className="w-4 h-4 mr-2 text-[#4CAF50]" />
                        Delivery Details
                      </h3>
                      <div className="space-y-4">
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-4 w-4 text-gray-400" />
                          </div>
                          <input 
                            type="text"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            placeholder="Full Name"
                            className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none bg-gray-50 focus:bg-white transition-colors"
                          />
                        </div>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Phone className="h-4 w-4 text-gray-400" />
                          </div>
                          <input 
                            type="tel"
                            value={customerPhone}
                            onChange={(e) => setCustomerPhone(e.target.value)}
                            placeholder="Phone Number"
                            className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none bg-gray-50 focus:bg-white transition-colors"
                          />
                        </div>
                        <div className="relative">
                          <textarea 
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Complete Delivery Address (House No, Building, Street, Area)"
                            className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none resize-none h-24 bg-gray-50 focus:bg-white transition-colors"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Billing Option Section */}
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                      <h3 className="font-bold text-gray-800 mb-4 flex items-center text-sm uppercase tracking-wider">
                        <CreditCard className="w-4 h-4 mr-2 text-[#4CAF50]" />
                        Payment Method
                      </h3>
                      <div className="space-y-3">
                        <label className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${billingOption === 'cod' ? 'border-[#4CAF50] bg-green-50/50' : 'border-gray-100 hover:border-gray-200 bg-white'}`}>
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 ${billingOption === 'cod' ? 'border-[#4CAF50]' : 'border-gray-300'}`}>
                            {billingOption === 'cod' && <div className="w-2.5 h-2.5 bg-[#4CAF50] rounded-full" />}
                          </div>
                          <input 
                            type="radio" 
                            name="billing" 
                            value="cod" 
                            checked={billingOption === 'cod'}
                            onChange={() => setBillingOption('cod')}
                            className="hidden"
                          />
                          <div className="flex-1">
                            <span className="block text-sm font-bold text-gray-900">Cash on Delivery</span>
                            <span className="block text-xs text-gray-500 mt-0.5">Pay when your order arrives</span>
                          </div>
                          <Banknote className={`w-6 h-6 ${billingOption === 'cod' ? 'text-[#4CAF50]' : 'text-gray-400'}`} />
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Place Order Footer */}
                  <div className="bg-white border-t p-5 shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.05)] z-10">
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>Item Total</span>
                        <span>₹{itemTotal}</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>Delivery Fee</span>
                        <span className={deliveryFee === 0 ? "text-green-600 font-medium" : ""}>
                          {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                        </span>
                      </div>
                      <div className="border-t border-dashed border-gray-200 pt-2 mt-2 flex justify-between font-black text-xl text-gray-900">
                        <span>To Pay</span>
                        <span className="text-[#4CAF50]">₹{finalTotal}</span>
                      </div>
                    </div>

                    {/* Trust Badge */}
                    <div className="flex items-center justify-center gap-2 mb-4 bg-green-50/80 py-2.5 rounded-xl border border-green-100/50">
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                      <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">100% Freshness Guaranteed</span>
                    </div>

                    {/* Policy Agreement */}
                    <div className="mb-5">
                      <label className="flex items-start cursor-pointer group">
                        <div className="relative flex items-center mt-0.5">
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
                        disabled={!customerName.trim() || !customerPhone.trim() || !address.trim() || !isAgreed}
                        className="w-full bg-gradient-to-r from-[#4CAF50] to-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg shadow-green-500/30 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none transform active:scale-[0.98]"
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
