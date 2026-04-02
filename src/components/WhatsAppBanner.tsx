import { MessageCircle, ArrowRight } from 'lucide-react';

export function WhatsAppBanner() {
  return (
    <section className="py-12 mx-4 sm:mx-6 lg:mx-8 mb-16">
      <div className="max-w-7xl mx-auto bg-gradient-to-br from-[#25D366] to-[#128C7E] rounded-[3rem] p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl shadow-green-200">
        {/* Decorative Circles */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>
        
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="text-center lg:text-left max-w-xl">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-bold mb-6 border border-white/30">
              <MessageCircle className="w-4 h-4 mr-2" />
              Easy Ordering
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6">
              Order on WhatsApp—<br />
              <span className="text-green-100">Just Send Your List.</span>
            </h2>
            <p className="text-lg text-green-50/90 font-medium mb-10 leading-relaxed">
              Sabziyon ki list likhne ki zaroorat nahi, bas ek photo ya text message bhejein aur hum aapke ghar tak taaza maal pahunchayenge.
            </p>
            <a 
              href="https://wa.me/919770883796?text=Hi,%20I%20would%20like%20to%20order%20some%20fresh%20vegetables."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-white text-[#128C7E] font-extrabold rounded-2xl hover:bg-green-50 transition-all transform hover:-translate-y-1 shadow-xl"
            >
              Start Chatting
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>
          </div>
          
          <div className="relative">
            <div className="w-48 h-48 sm:w-64 sm:h-64 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md border border-white/30 animate-pulse">
              <MessageCircle className="w-24 h-24 sm:w-32 sm:h-32 text-white" strokeWidth={1.5} />
            </div>
            {/* Floating Badges */}
            <div className="absolute -top-4 -right-4 bg-amber-400 text-white p-4 rounded-2xl shadow-lg rotate-12 font-bold text-sm">
              Fast Reply!
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white text-[#128C7E] p-4 rounded-2xl shadow-lg -rotate-12 font-bold text-sm">
              9770883796
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
