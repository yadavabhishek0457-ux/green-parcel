import { useState, useMemo } from 'react';
import { Truck, Clock, ShieldCheck, Leaf } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { CategoryNav } from './components/CategoryNav';
import { ProductCard } from './components/ProductCard';
import { CartSidebar, CartItem } from './components/CartSidebar';
import { products, Product } from './data/products';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState<Record<string, number>>({});
  const [isCartOpen, setIsCartOpen] = useState(false);

  const categories = useMemo(() => {
    const cats = new Set(products.map(p => p.category));
    return Array.from(cats);
  }, []);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All') return products;
    return products.filter(p => p.category === selectedCategory);
  }, [selectedCategory]);

  const handleAddToCart = (product: Product) => {
    setCart(prev => ({
      ...prev,
      [product.id]: (prev[product.id] || 0) + 1
    }));
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[productId] > 1) {
        newCart[productId] -= 1;
      } else {
        delete newCart[productId];
      }
      return newCart;
    });
  };

  let cartItemsCount = 0;
  for (const key in cart) {
    cartItemsCount += cart[key];
  }

  const cartItemsList: CartItem[] = useMemo(() => {
    return Object.entries(cart).map(([id, quantity]) => {
      const product = products.find(p => p.id === id)!;
      return { ...product, cartQuantity: quantity };
    });
  }, [cart]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans">
      <Navbar cartCount={cartItemsCount} onCartClick={() => setIsCartOpen(true)} />
      
      <main className="pb-24">
        <HeroBanner />
        
        {/* Features Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="bg-green-50 p-3 rounded-2xl text-[#4CAF50]">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">Free Delivery</h4>
                <p className="text-xs text-gray-500 font-medium">On orders above ₹200</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-green-50 p-3 rounded-2xl text-[#4CAF50]">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">Fast Delivery</h4>
                <p className="text-xs text-gray-500 font-medium">Within 30 minutes</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-green-50 p-3 rounded-2xl text-[#4CAF50]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">100% Fresh</h4>
                <p className="text-xs text-gray-500 font-medium">Quality guaranteed</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-green-50 p-3 rounded-2xl text-[#4CAF50]">
                <Leaf className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">Organic Options</h4>
                <p className="text-xs text-gray-500 font-medium">Farm to table</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Shop by Category</h2>
        </div>
        
        <CategoryNav 
          categories={categories} 
          selectedCategory={selectedCategory} 
          onSelectCategory={setSelectedCategory} 
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                cartQuantity={cart[product.id] || 0}
                onAddToCart={handleAddToCart}
                onRemoveFromCart={handleRemoveFromCart}
              />
            ))}
          </div>
        </div>
      </main>

      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cartItemsList}
        onAddToCart={handleAddToCart}
        onRemoveFromCart={handleRemoveFromCart}
        onClearCart={() => setCart({})}
      />

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/919876543210?text=Hi,%20I%20have%20a%20query%20about%20your%20products."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#128C7E] hover:scale-110 transition-all duration-300 flex items-center justify-center group"
        aria-label="Chat on WhatsApp"
      >
        <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        <span className="absolute right-full mr-4 bg-gray-900 text-white text-sm px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
          Order on WhatsApp
        </span>
      </a>
    </div>
  );
}
