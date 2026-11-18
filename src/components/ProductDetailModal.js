import React, { useState, useEffect } from 'react';

export default function ProductDetailModal({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
  isWishlisted = false,
  onToggleWishlist,
}) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('400001');
  const [pincodeStatus, setPincodeStatus] = useState({ checked: true, text: 'Fast delivery by Tomorrow, 8 PM' });
  const [addedFeedback, setAddedFeedback] = useState(false);
  const [activeTab, setActiveTab] = useState('highlights'); // highlights | specs | reviews

  // Synchronize defaults whenever product changes
  useEffect(() => {
    if (product) {
      setSelectedImage(0);
      setSelectedSize(product.sizes && product.sizes.length > 0 ? product.sizes[0] : null);
      setSelectedColor(product.colors && product.colors.length > 0 ? product.colors[0] : null);
      setQuantity(1);
      setAddedFeedback(false);
    }
  }, [product]);

  // Lock body scroll while modal is open
  useEffect(() => {
    if (product) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = 'unset';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [product, onClose]);

  if (!product) return null;

  const images = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];
  const savings = product.originalPrice ? product.originalPrice - product.price : 0;

  const handleAddToCartClick = () => {
    if (onAddToCart) {
      onAddToCart({
        ...product,
        selectedSize,
        selectedColor: selectedColor?.name,
        quantity,
      });
      setAddedFeedback(true);
      setTimeout(() => setAddedFeedback(false), 2000);
    }
  };

  const handleBuyNowClick = () => {
    if (onBuyNow) {
      onBuyNow({
        ...product,
        selectedSize,
        selectedColor: selectedColor?.name,
        quantity,
      });
    }
  };

  const handleCheckPincode = (e) => {
    e.preventDefault();
    if (pincode.length === 6) {
      setPincodeStatus({ checked: true, text: `Delivery available to ${pincode} by Friday, Free Express Shipping!` });
    } else {
      setPincodeStatus({ checked: false, text: 'Please enter a valid 6-digit postal pincode' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fadeIn">
      {/* Backdrop click dismisser */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      {/* Main Modal Card */}
      <div
        className="relative bg-white w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[94vh] sm:max-h-[90vh] my-auto border border-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar / Close Button */}
        <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-4 sm:px-6 py-3.5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden text-xs text-slate-500">
            <span className="font-semibold text-rose-600 uppercase tracking-wider">{product.brand}</span>
            <span>›</span>
            <span className="truncate max-w-[180px] sm:max-w-xs">{product.categoryName}</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Wishlist Button */}
            <button
              onClick={() => onToggleWishlist && onToggleWishlist(product.id)}
              className="p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-500 cursor-pointer"
              title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
            >
              <svg
                className={`w-5 h-5 transition-transform active:scale-125 ${
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

            {/* Close Modal Button */}
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-all cursor-pointer hover:rotate-90"
              aria-label="Close dialog"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content Body */}
        <div className="overflow-y-auto flex-1 p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
            {/* LEFT COLUMN: Image Gallery */}
            <div className="flex flex-col gap-4">
              {/* Main Featured Image */}
              <div className="relative aspect-[4/5] sm:aspect-square w-full rounded-2xl bg-slate-50 overflow-hidden border border-slate-100 group shadow-sm">
                <img
                  src={images[selectedImage] || product.image}
                  alt={product.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />

                {/* Floating Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none">
                  {product.badge && (
                    <span className="bg-slate-900/90 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-sm">
                      {product.badge}
                    </span>
                  )}
                  {product.discount && (
                    <span className="bg-rose-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-sm">
                      {product.discount}
                    </span>
                  )}
                </div>

                {/* Tag pill */}
                {product.tag && (
                  <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-bold text-slate-800 shadow-sm flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span>{product.tag}</span>
                  </div>
                )}
              </div>

              {/* Thumbnails Row */}
              {images.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-none">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all cursor-pointer ${
                        selectedImage === idx
                          ? 'border-rose-600 ring-2 ring-rose-600/30 shadow-md scale-105'
                          : 'border-slate-200 hover:border-slate-300 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Trust Badges Strip */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-center">
                <div className="p-2 rounded-xl bg-slate-50 flex flex-col items-center">
                  <span className="text-base sm:text-lg mb-1">🛡️</span>
                  <span className="text-[10px] font-bold text-slate-800">100% Genuine</span>
                  <span className="text-[9px] text-slate-400">Direct from Brand</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-50 flex flex-col items-center">
                  <span className="text-base sm:text-lg mb-1">🔄</span>
                  <span className="text-[10px] font-bold text-slate-800">7 Days Return</span>
                  <span className="text-[9px] text-slate-400">Hassle-Free Pickup</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-50 flex flex-col items-center">
                  <span className="text-base sm:text-lg mb-1">⚡</span>
                  <span className="text-[10px] font-bold text-slate-800">Express Delivery</span>
                  <span className="text-[9px] text-slate-400">Available Nationwide</span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Product Information & Controls */}
            <div className="flex flex-col justify-between">
              <div>
                {/* Brand & Title */}
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs font-black uppercase tracking-wider text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-md">
                    {product.brand}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">• {product.categoryName}</span>
                </div>

                <h1 className="text-lg sm:text-2xl font-black text-slate-900 leading-snug">
                  {product.title}
                </h1>

                {/* Rating Strip */}
                <div className="mt-2.5 flex items-center gap-3">
                  <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-lg">
                    <span className="text-amber-500 font-black text-xs">★</span>
                    <span className="text-xs font-black text-amber-900">{product.rating || '4.5'}</span>
                    <span className="text-amber-700/60 text-[11px] font-medium">({product.reviews || '1.2k'} reviews)</span>
                  </div>
                  <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                    ✓ Verified In Stock
                  </span>
                </div>

                {/* Price Block */}
                <div className="mt-4 p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80">
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <span className="text-2xl sm:text-3xl font-black text-slate-900">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm sm:text-base text-slate-400 line-through">
                        ₹{product.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                    {product.discount && (
                      <span className="text-xs sm:text-sm font-extrabold text-rose-600 bg-rose-100 px-2.5 py-0.5 rounded-full">
                        {product.discount}
                      </span>
                    )}
                  </div>
                  {savings > 0 && (
                    <p className="text-xs font-bold text-emerald-600 mt-1">
                      🎉 You save ₹{savings.toLocaleString('en-IN')} on this order!
                    </p>
                  )}
                  <p className="text-[11px] text-slate-400 mt-1">
                    Inclusive of all taxes. Free shipping on this item.
                  </p>
                </div>

                {/* COLOR SELECTOR */}
                {product.colors && product.colors.length > 0 && (
                  <div className="mt-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-800">
                        Color: <span className="font-semibold text-rose-600">{selectedColor?.name || 'Selected'}</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      {product.colors.map((c, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedColor(c)}
                          className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                            selectedColor?.name === c.name
                              ? 'border-rose-600 bg-rose-50/50 text-rose-700 ring-2 ring-rose-500/20'
                              : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-inner"
                            style={{ backgroundColor: c.hex }}
                          />
                          <span>{c.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* SIZE SELECTOR */}
                {product.sizes && product.sizes.length > 0 && (
                  <div className="mt-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-800">
                        Size: <span className="font-semibold text-rose-600">{selectedSize || 'Select'}</span>
                      </span>
                      <button
                        type="button"
                        className="text-[11px] font-bold text-indigo-600 hover:underline cursor-pointer"
                        onClick={() => alert('Standard International Fit Chart applies. If between sizes, pick the larger size.')}
                      >
                        Size Guide 📏
                      </button>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      {product.sizes.map((s, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedSize(s)}
                          className={`min-w-[42px] px-3.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                            selectedSize === s
                              ? 'bg-slate-900 border-slate-900 text-white shadow-md'
                              : 'bg-white border-slate-200 text-slate-800 hover:border-slate-400'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* QUANTITY SELECTOR */}
                <div className="mt-5 flex items-center gap-4">
                  <span className="text-xs font-bold text-slate-800">Quantity:</span>
                  <div className="flex items-center border border-slate-200 rounded-xl bg-white overflow-hidden shadow-sm">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      disabled={quantity <= 1}
                      className="px-3 py-1.5 text-sm font-bold text-slate-600 hover:bg-slate-100 disabled:opacity-30 cursor-pointer"
                    >
                      −
                    </button>
                    <span className="px-4 py-1.5 text-xs font-black text-slate-900">{quantity}</span>
                    <button
                      onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                      disabled={quantity >= 10}
                      className="px-3 py-1.5 text-sm font-bold text-slate-600 hover:bg-slate-100 disabled:opacity-30 cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                  {product.stockCount && (
                    <span className="text-[11px] text-amber-700 font-medium">
                      ⚡ Only {product.stockCount} items left!
                    </span>
                  )}
                </div>

                {/* PINCODE & DELIVERY CHECK */}
                <div className="mt-5 pt-4 border-t border-slate-100">
                  <span className="text-xs font-bold text-slate-800 mb-2 block">Check Delivery & Pincode:</span>
                  <form onSubmit={handleCheckPincode} className="flex items-center gap-2 max-w-sm">
                    <input
                      type="text"
                      maxLength={6}
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      placeholder="Enter 6-digit Pincode"
                      className="flex-1 px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 font-mono"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                    >
                      Check
                    </button>
                  </form>
                  {pincodeStatus && (
                    <p className={`text-xs mt-1.5 font-medium ${pincodeStatus.checked ? 'text-emerald-600' : 'text-rose-500'}`}>
                      {pincodeStatus.text}
                    </p>
                  )}
                </div>

                {/* TABS: Description, Highlights, Specs */}
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                    <button
                      onClick={() => setActiveTab('highlights')}
                      className={`text-xs font-bold pb-1 cursor-pointer transition-colors ${
                        activeTab === 'highlights'
                          ? 'text-rose-600 border-b-2 border-rose-600'
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      Description & Features
                    </button>
                    <button
                      onClick={() => setActiveTab('specs')}
                      className={`text-xs font-bold pb-1 cursor-pointer transition-colors ${
                        activeTab === 'specs'
                          ? 'text-rose-600 border-b-2 border-rose-600'
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      Specifications
                    </button>
                    <button
                      onClick={() => setActiveTab('reviews')}
                      className={`text-xs font-bold pb-1 cursor-pointer transition-colors ${
                        activeTab === 'reviews'
                          ? 'text-rose-600 border-b-2 border-rose-600'
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      Customer Reviews
                    </button>
                  </div>

                  {/* Tab 1: Highlights */}
                  {activeTab === 'highlights' && (
                    <div className="mt-3 text-xs text-slate-600 space-y-2">
                      <p className="leading-relaxed">{product.description}</p>
                      {product.highlights && (
                        <ul className="mt-2 space-y-1.5">
                          {product.highlights.map((h, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-rose-500 font-bold mt-0.5">✓</span>
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}

                  {/* Tab 2: Specs */}
                  {activeTab === 'specs' && (
                    <div className="mt-3 text-xs">
                      {product.specs ? (
                        <div className="divide-y divide-slate-100 border border-slate-100 rounded-xl overflow-hidden">
                          {Object.entries(product.specs).map(([k, v], i) => (
                            <div key={i} className="grid grid-cols-2 p-2.5 bg-slate-50/50">
                              <span className="font-bold text-slate-600">{k}</span>
                              <span className="text-slate-800">{v}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-slate-500">Standard manufacturer specifications apply.</p>
                      )}
                    </div>
                  )}

                  {/* Tab 3: Reviews */}
                  {activeTab === 'reviews' && (
                    <div className="mt-3 text-xs space-y-3">
                      <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between">
                        <div>
                          <div className="text-xl font-black text-slate-900">{product.rating || '4.8'} / 5.0</div>
                          <p className="text-[11px] text-slate-500">Based on {product.reviews || '2.4k'} ratings</p>
                        </div>
                        <div className="text-right">
                          <span className="text-amber-500 text-sm">★★★★★</span>
                          <p className="text-[10px] text-emerald-600 font-bold">96% recommend this</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="p-2.5 border border-slate-100 rounded-xl">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-slate-800">Aarav Patel</span>
                            <span className="text-amber-500">★★★★★</span>
                          </div>
                          <p className="text-slate-600">
                            Excellent quality and perfect fit! Delivered in under 24 hours. Really satisfied.
                          </p>
                        </div>
                        <div className="p-2.5 border border-slate-100 rounded-xl">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-slate-800">Pooja Sharma</span>
                            <span className="text-amber-500">★★★★☆</span>
                          </div>
                          <p className="text-slate-600">
                            Colors and texture match the photos accurately. Great fabric feel.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* DESKTOP ACTION BUTTONS ROW */}
              <div className="hidden sm:flex items-center gap-3 pt-6 mt-6 border-t border-slate-100">
                <button
                  onClick={handleAddToCartClick}
                  className={`flex-1 py-3.5 px-6 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ${
                    addedFeedback
                      ? 'bg-emerald-600 text-white shadow-emerald-600/30'
                      : 'bg-slate-900 hover:bg-slate-800 text-white shadow-slate-900/20 active:scale-95'
                  }`}
                >
                  {addedFeedback ? (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Added to Cart!</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleBuyNowClick}
                  className="flex-1 py-3.5 px-6 rounded-2xl text-xs sm:text-sm font-black bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center gap-2 transition-all shadow-md shadow-rose-600/30 active:scale-95 cursor-pointer"
                >
                  <span>⚡ Buy Now</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE STICKY BOTTOM ACTION BAR */}
        <div className="sticky bottom-0 z-30 sm:hidden bg-white/95 backdrop-blur-md px-4 py-3 border-t border-slate-200 flex items-center gap-2 shadow-2xl">
          <button
            onClick={handleAddToCartClick}
            className={`flex-1 py-3 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              addedFeedback
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-900 text-white active:scale-95'
            }`}
          >
            {addedFeedback ? (
              <span>Added ✓</span>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span>Add to Cart</span>
              </>
            )}
          </button>

          <button
            onClick={handleBuyNowClick}
            className="flex-1 py-3 px-3 rounded-xl text-xs font-black bg-rose-600 text-white flex items-center justify-center gap-1 shadow-md shadow-rose-600/30 active:scale-95 cursor-pointer"
          >
            <span>⚡ Buy Now</span>
          </button>
        </div>
      </div>
    </div>
  );
}
