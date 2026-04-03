import { useState } from 'react';
import { X, Plus, Minus, ShoppingBag, MapPin, CreditCard, ArrowLeft, CheckCircle2, ShieldCheck, User, Phone, Banknote, Receipt, Globe, Smartphone, Zap, ChevronRight } from 'lucide-react';
import { Product } from '../data/products';
import { motion, AnimatePresence } from 'motion/react';

declare global {
  interface Window {
    Razorpay: any;
  }
}

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
  const [billingOption, setBillingOption] = useState('upi');
  const [isAgreed, setIsAgreed] = useState(false);
  const [showUpiModal, setShowUpiModal] = useState(false);

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
    if (billingOption === 'upi') {
      setShowUpiModal(true);
      return;
    }
    if (billingOption === 'online') {
      handleRazorpayPayment();
      return;
    }
    
    sendWhatsAppOrder('PENDING (COD)');
  };

  const handleDirectUpiPayment = (app: string) => {
    // Replace this with your actual merchant UPI ID
    const upiId = "merchant@upi"; 
    const merchantName = "Fresh Grocery";
    const amount = finalTotal;
    
    const params = `pa=${upiId}&pn=${encodeURIComponent(merchantName)}&am=${amount}&cu=INR`;
    let url = '';

    if (app === 'gpay') url = `tez://upi/pay?${params}`;
    else if (app === 'phonepe') url = `phonepe://pay?${params}`;
    else if (app === 'paytm') url = `paytmmp://pay?${params}`;
    else url = `upi://pay?${params}`;

    // Open the UPI app
    window.location.href = url;
    
    // Close modal and complete order via WhatsApp
    setShowUpiModal(false);
    
    // Wait a brief moment before sending WhatsApp to allow the intent to fire
    setTimeout(() => {
      sendWhatsAppOrder(`PENDING (${app.toUpperCase()})`);
    }, 1000);
  };

  const handleRazorpayPayment = (method?: string) => {
    if (!window.Razorpay) {
      alert("Payment gateway is still loading. Please try again in a moment.");
      return;
    }

    const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;
    if (!razorpayKey) {
      alert("Payment configuration is missing. Please set VITE_RAZORPAY_KEY_ID in the environment variables.");
      return;
    }

    const options: any = {
      key: razorpayKey,
      amount: Math.round(finalTotal * 100), // amount in the smallest currency unit (paise)
      currency: "INR",
      name: "Fresh Grocery Store",
      description: "Order Payment",
      image: "https://picsum.photos/seed/grocery/200/200",
      handler: function (response: any) {
        if (response.razorpay_payment_id) {
          sendWhatsAppOrder(`PAID (${method ? method.toUpperCase() : 'ONLINE'})`, response.razorpay_payment_id);
        }
      },
      prefill: {
        name: customerName,
        contact: customerPhone,
        email: "customer@example.com", // Razorpay often requires email for UPI
      },
      theme: {
        color: "#f97316", // Match Instamart orange theme
      },
    };

    if (method === 'upi') {
      options.prefill.method = 'upi';
      options.config = {
        display: {
          blocks: {
            upi: {
              name: "Pay via UPI",
              instruments: [
                {
                  method: "upi"
                }
              ]
            }
          },
          sequence: ["block.upi"],
          preferences: {
            show_default_blocks: false // Focuses only on UPI
          }
        }
      };
    }

    try {
      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response: any) {
        console.error("Payment Failed:", response.error);
        alert(`Payment Failed: ${response.error.description || 'Unknown error occurred'}`);
      });
      rzp.open();
    } catch (error) {
      console.error("Razorpay Error:", error);
      alert("Failed to open payment gateway. Please try again.");
    }
  };

  const sendWhatsAppOrder = (paymentStatus: string, paymentId?: string) => {
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
    message += `⏳ *Payment Status:* ${paymentStatus}%0A`;
    if (paymentId) {
      message += `🆔 *Payment ID:* ${paymentId}%0A`;
    }
    
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
                  className="flex-1 flex flex-col overflow-hidden bg-gray-100"
                >
                  <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4">
                    
                    {/* Delivery Time Banner */}
                    <div className="bg-white p-4 rounded-2xl shadow-sm flex items-center gap-3">
                      <div className="bg-orange-100 p-2 rounded-full">
                        <Zap className="w-5 h-5 text-orange-500 fill-orange-500" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-sm">Delivery in 10-15 mins</h3>
                        <p className="text-xs text-gray-500">Your order will be delivered fresh and fast.</p>
                      </div>
                    </div>

                    {/* Delivery Details Section */}
                    <div className="bg-white p-4 rounded-2xl shadow-sm">
                      <h3 className="font-bold text-gray-900 mb-3 text-sm flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-gray-700" />
                        Delivery Details
                      </h3>
                      <div className="space-y-3">
                        <input 
                          type="text"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          placeholder="Full Name"
                          className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-base md:text-sm focus:ring-1 focus:ring-orange-500 focus:border-orange-500 outline-none bg-gray-50 focus:bg-white transition-colors"
                        />
                        <input 
                          type="tel"
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          placeholder="Phone Number"
                          className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-base md:text-sm focus:ring-1 focus:ring-orange-500 focus:border-orange-500 outline-none bg-gray-50 focus:bg-white transition-colors"
                        />
                        <textarea 
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="Complete Delivery Address (House No, Building, Street, Area)"
                          className="w-full border border-gray-200 rounded-xl p-3 text-base md:text-sm focus:ring-1 focus:ring-orange-500 focus:border-orange-500 outline-none resize-none h-20 bg-gray-50 focus:bg-white transition-colors"
                        />
                      </div>
                    </div>

                    {/* Items List */}
                    <div className="bg-white p-4 rounded-2xl shadow-sm">
                      <h3 className="font-bold text-gray-900 mb-3 text-sm">Review Items</h3>
                      <div className="space-y-3">
                        {cartItems.map(item => (
                          <div key={item.id} className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gray-50 rounded-lg border border-gray-100 p-1 shrink-0">
                              <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover rounded-md" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-medium text-gray-800 truncate">{item.name}</h4>
                              <p className="text-xs text-gray-500">{item.quantity}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-bold text-gray-900">₹{item.greenPrice * item.cartQuantity}</p>
                              <p className="text-xs text-gray-500">Qty: {item.cartQuantity}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bill Details */}
                    <div className="bg-white p-4 rounded-2xl shadow-sm">
                      <h3 className="font-bold text-gray-900 mb-3 text-sm">Bill Details</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between text-gray-600">
                          <span>Item Total</span>
                          <span>₹{itemTotal}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                          <span>Delivery Fee</span>
                          <span className={deliveryFee === 0 ? "text-green-600 font-medium" : ""}>
                            {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                          </span>
                        </div>
                        <div className="border-t border-dashed border-gray-200 pt-2 mt-2 flex justify-between font-bold text-gray-900">
                          <span>To Pay</span>
                          <span>₹{finalTotal}</span>
                        </div>
                      </div>
                    </div>

                    {/* Payment Method Section */}
                    <div className="bg-white p-4 rounded-2xl shadow-sm mb-4">
                      <h3 className="font-bold text-gray-900 mb-3 text-sm">Payment Method</h3>
                      <div className="space-y-2">
                        <label className={`flex items-center p-3 border rounded-xl cursor-pointer transition-all ${billingOption === 'upi' ? 'border-orange-500 bg-orange-50/30' : 'border-gray-200 hover:border-gray-300'}`}>
                          <Smartphone className={`w-5 h-5 mr-3 shrink-0 ${billingOption === 'upi' ? 'text-orange-500' : 'text-gray-400'}`} />
                          <div className="flex-1">
                            <span className="block text-sm font-medium text-gray-900">UPI</span>
                            <span className="block text-xs text-gray-500">Google Pay, PhonePe, Paytm</span>
                          </div>
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${billingOption === 'upi' ? 'border-orange-500' : 'border-gray-300'}`}>
                            {billingOption === 'upi' && <div className="w-2 h-2 bg-orange-500 rounded-full" />}
                          </div>
                        </label>

                        <label className={`flex items-center p-3 border rounded-xl cursor-pointer transition-all ${billingOption === 'online' ? 'border-orange-500 bg-orange-50/30' : 'border-gray-200 hover:border-gray-300'}`}>
                          <Globe className={`w-5 h-5 mr-3 shrink-0 ${billingOption === 'online' ? 'text-orange-500' : 'text-gray-400'}`} />
                          <div className="flex-1">
                            <span className="block text-sm font-medium text-gray-900">Cards / Netbanking</span>
                          </div>
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${billingOption === 'online' ? 'border-orange-500' : 'border-gray-300'}`}>
                            {billingOption === 'online' && <div className="w-2 h-2 bg-orange-500 rounded-full" />}
                          </div>
                        </label>

                        <label className={`flex items-center p-3 border rounded-xl cursor-pointer transition-all ${billingOption === 'cod' ? 'border-orange-500 bg-orange-50/30' : 'border-gray-200 hover:border-gray-300'}`}>
                          <Banknote className={`w-5 h-5 mr-3 shrink-0 ${billingOption === 'cod' ? 'text-orange-500' : 'text-gray-400'}`} />
                          <div className="flex-1">
                            <span className="block text-sm font-medium text-gray-900">Cash on Delivery</span>
                          </div>
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${billingOption === 'cod' ? 'border-orange-500' : 'border-gray-300'}`}>
                            {billingOption === 'cod' && <div className="w-2 h-2 bg-orange-500 rounded-full" />}
                          </div>
                        </label>
                      </div>
                    </div>

                    {/* Policy Agreement */}
                    <div className="px-1 pb-4">
                      <label className="flex items-start cursor-pointer group">
                        <div className="relative flex items-center mt-0.5 shrink-0">
                          <input 
                            type="checkbox" 
                            checked={isAgreed}
                            onChange={(e) => setIsAgreed(e.target.checked)}
                            className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                          />
                        </div>
                        <span className="ml-2 text-xs text-gray-500 leading-tight">
                          I agree to the <button onClick={() => onPolicyClick('return')} className="text-orange-500 font-medium hover:underline">Cancellation Policy</button>
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Fixed Footer */}
                  <div className="bg-white border-t p-3 md:p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-10 flex items-center justify-between gap-4">
                    <div className="flex flex-col pl-2">
                      <span className="text-xs text-gray-500 font-medium">To Pay</span>
                      <span className="text-xl font-bold text-gray-900">₹{finalTotal}</span>
                    </div>
                    <button 
                      onClick={handlePlaceOrder}
                      disabled={!customerName.trim() || !customerPhone.trim() || !address.trim() || !isAgreed}
                      className="flex-1 bg-orange-500 text-white py-3.5 rounded-xl font-bold text-base hover:bg-orange-600 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Place Order
                      <ChevronRight className="w-5 h-5 ml-1" />
                    </button>
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

          {/* UPI App Selection Modal */}
          <AnimatePresence>
            {showUpiModal && (
              <div className="fixed inset-0 bg-black/60 z-[60] flex items-end md:items-center justify-center p-4">
                <motion.div 
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 100 }}
                  className="bg-white w-full max-w-sm rounded-3xl p-5 shadow-2xl relative"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-gray-900">Pay via UPI</h3>
                    <button onClick={() => setShowUpiModal(false)} className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 transition-colors">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    <button onClick={() => handleDirectUpiPayment('gpay')} className="w-full flex items-center p-4 border border-gray-200 rounded-2xl hover:bg-gray-50 transition-colors">
                      <div className="w-10 h-10 bg-white border border-gray-100 rounded-full flex items-center justify-center shadow-sm mr-4 overflow-hidden">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="GPay" className="w-6 h-6" />
                      </div>
                      <span className="font-bold text-gray-800 text-base">Google Pay</span>
                    </button>

                    <button onClick={() => handleDirectUpiPayment('phonepe')} className="w-full flex items-center p-4 border border-gray-200 rounded-2xl hover:bg-gray-50 transition-colors">
                      <div className="w-10 h-10 bg-[#5f259f] rounded-full flex items-center justify-center shadow-sm mr-4">
                        <span className="text-white font-bold text-xl leading-none">पे</span>
                      </div>
                      <span className="font-bold text-gray-800 text-base">PhonePe</span>
                    </button>

                    <button onClick={() => handleDirectUpiPayment('paytm')} className="w-full flex items-center p-4 border border-gray-200 rounded-2xl hover:bg-gray-50 transition-colors">
                      <div className="w-10 h-10 bg-[#00baf2] rounded-full flex items-center justify-center shadow-sm mr-4">
                        <span className="text-white font-bold text-[10px] tracking-wider">Paytm</span>
                      </div>
                      <span className="font-bold text-gray-800 text-base">Paytm</span>
                    </button>

                    <div className="relative py-2">
                      <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
                      <div className="relative flex justify-center"><span className="bg-white px-4 text-xs text-gray-400 uppercase tracking-wider font-medium">Or</span></div>
                    </div>

                    <button onClick={() => handleDirectUpiPayment('other')} className="w-full flex items-center justify-center p-4 border border-gray-200 rounded-2xl hover:bg-gray-50 transition-colors">
                      <span className="font-bold text-gray-700 text-base">Other UPI Apps</span>
                    </button>
                  </div>
                  
                  <p className="text-center text-xs text-gray-500 mt-5">
                    You will be redirected to the app to complete the payment securely.
                  </p>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
}
