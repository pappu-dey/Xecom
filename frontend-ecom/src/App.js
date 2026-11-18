import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroPosterCarousel from './components/HeroPosterCarousel';
import CategoryNavigationBox from './components/CategoryNavigationBox';
import BigSearchBar from './components/BigSearchBar';
import ShopItemGrid from './components/ShopItemGrid';
import Footer from './components/Footer';
import SellerPanel from './components/SellerPanel';
import WishlistPage from './components/WishlistPage';
import OrdersPage from './components/OrdersPage';
import CheckoutPage from './components/CheckoutPage';
import AccountPage from './components/AccountPage';
import SavedAddressPage from './components/SavedAddressPage';

// ────────────────────────────────────────────────────────────
// MOCK DATA
// ────────────────────────────────────────────────────────────
const INITIAL_WISHLIST = [
  {
    id: 'w1',
    title: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
    brand: 'Sony',
    categoryName: 'Electronics',
    price: 24990,
    originalPrice: 34990,
    discount: '29% OFF',
    badge: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'w2',
    title: 'Nike Air Max 270 Athletic Sneakers – Triple White',
    brand: 'Nike',
    categoryName: 'Footwear',
    price: 12995,
    originalPrice: 15995,
    discount: '19% OFF',
    badge: 'New Arrival',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'w3',
    title: 'Hydra Boost Vitamin C Serum 50ml – Glow Formula',
    brand: 'The Ordinary',
    categoryName: 'Skincare',
    price: 1499,
    originalPrice: 2499,
    discount: '40% OFF',
    image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=400&q=80',
  },
];

const INITIAL_ORDERS = [
  {
    id: 'XSH-884920',
    date: '27 Oct 2026',
    status: 'In Transit',
    trackingStep: 3,
    deliveryEstimate: 'Tomorrow by 8:00 PM',
    paymentMethod: 'UPI (Instant Verified)',
    totalAmount: 37985,
    shippingAddress: 'Flat 402, Sunset Heights, Linking Road, Bandra West, Mumbai, Maharashtra - 400050',
    recipientPhone: '+91 98765 43210',
    items: [
      {
        id: 'w1',
        title: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
        brand: 'Sony',
        price: 24990,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80',
      },
      {
        id: 'w2',
        title: 'Nike Air Max 270 Athletic Sneakers – Triple White',
        brand: 'Nike',
        price: 12995,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80',
      },
    ],
  },
  {
    id: 'XSH-773810',
    date: '10 Oct 2026',
    status: 'Delivered',
    trackingStep: 5,
    paymentMethod: 'Credit / Debit Card',
    totalAmount: 8499,
    shippingAddress: 'Tower B, 7th Floor, Mindspace Tech Park, Malad West, Mumbai - 400064',
    recipientPhone: '+91 98765 43210',
    items: [
      {
        id: 'p1',
        title: 'Levi\'s 511 Slim Fit Stretch Jeans – Indigo Blue',
        brand: 'Levi\'s',
        price: 4499,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?auto=format&fit=crop&w=400&q=80',
      },
      {
        id: 'p2',
        title: 'Hydra Boost Vitamin C Serum 50ml',
        brand: 'The Ordinary',
        price: 1499,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=400&q=80',
      },
    ],
  },
];

const INITIAL_CART = [
  {
    id: 'c1',
    title: 'Apple MacBook Air M3 – 8GB RAM / 256GB SSD',
    brand: 'Apple',
    price: 109900,
    originalPrice: 119900,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'c2',
    title: 'Anker 65W Nano GaN USB-C Charger',
    brand: 'Anker',
    price: 3499,
    originalPrice: 4999,
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?auto=format&fit=crop&w=400&q=80',
  },
];

