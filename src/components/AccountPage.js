import React, { useState } from 'react';

const ACCOUNT_TABS = [
  { id: 'profile', label: 'My Profile', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
  { id: 'security', label: 'Security', icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' },
  { id: 'notifications', label: 'Notifications', icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.437L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9' },
  { id: 'preferences', label: 'Preferences', icon: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4' },
  { id: 'membership', label: 'Membership', icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z' },
];

const ACTIVITY_LOG = [
  { action: 'Signed in from Chrome on Windows', time: 'Today, 8:30 PM', icon: '🖥️', location: 'Mumbai, IN' },
  { action: 'Password changed successfully', time: 'Yesterday, 3:12 PM', icon: '🔑', location: 'Mumbai, IN' },
  { action: 'New address saved', time: '25 Oct 2026, 11:00 AM', icon: '📍', location: 'Mumbai, IN' },
  { action: 'Order #XSH-884920 placed', time: '22 Oct 2026, 6:45 PM', icon: '📦', location: 'Mumbai, IN' },
  { action: 'Signed in from iPhone 15', time: '20 Oct 2026, 9:00 AM', icon: '📱', location: 'Pune, IN' },
];

export default function AccountPage({ onNavigate, onContinueShopping }) {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [profileData, setProfileData] = useState({
    firstName: 'Alex',
    lastName: 'Morgan',
    email: 'alex.morgan@example.com',
    phone: '+91 98765 43210',
    dob: '1995-06-15',
    gender: 'Male',
  });
  const [tempProfile, setTempProfile] = useState({ ...profileData });

  // Notification preferences
  const [notifPrefs, setNotifPrefs] = useState({
    orderUpdates: true,
    promotions: true,
    priceDrops: true,
    newArrivals: false,
    smsAlerts: true,
    emailDigest: false,
  });

  // App preferences
  const [appPrefs, setAppPrefs] = useState({
    language: 'English',
    currency: 'INR',
    theme: 'light',
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setProfileData({ ...tempProfile });
    setIsEditing(false);
    showToast('Profile updated successfully! ✅');
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-700 animate-fadeIn">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
          <p className="text-xs sm:text-sm font-semibold">{toastMessage}</p>
        </div>
      )}

      {/* Breadcrumb & Header */}
      <div className="pb-6 border-b border-slate-200 mb-8">
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
          <button onClick={onContinueShopping} className="hover:text-slate-700 cursor-pointer">Home</button>
          <span>›</span>
          <span className="text-slate-800 font-semibold">My Account</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Account Settings</h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">Manage your profile, security and notification preferences.</p>
          </div>
          {/* Membership Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl text-white shadow-lg shadow-indigo-500/30">
            <span className="text-lg">⭐</span>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider opacity-80">X-Shop VIP</p>
              <p className="text-sm font-black leading-none">540 Points</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* LEFT: Profile Card + Tabs */}
        <div className="lg:w-72 flex-shrink-0 space-y-5">
          {/* Avatar & Name Card */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 text-center">
            <div className="relative inline-block mb-4">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-4xl font-black text-white shadow-xl shadow-indigo-500/30 mx-auto">
                {profileData.firstName[0]}{profileData.lastName[0]}
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-white border-2 border-slate-200 rounded-full flex items-center justify-center shadow-md hover:border-indigo-400 transition-colors cursor-pointer">
                <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>
            <h2 className="text-lg font-black text-slate-900">{profileData.firstName} {profileData.lastName}</h2>
            <p className="text-xs text-slate-500 mt-1">{profileData.email}</p>
            <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-emerald-600 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Account Verified
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="bg-white rounded-3xl border border-slate-200 shadow-sm p-2 space-y-1">
            {ACCOUNT_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-semibold transition-all cursor-pointer text-left ${
                  activeTab === tab.id
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={tab.icon} />
                </svg>
                {tab.label}
              </button>
            ))}

            <div className="pt-2 border-t border-slate-100 mt-1">
              <button
                onClick={() => onNavigate && onNavigate('addresses')}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all cursor-pointer text-left"
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Saved Addresses
              </button>
              <button
                onClick={() => onNavigate && onNavigate('orders')}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all cursor-pointer text-left"
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                My Orders
              </button>
            </div>

            <div className="pt-1 pb-1 border-t border-slate-100">
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-all cursor-pointer">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Sign Out
              </button>
            </div>
          </nav>
        </div>

        {/* RIGHT: Tab Content */}
        <div className="flex-1 min-w-0">

          {/* PROFILE TAB */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-7">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-base sm:text-lg font-black text-slate-900">Personal Information</h2>
                    <p className="text-xs text-slate-500 mt-0.5">Your name and contact details</p>
                  </div>
                  <button
                    onClick={() => { setIsEditing(!isEditing); setTempProfile({ ...profileData }); }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isEditing
                        ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        : 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20 hover:bg-indigo-700'
                    }`}
                  >
                    {isEditing ? 'Cancel' : '✏️ Edit Profile'}
                  </button>
                </div>

                {isEditing ? (
                  <form onSubmit={handleSaveProfile} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">First Name</label>
                        <input
                          type="text"
                          value={tempProfile.firstName}
                          onChange={(e) => setTempProfile({ ...tempProfile, firstName: e.target.value })}
                          className="w-full text-sm px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Last Name</label>
                        <input
                          type="text"
                          value={tempProfile.lastName}
                          onChange={(e) => setTempProfile({ ...tempProfile, lastName: e.target.value })}
                          className="w-full text-sm px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Phone Number</label>
                        <input
                          type="tel"
                          value={tempProfile.phone}
                          onChange={(e) => setTempProfile({ ...tempProfile, phone: e.target.value })}
                          className="w-full text-sm px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Date of Birth</label>
                        <input
                          type="date"
                          value={tempProfile.dob}
                          onChange={(e) => setTempProfile({ ...tempProfile, dob: e.target.value })}
                          className="w-full text-sm px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Gender</label>
                        <div className="flex items-center gap-4">
                          {['Male', 'Female', 'Non-binary', 'Prefer not to say'].map((g) => (
                            <label key={g} className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
                              <input
                                type="radio"
                                name="gender"
                                value={g}
                                checked={tempProfile.gender === g}
                                onChange={() => setTempProfile({ ...tempProfile, gender: g })}
                                className="accent-indigo-600"
                              />
                              {g}
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 pt-2">
                      <button type="submit" className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-500/25 hover:shadow-lg transition-all cursor-pointer">
                        Save Changes
                      </button>
                      <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2.5 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-200 transition-colors cursor-pointer">
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {[
                      { label: 'Full Name', value: `${profileData.firstName} ${profileData.lastName}` },
                      { label: 'Email Address', value: profileData.email },
                      { label: 'Phone Number', value: profileData.phone },
                      { label: 'Date of Birth', value: new Date(profileData.dob).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) },
                      { label: 'Gender', value: profileData.gender },
                      { label: 'Member Since', value: 'January 2024' },
                    ].map((field, idx) => (
                      <div key={idx}>
                        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{field.label}</p>
                        <p className="text-sm font-semibold text-slate-800 mt-1">{field.value}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Activity Log */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-7">
                <h2 className="text-base font-black text-slate-900 mb-5">Recent Account Activity</h2>
                <div className="space-y-4">
                  {ACTIVITY_LOG.map((log, idx) => (
                    <div key={idx} className="flex items-start gap-4 pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                      <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-lg flex-shrink-0">
                        {log.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-slate-800">{log.action}</p>
                        <div className="flex items-center gap-3 mt-0.5">
                          <span className="text-[11px] text-slate-400">{log.time}</span>
                          <span className="text-[11px] text-slate-400">•</span>
                          <span className="text-[11px] text-slate-400">📍 {log.location}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SECURITY TAB */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              {/* Change Password */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-7">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center">
                    <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-base font-black text-slate-900">Change Password</h2>
                    <p className="text-xs text-slate-500">Last changed 5 days ago</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {['Current Password', 'New Password', 'Confirm New Password'].map((label, idx) => (
                    <div key={idx}>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">{label}</label>
                      <input
                        type="password"
                        placeholder={label === 'Current Password' ? 'Enter your current password' : '••••••••••••'}
                        className="w-full text-sm px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10"
                      />
                    </div>
                  ))}
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-800">
                    <strong>Password requirements:</strong> At least 8 characters, one uppercase letter, one number and one special character.
                  </div>
                  <button
                    onClick={() => showToast('Password updated successfully 🔒')}
                    className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-500/20 hover:bg-indigo-700 transition-all cursor-pointer"
                  >
                    Update Password
                  </button>
                </div>
              </div>

              {/* Two-Factor Authentication */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-7">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center">
                      <span className="text-xl">🛡️</span>
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-slate-900">Two-Factor Authentication</h3>
                      <p className="text-xs text-slate-500 mt-0.5">Add an extra layer of security to your account</p>
                    </div>
                  </div>
                  <button
                    onClick={() => showToast('2FA setup flow opened 🛡️')}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition-colors cursor-pointer shadow-sm"
                  >
                    Enable 2FA
                  </button>
                </div>
              </div>

              {/* Connected Devices */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-7">
                <h2 className="text-base font-black text-slate-900 mb-5">Trusted Devices</h2>
                <div className="space-y-4">
                  {[
                    { device: 'Chrome on Windows 11', icon: '🖥️', last: 'Active now', location: 'Mumbai, IN', current: true },
                    { device: 'iPhone 15 Pro – Safari', icon: '📱', last: '2 hours ago', location: 'Mumbai, IN', current: false },
                    { device: 'iPad Pro – Safari', icon: '📲', last: '3 days ago', location: 'Pune, IN', current: false },
                  ].map((d, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{d.icon}</span>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="text-xs font-bold text-slate-800">{d.device}</p>
                            {d.current && <span className="text-[10px] bg-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded-full">Current</span>}
                          </div>
                          <p className="text-[11px] text-slate-500 mt-0.5">{d.last} • 📍 {d.location}</p>
                        </div>
                      </div>
                      {!d.current && (
                        <button
                          onClick={() => showToast(`Device "${d.device}" removed ✅`)}
                          className="text-xs text-rose-600 font-bold hover:text-rose-700 cursor-pointer"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* NOTIFICATIONS TAB */}
          {activeTab === 'notifications' && (
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-7">
              <h2 className="text-base font-black text-slate-900 mb-2">Notification Preferences</h2>
              <p className="text-xs text-slate-500 mb-6">Choose what you hear from us and how.</p>

              <div className="space-y-5">
                {[
                  { key: 'orderUpdates', label: 'Order Updates & Tracking', desc: 'Get notified about your order status, shipping & delivery.' },
                  { key: 'promotions', label: 'Deals & Promotional Offers', desc: 'Flash sales, coupons, seasonal offers and exclusive deals.' },
                  { key: 'priceDrops', label: 'Price Drop Alerts', desc: 'Know when items in your Wishlist drop in price.' },
                  { key: 'newArrivals', label: 'New Arrivals', desc: 'Get updates about the newest products in your favourite categories.' },
                  { key: 'smsAlerts', label: 'SMS Alerts', desc: 'Receive critical updates directly via SMS to your registered number.' },
                  { key: 'emailDigest', label: 'Weekly Email Digest', desc: 'A curated roundup of offers and trending products once a week.' },
                ].map((pref) => (
                  <div key={pref.key} className="flex items-start justify-between gap-4 py-4 border-b border-slate-100 last:border-0">
                    <div>
                      <p className="text-xs font-bold text-slate-800">{pref.label}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">{pref.desc}</p>
                    </div>
                    <button
                      onClick={() => {
                        setNotifPrefs(p => ({ ...p, [pref.key]: !p[pref.key] }));
                        showToast(`${pref.label} ${notifPrefs[pref.key] ? 'disabled' : 'enabled'} ✅`);
                      }}
                      className={`relative w-11 h-6 rounded-full transition-all duration-300 flex-shrink-0 focus:outline-none cursor-pointer ${
                        notifPrefs[pref.key] ? 'bg-indigo-600' : 'bg-slate-200'
                      }`}
                    >
                      <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 ${
                        notifPrefs[pref.key] ? 'translate-x-5' : 'translate-x-0'
                      }`}></span>
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={() => showToast('Notification preferences saved ✅')}
                className="mt-4 px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-500/20 hover:bg-indigo-700 transition-all cursor-pointer"
              >
                Save Preferences
              </button>
            </div>
          )}

          {/* PREFERENCES TAB */}
          {activeTab === 'preferences' && (
            <div className="space-y-6">
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-7">
                <h2 className="text-base font-black text-slate-900 mb-6">App Preferences</h2>
                <div className="space-y-5">
                  {[
                    { key: 'language', label: 'Display Language', options: ['English', 'Hindi', 'Tamil', 'Telugu', 'Bengali', 'Marathi'] },
                    { key: 'currency', label: 'Currency', options: ['INR (₹)', 'USD ($)', 'EUR (€)', 'GBP (£)'] },
                    { key: 'theme', label: 'App Theme', options: ['light', 'dark', 'system'] },
                  ].map((pref) => (
                    <div key={pref.key} className="flex items-center justify-between gap-4 py-4 border-b border-slate-100 last:border-0">
                      <div>
                        <p className="text-xs font-bold text-slate-800">{pref.label}</p>
                        <p className="text-[11px] text-slate-500 mt-0.5 capitalize">Currently: {appPrefs[pref.key]}</p>
                      </div>
                      <select
                        value={appPrefs[pref.key]}
                        onChange={(e) => setAppPrefs(p => ({ ...p, [pref.key]: e.target.value }))}
                        className="text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 cursor-pointer"
                      >
                        {pref.options.map(o => <option key={o} value={o}>{o}</option>)}
                      </select>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => showToast('Preferences saved successfully ✅')}
                  className="mt-4 px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-500/20 hover:bg-indigo-700 transition-all cursor-pointer"
                >
                  Save Preferences
                </button>
              </div>

              {/* Delete Account */}
              <div className="bg-rose-50 border border-rose-200 rounded-3xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-rose-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">⚠️</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-rose-900">Delete Account</h3>
                    <p className="text-xs text-rose-700 mt-1 leading-relaxed">
                      Permanently delete your account and all associated data. This action cannot be undone. All orders, addresses, and saved data will be lost.
                    </p>
                    <button
                      onClick={() => showToast('Account deletion request submitted. Check your email.')}
                      className="mt-3 px-5 py-2 bg-rose-600 text-white rounded-xl text-xs font-bold hover:bg-rose-700 transition-colors cursor-pointer"
                    >
                      Request Account Deletion
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* MEMBERSHIP TAB */}
          {activeTab === 'membership' && (
            <div className="space-y-6">
              {/* Membership Status Card */}
              <div className="relative bg-gradient-to-br from-indigo-700 via-violet-700 to-purple-800 rounded-3xl p-6 sm:p-8 text-white overflow-hidden shadow-xl shadow-indigo-700/30">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-12 translate-x-12 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-8 -translate-x-8 pointer-events-none"></div>
                <div className="relative z-10">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-indigo-200">X-Shop</p>
                      <h2 className="text-3xl font-black mt-1">VIP Member</h2>
                      <p className="text-sm text-indigo-200 mt-2">Since January 2024 • Tier: Gold</p>
                    </div>
                    <div className="text-5xl">⭐</div>
                  </div>
                  <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-indigo-200">Points Balance</span>
                      <span className="text-xl font-black">540 pts</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div className="bg-amber-400 h-2 rounded-full" style={{ width: '54%' }}></div>
                    </div>
                    <p className="text-[11px] text-indigo-200 mt-1.5">460 more points to reach Platinum tier</p>
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-7">
                <h2 className="text-base font-black text-slate-900 mb-5">Your VIP Benefits</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { icon: '🚀', title: 'Priority Delivery', desc: 'Same-day and next-day delivery on eligible orders.' },
                    { icon: '🎁', title: 'Exclusive Offers', desc: 'Member-only flash sales and early-access deals.' },
                    { icon: '🔄', title: 'Extended Returns', desc: '30-day no-questions-asked return window.' },
                    { icon: '💎', title: 'Reward Points', desc: 'Earn 2x points on every purchase and redeem for discounts.' },
                    { icon: '📞', title: 'Priority Support', desc: 'Dedicated VIP support line, no waiting queues.' },
                    { icon: '🎂', title: 'Birthday Bonus', desc: 'Receive 100 bonus points and a special discount on your birthday.' },
                  ].map((b, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/30 transition-colors">
                      <span className="text-2xl">{b.icon}</span>
                      <div>
                        <p className="text-xs font-bold text-slate-800">{b.title}</p>
                        <p className="text-[11px] text-slate-500 mt-0.5">{b.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Points History */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-7">
                <h2 className="text-base font-black text-slate-900 mb-5">Points History</h2>
                <div className="space-y-3">
                  {[
                    { label: 'Order #XSH-884920 purchase', pts: '+120 pts', date: '27 Oct 2026', positive: true },
                    { label: 'Redeemed for discount on order', pts: '-50 pts', date: '20 Oct 2026', positive: false },
                    { label: 'Order #XSH-773810 purchase', pts: '+85 pts', date: '10 Oct 2026', positive: true },
                    { label: 'Referral bonus – Friend joined', pts: '+200 pts', date: '1 Oct 2026', positive: true },
                    { label: 'Birthday bonus reward', pts: '+100 pts', date: '15 Jun 2026', positive: true },
                  ].map((h, idx) => (
                    <div key={idx} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                      <div>
                        <p className="text-xs font-semibold text-slate-800">{h.label}</p>
                        <p className="text-[11px] text-slate-400 mt-0.5">{h.date}</p>
                      </div>
                      <span className={`text-sm font-black ${h.positive ? 'text-emerald-600' : 'text-rose-600'}`}>{h.pts}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
