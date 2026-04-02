import { ShoppingCart, Search, MapPin, User, Sprout } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
}

export function Navbar({ cartCount, onCartClick }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center text-white shadow-lg shadow-emerald-200 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
              <Sprout className="w-6 h-6" strokeWidth={2.5} />
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-slate-800">
              Green<span className="text-emerald-500 font-medium">Parcel</span>
            </span>
          </div>

          {/* Location & Search (Desktop) */}
          <div className="hidden md:flex flex-1 items-center justify-center px-8">
            <div className="flex items-center text-sm text-gray-600 mr-6 cursor-pointer hover:text-[#4CAF50] bg-gray-50 px-3 py-2 rounded-lg border border-gray-100 transition-colors">
              <MapPin className="h-4 w-4 mr-1.5 text-[#4CAF50]" />
              <span>Deliver to <strong className="text-gray-900">Jabalpur, Madhya Pradesh</strong></span>
            </div>
            <div className="max-w-lg w-full relative group">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400 group-focus-within:text-[#4CAF50] transition-colors" />
              </div>
              <input
                className="block w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-xl leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-green-500/20 focus:border-[#4CAF50] sm:text-sm transition-all"
                placeholder="Search for fresh vegetables and fruits..."
                type="search"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button className="text-gray-600 hover:text-[#4CAF50] hover:bg-green-50 p-2.5 rounded-full hidden sm:block transition-colors">
              <User className="h-6 w-6" />
            </button>
            <button 
              className="text-gray-600 hover:text-[#4CAF50] hover:bg-green-50 p-2.5 rounded-xl relative flex items-center transition-colors"
              onClick={onCartClick}
            >
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-500 rounded-full shadow-sm border-2 border-white">
                  {cartCount}
                </span>
              )}
              <span className="ml-2.5 font-bold hidden sm:block">Cart</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Search */}
      <div className="md:hidden px-4 pb-4">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400 group-focus-within:text-[#4CAF50]" />
          </div>
          <input
            className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-green-500/20 focus:border-[#4CAF50] sm:text-sm transition-all"
            placeholder="Search products..."
            type="search"
          />
        </div>
      </div>
    </nav>
  );
}