// ────────────────────────────────────────────────────────────
// APP ROOT
// ────────────────────────────────────────────────────────────
function App() {
  // Global page/view state
  const [viewMode, setViewMode] = useState('store'); // store | seller | wishlist | orders | checkout | account | addresses

  // Store sub-states
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Data states
  const [wishlistItems, setWishlistItems] = useState(INITIAL_WISHLIST);
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [cartItems, setCartItems] = useState(INITIAL_CART);

  // ── Navigation helpers ──────────────────────────────────
  const goTo = (page) => setViewMode(page);
  const goHome = () => setViewMode('store');

  // ── Wishlist handlers ───────────────────────────────────
  const handleRemoveFromWishlist = (id) =>
    setWishlistItems((prev) => prev.filter((i) => i.id !== id));

  const handleMoveToCart = (item) => {
    setCartItems((prev) => {
      const exists = prev.find((c) => c.id === item.id);
      if (exists) return prev.map((c) => c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c);
      return [...prev, { ...item, quantity: 1 }];
    });
    handleRemoveFromWishlist(item.id);
  };

  const handleMoveAllToCart = () => {
    wishlistItems.forEach((item) => handleMoveToCart(item));
  };

  // ── Cart / Checkout handlers ────────────────────────────
  const handleUpdateQuantity = (id, qty) =>
    setCartItems((prev) => prev.map((i) => i.id === id ? { ...i, quantity: qty } : i));

  const handleRemoveCartItem = (id) =>
    setCartItems((prev) => prev.filter((i) => i.id !== id));

  const handlePlaceOrder = (newOrder) => {
    setOrders((prev) => [newOrder, ...prev]);
    setCartItems([]);
    setViewMode('orders');
  };

  // ── Orders handler ──────────────────────────────────────
  const handleBuyAgain = (item) => {
    handleMoveToCart(item);
    setViewMode('checkout');
  };

  return (
    <div className="relative min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col justify-between">

      {/* ── SELLER PANEL (full screen override) ── */}
      {viewMode === 'seller' && (
        <SellerPanel onSwitchToStore={goHome} />
      )}

      {/* ── ALL OTHER VIEWS (Navbar + content) ── */}
      {viewMode !== 'seller' && (
        <div className="flex flex-col min-h-screen">
          <Navbar
            onOpenSeller={() => goTo('seller')}
            onNavigate={goTo}
            wishlistCount={wishlistItems.length}
            cartCount={cartItems.reduce((a, c) => a + c.quantity, 0)}
            cartSubtotal={cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
            cartItems={cartItems}
            onRemoveCartItem={handleRemoveCartItem}
          />

          <main className="flex-1 pt-0 pb-16 sm:pb-0">

            {/* ── STORE HOME ── */}
            {viewMode === 'store' && (
              <>
                <HeroPosterCarousel />
                <CategoryNavigationBox
                  activeCategory={selectedCategory}
                  onSelectCategory={(catSlug) => setSelectedCategory(catSlug)}
                />
                <BigSearchBar
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                />
                <ShopItemGrid
                  activeCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                  searchQuery={searchQuery}
                  onClearSearch={() => setSearchQuery('')}
                />
                {/* Merchant CTA */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 flex justify-center">
                  <button
                    onClick={() => goTo('seller')}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 text-white text-xs sm:text-sm font-semibold hover:bg-rose-600 transition-all shadow-lg hover:shadow-rose-500/25 cursor-pointer"
                  >
                    <span>📦 Are you a merchant? Switch to Seller Panel</span>
                    <span>→</span>
                  </button>
                </div>
              </>
            )}

            {/* ── WISHLIST PAGE ── */}
            {viewMode === 'wishlist' && (
              <WishlistPage
                wishlistItems={wishlistItems}
                onRemoveFromWishlist={handleRemoveFromWishlist}
                onMoveToCart={handleMoveToCart}
                onMoveAllToCart={handleMoveAllToCart}
                onContinueShopping={goHome}
              />
            )}

            {/* ── ORDERS PAGE ── */}
            {viewMode === 'orders' && (
              <OrdersPage
                orders={orders}
                onBuyAgain={handleBuyAgain}
                onContinueShopping={goHome}
              />
            )}

            {/* ── CHECKOUT PAGE ── */}
            {viewMode === 'checkout' && (
              <CheckoutPage
                cartItems={cartItems}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveCartItem}
                onPlaceOrder={handlePlaceOrder}
                onContinueShopping={goHome}
              />
            )}

            {/* ── ACCOUNT PAGE ── */}
            {viewMode === 'account' && (
              <AccountPage
                onNavigate={goTo}
                onContinueShopping={goHome}
              />
            )}

            {/* ── SAVED ADDRESSES PAGE ── */}
            {viewMode === 'addresses' && (
              <SavedAddressPage
                onContinueShopping={goHome}
              />
            )}

          </main>

          <Footer onOpenSeller={() => goTo('seller')} />

          {/* ── MOBILE BOTTOM NAV BAR ── */}
          <nav className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-white border-t border-slate-200 shadow-2xl flex items-center justify-around px-2 py-1" style={{paddingBottom: 'env(safe-area-inset-bottom)'}}>
            <button
              onClick={goHome}
              className={`flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-colors cursor-pointer min-w-[44px] ${
                viewMode === 'store' ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="text-[10px] font-semibold">Home</span>
            </button>

            <button
              onClick={() => goTo('wishlist')}
              className={`relative flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-colors cursor-pointer min-w-[44px] ${
                viewMode === 'wishlist' ? 'text-rose-600' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {wishlistItems.length > 0 && (
                <span className="absolute top-1 right-2 w-4 h-4 bg-rose-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
              <span className="text-[10px] font-semibold">Wishlist</span>
            </button>

            <button
              onClick={() => goTo('orders')}
              className={`flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-colors cursor-pointer min-w-[44px] ${
                viewMode === 'orders' ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="text-[10px] font-semibold">Orders</span>
            </button>

            <button
              onClick={() => goTo('checkout')}
              className={`relative flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-colors cursor-pointer min-w-[44px] ${
                viewMode === 'checkout' ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartItems.reduce((a, c) => a + c.quantity, 0) > 0 && (
                <span className="absolute top-1 right-2 w-4 h-4 bg-indigo-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {cartItems.reduce((a, c) => a + c.quantity, 0)}
                </span>
              )}
              <span className="text-[10px] font-semibold">Cart</span>
            </button>

            <button
              onClick={() => goTo('account')}
              className={`flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-colors cursor-pointer min-w-[44px] ${
                viewMode === 'account' ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-[10px] font-semibold">Account</span>
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}

export default App;
