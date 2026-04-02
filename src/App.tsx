import { useState, useMemo } from 'react';
import { Truck, Clock, ShieldCheck, Leaf } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { AboutUs } from './components/AboutUs';
import { CategoryNav } from './components/CategoryNav';
import { ProductCard } from './components/ProductCard';
import { CartSidebar, CartItem } from './components/CartSidebar';
import { ProductModal } from './components/ProductModal';
import { TrustBadges } from './components/TrustBadges';
import { WhatsAppBanner } from './components/WhatsAppBanner';
import { Footer } from './components/Footer';
import { PolicyModal, PolicyType } from './components/PolicyModal';
import { products, Product, Review } from './data/products';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState<Record<string, number>>({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activePolicy, setActivePolicy] = useState<PolicyType | null>(null);
  const [reviews, setReviews] = useState<Record<string, Review[]>>({
    '1': [
      { id: 'r1', rating: 5, comment: 'Very fresh potatoes, great quality!', userName: 'Priya S.', date: '2026-04-01' },
      { id: 'r2', rating: 4, comment: 'Good size and clean.', userName: 'Rahul M.', date: '2026-03-28' }
    ]
  });

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

  const handleAddReview = (productId: string, review: Omit<Review, 'id' | 'date'>) => {
    const newReview: Review = {
      ...review,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString().split('T')[0]
    };
    
    setReviews(prev => ({
      ...prev,
      [productId]: [newReview, ...(prev[productId] || [])]
    }));
  };

  const handlePolicyClick = (type: PolicyType) => {
    setActivePolicy(type);
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
        
        <CategoryNav 
          categories={categories} 
          selectedCategory={selectedCategory} 
          onSelectCategory={setSelectedCategory} 
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              {selectedCategory === 'All' ? 'Daily Deals' : selectedCategory}
            </h2>
            {selectedCategory === 'All' && (
              <span className="bg-amber-100 text-amber-700 px-4 py-1 rounded-full text-sm font-bold animate-pulse">
                Limited Time Offers!
              </span>
            )}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {filteredProducts.map(product => {
              const productReviews = reviews[product.id] || [];
              const averageRating = productReviews.length > 0 
                ? productReviews.reduce((acc, r) => acc + r.rating, 0) / productReviews.length 
                : 0;

              return (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  cartQuantity={cart[product.id] || 0}
                  onAddToCart={handleAddToCart}
                  onRemoveFromCart={handleRemoveFromCart}
                  onProductClick={setSelectedProduct}
                  averageRating={averageRating}
                  reviewCount={productReviews.length}
                />
              );
            })}
          </div>
        </div>

        <TrustBadges />

        <WhatsAppBanner />

        <AboutUs />
      </main>

      <Footer onPolicyClick={handlePolicyClick} />

      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cartItemsList}
        onAddToCart={handleAddToCart}
        onRemoveFromCart={handleRemoveFromCart}
        onClearCart={() => setCart({})}
        onPolicyClick={handlePolicyClick}
      />

      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        reviews={selectedProduct ? (reviews[selectedProduct.id] || []) : []}
        onAddReview={handleAddReview}
        cartQuantity={selectedProduct ? (cart[selectedProduct.id] || 0) : 0}
        onAddToCart={handleAddToCart}
        onRemoveFromCart={handleRemoveFromCart}
      />

      <PolicyModal 
        type={activePolicy}
        isOpen={!!activePolicy}
        onClose={() => setActivePolicy(null)}
      />

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/919770883796?text=Hi%20Green%20Parcel!%20Here%20is%20my%20grocery%20list%20for%20delivery:%0A"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#128C7E] hover:scale-110 transition-all duration-300 flex items-center justify-center group"
        aria-label="Send your list on WhatsApp"
      >
        <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        <span className="absolute right-full mr-4 bg-gray-900 text-white text-sm px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
          Send your list on WhatsApp
        </span>
      </a>
    </div>
  );
}
