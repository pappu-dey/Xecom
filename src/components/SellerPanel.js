import React, { useState } from 'react';
import './SellerPanel.css';

// Initial Mock Products for India E-Commerce
const INITIAL_PRODUCTS = [
  {
    id: 1,
    title: 'boAt Airdopes 141 ANC TWS Earbuds (42H Playtime, Beast Mode)',
    brand: 'boAt',
    category: 'Electronics',
    sku: 'ELEC-BOAT-141',
    mrp: 4490,
    price: 1499,
    stock: 42,
    status: 'In Stock',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=400&q=80',
    sales: 348,
    gstSlab: '18%',
    hsn: '85183000',
    codAvailable: true,
  },
  {
    id: 2,
    title: 'Noise ColorFit Pulse 3 AMOLED Smartwatch (Bluetooth Calling)',
    brand: 'Noise',
    category: 'Electronics',
    sku: 'ELEC-NOISE-P3',
    mrp: 5999,
    price: 1999,
    stock: 18,
    status: 'In Stock',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80',
    sales: 215,
    gstSlab: '18%',
    hsn: '85176290',
    codAvailable: true,
  },
  {
    id: 3,
    title: "FabIndia Men's Pure Cotton Chikankari Kurta - Royal Navy",
    brand: 'FabIndia',
    category: "Men's Fashion",
    sku: 'FASH-FAB-KUR01',
    mrp: 3299,
    price: 1899,
    stock: 8,
    status: 'Low Stock',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=400&q=80',
    sales: 142,
    gstSlab: '5%',
    hsn: '62052000',
    codAvailable: true,
  },
  {
    id: 4,
    title: 'Prestige Iris 750W Mixer Grinder (3 SS Jars + Juicer)',
    brand: 'Prestige',
    category: 'Home & Kitchen',
    sku: 'HOME-PRES-750W',
    mrp: 4995,
    price: 2999,
    stock: 25,
    status: 'In Stock',
    image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=400&q=80',
    sales: 98,
    gstSlab: '12%',
    hsn: '85094010',
    codAvailable: false,
  },
  {
    id: 5,
    title: "Biba Women's Embroidered Anarkali Suit Set with Dupatta",
    brand: 'Biba',
    category: "Women's Fashion",
    sku: 'FASH-BIBA-ANK02',
    mrp: 6999,
    price: 3499,
    stock: 4,
    status: 'Low Stock',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80',
    sales: 87,
    gstSlab: '12%',
    hsn: '62042290',
    codAvailable: true,
  },
  {
    id: 6,
    title: 'Mamaearth Onion Hair Oil & Shampoo Combo Pack',
    brand: 'Mamaearth',
    category: 'Beauty & Care',
    sku: 'BEAU-MAMA-OIL',
    mrp: 1198,
    price: 699,
    stock: 58,
    status: 'In Stock',
    image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=400&q=80',
    sales: 420,
    gstSlab: '18%',
    hsn: '33059011',
    codAvailable: true,
  },
  {
    id: 7,
    title: 'OnePlus Nord Buds 2r with Deep Bass & AI Clear Call',
    brand: 'OnePlus',
    category: 'Electronics',
    sku: 'ELEC-OP-BUDS2R',
    mrp: 2999,
    price: 1999,
    stock: 31,
    status: 'In Stock',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80',
    sales: 195,
    gstSlab: '18%',
    hsn: '85183000',
    codAvailable: true,
  },
  {
    id: 8,
    title: 'Wakefit Orthopedic Memory Foam King Size Mattress (78x72)',
    brand: 'Wakefit',
    category: 'Home & Kitchen',
    sku: 'HOME-WAKE-MATT',
    mrp: 19999,
    price: 12499,
    stock: 0,
    status: 'Out of Stock',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=400&q=80',
    sales: 45,
    gstSlab: '18%',
    hsn: '94042110',
    codAvailable: false,
  },
];

// Initial Mock Orders
const INITIAL_ORDERS = [
  {
    id: 'ORD-88201',
    customer: 'Rahul Verma',
    phone: '+91 98201 44521',
    city: 'Mumbai, Maharashtra',
    pincode: '400050',
    items: [{ title: 'boAt Airdopes 141 ANC TWS', qty: 1, price: 1499 }],
    total: 1499,
    paymentMethod: 'UPI (PhonePe)',
    paymentStatus: 'Paid',
    courier: 'Delhivery Express',
    trackingNumber: 'DEL9948210IN',
    date: '21 Oct 2026, 18:45',
    status: 'New',
  },
  {
    id: 'ORD-88200',
    customer: 'Ananya Sen',
    phone: '+91 94330 18290',
    city: 'Salt Lake, Kolkata',
    pincode: '700091',
    items: [{ title: "FabIndia Chikankari Kurta - Royal Navy (Size L)", qty: 1, price: 1899 }],
    total: 1899,
    paymentMethod: 'Credit Card (HDFC)',
    paymentStatus: 'Paid',
    courier: 'BlueDart Air',
    trackingNumber: 'BLU7730192IN',
    date: '21 Oct 2026, 17:15',
    status: 'Processing',
  },
  {
    id: 'ORD-88198',
    customer: 'Vikram Reddy',
    phone: '+91 98480 33910',
    city: 'HSR Layout, Bengaluru',
    pincode: '560102',
    items: [{ title: 'Prestige Iris 750W Mixer Grinder', qty: 1, price: 2999 }],
    total: 2999,
    paymentMethod: 'Cash on Delivery (COD)',
    paymentStatus: 'Pending',
    courier: 'Ekart Logistics',
    trackingNumber: 'EKRT982314IN',
    date: '21 Oct 2026, 14:30',
    status: 'Shipped',
  },
  {
    id: 'ORD-88195',
    customer: 'Pooja Sharma',
    phone: '+91 98110 55219',
    city: 'Rohini Sec-14, New Delhi',
    pincode: '110085',
    items: [{ title: "Biba Embroidered Anarkali Suit Set (Size M)", qty: 1, price: 3499 }],
    total: 3499,
    paymentMethod: 'UPI (Google Pay)',
    paymentStatus: 'Paid',
    courier: 'Delhivery Surface',
    trackingNumber: 'DEL8830112IN',
    date: '20 Oct 2026, 19:20',
    status: 'Delivered',
  },
  {
    id: 'ORD-88190',
    customer: 'Karthik Nair',
    phone: '+91 94470 66102',
    city: 'Kadavanthra, Kochi',
    pincode: '682020',
    items: [{ title: 'Noise ColorFit Pulse 3 Smartwatch (Jet Black)', qty: 1, price: 1999 }],
    total: 1999,
    paymentMethod: 'NetBanking (SBI)',
    paymentStatus: 'Paid',
    courier: 'BlueDart Express',
    trackingNumber: 'BLU6629103IN',
    date: '19 Oct 2026, 11:05',
    status: 'Delivered',
  },
  {
    id: 'ORD-88185',
    customer: 'Divya Patel',
    phone: '+91 98790 12044',
    city: 'Navrangpura, Ahmedabad',
    pincode: '380009',
    items: [{ title: 'Mamaearth Onion Combo Pack', qty: 1, price: 699 }],
    total: 699,
    paymentMethod: 'Cash on Delivery (COD)',
    paymentStatus: 'Refunded',
    courier: 'Shiprocket',
    trackingNumber: 'SR9920138IN',
    date: '18 Oct 2026, 16:40',
    status: 'Returned',
  },
];

