import React, { useState } from 'react';

const TRACKING_STEPS = [
  { step: 1, label: 'Order Confirmed', time: 'Mon, 27 Oct, 10:30 AM' },
  { step: 2, label: 'Packed & Ready', time: 'Mon, 27 Oct, 03:15 PM' },
  { step: 3, label: 'Shipped from Hub', time: 'Mon, 27 Oct, 07:45 PM' },
  { step: 4, label: 'Out for Delivery', time: 'Expected Tomorrow' },
  { step: 5, label: 'Delivered', time: 'Expected by 8:00 PM' },
];

export default function OrdersPage({
  orders = [],
  onBuyAgain,
  onContinueShopping,
  onProductClick,
}) {
  const [filterTab, setFilterTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTrackingOrder, setSelectedTrackingOrder] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleDownloadInvoice = (orderId) => {
    showToast(`Downloading Tax Invoice for ${orderId}... 📄`);
  };

  const handleBuyAgain = (item) => {
    if (onBuyAgain) {
      onBuyAgain(item);
      showToast(`Added "${item.title || item.name}" to cart! 🛒`);
    }
  };

  // Filter orders
  const filteredOrders = orders.filter((order) => {
    if (filterTab === 'transit' && order.status === 'Delivered') return false;
    if (filterTab === 'delivered' && order.status !== 'Delivered') return false;
    if (filterTab === 'cancelled' && order.status !== 'Cancelled') return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const inId = order.id.toLowerCase().includes(q);
      const inItem = order.items.some((i) =>
        (i.title || i.name || '').toLowerCase().includes(q)
      );
      return inId || inItem;
    }
    return true;
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-700 animate-fadeIn">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
          <p className="text-xs sm:text-sm font-semibold">{toastMessage}</p>
        </div>
      )}

      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <button onClick={onContinueShopping} className="hover:text-slate-700 cursor-pointer">
              Home
            </button>
            <span>›</span>
            <span className="text-slate-800 font-semibold">My Orders</span>
          </div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              My Orders & Shipments
            </h1>
            <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full border border-indigo-200">
              {orders.length} Total
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track live package shipments, download invoices, request returns and repurchase favorites.
          </p>
        </div>

        {/* Search Orders */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder="Search by product name or order ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs px-4 py-2.5 pl-9 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-rose-500 shadow-sm"
          />
          <svg
            className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600 font-bold"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 my-6 overflow-x-auto pb-1 scrollbar-none text-xs">
        {[
          { id: 'all', label: 'All Orders' },
          { id: 'transit', label: 'In Transit / Dispatched' },
          { id: 'delivered', label: 'Delivered' },
          { id: 'cancelled', label: 'Cancelled' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterTab(tab.id)}
            className={`px-4 py-2 rounded-xl font-bold transition-all cursor-pointer whitespace-nowrap ${
              filterTab === tab.id
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm max-w-lg mx-auto my-12">
          <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-3xl mx-auto mb-3">
            📦
          </div>
          <h3 className="text-lg font-bold text-slate-800">No Orders Found</h3>
          <p className="text-xs text-slate-500 mt-1">
            {searchQuery
              ? `No orders matching "${searchQuery}"`
              : "You haven't placed any orders matching this filter."}
          </p>
          <button
            onClick={onContinueShopping}
            className="mt-5 px-6 py-2.5 bg-slate-900 hover:bg-rose-600 text-white text-xs font-bold rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredOrders.map((order) => {
            const isDelivered = order.status === 'Delivered';
            const currentStep = order.trackingStep || (isDelivered ? 5 : 3);

            return (
              <div
                key={order.id}
                className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden"
              >
                {/* Order Header Card */}
                <div className="bg-slate-50/80 p-5 sm:p-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-4 text-xs">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">
                        Order ID
                      </span>
                      <span className="font-extrabold text-slate-900 font-mono text-sm">
                        #{order.id}
                      </span>
                    </div>

                    <div className="hidden sm:block w-px h-7 bg-slate-200"></div>

                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">
                        Order Placed
                      </span>
                      <span className="font-bold text-slate-800">{order.date}</span>
                    </div>

                    <div className="hidden sm:block w-px h-7 bg-slate-200"></div>

                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">
                        Total Amount
                      </span>
                      <span className="font-black text-slate-900 text-sm">
                        ₹{order.totalAmount.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <div className="hidden sm:block w-px h-7 bg-slate-200"></div>

                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">
                        Payment
                      </span>
                      <span className="font-semibold text-slate-700">{order.paymentMethod}</span>
                    </div>
                  </div>

                  {/* Header Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDownloadInvoice(order.id)}
                      className="px-3.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>📄 Invoice</span>
                    </button>
                    <button
                      onClick={() => setSelectedTrackingOrder(order)}
                      className="px-3.5 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <span>📍 Track</span>
                    </button>
                  </div>
                </div>

                {/* Delivery Progress Bar */}
                <div className="p-5 sm:p-6 border-b border-slate-100 bg-gradient-to-r from-slate-50/50 via-white to-slate-50/50">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${isDelivered ? 'bg-emerald-500' : 'bg-indigo-600 animate-pulse'}`}></span>
                      <span className="text-xs sm:text-sm font-black text-slate-900">
                        {isDelivered
                          ? `Delivered on ${order.date}`
                          : `Estimated Delivery: ${order.deliveryEstimate || 'Tomorrow by 8 PM'}`}
                      </span>
                    </div>
                    <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                      Shipment Partner: BlueDart Express (Air Cargo)
                    </span>
                  </div>

                  {/* Visual Tracker Line */}
                  <div className="relative pt-2 pb-4">
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-slate-100">
                      <div
                        style={{ width: `${(currentStep / 5) * 100}%` }}
                        className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all duration-700 ${
                          isDelivered
                            ? 'bg-emerald-500'
                            : 'bg-gradient-to-r from-indigo-500 to-rose-500'
                        }`}
                      ></div>
                    </div>

                    <div className="grid grid-cols-5 text-[10px] sm:text-xs text-center font-medium text-slate-500">
                      <span className={currentStep >= 1 ? 'font-bold text-slate-900' : ''}>Ordered</span>
                      <span className={currentStep >= 2 ? 'font-bold text-slate-900' : ''}>Packed</span>
                      <span className={currentStep >= 3 ? 'font-bold text-slate-900' : ''}>Shipped</span>
                      <span className={currentStep >= 4 ? 'font-bold text-slate-900' : ''}>Out for Delivery</span>
                      <span className={currentStep >= 5 ? 'font-bold text-emerald-600' : ''}>Delivered</span>
                    </div>
                  </div>
                </div>

                {/* Items in this Order */}
                <div className="p-5 sm:p-6 divide-y divide-slate-100">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div
                        onClick={() => onProductClick && onProductClick(item)}
                        className="flex items-center gap-4 cursor-pointer group"
                        title="Click to view product details"
                      >
                        <img
                          src={item.image}
                          alt={item.title || item.name}
                          className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-2xl border border-slate-200 flex-shrink-0 group-hover:scale-105 transition-transform"
                        />
                        <div>
                          <h4 className="font-bold text-xs sm:text-sm text-slate-900 leading-snug group-hover:text-rose-600 transition-colors">
                            {item.title || item.name}
                          </h4>
                          <p className="text-xs text-slate-500 mt-1">
                            Brand: <span className="font-semibold text-slate-700">{item.brand || 'Verified Brand'}</span> • Qty: {item.quantity || 1}
                          </p>
                          <div className="flex items-baseline gap-2 mt-1">
                            <span className="font-black text-xs sm:text-sm text-slate-900">
                              ₹{(item.price * (item.quantity || 1)).toLocaleString('en-IN')}
                            </span>
                            <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
                              Inclusive of all taxes
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Item Action Buttons */}
                      <div className="flex items-center gap-2 self-end sm:self-center">
                        <button
                          onClick={() => handleBuyAgain(item)}
                          className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-rose-600 text-white text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer flex items-center gap-1.5"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                          <span>Buy Again</span>
                        </button>
                        <button
                          onClick={() => showToast('Feedback review window opened ⭐')}
                          className="px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                        >
                          Write Review
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Delivery Address Details */}
                <div className="bg-slate-50/60 px-5 sm:px-6 py-3 border-t border-slate-100 text-xs text-slate-500 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span>Shipping Address: {order.shippingAddress || 'Alex Morgan, Flat 402, Bandra West, Mumbai - 400050'}</span>
                  <span className="font-medium text-slate-600">Contact: {order.recipientPhone || '+91 98765 43210'}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TRACKING TIMELINE MODAL */}
      {selectedTrackingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-slate-200 shadow-2xl relative">
            <button
              onClick={() => setSelectedTrackingOrder(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 font-bold text-lg cursor-pointer"
            >
              ✕
            </button>

            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">🚚</span>
              <h3 className="text-lg font-black text-slate-900">
                Tracking #{selectedTrackingOrder.id}
              </h3>
            </div>
            <p className="text-xs text-slate-500 mb-6">
              Carrier: BlueDart Air Express • AWB: BLD84920491
            </p>

            {/* Step-by-Step Vertical Tracking Timeline */}
            <div className="space-y-6 relative pl-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-indigo-100">
              {TRACKING_STEPS.map((step, idx) => (
                <div key={idx} className="relative flex items-start gap-4">
                  <span
                    className={`absolute -left-6 top-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ring-4 ring-white ${
                      idx + 1 <= (selectedTrackingOrder.trackingStep || 3)
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-200 text-slate-400'
                    }`}
                  >
                    ✓
                  </span>
                  <div>
                    <h5 className="text-xs sm:text-sm font-bold text-slate-900">
                      {step.label}
                    </h5>
                    <p className="text-[11px] text-slate-400 mt-0.5">{step.time}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedTrackingOrder(null)}
                className="px-5 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Close Tracking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
