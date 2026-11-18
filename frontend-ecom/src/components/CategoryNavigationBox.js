import React from 'react';

// Exact categories requested by user matching the reference image dome/arch style
const ARCH_CATEGORIES = [
  {
    id: 'men-fashion',
    slug: 'men',
    name: 'Menswear',
    displayName: 'Men Fashion',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=260&q=80',
    archBg: 'bg-[#fcf1f4]',
  },
  {
    id: 'women-fashion',
    slug: 'women',
    name: 'Western Dresses',
    displayName: 'Women Fashion',
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=260&q=80',
    archBg: 'bg-[#fcf1f4]',
  },
  {
    id: 'kids-fashion',
    slug: 'kids',
    name: 'Kids Fashion',
    displayName: 'Kids Fashion',
    image: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=260&q=80',
    archBg: 'bg-[#fcf1f4]',
  },
  {
    id: 'shoes',
    slug: 'shoes',
    name: 'Footwear',
    displayName: 'Shoes',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=260&q=80',
    archBg: 'bg-[#fcf1f4]',
  },
  {
    id: 'electronics',
    slug: 'electronics',
    name: 'Electronics',
    displayName: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=260&q=80',
    archBg: 'bg-[#fcf1f4]',
  },
  {
    id: 'ethnic-wear',
    slug: 'ethnic',
    name: 'Ethnic Wear',
    displayName: 'Ethnic Wear',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=260&q=80',
    archBg: 'bg-[#fcf1f4]',
  },
  {
    id: 'beauty',
    slug: 'beauty',
    name: 'Beauty',
    displayName: 'Beauty',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=260&q=80',
    archBg: 'bg-[#fcf1f4]',
  },
  {
    id: 'accessories',
    slug: 'accessories',
    name: 'Accessories',
    displayName: 'Accessories',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=260&q=80',
    archBg: 'bg-[#fcf1f4]',
  },
];

export default function CategoryNavigationBox({ activeCategory, onSelectCategory }) {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6">
      {/* THE BIG ALL-IN-ONE NAVIGATION BOX */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 p-5 sm:p-7 transition-all duration-300 hover:shadow-md">
        
        {/* Subtle Header */}
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></span>
            <h2 className="text-sm sm:text-base font-bold text-slate-800 tracking-tight uppercase">
              Explore Categories
            </h2>
          </div>
          {activeCategory && (
            <button
              onClick={() => onSelectCategory(null)}
              className="text-xs text-rose-600 hover:text-rose-700 font-semibold cursor-pointer underline"
            >
              Reset Filter
            </button>
          )}
        </div>

        {/* Arch Category Items Row */}
        <div className="flex items-start justify-between gap-3 sm:gap-6 overflow-x-auto pb-2 scrollbar-none">
          {ARCH_CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat.slug;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.slug)}
                className="group flex flex-col items-center flex-shrink-0 cursor-pointer focus:outline-none transition-transform"
              >
                {/* Arch / Dome Container */}
                <div
                  className={`relative w-20 h-28 sm:w-28 sm:h-36 rounded-t-full rounded-b-2xl ${cat.archBg} overflow-hidden flex items-end justify-center transition-all duration-300 ${
                    isSelected
                      ? 'ring-4 ring-rose-500 shadow-lg scale-105'
                      : 'group-hover:scale-105 group-hover:shadow-md'
                  }`}
                  style={{
                    boxShadow: isSelected
                      ? '0 10px 25px -5px rgba(244, 63, 94, 0.3)'
                      : undefined,
                  }}
                >
                  {/* Subtle inner top glow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-white/40 pointer-events-none"></div>

                  {/* Cutout / Model Image */}
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500 pointer-events-none"
                    loading="lazy"
                  />
                </div>

                {/* Category Label Below Arch */}
                <span
                  className={`mt-2.5 text-xs sm:text-sm text-center font-medium transition-colors ${
                    isSelected
                      ? 'text-rose-600 font-bold'
                      : 'text-slate-700 group-hover:text-rose-600'
                  }`}
                >
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
}
