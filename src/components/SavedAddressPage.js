import React, { useState } from 'react';

const INITIAL_ADDRESSES = [
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
  {
    id: 3,
    name: 'Parent\'s Home',
    type: 'Home',
    phone: '+91 99887 66554',
    line1: '12, Shivaji Nagar, Near Central Park',
    city: 'Pune',
    state: 'Maharashtra',
    pincode: '411005',
    isDefault: false,
  },
];

const ADDRESS_TYPE_ICONS = {
  Home: '🏠',
  Office: '🏢',
  Other: '📍',
};

const EMPTY_FORM = {
  name: '',
  phone: '',
  line1: '',
  city: '',
  state: '',
  pincode: '',
  type: 'Home',
};

export default function SavedAddressPage({ onContinueShopping }) {
  const [addresses, setAddresses] = useState(INITIAL_ADDRESSES);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ ...EMPTY_FORM });
  const [toastMessage, setToastMessage] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleOpenAdd = () => {
    setFormData({ ...EMPTY_FORM });
    setEditingId(null);
    setShowForm(true);
  };

  const handleOpenEdit = (addr) => {
    setFormData({
      name: addr.name,
      phone: addr.phone,
      line1: addr.line1,
      city: addr.city,
      state: addr.state,
      pincode: addr.pincode,
      type: addr.type,
    });
    setEditingId(addr.id);
    setShowForm(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editingId) {
      setAddresses(prev =>
        prev.map(a => (a.id === editingId ? { ...a, ...formData } : a))
      );
      showToast('Address updated successfully ✅');
    } else {
      const newAddr = {
        id: Date.now(),
        ...formData,
        isDefault: addresses.length === 0,
      };
      setAddresses(prev => [...prev, newAddr]);
      showToast('New address saved! ✅');
    }
    setShowForm(false);
    setEditingId(null);
  };

  const handleDelete = (id) => {
    setAddresses(prev => {
      const filtered = prev.filter(a => a.id !== id);
      // If deleted address was default, make first remaining the new default
      if (prev.find(a => a.id === id)?.isDefault && filtered.length > 0) {
        filtered[0].isDefault = true;
      }
      return filtered;
    });
    setDeleteConfirmId(null);
    showToast('Address deleted ✅');
  };

  const handleSetDefault = (id) => {
    setAddresses(prev =>
      prev.map(a => ({ ...a, isDefault: a.id === id }))
    );
    showToast('Default address updated ✅');
  };

  const updateField = (field, value) => setFormData(f => ({ ...f, [field]: value }));

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-700 animate-fadeIn">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
          <p className="text-xs sm:text-sm font-semibold">{toastMessage}</p>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full border border-slate-200 shadow-2xl text-center">
            <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center text-3xl mx-auto mb-4">🗑️</div>
            <h3 className="text-base font-black text-slate-900">Delete Address?</h3>
            <p className="text-xs text-slate-500 mt-2">
              This address will be permanently removed from your account. This action cannot be undone.
            </p>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="flex-1 py-2.5 bg-rose-600 rounded-xl text-xs font-bold text-white hover:bg-rose-700 transition-colors cursor-pointer"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Breadcrumb & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <button onClick={onContinueShopping} className="hover:text-slate-700 cursor-pointer">Home</button>
            <span>›</span>
            <span className="text-slate-800 font-semibold">Saved Addresses</span>
          </div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">My Addresses</h1>
            <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full border border-indigo-200">
              {addresses.length} saved
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage your delivery addresses for faster checkout.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-500/20 transition-all cursor-pointer active:scale-95"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
          </svg>
          Add New Address
        </button>
      </div>

      {/* Add / Edit Form */}
      {showForm && (
        <div className="mt-6 mb-4 bg-white rounded-3xl border-2 border-indigo-200 shadow-lg p-6 sm:p-7 animate-fadeIn">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-indigo-100 rounded-xl flex items-center justify-center">
                <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-base font-black text-slate-900">
                {editingId ? 'Edit Address' : 'Add New Address'}
              </h3>
            </div>
            <button
              onClick={() => { setShowForm(false); setEditingId(null); }}
              className="text-slate-400 hover:text-slate-700 font-bold text-lg cursor-pointer"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            {/* Address Type Selector */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">Address Type</label>
              <div className="flex items-center gap-3">
                {['Home', 'Office', 'Other'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => updateField('type', type)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border-2 transition-all cursor-pointer ${
                      formData.type === type
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                        : 'border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <span>{ADDRESS_TYPE_ICONS[type]}</span>
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  className="w-full text-sm px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Mobile Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  className="w-full text-sm px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Address Line 1 *</label>
              <input
                type="text"
                required
                placeholder="House no., Building, Street, Area"
                value={formData.line1}
                onChange={(e) => updateField('line1', e.target.value)}
                className="w-full text-sm px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">City *</label>
                <input
                  type="text"
                  required
                  placeholder="Mumbai"
                  value={formData.city}
                  onChange={(e) => updateField('city', e.target.value)}
                  className="w-full text-sm px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">State *</label>
                <input
                  type="text"
                  required
                  placeholder="Maharashtra"
                  value={formData.state}
                  onChange={(e) => updateField('state', e.target.value)}
                  className="w-full text-sm px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">PIN Code *</label>
                <input
                  type="text"
                  required
                  maxLength="6"
                  placeholder="400001"
                  value={formData.pincode}
                  onChange={(e) => updateField('pincode', e.target.value)}
                  className="w-full text-sm px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-500/20 hover:opacity-90 transition-all cursor-pointer active:scale-95"
              >
                {editingId ? 'Save Changes' : 'Save Address'}
              </button>
              <button
                type="button"
                onClick={() => { setShowForm(false); setEditingId(null); }}
                className="px-5 py-2.5 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-200 transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Addresses Grid */}
      <div className="mt-8">
        {addresses.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm max-w-md mx-auto">
            <div className="w-20 h-20 rounded-full bg-indigo-50 flex items-center justify-center text-4xl mx-auto mb-4">📍</div>
            <h2 className="text-xl font-black text-slate-900">No Addresses Saved</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Add a delivery address to enjoy faster checkout.
            </p>
            <button
              onClick={handleOpenAdd}
              className="mt-6 px-7 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-lg active:scale-95 cursor-pointer"
            >
              Add Your First Address →
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {addresses.map((addr) => (
              <div
                key={addr.id}
                className={`relative bg-white rounded-3xl border-2 shadow-sm hover:shadow-md transition-all duration-200 p-5 flex flex-col justify-between ${
                  addr.isDefault
                    ? 'border-indigo-300 ring-2 ring-indigo-200/50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                {/* Top: Type Badge & Default Badge */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{ADDRESS_TYPE_ICONS[addr.type] || '📍'}</span>
                    <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-lg">
                      {addr.type}
                    </span>
                  </div>
                  {addr.isDefault && (
                    <span className="text-[10px] font-black text-indigo-700 bg-indigo-100 border border-indigo-200 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      ✓ Default
                    </span>
                  )}
                </div>

                {/* Address Content */}
                <div className="flex-1 space-y-1">
                  <h3 className="text-sm font-black text-slate-900">{addr.name}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{addr.line1}</p>
                  <p className="text-xs text-slate-600 font-medium">{addr.city}, {addr.state} — {addr.pincode}</p>
                  <p className="text-xs text-slate-500 font-mono mt-2">{addr.phone}</p>
                </div>

                {/* Actions */}
                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-2 flex-wrap">
                  <button
                    onClick={() => handleOpenEdit(addr)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors cursor-pointer"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                  </button>

                  {!addr.isDefault && (
                    <button
                      onClick={() => handleSetDefault(addr.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-indigo-200 bg-indigo-50 text-xs font-semibold text-indigo-700 hover:bg-indigo-100 transition-colors cursor-pointer"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Set Default
                    </button>
                  )}

                  <button
                    onClick={() => setDeleteConfirmId(addr.id)}
                    className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-rose-100 text-xs font-semibold text-rose-600 hover:bg-rose-50 hover:border-rose-200 transition-colors cursor-pointer"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            ))}

            {/* Add New Address Card */}
            <button
              onClick={handleOpenAdd}
              className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-3xl p-5 flex flex-col items-center justify-center gap-3 text-slate-500 hover:border-indigo-400 hover:bg-indigo-50/40 hover:text-indigo-600 transition-all cursor-pointer min-h-[200px] group"
            >
              <div className="w-12 h-12 rounded-2xl bg-white border-2 border-slate-200 group-hover:border-indigo-300 flex items-center justify-center transition-colors shadow-sm">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div className="text-center">
                <p className="text-sm font-bold">Add New Address</p>
                <p className="text-xs mt-0.5 opacity-70">Home, Office or Other</p>
              </div>
            </button>
          </div>
        )}
      </div>

      {/* Info Banner */}
      <div className="mt-8 bg-indigo-50/70 border border-indigo-200/60 rounded-2xl p-4 flex items-start gap-3 text-xs text-indigo-900">
        <span className="text-lg">💡</span>
        <div>
          <strong className="font-bold">Pro tip:</strong> Set a default address to skip the address selection step during checkout. You can always change it before placing an order.
        </div>
      </div>
    </div>
  );
}
