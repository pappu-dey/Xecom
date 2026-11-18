import React, { useState } from 'react';

export default function Footer({ onOpenSeller }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 4000);
    }
  };

  return (
    <footer className="w-full bg-slate-900 text-slate-300 font-sans mt-auto border-t border-slate-800">
      {/* 1. TOP PERKS / VALUE PROPOSITIONS */}
      <div className="border-b border-slate-800 bg-slate-950/60 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 text-center sm:text-left">
          
          <div className="flex flex-col sm:flex-row items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-2xl text-indigo-400">
              🚀
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Free Express Delivery</h4>
              <p className="text-xs text-slate-400 mt-0.5">On orders above ₹999 across India</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-2xl text-emerald-400">
              🛡️
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">100% Genuine Guarantee</h4>
              <p className="text-xs text-slate-400 mt-0.5">Sourced directly from verified brands</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-2xl text-rose-400">
              🔄
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">14-Day Easy Returns</h4>
              <p className="text-xs text-slate-400 mt-0.5">Instant doorstep pickup & refund</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-2xl text-amber-400">
              🎧
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">24/7 Dedicated Support</h4>
              <p className="text-xs text-slate-400 mt-0.5">Live chat, phone & email assistance</p>
            </div>
          </div>

        </div>
      </div>

      {/* 2. NEWSLETTER SUBSCRIPTION BANNER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-b border-slate-800/80">
        <div className="bg-gradient-to-r from-indigo-950/70 via-slate-800/50 to-indigo-950/70 rounded-3xl p-6 sm:p-8 border border-indigo-500/20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <span className="text-[11px] font-bold tracking-widest uppercase text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20">
              VIP Club Rewards
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white mt-2">
              Unlock ₹500 OFF Your Next Order
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-lg">
              Subscribe to secret flash sales, new trend drops & member-only price cuts.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full md:w-auto flex flex-col sm:flex-row gap-2.5">
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="w-full sm:w-80 bg-slate-900 text-white placeholder-slate-500 text-xs sm:text-sm px-4 py-3 rounded-xl border border-slate-700 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-lg shadow-rose-600/20 cursor-pointer whitespace-nowrap active:scale-95"
            >
              {subscribed ? 'Subscribed! 🎉' : 'Claim ₹500 OFF'}
            </button>
          </form>
        </div>
      </div>

      {/* 3. MULTI-COLUMN NAVIGATION LINKS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          
          {/* Brand Column */}
          <div className="col-span-2">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-600 via-indigo-600 to-amber-400 flex items-center justify-center font-black text-white text-lg shadow-md shadow-rose-500/20">
                X
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                X-Shop<span className="text-rose-500">.</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-3 leading-relaxed max-w-sm">
              India's premier modern shopping destination for Men's Fashion, Western & Ethnic Wear, Kids Apparel, Athletic Footwear, and Cutting-Edge Electronics.
            </p>
            <div className="mt-4 flex items-center gap-3 text-sm text-slate-400">
              <span className="text-xs">Follow us:</span>
              <span className="hover:text-white cursor-pointer transition-colors">Instagram</span>
              <span>•</span>
              <span className="hover:text-white cursor-pointer transition-colors">Twitter (X)</span>
              <span>•</span>
              <span className="hover:text-white cursor-pointer transition-colors">YouTube</span>
            </div>
          </div>

          {/* Categories Column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Departments
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#men" className="hover:text-white transition-colors">Men's Fashion</a></li>
              <li><a href="#women" className="hover:text-white transition-colors">Women's Fashion</a></li>
              <li><a href="#kids" className="hover:text-white transition-colors">Kids' Fashion</a></li>
              <li><a href="#shoes" className="hover:text-white transition-colors">Shoes & Sneakers</a></li>
              <li><a href="#electronics" className="hover:text-white transition-colors">Electronics & Audio</a></li>
              <li><a href="#ethnic" className="hover:text-white transition-colors">Ethnic Wear</a></li>
              <li><a href="#beauty" className="hover:text-white transition-colors">Beauty & Skincare</a></li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Help & Support
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#track" className="hover:text-white transition-colors">Track Order</a></li>
              <li><a href="#returns" className="hover:text-white transition-colors">Returns & Exchanges</a></li>
              <li><a href="#shipping" className="hover:text-white transition-colors">Shipping Information</a></li>
              <li><a href="#faqs" className="hover:text-white transition-colors">FAQs & Help Desk</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact Us (24/7)</a></li>
              <li><a href="#warranty" className="hover:text-white transition-colors">Warranty Claims</a></li>
            </ul>
          </div>

          {/* Merchant / Business */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Sell on X-Shop
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={onOpenSeller}
                  className="text-amber-400 hover:text-amber-300 font-semibold transition-colors text-left cursor-pointer"
                >
                  🚀 Seller Dashboard
                </button>
              </li>
              <li><a href="#merchant" className="hover:text-white transition-colors">Become a Verified Seller</a></li>
              <li><a href="#fulfillment" className="hover:text-white transition-colors">Fulfillment by X-Shop</a></li>
              <li><a href="#ads" className="hover:text-white transition-colors">Advertise Your Brand</a></li>
              <li><a href="#policy" className="hover:text-white transition-colors">Merchant Guidelines</a></li>
            </ul>
          </div>

        </div>
      </div>

      {/* 4. PAYMENT METHODS & COPYRIGHT STRIP */}
      <div className="border-t border-slate-800 bg-slate-950 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-semibold text-slate-400">Accepted Payments:</span>
            <span className="bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-slate-300 font-mono">UPI</span>
            <span className="bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-slate-300 font-mono">Visa</span>
            <span className="bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-slate-300 font-mono">Mastercard</span>
            <span className="bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-slate-300 font-mono">RuPay</span>
            <span className="bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-slate-300 font-mono">NetBanking</span>
            <span className="bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-slate-300 font-mono">Cash on Delivery</span>
          </div>

          <div className="text-center sm:text-right">
            © 2026 X-Shop Ecommerce Inc. All rights reserved. • Privacy Policy • Terms of Service
          </div>
        </div>
      </div>
    </footer>
  );
}
