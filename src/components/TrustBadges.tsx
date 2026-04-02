import { ShieldCheck, Search, MapPin, RefreshCcw } from 'lucide-react';

export function TrustBadges() {
  const badges = [
    {
      icon: ShieldCheck,
      title: 'No Chemicals',
      description: '100% Organic & Pesticide Free'
    },
    {
      icon: Search,
      title: 'Expertly Selected',
      description: 'Maa jaisa dhyan, har piece mein'
    },
    {
      icon: MapPin,
      title: 'Local Farms',
      description: 'Direct from Jabalpur farms'
    },
    {
      icon: RefreshCcw,
      title: 'Easy Return Policy',
      description: 'No questions asked returns'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Humara Vaada: <span className="text-[#4CAF50]">Maa ka Dhyan</span>
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Hum sirf delivery nahi karte, hum chunte hain. Har sabzi aur phal waisa hi jaise aap khud apne parivaar ke liye chunte.
          </p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {badges.map((badge, index) => (
            <div key={index} className="flex flex-col items-center text-center p-6 rounded-3xl bg-green-50/50 border border-green-100 transition-transform hover:scale-105">
              <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-[#4CAF50] shadow-sm mb-4">
                <badge.icon className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-1">{badge.title}</h4>
              <p className="text-sm text-gray-500 font-medium">{badge.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
