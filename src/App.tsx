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
      />
    </div>
  );
}
