import { useState } from 'react';
import { X, Plus, Minus, ShoppingBag, MapPin, CreditCard, ArrowLeft, CheckCircle2 } from 'lucide-react';
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
}

type CheckoutStep = 'cart' | 'checkout' | 'success';

export function CartSidebar({ isOpen, onClose, cartItems, onAddToCart, onRemoveFromCart, onClearCart }: CartSidebarProps) {
  const [step, setStep] = useState<CheckoutStep>('cart');
  const [address, setAddress] = useState('');
  const [billingOption, setBillingOption] = useState('cod');

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep('cart');
      if (step === 'success') {
        onClearCart();
        setAddress('');
        setBillingOption('cod');
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
                    <div className="space-y-3">
                      <button 
                        onClick={handlePlaceOrder}
                        disabled={!address.trim()}
                        className="w-full bg-[#4CAF50] text-white py-3 rounded-xl font-bold text-lg hover:bg-green-600 transition-colors shadow-md flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Place Order
                      </button>
                      <button 
                        onClick={() => {
                          const phoneNumber = "919876543210"; // Replace with actual business number
                          let message = "Hi, I would like to place an order:%0A%0A";
                          cartItems.forEach(item => {
                            message += `${item.cartQuantity}x ${item.name} - ₹${item.greenPrice * item.cartQuantity}%0A`;
                          });
                          message += `%0A*Total to Pay:* ₹${finalTotal}%0A`;
                          message += `%0A*Delivery Address:*%0A${address || 'Not provided'}`;
                          message += `%0A*Payment Method:* ${billingOption.toUpperCase()}`;
                          
                          window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
                          setStep('success');
                        }}
                        disabled={!address.trim()}
                        className="w-full bg-[#25D366] text-white py-3 rounded-xl font-bold text-lg hover:bg-[#128C7E] transition-colors shadow-md flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <svg className="w-5 h-5 mr-2 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                        Order via WhatsApp
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
