import React, { useState } from 'react';

export default function WishlistPage({
  wishlistItems = [],
  onRemoveFromWishlist,
  onMoveToCart,
  onMoveAllToCart,
  onContinueShopping,
  onProductClick,
}) {
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleMoveToCart = (item) => {
    onMoveToCart(item);
    showToast(`Moved "${item.title.substring(0, 25)}..." to your cart! 🛒`);
  };

  const handleMoveAll = () => {
    if (onMoveAllToCart) {
      onMoveAllToCart();
      showToast('All wishlist items moved to your shopping cart! 🛒');
    }
  };

  const totalWishlistValue = wishlistItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-700 animate-fadeIn">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
          <p className="text-xs sm:text-sm font-semibold">{toastMessage}</p>
        </div>
      )}

      {/* Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <button onClick={onContinueShopping} className="hover:text-slate-700 cursor-pointer">
              Home
            </button>
            <span>›</span>
            <span className="text-slate-800 font-semibold">My Wishlist</span>
          </div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              My Wishlist
            </h1>
            <span className="bg-rose-100 text-rose-700 text-xs font-bold px-3 py-1 rounded-full border border-rose-200">
              {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Items saved to buy later or monitor for special discounts and price drops.
          </p>
        </div>

        {wishlistItems.length > 0 && (
          <div className="flex items-center gap-3">
            <button
              onClick={handleMoveAll}
              className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs sm:text-sm font-bold rounded-xl transition-all shadow-md shadow-rose-600/20 active:scale-95 cursor-pointer flex items-center gap-2"
            >
              <span>Move All to Cart</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Empty State */}
      {wishlistItems.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm max-w-lg mx-auto my-16">
          <div className="w-20 h-20 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center text-4xl mx-auto mb-4">
            💔
          </div>
          <h2 className="text-xl font-black text-slate-900">Your Wishlist is Empty</h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
            Explore our curated collections in Men's, Women's, Footwear and Electronics, and tap the heart icon on any product to save it here!
          </p>
          <button
            onClick={onContinueShopping}
            className="mt-6 px-7 py-3 bg-slate-900 hover:bg-rose-600 text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-lg active:scale-95 cursor-pointer"
          >
            Start Exploring Trending Items →
          </button>
        </div>
      ) : (
        <div>
          {/* Wishlist Summary Strip */}
          <div className="my-6 bg-indigo-50/70 border border-indigo-200/60 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm">
            <div className="flex items-center gap-2 text-indigo-900">
              <span className="text-base">💡</span>
              <span>
                Total Wishlist Worth: <strong className="font-extrabold">₹{totalWishlistValue.toLocaleString('en-IN')}</strong>. Prices and discounts are updated live.
              </span>
            </div>
            <button
              onClick={onContinueShopping}
              className="text-xs font-bold text-indigo-700 hover:text-indigo-900 hover:underline cursor-pointer text-left"
            >
              + Add More Products
            </button>
          </div>

          {/* Wishlist Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                onClick={() => onProductClick && onProductClick(item)}
                className="group relative bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden cursor-pointer"
                title="Click to view product details"
              >
                {/* Image Section */}
                <div className="relative aspect-[4/5] w-full bg-slate-100 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Badges */}
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

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveFromWishlist(item.id);
                    }}
                    className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-400 hover:text-rose-600 hover:bg-white shadow-md transition-all cursor-pointer z-10"
                    title="Remove from wishlist"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  {/* Stock Status Pill */}
                  <div className="absolute bottom-2.5 left-2.5 bg-emerald-500/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm backdrop-blur-md">
                    In Stock • Ready to Dispatch
                  </div>
                </div>

                {/* Details Section */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[10px] font-extrabold uppercase tracking-wider text-rose-600 mb-1">
                      {item.brand || 'BRAND'} • {item.categoryName || 'Fashion'}
                    </div>
                    <h3 className="font-semibold text-xs sm:text-sm text-slate-800 line-clamp-2 group-hover:text-rose-600 transition-colors leading-snug">
                      {item.title}
                    </h3>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100">
                    {/* Price */}
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-base sm:text-lg font-black text-slate-900">
                        ₹{item.price.toLocaleString('en-IN')}
                      </span>
                      {item.originalPrice && (
                        <span className="text-xs text-slate-400 line-through">
                          ₹{item.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                      {item.discount && (
                        <span className="text-xs font-bold text-emerald-600">
                          {item.discount}
                        </span>
                      )}
                    </div>

                    {/* Move to Cart Action Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMoveToCart(item);
                      }}
                      className="w-full py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold bg-slate-900 hover:bg-rose-600 text-white shadow-sm hover:shadow-md flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      <span>Move to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
