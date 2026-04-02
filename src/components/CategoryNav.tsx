interface CategoryNavProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export function CategoryNav({ categories, selectedCategory, onSelectCategory }: CategoryNavProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
      <div className="flex space-x-3 overflow-x-auto pb-4 scrollbar-hide snap-x">
        <button
          onClick={() => onSelectCategory('All')}
          className={`snap-start whitespace-nowrap px-6 py-2.5 rounded-full font-bold transition-all duration-200 ${
            selectedCategory === 'All'
              ? 'bg-[#4CAF50] text-white shadow-md shadow-green-200 scale-105'
              : 'bg-white text-gray-600 hover:bg-green-50 hover:text-green-700 border border-gray-200'
          }`}
        >
          All Items
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`snap-start whitespace-nowrap px-6 py-2.5 rounded-full font-bold transition-all duration-200 ${
              selectedCategory === category
                ? 'bg-[#4CAF50] text-white shadow-md shadow-green-200 scale-105'
                : 'bg-white text-gray-600 hover:bg-green-50 hover:text-green-700 border border-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
