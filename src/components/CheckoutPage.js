import React, { useState } from 'react';

const SAVED_ADDRESSES = [
  {
    id: 1,
    name: 'Alex Morgan',
    type: 'Home',
    phone: '+91 98765 43210',
    line1: 'Flat 402, Sunset Heights, Linking Road',
    city: 'Bandra West, Mumbai',
    state: 'Maharashtra',
    pincode: '400050',
    isDefault: true,
  },
  {
    id: 2,
    name: 'Alex Morgan (Work)',
    type: 'Office',
    phone: '+91 98765 43210',
    line1: 'Tower B, 7th Floor, Mindspace Tech Park',
    city: 'Malad West, Mumbai',
    state: 'Maharashtra',
    pincode: '400064',
    isDefault: false,
  },
];

export default function CheckoutPage({
  cartItems = [],
  onUpdateQuantity,
  onRemoveItem,
  onPlaceOrder,
  onContinueShopping,
}) {
  const [selectedAddressId, setSelectedAddressId] = useState(1);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [upiId, setUpiId] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  // New Address Form State
  const [newAddress, setNewAddress] = useState({
    name: '',
    phone: '',
    pincode: '',
    line1: '',
    city: '',
    state: '',
    type: 'Home',
  });

  // Financial Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);
  const totalMrp = cartItems.reduce(
    (acc, item) => acc + (item.originalPrice || Math.round(item.price * 1.5)) * (item.quantity || 1),
    0
  );
  const mrpDiscount = totalMrp - subtotal;
  const shippingFee = subtotal > 999 ? 0 : 99;

  let couponDiscountAmount = 0;
  if (appliedCoupon === 'XSHOP25') {
    couponDiscountAmount = Math.round(subtotal * 0.25);
  } else if (appliedCoupon === 'WELCOME500') {
    couponDiscountAmount = Math.min(500, subtotal);
  }

  const grandTotal = Math.max(0, subtotal - couponDiscountAmount + shippingFee);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError('');
    const code = couponCode.trim().toUpperCase();
    if (code === 'XSHOP25' || code === 'WELCOME500') {
      setAppliedCoupon(code);
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code. Try XSHOP25 or WELCOME500');
    }
  };

  const handleSaveNewAddress = (e) => {
    e.preventDefault();
    if (newAddress.name && newAddress.phone && newAddress.line1) {
      SAVED_ADDRESSES.push({
        id: Date.now(),
        ...newAddress,
        isDefault: false,
      });
      setSelectedAddressId(SAVED_ADDRESSES[SAVED_ADDRESSES.length - 1].id);
      setShowNewAddressForm(false);
    }
  };

  const handleConfirmOrder = () => {
    if (cartItems.length === 0) return;
    setIsPlacingOrder(true);

    const selectedAddr = SAVED_ADDRESSES.find((a) => a.id === selectedAddressId) || SAVED_ADDRESSES[0];

    setTimeout(() => {
      const newOrder = {
        id: `XSH-${Math.floor(100000 + Math.random() * 900000)}`,
        date: new Date().toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }),
        status: 'Confirmed',
        trackingStep: 1, // 1: Confirmed, 2: Packed, 3: Shipped, 4: Out for Delivery, 5: Delivered
        deliveryEstimate: 'Tomorrow by 8:00 PM',
        shippingAddress: `${selectedAddr.line1}, ${selectedAddr.city}, ${selectedAddr.state} - ${selectedAddr.pincode}`,
        recipientName: selectedAddr.name,
        recipientPhone: selectedAddr.phone,
        paymentMethod:
          paymentMethod === 'upi'
            ? 'UPI (Instant Verified)'
            : paymentMethod === 'card'
            ? 'Credit / Debit Card'
            : paymentMethod === 'netbanking'
            ? 'Net Banking'
            : 'Cash on Delivery',
        items: [...cartItems],
        totalAmount: grandTotal,
        subtotal: subtotal,
        discount: mrpDiscount + couponDiscountAmount,
      };

      setIsPlacingOrder(false);
      onPlaceOrder(newOrder);
    }, 1200);
  };

  if (cartItems.length === 0) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center animate-fadeIn">
        <div className="bg-white rounded-3xl p-12 max-w-md mx-auto border border-slate-200 shadow-sm">
          <div className="w-20 h-20 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center text-4xl mx-auto mb-4">
            🛒
          </div>
          <h2 className="text-xl font-black text-slate-900">Your Cart is Empty</h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            You don't have any products in your cart to checkout right now.
          </p>
          <button
            onClick={onContinueShopping}
            className="mt-6 px-6 py-3 bg-slate-900 hover:bg-rose-600 text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md active:scale-95 cursor-pointer"
          >
            Continue Shopping →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      {/* Checkout Progress Stepper */}
      <div className="max-w-3xl mx-auto mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-rose-600 text-white font-bold text-xs flex items-center justify-center shadow-md shadow-rose-500/20">
              1
            </span>
            <span className="text-xs sm:text-sm font-bold text-slate-900">Delivery Address</span>
          </div>
          <div className="flex-1 h-0.5 bg-slate-200 mx-4"></div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-rose-600 text-white font-bold text-xs flex items-center justify-center shadow-md shadow-rose-500/20">
              2
            </span>
            <span className="text-xs sm:text-sm font-bold text-slate-900">Payment & Review</span>
          </div>
          <div className="flex-1 h-0.5 bg-slate-200 mx-4"></div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-slate-200 text-slate-500 font-bold text-xs flex items-center justify-center">
              3
            </span>
            <span className="text-xs sm:text-sm font-semibold text-slate-400">Order Placed</span>
          </div>
        </div>
      </div>

      {/* Main 2-Column Checkout Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Address, Items & Payment (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* 1. DELIVERY ADDRESS SECTION */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-lg">📍</span>
                <h2 className="text-base sm:text-lg font-black text-slate-900">
                  Select Delivery Address
                </h2>
              </div>
              <button
                onClick={() => setShowNewAddressForm(!showNewAddressForm)}
                className="text-xs font-bold text-rose-600 hover:text-rose-700 cursor-pointer"
              >
                {showNewAddressForm ? 'Cancel' : '+ Add New Address'}
              </button>
            </div>

            {/* Address Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SAVED_ADDRESSES.map((addr) => (
                <div
                  key={addr.id}
                  onClick={() => setSelectedAddressId(addr.id)}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative ${
                    selectedAddressId === addr.id
                      ? 'border-rose-500 bg-rose-50/30 shadow-md ring-2 ring-rose-500/10'
                      : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-900 flex items-center gap-2">
                      {addr.name}
                      <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-medium">
                        {addr.type}
                      </span>
                    </span>
                    <input
                      type="radio"
                      checked={selectedAddressId === addr.id}
                      onChange={() => setSelectedAddressId(addr.id)}
                      className="accent-rose-600"
                    />
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{addr.line1}</p>
                  <p className="text-xs text-slate-600 font-medium mt-1">
                    {addr.city}, {addr.state} - {addr.pincode}
                  </p>
                  <p className="text-xs text-slate-500 mt-2 font-mono">{addr.phone}</p>
                </div>
              ))}
            </div>

            {/* New Address Collapsible Form */}
            {showNewAddressForm && (
              <form onSubmit={handleSaveNewAddress} className="mt-5 p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Add New Shipping Address</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Full Name"
                    required
                    value={newAddress.name}
                    onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                    className="text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-rose-500"
                  />
                  <input
                    type="tel"
                    placeholder="10-Digit Mobile Number"
                    required
                    value={newAddress.phone}
                    onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                    className="text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-rose-500"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Flat, House no., Building, Street address"
                  required
                  value={newAddress.line1}
                  onChange={(e) => setNewAddress({ ...newAddress, line1: e.target.value })}
                  className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-rose-500"
                />
                <div className="grid grid-cols-3 gap-3">
                  <input
                    type="text"
                    placeholder="City"
                    required
                    value={newAddress.city}
                    onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                    className="text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-rose-500"
                  />
                  <input
                    type="text"
                    placeholder="State"
                    required
                    value={newAddress.state}
                    onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                    className="text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-rose-500"
                  />
                  <input
                    type="text"
                    placeholder="Pincode"
                    required
                    value={newAddress.pincode}
                    onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
                    className="text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-rose-500"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-rose-600 transition-colors cursor-pointer"
                >
                  Save & Use Address
                </button>
              </form>
            )}
          </div>

          {/* 2. ORDER ITEMS REVIEW SECTION */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-lg">📦</span>
                <h2 className="text-base sm:text-lg font-black text-slate-900">
                  Order Items ({cartItems.length})
                </h2>
              </div>
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                ⚡ Delivery by Tomorrow
              </span>
            </div>

            <div className="divide-y divide-slate-100">
              {cartItems.map((item) => (
                <div key={item.id} className="py-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <img
                      src={item.image}
                      alt={item.title || item.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl border border-slate-200 flex-shrink-0"
                    />
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-800 line-clamp-1">
                        {item.title || item.name}
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Brand: {item.brand || 'Verified'} • Standard Warranty
                      </p>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-xs sm:text-sm font-black text-slate-900">
                          ₹{item.price.toLocaleString('en-IN')}
                        </span>
                        {item.originalPrice && (
                          <span className="text-[11px] text-slate-400 line-through">
                            ₹{item.originalPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Quantity Controls & Remove */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                      <button
                        onClick={() => onUpdateQuantity(item.id, Math.max(1, (item.quantity || 1) - 1))}
                        className="px-2.5 py-1 text-slate-600 hover:bg-slate-200 text-xs font-bold cursor-pointer"
                      >
                        -
                      </button>
                      <span className="px-3 text-xs font-bold text-slate-800">
                        {item.quantity || 1}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, (item.quantity || 1) + 1)}
                        className="px-2.5 py-1 text-slate-600 hover:bg-slate-200 text-xs font-bold cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer transition-colors"
                      title="Remove Item"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. PAYMENT METHOD SELECTION */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg">💳</span>
              <h2 className="text-base sm:text-lg font-black text-slate-900">
                Choose Payment Method
              </h2>
            </div>

            <div className="space-y-3">
              {/* Option 1: UPI */}
              <div
                onClick={() => setPaymentMethod('upi')}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                  paymentMethod === 'upi' ? 'border-indigo-600 bg-indigo-50/30 ring-2 ring-indigo-500/10' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'upi'}
                      onChange={() => setPaymentMethod('upi')}
                      className="accent-indigo-600"
                    />
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                        UPI (Google Pay, PhonePe, Paytm, BHIM)
                      </h4>
                      <p className="text-[11px] text-slate-500">Pay directly via any UPI app or ID with instant verification</p>
                    </div>
                  </div>
                  <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">Fastest</span>
                </div>

                {paymentMethod === 'upi' && (
                  <div className="mt-4 pt-3 border-t border-indigo-100 flex flex-col sm:flex-row items-center gap-3">
                    <input
                      type="text"
                      placeholder="e.g. mobile@okaxis / user@upi"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="w-full sm:w-72 text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-indigo-600"
                    />
                    <span className="text-[11px] text-slate-500 font-medium">Or scan QR code at checkout</span>
                  </div>
                )}
              </div>

              {/* Option 2: Credit / Debit Card */}
              <div
                onClick={() => setPaymentMethod('card')}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                  paymentMethod === 'card' ? 'border-indigo-600 bg-indigo-50/30 ring-2 ring-indigo-500/10' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="accent-indigo-600"
                    />
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                        Credit / Debit Cards
                      </h4>
                      <p className="text-[11px] text-slate-500">Visa, Mastercard, RuPay, Maestro & American Express</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                    <span>VISA</span> • <span>MC</span> • <span>RuPay</span>
                  </div>
                </div>

                {paymentMethod === 'card' && (
                  <div className="mt-4 pt-3 border-t border-indigo-100 space-y-3">
                    <input
                      type="text"
                      placeholder="16-Digit Card Number"
                      className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-indigo-600"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-indigo-600"
                      />
                      <input
                        type="password"
                        placeholder="CVV"
                        maxLength="4"
                        className="text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-indigo-600"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Option 3: Net Banking */}
              <div
                onClick={() => setPaymentMethod('netbanking')}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                  paymentMethod === 'netbanking' ? 'border-indigo-600 bg-indigo-50/30 ring-2 ring-indigo-500/10' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'netbanking'}
                    onChange={() => setPaymentMethod('netbanking')}
                    className="accent-indigo-600"
                  />
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">Net Banking</h4>
                    <p className="text-[11px] text-slate-500">All Indian major banks supported (HDFC, SBI, ICICI, Axis)</p>
                  </div>
                </div>
              </div>

              {/* Option 4: Cash on Delivery */}
              <div
                onClick={() => setPaymentMethod('cod')}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                  paymentMethod === 'cod' ? 'border-indigo-600 bg-indigo-50/30 ring-2 ring-indigo-500/10' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="accent-indigo-600"
                  />
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">Cash on Delivery / Pay on Delivery</h4>
                    <p className="text-[11px] text-slate-500">Pay via cash or UPI QR at your doorstep upon receiving</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Order Summary & Coupon (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Order Summary Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm sticky top-24">
            <h3 className="text-base font-black text-slate-900 pb-3 border-b border-slate-100">
              Order Summary
            </h3>

            {/* Promo Code Box */}
            <form onSubmit={handleApplyCoupon} className="mt-4 pb-4 border-b border-slate-100">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Apply Coupon Code
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. XSHOP25 or WELCOME500"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-rose-500 uppercase font-mono"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  Apply
                </button>
              </div>

              {appliedCoupon && (
                <div className="mt-2 text-xs font-bold text-emerald-600 flex items-center justify-between">
                  <span>✓ Coupon {appliedCoupon} applied!</span>
                  <button
                    type="button"
                    onClick={() => {
                      setAppliedCoupon(null);
                      setCouponCode('');
                    }}
                    className="text-slate-400 hover:text-rose-600"
                  >
                    Remove
                  </button>
                </div>
              )}

              {couponError && (
                <p className="mt-1.5 text-xs text-rose-500 font-medium">{couponError}</p>
              )}
            </form>

            {/* Price Details */}
            <div className="py-4 space-y-2.5 text-xs text-slate-600 border-b border-slate-100">
              <div className="flex justify-between">
                <span>Total MRP ({cartItems.length} items)</span>
                <span>₹{totalMrp.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-emerald-600 font-semibold">
                <span>Discount on MRP</span>
                <span>- ₹{mrpDiscount.toLocaleString('en-IN')}</span>
              </div>

              {couponDiscountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Coupon Discount ({appliedCoupon})</span>
                  <span>- ₹{couponDiscountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Delivery Fee</span>
                {shippingFee === 0 ? (
                  <span className="text-emerald-600 font-bold">FREE</span>
                ) : (
                  <span>₹{shippingFee}</span>
                )}
              </div>
            </div>

            {/* Grand Total */}
            <div className="py-4 flex items-baseline justify-between">
              <div>
                <span className="text-sm font-black text-slate-900 block">Total Amount</span>
                <span className="text-[11px] text-emerald-600 font-medium">
                  You saved ₹{(mrpDiscount + couponDiscountAmount).toLocaleString('en-IN')} on this order
                </span>
              </div>
              <span className="text-2xl font-black text-slate-900">
                ₹{grandTotal.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Place Order CTA Button */}
            <button
              onClick={handleConfirmOrder}
              disabled={isPlacingOrder}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 disabled:opacity-75 text-white font-extrabold text-sm rounded-2xl shadow-xl shadow-rose-600/25 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              {isPlacingOrder ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                  </svg>
                  <span>Securing Order...</span>
                </>
              ) : (
                <>
                  <span>Place Order • ₹{grandTotal.toLocaleString('en-IN')}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>

            {/* Security Guarantee */}
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-center gap-2 text-[11px] text-slate-400">
              <span>🔒</span>
              <span>256-Bit Bank Grade SSL Encrypted Checkout</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
