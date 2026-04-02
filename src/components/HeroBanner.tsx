import { ShieldCheck } from 'lucide-react';

export function HeroBanner() {
  return (
    <div className="relative overflow-hidden rounded-3xl mx-4 sm:mx-6 lg:mx-8 mt-6 mb-10 shadow-lg border border-green-100 min-h-[400px] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          className="h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1920&q=80"
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
            <span className="block">Farm fresh to</span>
            <span className="block text-[#4CAF50] mt-1">your doorstep</span>
          </h1>
          <p className="mt-4 text-base text-blue-700 sm:mt-5 sm:text-lg md:mt-5 md:text-xl font-bold drop-shadow-sm">
            Quality wahi, jo ek maa chunti hai
          </p>
        </div>
      </div>
    </div>
  );
}
