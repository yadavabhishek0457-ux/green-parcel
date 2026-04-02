import { ShieldCheck, ShoppingBag, MessageCircle } from 'lucide-react';

export function HeroBanner() {
  return (
    <div className="relative overflow-hidden rounded-3xl mx-4 sm:mx-6 lg:mx-8 mt-6 mb-10 shadow-lg border border-green-100 min-h-[500px] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          className="h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=1920&q=80"
          alt="Fresh vegetables and fruits background"
        />
        {/* Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="sm:text-center lg:text-left max-w-2xl">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100/90 backdrop-blur-sm text-green-800 text-sm font-bold mb-6 border border-green-200 shadow-sm">
            <ShieldCheck className="w-4 h-4 mr-1.5" />
            100% Farm Fresh Guarantee
          </div>
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl leading-tight drop-shadow-sm">
            <span className="block">Khet se seedha aapki rasoi tak.</span>
            <span className="block text-[#4CAF50] mt-1">Quality wahi, jo ek Maa chunti hai.</span>
          </h1>
          <p className="mt-6 text-lg text-gray-600 sm:text-xl md:text-2xl font-medium max-w-2xl">
            Jabalpur mein har din taazi aur shuddh sabziyon ki slots-based delivery.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row gap-4 sm:justify-center lg:justify-start">
            <button className="flex items-center justify-center px-8 py-4 border border-transparent text-base font-bold rounded-2xl text-white bg-[#4CAF50] hover:bg-green-600 shadow-lg shadow-green-200 transition-all transform hover:-translate-y-1">
              <ShoppingBag className="w-5 h-5 mr-2" />
              Shop Now
            </button>
            <button className="flex items-center justify-center px-8 py-4 border-2 border-amber-500 text-base font-bold rounded-2xl text-amber-600 bg-amber-50 hover:bg-amber-100 transition-all transform hover:-translate-y-1">
              <MessageCircle className="w-5 h-5 mr-2" />
              WhatsApp Your List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
