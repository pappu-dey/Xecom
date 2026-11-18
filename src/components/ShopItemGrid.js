import React, { useState } from 'react';
import { PRODUCTS } from '../data/products';

export default function ShopItemGrid({
  activeCategory,
  onSelectCategory,
  searchQuery = '',
  onClearSearch,
  onProductClick,
  onAddToCart,
  wishlistMap = {},
  onToggleWishlist,
}) {
  const [localWishlist, setLocalWishlist] = useState({});
  const [cartFeedback, setCartFeedback] = useState({});
  const [sortBy, setSortBy] = useState('featured');

  const toggleWishlist = (id) => {
    if (onToggleWishlist) {
      onToggleWishlist(id);
    } else {
      setLocalWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
    }
  };

  const handleAddToCart = (e, item) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(item);
    }
    setCartFeedback((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setCartFeedback((prev) => ({ ...prev, [item.id]: false }));
    }, 2000);
  };

  // Filter products based on active category and search query
  let filtered = PRODUCTS.filter((p) => {
    if (activeCategory && p.category !== activeCategory) {
      return false;
    }
    if (searchQuery && searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const inTitle = p.title.toLowerCase().includes(q);
      const inBrand = p.brand.toLowerCase().includes(q);
      const inCat = p.categoryName.toLowerCase().includes(q);
      const inTag = p.tag ? p.tag.toLowerCase().includes(q) : false;
      return inTitle || inBrand || inCat || inTag;
    }
    return true;
  });

  // Sort products
  if (sortBy === 'price-low') {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    filtered = [...filtered].sort((a, b) => b.rating - a.rating);
  }

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-2 mb-16">
      {/* SECTION HEADER & CONTROLS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-rose-600 uppercase tracking-wider bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
              Handpicked Collections
            </span>
            <span className="text-xs text-slate-400 font-medium">
              Showing {filtered.length} products
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1.5 tracking-tight">
            {activeCategory
              ? `Items in ${PRODUCTS.find((p) => p.category === activeCategory)?.categoryName || 'Category'}`
              : 'Trending Shop Items'}
          </h2>
        </div>

        {/* Category Pills & Sorting Bar */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-xs font-bold bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500 cursor-pointer"
          >
            <option value="featured">Sort by: Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Customer Rating</option>
          </select>

          {activeCategory && (
            <button
              onClick={() => onSelectCategory(null)}
              className="text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-xl transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1"
            >
              <span>✕ Reset Filter</span>
            </button>
          )}
        </div>
      </div>

      {/* PRODUCTS CARD GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {filtered.map((item) => {
          const isWishlisted = !!wishlistMap[item.id] || !!localWishlist[item.id];
          const isAdded = !!cartFeedback[item.id];

          return (
            <div
              key={item.id}
              onClick={() => onProductClick && onProductClick(item)}
              className="group relative bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden cursor-pointer"
              title="Click to view product details"
            >
              {/* Product Image Area */}
              <div className="relative aspect-[4/5] w-full bg-slate-100 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />

                {/* Badge (Top Left) */}
                <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 pointer-events-none">
                  {item.badge && (
                    <span className="bg-slate-900/90 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm">
                      {item.badge}
                    </span>
                  )}
                  {item.discount && (
                    <span className="bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm">
                      {item.discount}
                    </span>
                  )}
                </div>

                {/* Wishlist Heart Button (Top Right) */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(item.id);
                  }}
                  aria-label="Add to wishlist"
                  className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition-all cursor-pointer z-10"
                >
                  <svg
                    className={`w-4 h-4 transition-colors ${
                      isWishlisted ? 'text-rose-500 fill-rose-500' : 'text-slate-400 stroke-current fill-none'
                    }`}
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                  </svg>
                </button>

                {/* Quick View Hover Cue (Desktop) */}
                <div className="hidden sm:flex absolute inset-0 bg-slate-900/20 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity items-center justify-center pointer-events-none">
                  <span className="bg-white/95 text-slate-900 text-xs font-bold px-4 py-2 rounded-full shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    👁️ View Details
                  </span>
                </div>

                {/* Star Rating Overlay Pill (Bottom Left) */}
                <div className="absolute bottom-2.5 left-2.5 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-md text-[11px] font-bold text-slate-800 flex items-center gap-1 shadow-sm">
                  <span className="text-amber-500">★</span>
                  <span>{item.rating}</span>
                  <span className="text-slate-400 font-normal">({item.reviews})</span>
                </div>
              </div>

              {/* Product Info & Action Area */}
              <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-rose-600 mb-1">
                    {item.brand} • {item.categoryName}
                  </div>
                  <h3 className="font-semibold text-xs sm:text-sm text-slate-800 line-clamp-2 group-hover:text-rose-600 transition-colors leading-snug">
                    {item.title}
                  </h3>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-100">
                  {/* Price Row */}
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-base sm:text-lg font-black text-slate-900">
                      ₹{item.price.toLocaleString('en-IN')}
                    </span>
                    {item.originalPrice && (
                      <span className="text-xs text-slate-400 line-through">
                        ₹{item.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                    <span className="text-xs font-bold text-emerald-600">
                      {item.discount}
                    </span>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    type="button"
                    onClick={(e) => handleAddToCart(e, item)}
                    className={`w-full py-2 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer ${
                      isAdded
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20'
                        : 'bg-slate-900 hover:bg-rose-600 text-white shadow-sm hover:shadow-md'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Added to Cart!</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        <span>Add to Cart</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ZERO MATCHES STATE */}
      {filtered.length === 0 && (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm max-w-xl mx-auto my-8">
          <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center text-3xl mx-auto mb-3">
            🔍
          </div>
          <h3 className="text-lg font-bold text-slate-800">No matching products found</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
            We couldn't find items matching "{searchQuery}". Try searching for another keyword or clear filters.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            {onClearSearch && (
              <button
                onClick={onClearSearch}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-rose-600 transition-colors cursor-pointer"
              >
                Clear Search
              </button>
            )}
            <button
              onClick={() => onSelectCategory(null)}
              className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-200 transition-colors cursor-pointer"
            >
              Show All Items
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
export { PRODUCTS };
