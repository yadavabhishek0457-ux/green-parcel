import React from 'react';
import { X, ShieldCheck, RefreshCcw, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export type PolicyType = 'return' | 'privacy';

interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: PolicyType;
}

export function PolicyModal({ isOpen, onClose, type }: PolicyModalProps) {
  const policies = {
    return: {
      title: 'Return & Refund Policy',
      icon: <RefreshCcw className="w-8 h-8 text-emerald-500" />,
      content: (
        <div className="space-y-6 text-gray-600">
          <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
            <p className="font-bold text-emerald-800 text-center italic">"Quality wahi, jo ek Maa chunti hai"</p>
          </div>
          
          <section>
            <h4 className="font-bold text-gray-900 mb-2 flex items-center">
              <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
              1. Return & Replacement Policy
            </h4>
            <p className="mb-3">Hum samajhte hain ki taaza sabziyon ki quality sabse zaroori hai. Agar aap hamari delivery se 100% santusht (satisfied) nahi hain, toh hum use thik karenge:</p>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li><strong>Turant Check Karein:</strong> Delivery ke samay hi apna parcel check karein. Agar koi sabzi ya phal kharab, daagi (bruised), ya galat hai, toh aap use usi waqt delivery partner ko wapas kar sakte hain.</li>
              <li><strong>2-Hour Window:</strong> Agar aapne delivery ke baad koi kami dekhi, toh kripya delivery ke 2 ghante ke andar humein hamare WhatsApp number <strong>(+91 9770883796)</strong> par photo ke saath batayein.</li>
              <li><strong>No Questions Asked Replacement:</strong> Agar hamari taraf se quality mein kami hai, toh hum bina kisi sawal ke agle delivery slot mein aapko Free Replacement denge.</li>
            </ul>
          </section>

          <section>
            <h4 className="font-bold text-gray-900 mb-2 flex items-center">
              <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
              2. Refund Policy
            </h4>
            <p className="mb-3">Agar Replacement mumkin nahi hai ya aapne order cancel kiya hai:</p>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li><strong>Prepaid Orders:</strong> Agar aapne online payment kiya hai aur item available nahi tha ya wapas kiya gaya hai, toh refund aapke original payment method (UPI/Bank) mein 24-48 ghante mein credit ho jayega.</li>
              <li><strong>Wallet/Credit:</strong> Aap chahein toh refund amount apne Green Parcel Wallet mein bhi le sakte hain, jise aap agle order mein turant use kar sakte hain.</li>
              <li><strong>Cancellation:</strong> Order pack hone se pehle (Delivery slot se 2 ghante pehle) aap apna order bina kisi charge ke cancel kar sakte hain.</li>
            </ul>
          </section>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
            <p className="text-sm font-bold text-slate-700">WhatsApp Helpline: +91 9770883796</p>
            <p className="text-xs text-slate-500 mt-1">Jabalpur ka Apna Brand - Green Parcel</p>
          </div>
        </div>
      )
    },
    privacy: {
      title: 'Privacy Policy',
      icon: <Lock className="w-8 h-8 text-emerald-500" />,
      content: (
        <div className="space-y-6 text-gray-600">
          <p>Aapka data hamare paas surakshit hai. Hum aapki privacy ki puri tarah se izzat karte hain.</p>
          
          <section>
            <h4 className="font-bold text-gray-900 mb-2 flex items-center">
              <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
              Personal Info
            </h4>
            <p className="text-sm">Hum aapka naam, pata, aur phone number sirf delivery aur order updates ke liye use karte hain.</p>
          </section>

          <section>
            <h4 className="font-bold text-gray-900 mb-2 flex items-center">
              <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
              No Third Party
            </h4>
            <p className="text-sm">Hum aapki details kisi bhi third party ko nahi bechte. Aapka bharosa hamari sabse badi kamai hai.</p>
          </section>

          <section>
            <h4 className="font-bold text-gray-900 mb-2 flex items-center">
              <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
              Secure Payment
            </h4>
            <p className="text-sm">Saare online payments secure encrypted gateways ke zariye hote hain. Hum aapke card ya bank details store nahi karte.</p>
          </section>
        </div>
      )
    }
  };

  const currentPolicy = policies[type];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-lg bg-white rounded-2xl shadow-2xl z-[70] overflow-hidden flex flex-col max-h-[80vh]"
          >
            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
              <div className="flex items-center gap-3">
                {currentPolicy.icon}
                <h3 className="text-xl font-bold text-gray-900">{currentPolicy.title}</h3>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              {currentPolicy.content}
            </div>
            
            <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-center">
              <button 
                onClick={onClose}
                className="bg-gray-900 text-white px-8 py-2 rounded-lg font-bold hover:bg-gray-800 transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
