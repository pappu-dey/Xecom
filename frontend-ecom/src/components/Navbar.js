import React, { useState, useEffect, useRef } from 'react';

// Sample categories and mega menu data
const CATEGORIES_DATA = {
  electronics: {
    name: 'Electronics',
    featured: {
      title: 'Next-Gen Sound',
      desc: 'Noise-canceling headphones with spatial audio.',
      tag: 'Up to 35% OFF',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80',
    },
    sections: [
      {
        title: 'Computers & Laptops',
        links: ['Apple MacBook Pro', 'Gaming Laptops', 'Ultra-thin Notebooks', 'Monitors & Displays', 'PC Accessories'],
      },
      {
        title: 'Phones & Tablets',
        links: ['iPhones & iOS', 'Android Flagships', 'iPads & Tablets', 'Smart Watches', 'Cases & Screen Protectors'],
      },
      {
        title: 'Audio & Entertainment',
        links: ['Wireless Earbuds', 'Over-Ear Headphones', 'Bluetooth Speakers', 'Home Theater Systems', 'Soundbars'],
      },
    ],
  },
  men: {
    name: "Men's Fashion",
    featured: {
      title: 'Urban Streetwear 2026',
      desc: 'Minimalist jackets, oversized tees & utility denim.',
      tag: 'New Season',
      image: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=400&q=80',
    },
    sections: [
      {
        title: 'Clothing',
        links: ['Hoodies & Sweatshirts', 'T-Shirts & Polos', 'Casual & Formal Shirts', 'Jeans & Chinos', 'Outerwear & Coats'],
      },
      {
        title: 'Footwear',
        links: ['Running Sneakers', 'Leather Loafers', 'Chelsea Boots', 'Athletic Trainers', 'Slides & Sandals'],
      },
      {
        title: 'Accessories',
        links: ['Chronograph Watches', 'Leather Wallets', 'Sunglasses', 'Backpacks & Duffles', 'Caps & Beanies'],
      },
    ],
  },
  women: {
    name: "Women's Fashion",
    featured: {
      title: 'Spring Elegance',
      desc: 'Flowy silhouettes, vibrant pastels and chic accessories.',
      tag: 'Trending Now',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=400&q=80',
    },
    sections: [
      {
        title: 'Trending Apparel',
        links: ['Maxi & Midi Dresses', 'Blouses & Knitwear', 'Blazers & Two-Piece Sets', 'Denim & Trousers', 'Active & Loungewear'],
      },
      {
        title: 'Shoes & Handbags',
        links: ['Crossbody Bags', 'Luxury Totes', 'Designer Heels', 'Everyday Flats', 'White Sneakers'],
      },
      {
        title: 'Jewelry & Watches',
        links: ['Gold Plated Necklaces', 'Stackable Rings', 'Hoop Earrings', 'Minimalist Watches', 'Silk Scarves'],
      },
    ],
  },
  home: {
    name: 'Home & Living',
    featured: {
      title: 'Modern Interiors',
      desc: 'Scandinavian furniture and cozy ambient lighting.',
      tag: 'Free Assembly',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400&q=80',
    },
    sections: [
      {
        title: 'Furniture & Decor',
        links: ['Ergonomic Chairs', 'Minimal Coffee Tables', 'Accent Armchairs', 'Wall Art & Mirrors', 'Indoor Planters'],
      },
      {
        title: 'Kitchen & Dining',
        links: ['Espresso Machines', 'Non-stick Cookware', 'Ceramic Tableware', 'Air Fryers & Blenders', 'Barware Sets'],
      },
      {
        title: 'Bed & Bath',
        links: ['Egyptian Cotton Sheets', 'Down Pillows', 'Plush Bath Towels', 'Aromatherapy Diffusers', 'Curtains & Drapes'],
      },
    ],
  },
  beauty: {
    name: 'Beauty & Wellness',
    featured: {
      title: 'Glow Botanical Care',
      desc: '100% cruelty-free clean skincare formulations.',
      tag: 'Bestseller',
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=400&q=80',
    },
    sections: [
      {
        title: 'Skincare',
        links: ['Hydrating Serums', 'SPF 50+ Sunscreens', 'Night Repair Creams', 'Gentle Cleansers', 'Exfoliating Toners'],
      },
      {
        title: 'Fragrances',
        links: ['Eau de Parfum', 'Artisan Colognes', 'Floral Sprays', 'Woody & Amber Scents', 'Travel Sprays'],
      },
      {
        title: 'Hair & Grooming',
        links: ['Nourishing Hair Oils', 'Styling Pomades', 'Sonic Face Brushes', 'Beard Grooming Kits', 'Silk Pillowcases'],
      },
    ],
  },
};

