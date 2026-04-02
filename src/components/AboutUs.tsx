import { Heart, CheckCircle, Home, MapPin, Leaf, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

export function AboutUs() {
  return (
    <section id="about-us" className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          
          {/* Content Side */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-sm font-bold mb-6 border border-emerald-100">
              <Heart className="w-4 h-4 mr-2 fill-current" />
              Hamari Kahani
            </div>
            
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-4 leading-tight">
              Green Parcel ka Janm: <br />
              <span className="text-emerald-600">Mandi ki bheed nahi, Maa ka chuna hua bharosa.</span>
            </h2>
            
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                Hum sab jaante hain ki ek ghar mein sabse acchi sabzi kaun lata hai—hamari Maa. Unka sabzi chunne ka tareeka ek art hai. Woh har tamatar ko check karti hain, har dhaniya ki gaddi ko sungh kar dekhti hain, aur tabhi leti hain jab unhe poora yakeen ho ki ye unke parivaar ke liye sabse behtar hai.
              </p>
              
              <p className="font-medium text-gray-800 italic border-l-4 border-emerald-500 pl-4 bg-emerald-50/30 py-2 rounded-r-lg">
                Green Parcel ki shuruat isi soch ke saath hui.
              </p>
              
              <p>
                Jabalpur ki bhari Mandi mein bheed aur garda-ghubaar ke beech, sahi quality dhundna mushkil ho jata hai. Humne socha, kyun na wahi <span className="text-emerald-600 font-bold">'Maa wala dhyan'</span> har ghar tak pahunchaya jaye?
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="bg-emerald-100 p-2.5 rounded-xl text-emerald-600">
                  <Leaf className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Seedha Khet se</h4>
                  <p className="text-sm text-gray-500">Sabziyan khet se nikalne ke kuch hi ghanton mein aapke kitchen tak.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-emerald-100 p-2.5 rounded-xl text-emerald-600">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Strict Quality Check</h4>
                  <p className="text-sm text-gray-500">"Kya ye wahi quality hai jo ek Maa apne baccho ke liye chunti?"</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-emerald-100 p-2.5 rounded-xl text-emerald-600">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Jabalpur ka Apna</h4>
                  <p className="text-sm text-gray-500">Hum aapke apne sheher Jabalpur se hain, isliye taazgi ki ahmiyat samajhte hain.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-emerald-100 p-2.5 rounded-xl text-emerald-600">
                  <Home className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Ghar ka Sadasya</h4>
                  <p className="text-sm text-gray-500">Green Parcel sirf ek business nahi, aapke ghar ka ek zimmedar sadasya hai.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Image Side */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 lg:mt-0 relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
              <img 
                src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=800&q=80" 
                alt="Fresh farm vegetables" 
                className="w-full h-full object-cover aspect-[4/5]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/40 to-transparent"></div>
              
              {/* Floating Badge */}
              <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-emerald-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center text-white shrink-0">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-emerald-800 font-bold text-lg">Maa ka Bharosa</p>
                    <p className="text-emerald-600 text-sm">Har parcel mein wahi purani taazgi</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-emerald-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-green-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-700"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