// Preset Indian Product Images for Add Product Modal
const PRESET_IMAGES = [
  { name: 'boAt Earbuds', url: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=400&q=80' },
  { name: 'Smartwatch', url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80' },
  { name: 'Ethnic Kurta', url: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=400&q=80' },
  { name: 'Kitchen Appliance', url: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=400&q=80' },
  { name: 'Women Saree / Suit', url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80' },
  { name: 'Headphones', url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80' },
  { name: 'Footwear Sneaker', url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80' },
  { name: 'Organic Cosmetics', url: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=400&q=80' },
];

export default function SellerPanel({ onSwitchToStore }) {
  // Navigation & View States
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Store & Business Profile State
  const [storeInfo, setStoreInfo] = useState({
    name: 'Aarav Global Traders',
    legalName: 'Aarav Global E-Commerce Pvt Ltd',
    gstin: '27AABCT3518Q1Z8',
    category: 'Multi-Category Retailer',
    hubCity: 'Bhiwandi (Mumbai Hub), Maharashtra',
    pincode: '421302',
    email: 'seller.support@aaravtraders.in',
    phone: '+91 98200 12345',
    isStoreLive: true,
    vacationMode: false,
    bankName: 'HDFC Bank',
    accountEnding: '4108',
    ifsc: 'HDFC0001245',
  });

  // Data States
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [productSearch, setProductSearch] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState('All');
  const [orderFilter, setOrderFilter] = useState('All');
  const [orderSearch, setOrderSearch] = useState('');

  // Modal States
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [invoiceOrder, setInvoiceOrder] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Product Form State
  const [formData, setFormData] = useState({
    title: '',
    brand: '',
    category: 'Electronics',
    sku: '',
    mrp: '',
    price: '',
    stock: '',
    image: PRESET_IMAGES[0].url,
    gstSlab: '18%',
    hsn: '85183000',
    codAvailable: true,
  });

  // Trigger Toast Notification
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // KPI Calculations
  const totalSalesRevenue = orders.reduce((acc, curr) => acc + curr.total, 0) + 248900; // Simulated historical + current
  const totalOrdersCount = orders.length + 184;
  // eslint-disable-next-line no-unused-vars
  const lowStockCount = products.filter((p) => p.stock > 0 && p.stock <= 10).length;
  // eslint-disable-next-line no-unused-vars
  const outOfStockCount = products.filter((p) => p.stock === 0).length;

  // Handle Add / Edit Product Submit
  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.price || !formData.stock) {
      alert('Please fill in title, price and stock!');
      return;
    }

    const priceNum = Number(formData.price);
    const mrpNum = Number(formData.mrp) || Math.round(priceNum * 1.4);
    const stockNum = Number(formData.stock);

    let status = 'In Stock';
    if (stockNum === 0) status = 'Out of Stock';
    else if (stockNum <= 10) status = 'Low Stock';

    if (editingProduct) {
      // Edit mode
      setProducts(
        products.map((p) =>
          p.id === editingProduct.id
            ? {
                ...p,
                title: formData.title,
                brand: formData.brand || 'Generic',
                category: formData.category,
                sku: formData.sku || p.sku,
                mrp: mrpNum,
                price: priceNum,
                stock: stockNum,
                status: status,
                image: formData.image,
                gstSlab: formData.gstSlab,
                hsn: formData.hsn,
                codAvailable: formData.codAvailable,
              }
            : p
        )
      );
      showToast(`Updated "${formData.title.substring(0, 24)}..." successfully!`);
    } else {
      // Add mode
      const newProd = {
        id: Date.now(),
        title: formData.title,
        brand: formData.brand || 'X-Shop Brand',
        category: formData.category,
        sku: formData.sku || `SKU-${Math.floor(1000 + Math.random() * 9000)}`,
        mrp: mrpNum,
        price: priceNum,
        stock: stockNum,
        status: status,
        image: formData.image,
        sales: 0,
        gstSlab: formData.gstSlab,
        hsn: formData.hsn || '85183000',
        codAvailable: formData.codAvailable,
      };
      setProducts([newProd, ...products]);
      showToast(`Product added to catalog! Available for buyers.`);
    }

    setIsProductModalOpen(false);
    setEditingProduct(null);
  };

  // Open Edit Modal
  const openEditModal = (prod) => {
    setEditingProduct(prod);
    setFormData({
      title: prod.title,
      brand: prod.brand,
      category: prod.category,
      sku: prod.sku,
      mrp: prod.mrp,
      price: prod.price,
      stock: prod.stock,
      image: prod.image,
      gstSlab: prod.gstSlab || '18%',
      hsn: prod.hsn || '85183000',
      codAvailable: prod.codAvailable !== false,
    });
    setIsProductModalOpen(true);
  };

  // Open New Product Modal
  const openNewProductModal = () => {
    setEditingProduct(null);
    setFormData({
      title: '',
      brand: '',
      category: 'Electronics',
      sku: `IN-SKU-${Math.floor(10000 + Math.random() * 90000)}`,
      mrp: '',
      price: '',
      stock: '25',
      image: PRESET_IMAGES[0].url,
      gstSlab: '18%',
      hsn: '85183000',
      codAvailable: true,
    });
    setIsProductModalOpen(true);
  };

  // Delete Product
  const handleDeleteProduct = (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      setProducts(products.filter((p) => p.id !== id));
      showToast(`Product deleted from your seller inventory.`);
    }
  };

  // Quick Stock Adjust
  const handleStockAdjust = (id, delta) => {
    setProducts(
      products.map((p) => {
        if (p.id === id) {
          const newStock = Math.max(0, p.stock + delta);
          let newStatus = 'In Stock';
          if (newStock === 0) newStatus = 'Out of Stock';
          else if (newStock <= 10) newStatus = 'Low Stock';
          return { ...p, stock: newStock, status: newStatus };
        }
        return p;
      })
    );
    showToast(`Stock updated.`);
  };

  // Update Order Status
  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders(
      orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    showToast(`Order #${orderId} marked as ${newStatus}`);
  };

  // Filtered Products
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.sku.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.brand.toLowerCase().includes(productSearch.toLowerCase());
    const matchesCategory =
      productCategoryFilter === 'All' || p.category === productCategoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Filtered Orders
  const filteredOrders = orders.filter((o) => {
    const matchesFilter = orderFilter === 'All' || o.status === orderFilter;
    const matchesSearch =
      o.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customer.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.city.toLowerCase().includes(orderSearch.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800 flex flex-col">
      {/* 1. TOP SELLER NAV HEADER */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Left: Brand & Toggle */}
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none"
                title="Toggle Sidebar"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
                </svg>
              </button>

              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-black text-white text-base shadow-md">
                  🏪
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-extrabold text-base tracking-tight text-white">
                      X-Shop <span className="text-indigo-400">Seller Hub</span>
                    </span>
                    <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 seller-live-dot"></span>
                      India Live 🇮🇳
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-none">
                    Merchant Central • GST: {storeInfo.gstin}
                  </p>
                </div>
              </div>
            </div>

            {/* Middle: Store status pill & quick metrics */}
            <div className="hidden md:flex items-center space-x-3 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700 text-xs">
              <div className="flex items-center space-x-1.5 text-slate-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span className="font-semibold">{storeInfo.name}</span>
              </div>
              <span className="text-slate-600">|</span>
              <div className="text-amber-400 font-semibold flex items-center gap-1">
                <span>★ 4.85</span>
                <span className="text-slate-400 font-normal">(4.8k ratings)</span>
              </div>
              <span className="text-slate-600">|</span>
              <div className="text-emerald-400 font-medium">
                Settlement Balance: <strong className="font-bold">₹54,320</strong>
              </div>
            </div>

            {/* Right: Actions & Switch to Buyer Store */}
            <div className="flex items-center space-x-2.5">
              <button
                type="button"
                onClick={openNewProductModal}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs px-3.5 py-2 rounded-lg flex items-center gap-1.5 shadow-md shadow-indigo-600/30 transition-all hover:scale-105"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                <span>Add Product</span>
              </button>

              {/* Button to return to buyer shop */}
              {onSwitchToStore && (
                <button
                  type="button"
                  onClick={onSwitchToStore}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 font-medium text-xs px-3 py-2 rounded-lg flex items-center gap-1.5 transition-colors"
                  title="Switch to Customer Storefront"
                >
                  <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <span>Customer Store</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* 2. BODY LAYOUT (SIDEBAR + MAIN CONTENT) */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-6">
        {/* SIDEBAR NAVIGATION */}
        <aside
          className={`${
            isSidebarOpen ? 'w-64' : 'w-16'
          } shrink-0 transition-all duration-300 bg-white rounded-2xl shadow-sm border border-slate-200 p-3 flex flex-col justify-between hidden md:flex`}
        >
          <div className="space-y-1">
            <div className={`px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400 ${!isSidebarOpen && 'hidden'}`}>
              Seller Menu
            </div>

            {/* Nav Items */}
            {[
              { id: 'dashboard', label: 'Overview', icon: '📊', badge: null },
              { id: 'products', label: 'Products & Inventory', icon: '📦', badge: products.length },
              { id: 'orders', label: 'Orders & Shipping', icon: '🛍️', badge: orders.filter((o) => o.status === 'New').length || null },
              { id: 'analytics', label: 'Sales Analytics', icon: '📈', badge: null },
              { id: 'payouts', label: 'Payouts & GST', icon: '💰', badge: null },
              { id: 'reviews', label: 'Ratings & Reviews', icon: '⭐', badge: '4.85' },
              { id: 'settings', label: 'Store Settings', icon: '⚙️', badge: null },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  activeTab === item.id
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-base">{item.icon}</span>
                  {isSidebarOpen && <span>{item.label}</span>}
                </div>
                {isSidebarOpen && item.badge && (
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      activeTab === item.id
                        ? 'bg-indigo-800 text-white'
                        : 'bg-indigo-50 text-indigo-700'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Seller Support & Store Status Widget */}
          {isSidebarOpen && (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs space-y-2 mt-4">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-700">Hub Fulfillment</span>
                <span className="text-emerald-600 font-semibold text-[11px]">Active</span>
              </div>
              <p className="text-slate-500 text-[11px] leading-tight">
                Express dispatch enabled for Delhivery & BlueDart India.
              </p>
              <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-[11px]">
                <span className="text-slate-500">24/7 Merchant Desk</span>
                <span className="text-indigo-600 font-bold">1800-890-441</span>
              </div>
            </div>
          )}
        </aside>

        {/* MOBILE NAVIGATION TABS (visible only on small screens) */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-30 px-2 py-1.5 flex justify-around shadow-xl">
          {[
            { id: 'dashboard', label: 'Home', icon: '📊' },
            { id: 'products', label: 'Products', icon: '📦' },
            { id: 'orders', label: 'Orders', icon: '🛍️' },
            { id: 'payouts', label: 'Payouts', icon: '💰' },
            { id: 'settings', label: 'Settings', icon: '⚙️' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center py-1 px-2 rounded-lg text-xs ${
                activeTab === item.id ? 'text-indigo-600 font-bold' : 'text-slate-500'
              }`}
            >
              <span className="text-base">{item.icon}</span>
              <span className="text-[10px]">{item.label}</span>
            </button>
          ))}
        </div>

        {/* MAIN PANEL CONTENT CONTAINER */}
        <main className="flex-1 space-y-6 pb-16 md:pb-6">
          {/* =========================================================================
              TAB 1: DASHBOARD / OVERVIEW
             ========================================================================= */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6 seller-animate-fade">
              {/* Welcome Banner */}
              <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 shadow-xl relative overflow-hidden">
                <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 bg-repeat bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center gap-1.5 bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs px-2.5 py-1 rounded-full font-semibold mb-2">
                      <span>Namaste, {storeInfo.name}</span>
                      <span>🙏</span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                      Seller Command Center
                    </h1>
                    <p className="text-slate-300 text-sm mt-1 max-w-xl">
                      Your store has generated <strong className="text-emerald-400">₹74,850</strong> in sales this week across 28 Indian cities.
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={openNewProductModal}
                      className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-lg transition-transform hover:scale-105 flex items-center gap-2"
                    >
                      <span>➕ List New Product</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('orders')}
                      className="bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-white/20 transition-colors"
                    >
                      View Pending Orders ({orders.filter((o) => o.status === 'New').length})
                    </button>
                  </div>
                </div>
              </div>

              {/* KPI Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* 1. Total Sales */}
                <div className="seller-metric-card bg-white p-5 rounded-2xl shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Gross Sales (INR)</span>
                    <span className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-base">
                      ₹
                    </span>
                  </div>
                  <div className="mt-3">
                    <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                      ₹{totalSalesRevenue.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center text-xs text-emerald-600 font-semibold">
                    <span>↑ 18.4% vs last month</span>
                  </div>
                </div>

                {/* 2. Total Orders */}
                <div className="seller-metric-card bg-white p-5 rounded-2xl shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Orders</span>
                    <span className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-base">
                      🛍️
                    </span>
                  </div>
                  <div className="mt-3">
                    <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                      {totalOrdersCount}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-xs">
                    <span className="text-slate-500">{orders.filter(o => o.status === 'New').length} pending dispatch</span>
                    <span className="text-indigo-600 font-semibold hover:underline cursor-pointer" onClick={() => setActiveTab('orders')}>
                      Fulfill &rarr;
                    </span>
                  </div>
                </div>

                {/* 3. Catalog & Inventory */}
                <div className="seller-metric-card bg-white p-5 rounded-2xl shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Catalog</span>
                    <span className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-base">
                      📦
                    </span>
                  </div>
                  <div className="mt-3">
                    <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                      {products.length} Items
                    </span>
                  </div>
                  <div className="mt-2 flex items-center text-xs text-amber-600 font-semibold">
                    <span>⚠️ {lowStockCount} items low stock</span>
                  </div>
                </div>

                {/* 4. Seller Score */}
                <div className="seller-metric-card bg-white p-5 rounded-2xl shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Seller Rating</span>
                    <span className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-base">
                      ⭐
                    </span>
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">4.85</span>
                    <span className="text-xs text-slate-400 font-bold">/ 5.0</span>
                  </div>
                  <div className="mt-2 flex items-center text-xs text-purple-600 font-semibold">
                    <span>Top 5% Rated Merchant</span>
                  </div>
                </div>
              </div>

              {/* Weekly Sales Chart & Quick Stats */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* 7-Day Revenue Trend (Visual SVG Bar Chart) */}
                <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-base font-extrabold text-slate-900">Weekly Revenue (₹ INR)</h2>
                      <p className="text-xs text-slate-400">Daily settlement earnings from Indian buyers</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">Last 7 Days</span>
                    </div>
                  </div>

                  {/* Chart Bars */}
                  <div className="h-48 flex items-end justify-between gap-2 pt-6 pb-2 border-b border-slate-100">
                    {[
                      { day: 'Wed', val: 42000, height: '55%' },
                      { day: 'Thu', val: 56000, height: '70%' },
                      { day: 'Fri', val: 68000, height: '85%' },
                      { day: 'Sat', val: 89000, height: '98%' },
                      { day: 'Sun', val: 94000, height: '100%' },
                      { day: 'Mon', val: 48000, height: '60%' },
                      { day: 'Today', val: 74850, height: '80%', active: true },
                    ].map((bar, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer">
                        <div className="text-[10px] font-bold text-slate-500 mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          ₹{(bar.val / 1000).toFixed(0)}k
                        </div>
                        <div
                          className={`w-full max-w-[40px] rounded-t-lg transition-all ${
                            bar.active
                              ? 'bg-gradient-to-t from-indigo-600 to-indigo-500 shadow-lg shadow-indigo-600/30'
                              : 'bg-indigo-100 hover:bg-indigo-300'
                          }`}
                          style={{ height: bar.height }}
                        ></div>
                        <span className={`text-[11px] mt-2 font-semibold ${bar.active ? 'text-indigo-600 font-extrabold' : 'text-slate-500'}`}>
                          {bar.day}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
                      Verified orders dispatched
                    </span>
                    <span className="font-semibold text-slate-700">Total 7-day: ₹4,71,850</span>
                  </div>
                </div>

                {/* Seller Quick Action Cards */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col justify-between">
                  <div>
                    <h2 className="text-base font-extrabold text-slate-900 mb-1">Quick Actions</h2>
                    <p className="text-xs text-slate-400 mb-4">Common daily fulfillment tasks</p>

                    <div className="space-y-2.5">
                      <button
                        onClick={() => {
                          setActiveTab('orders');
                          setOrderFilter('New');
                        }}
                        className="w-full text-left p-3 rounded-xl bg-slate-50 hover:bg-indigo-50 hover:border-indigo-200 border border-slate-200 transition-all flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-xl">📦</span>
                          <div>
                            <div className="text-xs font-bold text-slate-900">Ship Pending Orders</div>
                            <div className="text-[11px] text-slate-500">{orders.filter(o => o.status === 'New').length} orders awaiting packing</div>
                          </div>
                        </div>
                        <span className="text-indigo-600 font-bold">&rarr;</span>
                      </button>

                      <button
                        onClick={() => {
                          setActiveTab('products');
                          setProductCategoryFilter('All');
                        }}
                        className="w-full text-left p-3 rounded-xl bg-slate-50 hover:bg-amber-50 hover:border-amber-200 border border-slate-200 transition-all flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-xl">⚠️</span>
                          <div>
                            <div className="text-xs font-bold text-slate-900">Restock Low Inventory</div>
                            <div className="text-[11px] text-slate-500">{lowStockCount} items below safe threshold</div>
                          </div>
                        </div>
                        <span className="text-amber-600 font-bold">&rarr;</span>
                      </button>

                      <button
                        onClick={() => setActiveTab('payouts')}
                        className="w-full text-left p-3 rounded-xl bg-slate-50 hover:bg-emerald-50 hover:border-emerald-200 border border-slate-200 transition-all flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-xl">🧾</span>
                          <div>
                            <div className="text-xs font-bold text-slate-900">GST Tax & Invoices</div>
                            <div className="text-[11px] text-slate-500">Download monthly GSTR-1 CSV summary</div>
                          </div>
                        </div>
                        <span className="text-emerald-600 font-bold">&rarr;</span>
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-400">Pickup Pincode: 421302</span>
                    <span className="text-indigo-600 font-semibold cursor-pointer hover:underline" onClick={() => setActiveTab('settings')}>
                      Edit Hub
                    </span>
                  </div>
                </div>
              </div>

              {/* Recent Orders Snapshot Table */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-base font-extrabold text-slate-900">Recent Customer Orders</h2>
                    <p className="text-xs text-slate-400">Real-time incoming orders from across India</p>
                  </div>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-800"
                  >
                    View All Orders ({orders.length}) &rarr;
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-100 text-slate-400 uppercase text-[10px] tracking-wider font-bold">
                        <th className="py-2.5">Order ID</th>
                        <th className="py-2.5">Customer & City</th>
                        <th className="py-2.5">Items</th>
                        <th className="py-2.5">Amount</th>
                        <th className="py-2.5">Payment</th>
                        <th className="py-2.5">Status</th>
                        <th className="py-2.5 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      {orders.slice(0, 4).map((ord) => (
                        <tr key={ord.id} className="hover:bg-slate-50">
                          <td className="py-3 font-bold text-indigo-600 font-mono">{ord.id}</td>
                          <td className="py-3">
                            <div className="font-bold text-slate-900">{ord.customer}</div>
                            <div className="text-[11px] text-slate-400">{ord.city}</div>
                          </td>
                          <td className="py-3 text-slate-700 max-w-xs truncate">
                            {ord.items.map((i) => i.title).join(', ')}
                          </td>
                          <td className="py-3 font-extrabold text-slate-900 font-mono">
                            ₹{ord.total.toLocaleString('en-IN')}
                          </td>
                          <td className="py-3">
                            <span className="text-[11px] text-slate-600 bg-slate-100 px-2 py-0.5 rounded font-mono">
                              {ord.paymentMethod}
                            </span>
                          </td>
                          <td className="py-3">
                            <span
                              className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                                ord.status === 'New'
                                  ? 'bg-amber-100 text-amber-800 border border-amber-200'
                                  : ord.status === 'Processing'
                                  ? 'bg-blue-100 text-blue-800 border border-blue-200'
                                  : ord.status === 'Shipped'
                                  ? 'bg-indigo-100 text-indigo-800 border border-indigo-200'
                                  : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                              }`}
                            >
                              {ord.status}
                            </span>
                          </td>
                          <td className="py-3 text-right">
                            <button
                              onClick={() => setInvoiceOrder(ord)}
                              className="text-slate-600 hover:text-indigo-600 font-semibold px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 transition-colors"
                            >
                              Invoice 📄
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              TAB 2: PRODUCTS & INVENTORY MANAGEMENT
             ========================================================================= */}
          {activeTab === 'products' && (
            <div className="space-y-6 seller-animate-fade">
              {/* Header with Search and Filter */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl font-black text-slate-900">Products & Inventory Catalog</h1>
                  <p className="text-xs text-slate-500">
                    Manage pricing in ₹ INR, adjust warehouse stock, and toggle active listings
                  </p>
                </div>
                <button
                  onClick={openNewProductModal}
                  className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                  <span>Add New Listing</span>
                </button>
              </div>

              {/* Filters & Search Toolbar */}
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                {/* Search Input */}
                <div className="relative w-full sm:w-72">
                  <input
                    type="text"
                    placeholder="Search by title, brand, or SKU..."
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <svg className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>

                {/* Category Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
                  {['All', 'Electronics', "Men's Fashion", "Women's Fashion", 'Home & Kitchen', 'Beauty & Care'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setProductCategoryFilter(cat)}
                      className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-colors ${
                        productCategoryFilter === cat
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Products Table */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[10px] tracking-wider font-bold">
                      <tr>
                        <th className="py-3 px-4">Product Details</th>
                        <th className="py-3 px-4">SKU & Category</th>
                        <th className="py-3 px-4">Price (₹ INR)</th>
                        <th className="py-3 px-4">Stock Adjustment</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4">Sales</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      {filteredProducts.length === 0 ? (
                        <tr>
                          <td colSpan="7" className="py-12 text-center text-slate-400">
                            No products match your filter.
                          </td>
                        </tr>
                      ) : (
                        filteredProducts.map((prod) => (
                          <tr key={prod.id} className="seller-table-row">
                            {/* Product Info */}
                            <td className="py-3.5 px-4">
                              <div className="flex items-center space-x-3">
                                <img
                                  src={prod.image}
                                  alt={prod.title}
                                  className="w-12 h-12 rounded-lg object-cover bg-slate-100 border border-slate-200 shrink-0"
                                />
                                <div className="max-w-xs">
                                  <div className="font-bold text-slate-900 line-clamp-1">{prod.title}</div>
                                  <div className="text-[11px] text-slate-400 flex items-center gap-2">
                                    <span>Brand: <strong className="text-slate-600">{prod.brand}</strong></span>
                                    <span>•</span>
                                    <span>GST: {prod.gstSlab}</span>
                                  </div>
                                </div>
                              </div>
                            </td>

                            {/* SKU & Category */}
                            <td className="py-3.5 px-4">
                              <span className="font-mono text-slate-600 font-semibold bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                                {prod.sku}
                              </span>
                              <div className="text-[11px] text-slate-400 mt-1">{prod.category}</div>
                            </td>

                            {/* Pricing */}
                            <td className="py-3.5 px-4">
                              <div className="font-extrabold text-slate-900 font-mono text-sm">
                                ₹{prod.price.toLocaleString('en-IN')}
                              </div>
                              <div className="text-[11px] text-slate-400 line-through">
                                ₹{prod.mrp.toLocaleString('en-IN')}
                              </div>
                            </td>

                            {/* Stock Quick Adjustment */}
                            <td className="py-3.5 px-4">
                              <div className="flex items-center space-x-1.5">
                                <button
                                  type="button"
                                  onClick={() => handleStockAdjust(prod.id, -1)}
                                  className="w-6 h-6 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex items-center justify-center transition-colors"
                                  title="Decrease stock by 1"
                                >
                                  -
                                </button>
                                <span className={`font-mono font-bold text-xs px-2 py-0.5 rounded min-w-[32px] text-center ${
                                  prod.stock === 0 ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-800'
                                }`}>
                                  {prod.stock}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => handleStockAdjust(prod.id, 5)}
                                  className="w-6 h-6 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex items-center justify-center transition-colors"
                                  title="Increase stock by 5"
                                >
                                  +
                                </button>
                              </div>
                            </td>

                            {/* Status */}
                            <td className="py-3.5 px-4">
                              <span
                                className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                                  prod.stock === 0
                                    ? 'bg-rose-100 text-rose-700 border border-rose-200'
                                    : prod.stock <= 10
                                    ? 'bg-amber-100 text-amber-800 border border-amber-200'
                                    : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                }`}
                              >
                                {prod.status}
                              </span>
                            </td>

                            {/* Sales */}
                            <td className="py-3.5 px-4 font-mono font-bold text-slate-600">
                              {prod.sales} sold
                            </td>

                            {/* Actions */}
                            <td className="py-3.5 px-4 text-right space-x-2">
                              <button
                                type="button"
                                onClick={() => openEditModal(prod)}
                                className="text-indigo-600 hover:text-indigo-800 font-bold px-2.5 py-1 rounded bg-indigo-50 hover:bg-indigo-100 transition-colors"
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteProduct(prod.id, prod.title)}
                                className="text-rose-600 hover:text-rose-800 font-semibold px-2 py-1 rounded hover:bg-rose-50 transition-colors"
                                title="Delete Listing"
                              >
                                🗑️
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              TAB 3: ORDERS & SHIPPING FULFILLMENT
             ========================================================================= */}
          {activeTab === 'orders' && (
            <div className="space-y-6 seller-animate-fade">
              {/* Header */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl font-black text-slate-900">Orders & Fulfillment</h1>
                  <p className="text-xs text-slate-500">
                    Process shipments, generate official GST invoices, and track delivery partners
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg border border-emerald-200 font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    Integrated with Delhivery & BlueDart
                  </span>
                </div>
              </div>

              {/* Status Filter Chips & Search */}
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                {/* Search */}
                <div className="relative w-full sm:w-72">
                  <input
                    type="text"
                    placeholder="Search by Order ID, customer, city..."
                    value={orderSearch}
                    onChange={(e) => setOrderSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <svg className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>

                {/* Filter tabs */}
                <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
                  {['All', 'New', 'Processing', 'Shipped', 'Delivered', 'Returned'].map((st) => (
                    <button
                      key={st}
                      onClick={() => setOrderFilter(st)}
                      className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-colors ${
                        orderFilter === st
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {st} {st !== 'All' && `(${orders.filter((o) => o.status === st).length})`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Orders Table */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[10px] tracking-wider font-bold">
                      <tr>
                        <th className="py-3 px-4">Order Details</th>
                        <th className="py-3 px-4">Customer & Delivery</th>
                        <th className="py-3 px-4">Items Ordered</th>
                        <th className="py-3 px-4">Payment & Total</th>
                        <th className="py-3 px-4">Courier & Tracking</th>
                        <th className="py-3 px-4">Status Workflow</th>
                        <th className="py-3 px-4 text-right">GST Invoice</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      {filteredOrders.length === 0 ? (
                        <tr>
                          <td colSpan="7" className="py-12 text-center text-slate-400">
                            No orders found for the selected filter.
                          </td>
                        </tr>
                      ) : (
                        filteredOrders.map((ord) => (
                          <tr key={ord.id} className="seller-table-row">
                            {/* Order ID & Date */}
                            <td className="py-3.5 px-4">
                              <div className="font-extrabold text-indigo-600 font-mono text-sm">{ord.id}</div>
                              <div className="text-[11px] text-slate-400">{ord.date}</div>
                            </td>

                            {/* Customer */}
                            <td className="py-3.5 px-4">
                              <div className="font-bold text-slate-900">{ord.customer}</div>
                              <div className="text-[11px] text-slate-500">{ord.city} - {ord.pincode}</div>
                              <div className="text-[10px] text-slate-400">{ord.phone}</div>
                            </td>

                            {/* Items */}
                            <td className="py-3.5 px-4 max-w-xs">
                              {ord.items.map((it, idx) => (
                                <div key={idx} className="text-slate-800 line-clamp-1">
                                  <strong>{it.qty}x</strong> {it.title}
                                </div>
                              ))}
                            </td>

                            {/* Payment & Amount */}
                            <td className="py-3.5 px-4">
                              <div className="font-black text-slate-900 font-mono text-sm">
                                ₹{ord.total.toLocaleString('en-IN')}
                              </div>
                              <div className="text-[11px] text-slate-500">{ord.paymentMethod}</div>
                            </td>

                            {/* Courier */}
                            <td className="py-3.5 px-4">
                              <div className="font-semibold text-slate-800">{ord.courier}</div>
                              <div className="font-mono text-[10px] text-indigo-600 font-bold">
                                {ord.trackingNumber}
                              </div>
                            </td>

                            {/* Status Workflow Selector */}
                            <td className="py-3.5 px-4">
                              <select
                                value={ord.status}
                                onChange={(e) => handleUpdateOrderStatus(ord.id, e.target.value)}
                                className={`text-xs font-bold px-2.5 py-1 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer ${
                                  ord.status === 'New'
                                    ? 'bg-amber-50 text-amber-800 border-amber-300'
                                    : ord.status === 'Processing'
                                    ? 'bg-blue-50 text-blue-800 border-blue-300'
                                    : ord.status === 'Shipped'
                                    ? 'bg-indigo-50 text-indigo-800 border-indigo-300'
                                    : ord.status === 'Delivered'
                                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                    : 'bg-rose-50 text-rose-800 border-rose-300'
                                }`}
                              >
                                <option value="New">New Order</option>
                                <option value="Processing">Processing</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Delivered">Delivered</option>
                                <option value="Returned">Returned</option>
                              </select>
                            </td>

                            {/* Invoice Button */}
                            <td className="py-3.5 px-4 text-right">
                              <button
                                type="button"
                                onClick={() => setInvoiceOrder(ord)}
                                className="inline-flex items-center gap-1 text-slate-700 hover:text-indigo-600 font-semibold px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-indigo-50 border border-slate-200 transition-colors"
                              >
                                <span>📄 View GST Bill</span>
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              TAB 4: SALES ANALYTICS
             ========================================================================= */}
          {activeTab === 'analytics' && (
            <div className="space-y-6 seller-animate-fade">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                <h1 className="text-xl font-black text-slate-900">Sales & Demographics Analytics</h1>
                <p className="text-xs text-slate-500">
                  Performance metrics across top product categories and geographic distribution in India
                </p>
              </div>

              {/* Analytics Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                  <span className="text-xs font-bold text-slate-400 uppercase">Conversion Rate</span>
                  <div className="text-2xl font-black text-slate-900 mt-2">3.42%</div>
                  <div className="text-xs text-emerald-600 font-semibold mt-1">↑ +0.6% this week</div>
                </div>

                <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                  <span className="text-xs font-bold text-slate-400 uppercase">Average Order Value (AOV)</span>
                  <div className="text-2xl font-black text-slate-900 mt-2">₹2,140</div>
                  <div className="text-xs text-indigo-600 font-semibold mt-1">Higher than category avg</div>
                </div>

                <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                  <span className="text-xs font-bold text-slate-400 uppercase">Return & Replacement Rate</span>
                  <div className="text-2xl font-black text-emerald-600 mt-2">1.18%</div>
                  <div className="text-xs text-slate-500 mt-1">Well below 3.5% threshold</div>
                </div>
              </div>

              {/* City Breakdown & Top Products */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Geographic Share */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                  <h2 className="text-base font-extrabold text-slate-900 mb-4">Top Indian Buying Hubs</h2>
                  <div className="space-y-3">
                    {[
                      { city: 'Mumbai & MMR', share: '32%', orders: '620 orders', color: 'bg-indigo-600' },
                      { city: 'Bengaluru (Karnataka)', share: '24%', orders: '465 orders', color: 'bg-blue-600' },
                      { city: 'Delhi NCR (Delhi, Noida, Gurgaon)', share: '20%', orders: '388 orders', color: 'bg-emerald-600' },
                      { city: 'Hyderabad (Telangana)', share: '14%', orders: '271 orders', color: 'bg-amber-600' },
                      { city: 'Kolkata & Rest of India', share: '10%', orders: '194 orders', color: 'bg-purple-600' },
                    ].map((row, i) => (
                      <div key={i} className="space-y-1">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-slate-700">{row.city}</span>
                          <span className="text-slate-500">{row.share} ({row.orders})</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className={`h-full ${row.color}`} style={{ width: row.share }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Category Revenue Breakdown */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                  <h2 className="text-base font-extrabold text-slate-900 mb-4">Revenue by Category</h2>
                  <div className="space-y-3">
                    {[
                      { cat: 'Consumer Electronics & Audio', pct: '48%', rev: '₹1,58,400' },
                      { cat: "Fashion & Ethnic Apparel", pct: '26%', rev: '₹85,800' },
                      { cat: 'Home & Kitchen Appliances', pct: '18%', rev: '₹59,400' },
                      { cat: 'Personal Care & Cosmetics', pct: '8%', rev: '₹26,400' },
                    ].map((c, i) => (
                      <div key={i} className="p-3 bg-slate-50 rounded-xl flex items-center justify-between text-xs">
                        <div>
                          <div className="font-bold text-slate-900">{c.cat}</div>
                          <div className="text-slate-400 text-[11px]">{c.pct} of total volume</div>
                        </div>
                        <span className="font-extrabold text-slate-900 font-mono text-sm">{c.rev}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              TAB 5: PAYOUTS, FINANCES & GST
             ========================================================================= */}
          {activeTab === 'payouts' && (
            <div className="space-y-6 seller-animate-fade">
              {/* Bank Payout Banner */}
              <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Settlement Account</div>
                  <div className="text-2xl font-black mt-1">₹54,320.00</div>
                  <div className="text-xs text-emerald-400 font-medium mt-1">
                    Scheduled payout: Friday, 24 Oct 2026 &bull; Direct IMPS/NEFT
                  </div>
                </div>
                <div className="bg-slate-800 p-3.5 rounded-xl border border-slate-700 text-xs">
                  <div className="text-slate-400">Beneficiary Bank:</div>
                  <div className="font-bold text-white text-sm">{storeInfo.bankName} (A/C: ******{storeInfo.accountEnding})</div>
                  <div className="text-slate-400 font-mono text-[11px]">IFSC: {storeInfo.ifsc}</div>
                </div>
              </div>

              {/* Commission & Deduction Breakdown */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                <h2 className="text-base font-extrabold text-slate-900 mb-4">Earnings & Deduction Breakdown</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-slate-500">Gross Sales</span>
                    <div className="text-base font-extrabold text-slate-900 font-mono mt-1">₹74,850.00</div>
                  </div>
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-slate-500">Platform Fee (4.5%)</span>
                    <div className="text-base font-extrabold text-rose-600 font-mono mt-1">-₹3,368.25</div>
                  </div>
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-slate-500">GST on Platform Fee (18%)</span>
                    <div className="text-base font-extrabold text-rose-600 font-mono mt-1">-₹606.28</div>
                  </div>
                  <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-100">
                    <span className="text-emerald-800 font-bold">Net Payable to Seller</span>
                    <div className="text-base font-black text-emerald-700 font-mono mt-1">₹70,875.47</div>
                  </div>
                </div>
              </div>

              {/* Historical Payouts Table */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                  <h2 className="text-sm font-extrabold text-slate-900">Recent Bank Settlements</h2>
                  <button
                    onClick={() => showToast('Statement downloaded for GSTR-1.')}
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-800"
                  >
                    Download CSV Statement 📥
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[10px] tracking-wider font-bold">
                      <tr>
                        <th className="py-3 px-4">Payout ID & UTR</th>
                        <th className="py-3 px-4">Settlement Date</th>
                        <th className="py-3 px-4">Bank Account</th>
                        <th className="py-3 px-4">Orders Count</th>
                        <th className="py-3 px-4">Net Deposited</th>
                        <th className="py-3 px-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      {[
                        { id: 'PAY-IN-9921', utr: 'HDFCR20261017009182', date: '17 Oct 2026', amount: '₹1,82,400', orders: 84, status: 'Completed' },
                        { id: 'PAY-IN-9810', utr: 'HDFCR20261010001928', date: '10 Oct 2026', amount: '₹1,44,200', orders: 67, status: 'Completed' },
                        { id: 'PAY-IN-9705', utr: 'HDFCR20261003008819', date: '03 Oct 2026', amount: '₹2,10,850', orders: 95, status: 'Completed' },
                      ].map((p) => (
                        <tr key={p.id} className="hover:bg-slate-50">
                          <td className="py-3.5 px-4 font-mono">
                            <div className="font-bold text-indigo-600">{p.id}</div>
                            <div className="text-[10px] text-slate-400">UTR: {p.utr}</div>
                          </td>
                          <td className="py-3.5 px-4 text-slate-700">{p.date}</td>
                          <td className="py-3.5 px-4 text-slate-700">HDFC Bank (****{storeInfo.accountEnding})</td>
                          <td className="py-3.5 px-4 font-bold text-slate-800">{p.orders} orders</td>
                          <td className="py-3.5 px-4 font-mono font-black text-emerald-600 text-sm">{p.amount}</td>
                          <td className="py-3.5 px-4">
                            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                              {p.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              TAB 6: REVIEWS & FEEDBACK
             ========================================================================= */}
          {activeTab === 'reviews' && (
            <div className="space-y-6 seller-animate-fade">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-black text-slate-900">Buyer Ratings & Customer Reviews</h1>
                  <p className="text-xs text-slate-500">Real verified feedback from customers who bought from your store</p>
                </div>
                <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 px-4 py-2 rounded-xl">
                  <span className="text-2xl font-black text-amber-700">4.85</span>
                  <div className="text-left text-[11px] leading-tight">
                    <div className="text-amber-800 font-bold">★★★★★</div>
                    <div className="text-amber-600">4,820 Reviews</div>
                  </div>
                </div>
              </div>

              {/* Review Cards */}
              <div className="space-y-3">
                {[
                  {
                    name: 'Rajesh Kulkarni',
                    city: 'Pune',
                    product: 'boAt Airdopes 141 ANC',
                    rating: 5,
                    date: 'Yesterday',
                    comment: 'Delivered in 24 hours in Pune! Bass is super heavy and ANC works great on local trains. 10/10 seller.',
                  },
                  {
                    name: 'Meera Iyer',
                    city: 'Chennai',
                    product: 'FabIndia Men Chikankari Kurta',
                    rating: 5,
                    date: '3 days ago',
                    comment: 'Authentic pure cotton! Bought this for my husband for Diwali. Beautiful embroidery and perfect fit.',
                  },
                  {
                    name: 'Amanpreet Singh',
                    city: 'Chandigarh',
                    product: 'Prestige Iris 750W Mixer',
                    rating: 4,
                    date: '5 days ago',
                    comment: 'Very powerful motor. Grinding whole spices was smooth. Packaging was intact and invoice included.',
                  },
                ].map((rev, i) => (
                  <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-xs">
                          {rev.name.charAt(0)}
                        </div>
                        <div>
                          <span className="font-bold text-xs text-slate-900">{rev.name}</span>
                          <span className="text-[11px] text-slate-400 ml-2">({rev.city})</span>
                        </div>
                        <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          ✓ Verified Purchase
                        </span>
                      </div>
                      <span className="text-xs text-slate-400">{rev.date}</span>
                    </div>

                    <div className="text-amber-500 font-bold text-xs">
                      {'★'.repeat(rev.rating)}{'☆'.repeat(5 - rev.rating)}
                      <span className="text-slate-500 font-normal ml-2">for {rev.product}</span>
                    </div>

                    <p className="text-xs text-slate-700">{rev.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =========================================================================
              TAB 7: STORE SETTINGS
             ========================================================================= */}
          {activeTab === 'settings' && (
            <div className="space-y-6 seller-animate-fade">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                <h1 className="text-xl font-black text-slate-900">Store & Merchant Profile Settings</h1>
                <p className="text-xs text-slate-500">Configure business information, GST credentials, pickup hub & bank accounts</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-6">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    showToast('Store settings saved successfully!');
                  }}
                  className="space-y-5"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Store Display Name</label>
                      <input
                        type="text"
                        value={storeInfo.name}
                        onChange={(e) => setStoreInfo({ ...storeInfo, name: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Registered Legal Entity</label>
                      <input
                        type="text"
                        value={storeInfo.legalName}
                        onChange={(e) => setStoreInfo({ ...storeInfo, legalName: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">GSTIN Number (India)</label>
                      <input
                        type="text"
                        value={storeInfo.gstin}
                        onChange={(e) => setStoreInfo({ ...storeInfo, gstin: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono uppercase font-bold focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Pickup Warehouse City & Hub</label>
                      <input
                        type="text"
                        value={storeInfo.hubCity}
                        onChange={(e) => setStoreInfo({ ...storeInfo, hubCity: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Pickup Postal Pincode</label>
                      <input
                        type="text"
                        value={storeInfo.pincode}
                        onChange={(e) => setStoreInfo({ ...storeInfo, pincode: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono font-bold focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Business Phone / Helpline</label>
                      <input
                        type="text"
                        value={storeInfo.phone}
                        onChange={(e) => setStoreInfo({ ...storeInfo, phone: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        id="storeLive"
                        checked={storeInfo.isStoreLive}
                        onChange={(e) => setStoreInfo({ ...storeInfo, isStoreLive: e.target.checked })}
                        className="w-4 h-4 text-indigo-600 rounded"
                      />
                      <label htmlFor="storeLive" className="text-xs font-bold text-slate-700 cursor-pointer">
                        Store Active & Accepting Orders in India
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md transition-all"
                    >
                      Save Configuration
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* =========================================================================
          MODAL 1: ADD / EDIT PRODUCT MODAL
         ========================================================================= */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm seller-animate-fade">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto seller-custom-scrollbar shadow-2xl border border-slate-200">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  {editingProduct ? 'Edit Product Listing' : 'Add New Product to Store'}
                </h3>
                <p className="text-xs text-slate-400">
                  Fill in product details, pricing in ₹ INR, and stock quantity
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsProductModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveProduct} className="p-6 space-y-5 text-xs">
              {/* Title & Brand */}
              <div className="space-y-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Product Title <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. boAt Rockerz 450 Bluetooth On-Ear Headphones"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 font-medium"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Brand Name</label>
                    <input
                      type="text"
                      placeholder="e.g. boAt, FabIndia, Prestige"
                      value={formData.brand}
                      onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                    >
                      <option value="Electronics">Electronics</option>
                      <option value="Men's Fashion">Men's Fashion</option>
                      <option value="Women's Fashion">Women's Fashion</option>
                      <option value="Home & Kitchen">Home & Kitchen</option>
                      <option value="Beauty & Care">Beauty & Care</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Pricing in INR */}
              <div className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100 space-y-3">
                <div className="font-bold text-indigo-950">Pricing & GST (₹ INR)</div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Selling Price (₹) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="number"
                      required
                      placeholder="1499"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full p-2 bg-white border border-slate-200 rounded-xl font-mono font-bold"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">MRP Price (₹)</label>
                    <input
                      type="number"
                      placeholder="2999"
                      value={formData.mrp}
                      onChange={(e) => setFormData({ ...formData, mrp: e.target.value })}
                      className="w-full p-2 bg-white border border-slate-200 rounded-xl font-mono text-slate-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">GST Tax Slab</label>
                    <select
                      value={formData.gstSlab}
                      onChange={(e) => setFormData({ ...formData, gstSlab: e.target.value })}
                      className="w-full p-2 bg-white border border-slate-200 rounded-xl font-semibold"
                    >
                      <option value="5%">5% (Apparel/Fabrics)</option>
                      <option value="12%">12% (Kitchen/Small App)</option>
                      <option value="18%">18% (Electronics/Standard)</option>
                      <option value="28%">28% (Luxury/Auto)</option>
                    </select>
                  </div>
                </div>

                {formData.price && formData.mrp && Number(formData.mrp) > Number(formData.price) && (
                  <div className="text-[11px] text-emerald-700 font-bold">
                    ✓ Buyer discount: {Math.round(((formData.mrp - formData.price) / formData.mrp) * 100)}% OFF
                  </div>
                )}
              </div>

              {/* Stock & SKU */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Stock Quantity <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="25"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">SKU Code</label>
                  <input
                    type="text"
                    placeholder="ELEC-BOAT-01"
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                  />
                </div>
              </div>

              {/* Image Picker */}
              <div className="space-y-2">
                <label className="block font-bold text-slate-700">Choose Product Image</label>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                  {PRESET_IMAGES.map((img, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setFormData({ ...formData, image: img.url })}
                      className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                        formData.image === img.url ? 'border-indigo-600 ring-2 ring-indigo-200 scale-105' : 'border-slate-200 hover:border-slate-400'
                      }`}
                    >
                      <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>

                <div className="mt-2">
                  <input
                    type="url"
                    placeholder="Or paste custom image URL..."
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 font-mono text-[11px]"
                  />
                </div>
              </div>

              {/* COD Option */}
              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="codCheck"
                  checked={formData.codAvailable}
                  onChange={(e) => setFormData({ ...formData, codAvailable: e.target.checked })}
                  className="w-4 h-4 text-indigo-600 rounded"
                />
                <label htmlFor="codCheck" className="font-semibold text-slate-700 cursor-pointer">
                  Enable Cash on Delivery (COD) for this item
                </label>
              </div>

              {/* Form Buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-6 py-2.5 rounded-xl shadow-lg transition-transform hover:scale-105"
                >
                  {editingProduct ? 'Save Changes' : 'Publish Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 2: PRINTABLE GST TAX INVOICE
         ========================================================================= */}
      {invoiceOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm seller-animate-fade">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto seller-custom-scrollbar shadow-2xl border border-slate-200 flex flex-col">
            {/* Top Bar with Print Button */}
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between no-print rounded-t-3xl">
              <div className="text-xs font-bold flex items-center gap-2">
                <span>Official GST Tax Invoice Preview</span>
                <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded text-[10px]">Ready to Print</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  🖨️ Print Invoice
                </button>
                <button
                  type="button"
                  onClick={() => setInvoiceOrder(null)}
                  className="w-7 h-7 rounded-full bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center text-xs font-bold"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Printable Area */}
            <div id="printable-invoice" className="p-8 space-y-6 text-slate-900 font-sans text-xs bg-white">
              {/* Header */}
              <div className="flex justify-between items-start border-b-2 border-slate-900 pb-4">
                <div>
                  <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">TAX INVOICE</h2>
                  <div className="text-[11px] text-slate-500 font-semibold">(Under Section 31 of CGST Act, 2017)</div>
                  <div className="font-mono text-xs font-bold text-indigo-700 mt-2">
                    Invoice No: INV-2026-{invoiceOrder.id.replace('ORD-', '')}
                  </div>
                  <div className="text-[11px] text-slate-500">Date: {invoiceOrder.date}</div>
                </div>

                <div className="text-right">
                  <div className="text-lg font-black text-slate-900">{storeInfo.legalName}</div>
                  <div className="text-[11px] text-slate-600 max-w-xs">{storeInfo.hubCity}</div>
                  <div className="font-mono font-bold text-slate-800 text-xs mt-1">
                    GSTIN: {storeInfo.gstin}
                  </div>
                  <div className="text-[11px] text-slate-500">State: Maharashtra (Code: 27)</div>
                </div>
              </div>

              {/* Bill To & Ship To */}
              <div className="grid grid-cols-2 gap-6 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div>
                  <span className="font-extrabold text-[10px] uppercase text-slate-400 tracking-wider">Bill To / Ship To</span>
                  <div className="font-bold text-slate-900 text-sm mt-1">{invoiceOrder.customer}</div>
                  <div className="text-slate-600 text-xs mt-0.5">{invoiceOrder.city}</div>
                  <div className="text-slate-600 text-xs">PIN: {invoiceOrder.pincode}</div>
                  <div className="text-slate-500 text-[11px] mt-1">Phone: {invoiceOrder.phone}</div>
                </div>

                <div>
                  <span className="font-extrabold text-[10px] uppercase text-slate-400 tracking-wider">Shipping Details</span>
                  <div className="font-bold text-slate-800 mt-1">Courier: {invoiceOrder.courier}</div>
                  <div className="font-mono text-indigo-600 font-bold text-xs">AWB / Tracking: {invoiceOrder.trackingNumber}</div>
                  <div className="text-slate-600 mt-1">Mode: {invoiceOrder.paymentMethod}</div>
                  <div className="text-emerald-700 font-bold text-[11px]">Payment Status: {invoiceOrder.paymentStatus}</div>
                </div>
              </div>

              {/* Line Items Table */}
              <table className="w-full text-left text-xs border border-slate-200 rounded-lg overflow-hidden">
                <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="p-2.5">#</th>
                    <th className="p-2.5">Item Description</th>
                    <th className="p-2.5">HSN Code</th>
                    <th className="p-2.5">Qty</th>
                    <th className="p-2.5">Rate</th>
                    <th className="p-2.5">Taxable (₹)</th>
                    <th className="p-2.5">CGST 9%</th>
                    <th className="p-2.5">SGST 9%</th>
                    <th className="p-2.5 text-right">Total (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 font-medium">
                  {invoiceOrder.items.map((it, idx) => {
                    const taxable = Math.round(it.price / 1.18);
                    const taxHalf = Math.round((it.price - taxable) / 2);
                    return (
                      <tr key={idx}>
                        <td className="p-2.5">{idx + 1}</td>
                        <td className="p-2.5 font-bold text-slate-900">{it.title}</td>
                        <td className="p-2.5 font-mono text-[11px]">85183000</td>
                        <td className="p-2.5 font-bold">{it.qty}</td>
                        <td className="p-2.5 font-mono">₹{taxable}</td>
                        <td className="p-2.5 font-mono">₹{taxable}</td>
                        <td className="p-2.5 font-mono">₹{taxHalf}</td>
                        <td className="p-2.5 font-mono">₹{taxHalf}</td>
                        <td className="p-2.5 font-mono font-bold text-right">₹{it.price}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {/* Total Calculation */}
              <div className="flex justify-end">
                <div className="w-64 space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Taxable Value:</span>
                    <span className="font-mono">₹{Math.round(invoiceOrder.total / 1.18)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>CGST (9%):</span>
                    <span className="font-mono">₹{Math.round((invoiceOrder.total - invoiceOrder.total / 1.18) / 2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>SGST (9%):</span>
                    <span className="font-mono">₹{Math.round((invoiceOrder.total - invoiceOrder.total / 1.18) / 2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Shipping Charges:</span>
                    <span className="text-emerald-600 font-bold">FREE</span>
                  </div>
                  <div className="flex justify-between text-base font-black text-slate-900 pt-2 border-t border-slate-300">
                    <span>Grand Total:</span>
                    <span className="font-mono">₹{invoiceOrder.total.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              {/* Footer Declaration & Signature */}
              <div className="pt-6 border-t border-slate-200 flex justify-between items-end text-[11px] text-slate-500">
                <div>
                  <p className="font-bold text-slate-700">Declaration:</p>
                  <p>We declare that this invoice shows the actual price of goods and that all particulars are true and correct.</p>
                  <p className="mt-1">This is a computer generated invoice and requires no physical signature.</p>
                </div>
                <div className="text-right">
                  <div className="font-bold text-slate-900">{storeInfo.legalName}</div>
                  <div className="mt-6 text-slate-400 font-mono text-[10px]">Authorized Signatory</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TOAST FEEDBACK MESSAGE
         ========================================================================= */}
      {toastMessage && (
        <div className="seller-toast">
          <span className="text-lg">✨</span>
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
