import { Carrot, Apple, Package, Sparkles, Leaf } from 'lucide-react';

interface CategoryNavProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const categoryIcons: Record<string, any> = {
  'Vegetables': Carrot,
  'Fruits': Apple,
  'Combos': Package,
  'Exotic': Sparkles,
  'Leafy Greens': Leaf,
  'All': null
};

export function CategoryNav({ categories, selectedCategory, onSelectCategory }: CategoryNavProps) {
  const allCategories = ['All', ...categories];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
      <div className="flex space-x-6 overflow-x-auto pb-6 scrollbar-hide snap-x justify-start md:justify-center">
        {allCategories.map((category) => {
          const Icon = categoryIcons[category];
          const isActive = selectedCategory === category;

          return (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={`snap-start flex flex-col items-center gap-3 transition-all duration-300 group min-w-[100px]`}
            >
              <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-sm border ${
                isActive 
                  ? 'bg-[#4CAF50] text-white border-green-600 scale-110 shadow-lg shadow-green-100' 
                  : 'bg-white text-gray-500 border-gray-100 hover:border-green-200 hover:bg-green-50 hover:text-[#4CAF50]'
              }`}>
                {Icon ? <Icon className="w-8 h-8 sm:w-10 sm:h-10" /> : <div className="font-bold text-lg">All</div>}
              </div>
              <span className={`text-sm font-bold transition-colors ${
                isActive ? 'text-[#4CAF50]' : 'text-gray-600 group-hover:text-[#4CAF50]'
              }`}>
                {category === 'All' ? 'All Items' : category}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
