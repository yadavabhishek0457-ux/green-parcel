import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { PolicyType } from './PolicyModal';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  onPolicyClick: (type: PolicyType) => void;
}

export function Footer({ onPolicyClick }: FooterProps) {
  return (
    <footer className="bg-[#4CAF50] text-green-50 pt-20 pb-10 rounded-t-[4rem] overflow-hidden relative">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -ml-32 -mt-32 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-black/5 rounded-full -mr-32 -mb-32 blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <BrandLogo className="w-14 h-14 bg-white p-1 shadow-xl shadow-green-900/20" />
              <span className="text-3xl font-extrabold tracking-tight text-white">
                Green<span className="text-green-100 font-medium">Parcel</span>
              </span>
            </div>
            <p className="text-green-50/80 leading-relaxed font-medium">
              Mandi ki bheed nahi, Maa ka chuna hua bharosa. Delivering the freshest farm-to-table groceries across Jabalpur.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center hover:bg-white hover:text-[#4CAF50] transition-all duration-300 border border-white/20">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center hover:bg-white hover:text-[#4CAF50] transition-all duration-300 border border-white/20">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center hover:bg-white hover:text-[#4CAF50] transition-all duration-300 border border-white/20">
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-extrabold text-xl mb-8">Quick Links</h4>
            <ul className="space-y-4">
              <li><a href="#" className="font-bold hover:text-white transition-colors flex items-center group"><ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-all" /> Home</a></li>
              <li><a href="#about-us" className="font-bold hover:text-white transition-colors flex items-center group"><ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-all" /> About Us</a></li>
              <li><a href="#" className="font-bold hover:text-white transition-colors flex items-center group"><ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-all" /> Shop All</a></li>
              <li><a href="#" className="font-bold hover:text-white transition-colors flex items-center group"><ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-all" /> My Cart</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-extrabold text-xl mb-8">Support & Policies</h4>
            <ul className="space-y-4">
              <li><a href="#" className="font-bold hover:text-white transition-colors flex items-center group"><ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-all" /> Contact Us</a></li>
              <li><a href="#" className="font-bold hover:text-white transition-colors flex items-center group"><ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-all" /> Delivery Areas</a></li>
              <li>
                <button 
                  onClick={() => onPolicyClick('return')}
                  className="font-bold hover:text-white transition-colors cursor-pointer text-left w-full flex items-center group"
                >
                  <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-all" /> Return & Refund Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onPolicyClick('privacy')}
                  className="font-bold hover:text-white transition-colors cursor-pointer text-left w-full flex items-center group"
                >
                  <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-all" /> Privacy Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-extrabold text-xl mb-8">Contact Us</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold">Jabalpur, Madhya Pradesh, India</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold">+91 9770883796</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold">support@greenparcel.in</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-white/20 text-center text-sm text-green-100/60 font-bold">
          <p>© {new Date().getFullYear()} Green Parcel. All rights reserved. Made with ❤️ in Jabalpur.</p>
        </div>
      </div>
    </footer>
  );
}