const SEARCH_SUGGESTIONS = [
  'Wireless Noise Cancelling Headphones',
  'Mechanical Gaming Keyboard',
  'Waterproof Smart Fitness Band',
  'Oversized Fleece Hoodie',
  'Ultra HD 4K OLED TV 55 inch',
  'Ergonomic Home Office Desk',
];

const CURRENCIES = [
  { code: 'INR', symbol: '₹', name: 'Indian Rupee', flag: '🇮🇳' }
];

export default function Navbar({ onOpenSeller, onNavigate, wishlistCount = 0, cartCount: cartCountProp, cartSubtotal: cartSubtotalProp, cartItems: cartItemsProp, onRemoveCartItem } = {}) {
  // Navigation states
  const [activeMegaMenu, setActiveMegaMenu] = useState(null);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState(null);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isCategorySelectOpen, setIsCategorySelectOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // User state mock
  const [selectedCurrency, setSelectedCurrency] = useState(CURRENCIES[0]);
  const [deliveryZip, setDeliveryZip] = useState('Mumbai 400001');
  const [tempZip, setTempZip] = useState('');

  // Use cart data from props (App.js) or fall back to local mock
  const cartItems = cartItemsProp || [];
  const cartCount = cartCountProp !== undefined ? cartCountProp : cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cartSubtotalProp !== undefined ? cartSubtotalProp : cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Close menus on outside click
  const navRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setActiveMegaMenu(null);
        setIsAccountOpen(false);
        setIsCartOpen(false);
        setIsCurrencyOpen(false);
        setIsLocationOpen(false);
        setIsCategorySelectOpen(false);
        setIsSearchFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleRemoveFromCart = (id) => {
    if (onRemoveCartItem) onRemoveCartItem(id);
  };

  const handleUpdateZip = (e) => {
    e.preventDefault();
    if (tempZip.trim()) {
      setDeliveryZip(tempZip.trim());
      setIsLocationOpen(false);
      setTempZip('');
    }
  };

  return (
    <header ref={navRef} className="w-full sticky top-0 z-50 bg-white font-sans text-gray-800 shadow-md">
      {/* 1. TOP ANNOUNCEMENT / UTILITY BAR */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white text-xs py-2 px-4 sm:px-6 lg:px-8 border-b border-indigo-900/40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          {/* Promo Message */}
          <div className="flex items-center space-x-2 text-center sm:text-left">
            <span className="bg-gradient-to-r from-amber-400 to-rose-400 text-slate-950 font-bold px-2 py-0.5 rounded-full text-[10px] tracking-wider uppercase shadow-sm">
              Limited Offer
            </span>
            <span className="text-gray-200">
              ⚡ Flash Sale: Get <span className="text-amber-300 font-semibold">25% OFF</span> on orders over ₹4,999 with code{' '}
              <span className="font-mono bg-white/10 px-1.5 py-0.5 rounded text-white font-bold">XSHOP25</span>
            </span>
          </div>

          {/* Right Utilities */}
          <div className="flex items-center space-x-5 text-gray-300">
            {/* Currency / Language Selector */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setIsCurrencyOpen(!isCurrencyOpen);
                  setIsAccountOpen(false);
                  setIsCartOpen(false);
                  setIsLocationOpen(false);
                }}
                className="flex items-center space-x-1.5 hover:text-white transition-colors cursor-pointer focus:outline-none"
              >
                <span>{selectedCurrency.flag}</span>
                <span className="font-medium">{selectedCurrency.code} ({selectedCurrency.symbol})</span>
                <svg
                  className={`w-3 h-3 transition-transform duration-200 ${isCurrencyOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Currency Dropdown Menu */}
              {isCurrencyOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-2xl py-2 z-50 border border-gray-100 text-gray-800 animate-fadeIn">
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                    Select Currency
                  </div>
                  {CURRENCIES.map((curr) => (
                    <button
                      key={curr.code}
                      onClick={() => {
                        setSelectedCurrency(curr);
                        setIsCurrencyOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-indigo-50 transition-colors ${selectedCurrency.code === curr.code ? 'bg-indigo-50/70 text-indigo-700 font-bold' : 'text-gray-700'
                        }`}
                    >
                      <div className="flex items-center space-x-2">
                        <span>{curr.flag}</span>
                        <span>{curr.name}</span>
                      </div>
                      <span className="text-gray-400 font-mono text-[11px]">{curr.symbol} {curr.code}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <span className="text-gray-600">|</span>
            <button
              type="button"
              onClick={onOpenSeller}
              className="text-amber-400 hover:text-amber-300 font-bold transition-colors flex items-center gap-1 cursor-pointer bg-amber-400/10 hover:bg-amber-400/20 px-2 py-0.5 rounded border border-amber-400/30"
              title="Launch Seller Portal"
            >
              <span>🏪</span> Seller Hub
            </button>
            <span className="text-gray-600">|</span>
            <a href="#track-order" className="hover:text-white transition-colors">
              Track Order
            </a>
            <span className="text-gray-600">|</span>
            <a href="#help" className="hover:text-white transition-colors">
              Help Center
            </a>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER BAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-4 lg:gap-8">
          {/* Mobile Menu Button & Brand */}
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-indigo-600 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Brand Logo */}
            <a href="/" className="flex items-center space-x-2 group focus:outline-none">

              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight text-gray-900 group-hover:text-indigo-600 transition-colors">
                  X<span className="text-indigo-600">-Shop</span>
                </span>
                <span className="text-[9px] font-semibold tracking-widest uppercase text-gray-400 -mt-1">
                  Global Marketplace
                </span>
              </div>
            </a>
          </div>

          {/* Delivery Location Selector (Desktop) */}
          <div className="hidden xl:flex items-center relative">
            <button
              type="button"
              onClick={() => {
                setIsLocationOpen(!isLocationOpen);
                setIsAccountOpen(false);
                setIsCartOpen(false);
                setIsCurrencyOpen(false);
              }}
              className="flex items-center space-x-2 text-left p-1.5 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none"
            >
              <div className="text-indigo-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <span className="block text-[11px] text-gray-500 font-medium leading-none">Deliver to</span>
                <span className="block text-xs font-bold text-gray-800 leading-tight mt-0.5 truncate max-w-[110px]">
                  {deliveryZip}
                </span>
              </div>
              <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Location Dropdown Modal */}
            {isLocationOpen && (
              <div className="absolute left-0 top-full mt-2 w-72 bg-white rounded-xl shadow-2xl p-4 z-50 border border-gray-100 animate-fadeIn">
                <h4 className="text-sm font-bold text-gray-900 mb-1">Choose your location</h4>
                <p className="text-xs text-gray-500 mb-3">Delivery options and delivery speeds may vary for different locations.</p>
                <form onSubmit={handleUpdateZip} className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter city or ZIP..."
                      value={tempZip}
                      onChange={(e) => setTempZip(e.target.value)}
                      className="w-full text-xs px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                </form>
                <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-between text-xs text-indigo-600 font-semibold cursor-pointer hover:underline">
                  <span>Use current GPS location</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            )}
          </div>

          {/* 3. CENTER SEARCH BAR WITH CATEGORY SELECTOR & PREVIEW */}
          <div className="flex-1 max-w-2xl relative">
            <div
              className={`flex items-center rounded-xl border-2 transition-all duration-200 bg-gray-50 ${isSearchFocused ? 'border-indigo-600 bg-white ring-4 ring-indigo-500/10 shadow-sm' : 'border-gray-200 hover:border-gray-300'
                }`}
            >
              {/* Category Dropdown Prefix */}
              <div className="relative hidden md:block">
                <button
                  type="button"
                  onClick={() => setIsCategorySelectOpen(!isCategorySelectOpen)}
                  className="flex items-center space-x-1.5 px-3.5 py-2.5 text-xs font-semibold text-gray-700 bg-gray-100/80 hover:bg-gray-200/80 rounded-l-[10px] border-r border-gray-200 transition-colors focus:outline-none cursor-pointer"
                >
                  <span className="truncate max-w-[90px]">{selectedCategory}</span>
                  <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Categories Select Dropdown */}
                {isCategorySelectOpen && (
                  <div className="absolute left-0 top-full mt-1.5 w-48 bg-white rounded-lg shadow-xl py-1 z-50 border border-gray-100 text-xs text-gray-700 animate-fadeIn">
                    {['All Categories', 'Electronics', "Men's Fashion", "Women's Fashion", 'Home & Living', 'Beauty & Wellness', 'Sports'].map(
                      (cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => {
                            setSelectedCategory(cat === 'All Categories' ? 'All' : cat);
                            setIsCategorySelectOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2 hover:bg-indigo-50 hover:text-indigo-600 transition-colors ${selectedCategory === (cat === 'All Categories' ? 'All' : cat) ? 'font-bold text-indigo-600 bg-indigo-50/50' : ''
                            }`}
                        >
                          {cat}
                        </button>
                      )
                    )}
                  </div>
                )}
              </div>

              {/* Search Input Field */}
              <div className="relative flex-1 flex items-center">
                <input
                  type="text"
                  placeholder="Search 100,000+ products, brands and hot deals..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  className="w-full py-2.5 pl-3.5 pr-8 text-sm bg-transparent focus:outline-none text-gray-800 placeholder-gray-400"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2 text-gray-400 hover:text-gray-600 focus:outline-none p-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Search Submit Button */}
              <button
                type="button"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-r-[10px] transition-colors flex items-center justify-center cursor-pointer shadow-sm focus:outline-none"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>

            {/* Quick Suggestions Dropdown on Focus */}
            {isSearchFocused && !searchQuery && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-xl shadow-2xl p-4 z-50 border border-gray-100 animate-fadeIn">
                <div className="flex items-center justify-between text-xs font-semibold text-gray-400 mb-2.5 uppercase tracking-wider">
                  <span>Trending Searches</span>
                  <span className="text-indigo-600 cursor-pointer hover:underline normal-case font-medium">Clear history</span>
                </div>
                <div className="space-y-1.5">
                  {SEARCH_SUGGESTIONS.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setSearchQuery(item);
                        setIsSearchFocused(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 rounded-lg flex items-center justify-between group transition-colors"
                    >
                      <div className="flex items-center space-x-2.5">
                        <svg className="w-3.5 h-3.5 text-gray-400 group-hover:text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                        <span className="group-hover:text-indigo-600 group-hover:font-medium">{item}</span>
                      </div>
                      <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded group-hover:bg-indigo-100 group-hover:text-indigo-700">
                        Popular
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 4. RIGHT ACTIONS: USER ACCOUNT, WISHLIST, SHOPPING CART */}
          <div className="flex items-center space-x-1 sm:space-x-3">
            {/* Account Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setIsAccountOpen(!isAccountOpen);
                  setIsCartOpen(false);
                  setIsCurrencyOpen(false);
                  setIsLocationOpen(false);
                }}
                className="flex items-center space-x-2 p-2 rounded-xl hover:bg-gray-100 transition-colors focus:outline-none cursor-pointer"
              >
                <div className="w-9 h-9 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="hidden lg:block text-left">
                  <span className="block text-[11px] text-gray-400 font-medium leading-none">Hello, Alex</span>
                  <div className="flex items-center space-x-1 mt-0.5">
                    <span className="text-xs font-bold text-gray-800 leading-tight">My Account</span>
                    <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </button>

              {/* Account Dropdown Menu */}
              {isAccountOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-2xl p-4 z-50 border border-gray-100 animate-fadeIn">
                  <div className="pb-3 border-b border-gray-100">
                    <p className="text-xs text-gray-500">Signed in as</p>
                    <p className="text-sm font-bold text-gray-900 truncate">alex.morgan@example.com</p>
                    <div className="mt-2.5 flex items-center justify-between bg-indigo-50/70 p-2 rounded-lg">
                      <div className="flex items-center space-x-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span className="text-[11px] font-semibold text-indigo-900">X-Shop VIP Member</span>
                      </div>
                      <span className="text-[11px] font-bold text-indigo-700 bg-white px-2 py-0.5 rounded shadow-xs">
                        540 Pts
                      </span>
                    </div>
                  </div>

                  <div className="py-2 space-y-1">
                    {[
                      {
                        label: 'My Orders & Tracking',
                        icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z',
                        badge: '2 active',
                        page: 'orders',
                      },
                      {
                        label: 'Wishlist & Saved Items',
                        icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
                        badge: `${wishlistCount} items`,
                        page: 'wishlist',
                      },
                      {
                        label: 'Shipping Addresses',
                        icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z',
                        page: 'addresses',
                      },
                      {
                        label: 'Account Settings',
                        icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z',
                        page: 'account',
                      },
                    ].map((item, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => { if (onNavigate) { onNavigate(item.page); setIsAccountOpen(false); } }}
                        className="w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center space-x-2.5">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                          </svg>
                          <span>{item.label}</span>
                        </div>
                        {item.badge && (
                          <span className="text-[10px] bg-indigo-100 text-indigo-700 font-semibold px-2 py-0.5 rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-gray-100">
                    <button
                      type="button"
                      className="w-full text-left px-2.5 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg transition-colors flex items-center space-x-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Wishlist Icon */}
            <button
              type="button"
              onClick={() => { if (onNavigate) onNavigate('wishlist'); }}
              className="relative p-2 rounded-xl text-gray-700 hover:bg-gray-100 hover:text-indigo-600 transition-colors focus:outline-none cursor-pointer"
              title="View Wishlist"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Cart Button & Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setIsCartOpen(!isCartOpen);
                  setIsAccountOpen(false);
                  setIsCurrencyOpen(false);
                  setIsLocationOpen(false);
                }}
                className="flex items-center space-x-2 p-2 rounded-xl bg-indigo-50/80 hover:bg-indigo-100/80 text-indigo-700 transition-colors focus:outline-none cursor-pointer"
              >
                <div className="relative">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  {cartCount > 0 && (
                    <span className="absolute -top-1.5 -right-2 w-5 h-5 bg-indigo-600 text-white text-[11px] font-bold rounded-full flex items-center justify-center ring-2 ring-white shadow-xs">
                      {cartCount}
                    </span>
                  )}
                </div>
                <div className="hidden sm:block text-left">
                  <span className="block text-[10px] text-indigo-500 font-semibold uppercase tracking-wider leading-none">
                    Cart
                  </span>
                  <span className="block text-xs font-extrabold text-indigo-900 leading-tight mt-0.5">
                    ₹{cartSubtotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </button>

              {/* Shopping Cart Preview Dropdown */}
              {isCartOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl p-5 z-50 border border-gray-100 animate-fadeIn">
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <div className="flex items-center space-x-2">
                      <h4 className="text-sm font-bold text-gray-900">Shopping Cart</h4>
                      <span className="text-xs font-semibold bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">
                        {cartCount} items
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsCartOpen(false)}
                      className="text-gray-400 hover:text-gray-600 focus:outline-none"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  {/* Cart Item List */}
                  {cartItems.length > 0 ? (
                    <div className="py-3 divide-y divide-gray-100 max-h-64 overflow-y-auto space-y-3">
                      {cartItems.map((item) => (
                        <div key={item.id} className="pt-3 first:pt-0 flex items-center justify-between gap-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-14 h-14 object-cover rounded-lg border border-gray-100 flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h5 className="text-xs font-semibold text-gray-800 truncate" title={item.name}>
                              {item.name}
                            </h5>
                            <p className="text-[11px] text-gray-400">{item.color}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className="text-xs font-bold text-indigo-600">
                                ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                              </span>
                              <span className="text-[10px] text-gray-400">Qty: {item.quantity}</span>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveFromCart(item.id)}
                            className="text-gray-400 hover:text-rose-500 p-1 transition-colors"
                            title="Remove item"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-8 text-center">
                      <div className="w-12 h-12 mx-auto rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mb-2">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                      </div>
                      <p className="text-xs font-semibold text-gray-600">Your bag is currently empty</p>
                      <p className="text-[11px] text-gray-400 mt-0.5">Explore deals and add items to your cart</p>
                    </div>
                  )}

                  {/* Cart Footer */}
                  {cartItems.length > 0 && (
                    <div className="pt-3 border-t border-gray-100 space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500">Subtotal:</span>
                        <span className="text-sm font-black text-gray-900">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-emerald-600">
                        <span>Shipping:</span>
                        <span className="font-semibold uppercase">Free Express</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => setIsCartOpen(false)}
                          className="w-full py-2 px-3 border border-gray-300 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors text-center cursor-pointer"
                        >
                          View Bag
                        </button>
                        <button
                          type="button"
                          onClick={() => { setIsCartOpen(false); if (onNavigate) onNavigate('checkout'); }}
                          className="w-full py-2 px-3 bg-indigo-600 hover:bg-indigo-700 rounded-xl text-xs font-semibold text-white shadow-md shadow-indigo-600/20 transition-all text-center cursor-pointer"
                        >
                          Checkout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 3. CATEGORY NAVIGATION BAR WITH MEGA MENUS */}
      <nav className="bg-slate-900 text-gray-200 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            {/* Left Category Links */}
            <div className="flex items-center space-x-1 sm:space-x-2">
              {/* "All Categories" Button with Drawer/Dropdown Toggle */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setActiveMegaMenu(activeMegaMenu === 'all' ? null : 'all')}
                  className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${activeMegaMenu === 'all'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-slate-800 hover:bg-slate-700 text-white'
                    }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h7" />
                  </svg>
                  <span>All Categories</span>
                  <svg
                    className={`w-3 h-3 transition-transform duration-200 ${activeMegaMenu === 'all' ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              {/* Main Categories with Mega Menu dropdowns */}
              {Object.keys(CATEGORIES_DATA).map((catKey) => {
                const cat = CATEGORIES_DATA[catKey];
                const isOpen = activeMegaMenu === catKey;

                return (
                  <div key={catKey} className="relative hidden md:block">
                    <button
                      type="button"
                      onClick={() => setActiveMegaMenu(isOpen ? null : catKey)}
                      className={`flex items-center space-x-1 px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${isOpen ? 'text-white bg-slate-800' : 'text-gray-300 hover:text-white hover:bg-slate-800/60'
                        }`}
                    >
                      <span>{cat.name}</span>
                      <svg
                        className={`w-3 h-3 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-white' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                );
              })}

              {/* Flash Deals Tab with Badge */}
              <a
                href="#flash-deals"
                className="hidden lg:flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 rounded-md transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-rose-500 animate-bounce" viewBox="0 0 24 24">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Flash Deals</span>
                <span className="bg-rose-600 text-white text-[9px] font-black px-1.5 py-0.2 rounded uppercase">
                  Hot
                </span>
              </a>

              {/* New Arrivals */}
              <a
                href="#new-arrivals"
                className="hidden xl:inline-block px-3 py-1.5 text-xs font-medium text-gray-300 hover:text-white hover:bg-slate-800/60 rounded-md transition-colors"
              >
                New Arrivals
              </a>
            </div>

            {/* Right Promo / Support links */}
            <div className="hidden lg:flex items-center space-x-4 text-xs font-medium text-gray-400">
              <a href="#gift-cards" className="hover:text-white transition-colors">
                Gift Cards
              </a>
              <button
                type="button"
                onClick={onOpenSeller}
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm hover:scale-105"
                title="Open Seller Dashboard"
              >
                <span>🏪</span>
                <span>Seller Panel</span>
                <span className="bg-emerald-400 text-slate-950 text-[9px] px-1.5 py-0.2 rounded-full font-extrabold uppercase">
                  Hub
                </span>
              </button>
              <span className="text-slate-700">|</span>
              <div className="flex items-center space-x-1.5 text-indigo-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="font-semibold">+91 1800-123-XSHOP</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4. MEGA MENU DROPDOWN PANEL */}
        {activeMegaMenu && activeMegaMenu !== 'all' && CATEGORIES_DATA[activeMegaMenu] && (
          <div className="border-t border-slate-800 bg-white shadow-2xl py-8 text-gray-800 animate-fadeIn">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* 3 Columns of Subcategory Links */}
                {CATEGORIES_DATA[activeMegaMenu].sections.map((section, sIdx) => (
                  <div key={sIdx} className="space-y-3">
                    <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider pb-1.5 border-b border-gray-100 flex items-center justify-between">
                      <span>{section.title}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>
                    </h4>
                    <ul className="space-y-2 text-xs text-gray-600">
                      {section.links.map((link, lIdx) => (
                        <li key={lIdx}>
                          <a
                            href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                            className="hover:text-indigo-600 hover:translate-x-1 transition-all duration-150 inline-block"
                          >
                            {link}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                {/* 4th Column: Featured Visual Promotion Card */}
                <div className="relative group overflow-hidden rounded-2xl bg-gradient-to-tr from-indigo-900 to-slate-900 text-white p-5 flex flex-col justify-end min-h-[220px] shadow-lg">
                  <img
                    src={CATEGORIES_DATA[activeMegaMenu].featured.image}
                    alt={CATEGORIES_DATA[activeMegaMenu].featured.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-45 group-hover:scale-105 group-hover:opacity-55 transition-all duration-300"
                  />
                  <div className="relative z-10 space-y-2">
                    <span className="inline-block bg-indigo-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      {CATEGORIES_DATA[activeMegaMenu].featured.tag}
                    </span>
                    <h5 className="text-base font-bold text-white leading-snug">
                      {CATEGORIES_DATA[activeMegaMenu].featured.title}
                    </h5>
                    <p className="text-xs text-gray-300 line-clamp-2">
                      {CATEGORIES_DATA[activeMegaMenu].featured.desc}
                    </p>
                    <a
                      href="#shop-featured"
                      className="inline-flex items-center space-x-1.5 text-xs font-bold text-amber-300 hover:text-white pt-1 transition-colors"
                    >
                      <span>Shop Collection</span>
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 5. "ALL CATEGORIES" FULL GRID MEGA DRAWER */}
        {activeMegaMenu === 'all' && (
          <div className="border-t border-slate-800 bg-white shadow-2xl py-8 text-gray-800 animate-fadeIn">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-100">
                <div>
                  <h3 className="text-base font-extrabold text-gray-900">Explore All Department Categories</h3>
                  <p className="text-xs text-gray-500">Over 500,000 top rated items across every popular vertical</p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveMegaMenu(null)}
                  className="text-xs text-gray-400 hover:text-gray-700 flex items-center space-x-1"
                >
                  <span>Close</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {Object.keys(CATEGORIES_DATA).map((catKey) => {
                  const cat = CATEGORIES_DATA[catKey];
                  return (
                    <div key={catKey} className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs">
                          {cat.name[0]}
                        </div>
                        <h4 className="text-xs font-bold text-gray-900 truncate">{cat.name}</h4>
                      </div>
                      <ul className="space-y-1.5 text-xs text-gray-600">
                        {cat.sections[0].links.slice(0, 4).map((link, idx) => (
                          <li key={idx}>
                            <a
                              href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                              className="hover:text-indigo-600 transition-colors block truncate"
                            >
                              {link}
                            </a>
                          </li>
                        ))}
                        <li>
                          <button
                            type="button"
                            onClick={() => setActiveMegaMenu(catKey)}
                            className="text-[11px] font-bold text-indigo-600 hover:underline pt-1 inline-flex items-center space-x-1"
                          >
                            <span>View All ({cat.name}) &rarr;</span>
                          </button>
                        </li>
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* 6. MOBILE SIDEBAR / OFF-CANVAS MENU */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>

          {/* Drawer Content */}
          <div className="relative w-4/5 max-w-sm bg-white h-full shadow-2xl flex flex-col z-10 overflow-y-auto animate-slideIn">
            {/* Mobile Header */}
            <div className="bg-gradient-to-r from-slate-900 to-indigo-950 p-4 text-white flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white">
                  X
                </div>
                <span className="text-lg font-black tracking-tight">X-Shop</span>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-300 hover:text-white p-1"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Mobile User Profile snippet */}
            <div className="p-4 bg-indigo-50/70 border-b border-indigo-100 flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Welcome,</p>
                <p className="text-sm font-bold text-gray-800">Alex Morgan</p>
              </div>
              <span className="text-xs bg-indigo-600 text-white font-semibold px-2.5 py-1 rounded-full">
                540 Pts
              </span>
            </div>

            {/* Mobile Categories Accordion */}
            <div className="p-4 space-y-4 flex-1">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Categories</h4>
              <div className="space-y-1">
                {Object.keys(CATEGORIES_DATA).map((catKey) => {
                  const cat = CATEGORIES_DATA[catKey];
                  const isExpanded = mobileSubmenu === catKey;

                  return (
                    <div key={catKey} className="border-b border-gray-100 pb-1">
                      <button
                        type="button"
                        onClick={() => setMobileSubmenu(isExpanded ? null : catKey)}
                        className="w-full flex items-center justify-between py-2.5 text-xs font-semibold text-gray-800 hover:text-indigo-600"
                      >
                        <span>{cat.name}</span>
                        <svg
                          className={`w-3.5 h-3.5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {isExpanded && (
                        <div className="pl-3 pb-2 space-y-1.5 animate-fadeIn">
                          {cat.sections.map((section, sIdx) => (
                            <div key={sIdx} className="pt-1">
                              <span className="text-[11px] font-bold text-gray-400 uppercase">{section.title}</span>
                              <div className="pl-2 mt-1 space-y-1">
                                {section.links.map((link, lIdx) => (
                                  <a
                                    key={lIdx}
                                    href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block text-xs text-gray-600 hover:text-indigo-600 py-0.5"
                                  >
                                    {link}
                                  </a>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Mobile Quick Links */}
              <div className="pt-2 space-y-2">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Account & Help</h4>
                <button
                  type="button"
                  onClick={() => { setIsMobileMenuOpen(false); if (onNavigate) onNavigate('orders'); }}
                  className="block w-full text-left text-xs font-medium text-gray-700 hover:text-indigo-600 py-1 cursor-pointer"
                >
                  📦 My Orders & Tracking
                </button>
                <button
                  type="button"
                  onClick={() => { setIsMobileMenuOpen(false); if (onNavigate) onNavigate('wishlist'); }}
                  className="block w-full text-left text-xs font-medium text-gray-700 hover:text-indigo-600 py-1 cursor-pointer"
                >
                  ❤️ Wishlist ({wishlistCount} items)
                </button>
                <a
                  href="#deals"
                  className="block text-xs font-bold text-rose-600 hover:text-rose-700 py-1"
                >
                  🔥 Flash Deals & Coupons
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    if (onOpenSeller) onOpenSeller();
                  }}
                  className="w-full text-left block text-xs font-bold text-indigo-600 hover:text-indigo-800 py-1"
                >
                  🏪 Seller Panel / Merchant Hub
                </button>
                <a
                  href="#support"
                  className="block text-xs font-medium text-gray-700 hover:text-indigo-600 py-1"
                >
                  💬 24/7 Customer Support
                </a>
              </div>
            </div>

            {/* Mobile Footer */}
            <div className="p-4 bg-gray-50 border-t border-gray-100 text-xs text-gray-500 flex items-center justify-between">
              <span>Currency: {selectedCurrency.code} ({selectedCurrency.symbol})</span>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-rose-600 font-semibold"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
