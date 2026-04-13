import React, { useState, useEffect } from 'react';
import { 
  Home, Search, ShoppingBag, User, ChevronLeft, Search as SearchIcon, 
  Filter, Star, ShoppingCart, Trash2, CheckCircle, Package, LayoutDashboard, 
  ClipboardList, Box, ArrowDownToLine, ArrowUpFromLine, ScanLine, Smartphone, 
  Monitor, LogOut, Check, ChevronRight, Barcode, QrCode, MoreVertical
} from 'lucide-react';

export default function App() {
  const [role, setRole] = useState('customer'); // customer, admin, warehouse
  const [currentScreen, setCurrentScreen] = useState('landing');
  const [cartCount, setCartCount] = useState(0);

  // Helper untuk pindah halaman
  const navigate = (screen) => {
    setCurrentScreen(screen);
    // Scroll ke atas setiap pindah halaman
    const scrollContainer = document.getElementById('scroll-container');
    if (scrollContainer) scrollContainer.scrollTop = 0;
  };

  // Switch Role & Reset Screen
  const handleRoleChange = (newRole) => {
    setRole(newRole);
    if (newRole === 'customer') setCurrentScreen('landing');
    if (newRole === 'admin') setCurrentScreen('admin-dashboard');
    if (newRole === 'warehouse') setCurrentScreen('wh-dashboard');
  };

  // --- KOMPONEN PEMBUNGKUS (WRAPPERS) ---
  
  const MobileWrapper = ({ children, title, showBack = false, onBack }) => (
    <div className="flex justify-center bg-gray-200 min-h-screen p-0 sm:p-4 font-sans">
      <div className="w-full max-w-[420px] bg-white sm:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col relative border-[6px] border-gray-900 h-screen sm:h-[840px]">
        {/* Notch Area */}
        <div className="h-6 w-full bg-white flex justify-center items-end pb-1">
          <div className="w-32 h-4 bg-gray-900 rounded-b-xl"></div>
        </div>

        {/* Header */}
        <div className="bg-white px-4 py-3 flex items-center border-b border-gray-100 sticky top-0 z-20">
          {showBack ? (
            <button onClick={onBack || (() => navigate('landing'))} className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors">
              <ChevronLeft size={24} />
            </button>
          ) : (
            <div className="w-10 font-bold text-xl italic tracking-tighter">OT.</div>
          )}
          <h1 className="flex-1 text-center font-bold text-base truncate px-2">{title}</h1>
          <div className="w-10 flex justify-end relative">
             {role === 'customer' && (
               <button onClick={() => navigate('cart')} className="p-1">
                 <ShoppingCart size={22} />
                 {cartCount > 0 && <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">1</span>}
               </button>
             )}
          </div>
        </div>
        
        {/* Scrollable Content */}
        <div id="scroll-container" className="flex-1 overflow-y-auto pb-24 bg-gray-50 scroll-smooth">
          {children}
        </div>

        {/* Customer Bottom Navigation */}
        {role === 'customer' && !['cart', 'checkout', 'success'].includes(currentScreen) && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] bg-white/90 backdrop-blur-md border border-gray-200 flex justify-around py-3 px-4 rounded-2xl shadow-xl z-30">
            <button onClick={() => navigate('landing')} className={`flex flex-col items-center ${currentScreen === 'landing' ? 'text-black font-bold' : 'text-gray-400'}`}>
              <Home size={22} /><span className="text-[10px] mt-1">Home</span>
            </button>
            <button onClick={() => navigate('catalog')} className={`flex flex-col items-center ${currentScreen === 'catalog' ? 'text-black font-bold' : 'text-gray-400'}`}>
              <Search size={22} /><span className="text-[10px] mt-1">Katalog</span>
            </button>
            <button onClick={() => navigate('cart')} className={`flex flex-col items-center ${currentScreen === 'cart' ? 'text-black font-bold' : 'text-gray-400'}`}>
              <ShoppingBag size={22} /><span className="text-[10px] mt-1">Cart</span>
            </button>
            <button className="flex flex-col items-center text-gray-400">
              <User size={22} /><span className="text-[10px] mt-1">Akun</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const WebWrapper = ({ children }) => (
    <div className="flex h-screen bg-gray-50 font-sans text-slate-800">
      {/* Sidebar */}
      <div className="w-72 bg-slate-900 text-white flex flex-col shrink-0">
        <div className="p-8 text-2xl font-black italic tracking-tighter border-b border-slate-800 flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center not-italic text-sm">OT</div>
          ONE TONE
        </div>
        <div className="flex-1 py-6 space-y-1">
          <button onClick={() => navigate('admin-dashboard')} className={`w-full flex items-center px-8 py-4 text-sm font-medium transition-colors ${currentScreen === 'admin-dashboard' ? 'bg-blue-600 border-r-4 border-blue-300' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
            <LayoutDashboard size={20} className="mr-4" /> Dashboard
          </button>
          <button onClick={() => navigate('admin-orders')} className={`w-full flex items-center px-8 py-4 text-sm font-medium transition-colors ${currentScreen.includes('admin-order') ? 'bg-blue-600 border-r-4 border-blue-300' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
            <ClipboardList size={20} className="mr-4" /> Daftar Pesanan
          </button>
          <button onClick={() => navigate('admin-products')} className={`w-full flex items-center px-8 py-4 text-sm font-medium transition-colors ${currentScreen === 'admin-products' ? 'bg-blue-600 border-r-4 border-blue-300' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
            <Box size={20} className="mr-4" /> Master Produk
          </button>
        </div>
        <div className="p-6 border-t border-slate-800">
           <button onClick={() => handleRoleChange('customer')} className="w-full flex items-center px-4 py-3 text-sm text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
              <LogOut size={18} className="mr-3" /> Keluar Panel
           </button>
        </div>
      </div>
      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto flex flex-col">
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-10 shrink-0 sticky top-0 z-10">
           <h2 className="font-bold text-xl uppercase tracking-tight">
             {currentScreen === 'admin-dashboard' ? 'Overview' : currentScreen === 'admin-orders' ? 'Orders Management' : 'Inventory'}
           </h2>
           <div className="flex items-center gap-4">
              <div className="text-right">
                 <p className="text-sm font-bold">Bpk. Owner</p>
                 <p className="text-xs text-slate-500">Administrator</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold border border-blue-200">B</div>
           </div>
        </header>
        <div className="p-10 flex-1">
          {children}
        </div>
      </div>
    </div>
  );

  // --- LAYAR CUSTOMER ---

  const ScreenLanding = () => (
    <div className="p-5 space-y-8 pb-10">
      {/* Hero TikTok Promo */}
      <div className="bg-black text-white p-8 rounded-3xl text-center shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600 rounded-full -mr-10 -mt-10 blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-pink-600 rounded-full -ml-10 -mb-10 blur-3xl opacity-50"></div>
        <div className="relative z-10">
          <div className="flex justify-center mb-3">
             <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase">Eksklusif Live TikTok</div>
          </div>
          <h2 className="text-3xl font-black mb-2 leading-tight">LEBIH HEMAT DI WEBSITE!</h2>
          <p className="text-gray-300 text-sm mb-6 font-medium italic">Gunakan kode: <span className="text-white underline decoration-blue-500 underline-offset-4">TIKTOK10</span></p>
          <button onClick={() => navigate('catalog')} className="bg-white text-black px-6 py-4 rounded-2xl text-sm font-black w-full shadow-lg active:scale-95 transition-transform uppercase tracking-wider">Mulai Belanja</button>
        </div>
      </div>

      {/* Categories */}
      <div>
        <h3 className="font-black text-lg mb-4 flex items-center gap-2">
          KATEGORI <span className="h-0.5 flex-1 bg-gray-200"></span>
        </h3>
        <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
          {['Semua', 'Kemeja', 'Blouse', 'Tunik', 'Pants'].map((cat, idx) => (
            <button key={cat} className={`px-6 py-2.5 rounded-2xl text-sm font-bold whitespace-nowrap border-2 transition-all ${idx === 0 ? 'bg-black text-white border-black' : 'bg-white text-gray-500 border-gray-100 shadow-sm hover:border-black'}`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Best Sellers */}
      <div>
        <div className="flex justify-between items-center mb-5">
          <h3 className="font-black text-lg">HITS MINGGU INI</h3>
          <button onClick={() => navigate('catalog')} className="text-xs font-bold text-blue-600 flex items-center gap-1 bg-blue-50 px-3 py-1.5 rounded-full">SEMUA <ChevronRight size={14}/></button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[1, 2].map(i => (
            <div key={i} onClick={() => navigate('product-detail')} className="group bg-white rounded-3xl p-3 shadow-sm cursor-pointer border-2 border-transparent hover:border-black transition-all">
              <div className="bg-gray-100 aspect-[3/4] rounded-2xl mb-3 overflow-hidden">
                 <div className="w-full h-full bg-slate-200 group-hover:scale-105 transition-transform duration-500"></div>
              </div>
              <h4 className="text-xs font-bold line-clamp-1 mb-1 text-gray-900 uppercase tracking-tight">Kemeja Basic One Tone</h4>
              <div className="flex flex-col">
                <p className="text-[10px] text-gray-400 line-through decoration-red-500/50">Rp 150.000</p>
                <p className="text-sm font-black text-gray-900">Rp 120.000</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ScreenCatalog = () => (
    <div className="p-5">
      {/* Sticky Header inside Catalog */}
      <div className="sticky top-0 bg-gray-50/80 backdrop-blur-md pt-2 pb-4 z-10 space-y-4">
        <div className="flex gap-3">
          <div className="flex-1 bg-white border-2 border-gray-100 rounded-2xl flex items-center px-4 shadow-sm focus-within:border-black transition-colors">
            <SearchIcon size={18} className="text-gray-400" />
            <input type="text" placeholder="Cari warna, model..." className="w-full py-3 px-3 text-sm outline-none bg-transparent font-medium" />
          </div>
          <button className="bg-black text-white p-3 rounded-2xl shadow-lg active:scale-90 transition-transform"><Filter size={20} /></button>
        </div>
      </div>

      {/* Catalog Grid */}
      <div className="grid grid-cols-2 gap-4">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} onClick={() => navigate('product-detail')} className="bg-white rounded-3xl p-3 shadow-sm border-2 border-transparent active:border-black transition-all">
            <div className="bg-gray-100 aspect-[3/4] rounded-2xl mb-3 relative overflow-hidden">
              <span className="absolute top-2 left-2 bg-red-600 text-white text-[9px] px-2 py-0.5 rounded-full font-black uppercase">SALE</span>
            </div>
            <h4 className="text-[11px] font-bold line-clamp-1 mb-2 text-gray-800 uppercase tracking-tight">Blouse Rayon Premium</h4>
            <div className="flex gap-1.5 mb-2">
              <div className="w-3.5 h-3.5 rounded-full bg-amber-900 border border-black/5 shadow-inner"></div>
              <div className="w-3.5 h-3.5 rounded-full bg-stone-500 border border-black/5 shadow-inner"></div>
              <div className="w-3.5 h-3.5 rounded-full bg-slate-400 border border-black/5 shadow-inner"></div>
            </div>
            <p className="text-sm font-black text-black">Rp 125.000</p>
          </div>
        ))}
      </div>
    </div>
  );

  const ScreenProductDetail = () => (
    <div className="relative min-h-full flex flex-col bg-white">
      <div className="flex-1 pb-24 overflow-y-auto">
        {/* Banner Image */}
        <div className="bg-slate-200 aspect-[4/5] w-full relative">
           <div className="absolute top-4 left-4">
              <span className="bg-black text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Baru</span>
           </div>
        </div>
        
        {/* Content */}
        <div className="p-6 -mt-8 bg-white rounded-t-[3rem] shadow-2xl relative z-10">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-black tracking-tighter uppercase leading-none">KEMEJA BASIC ONE TONE</h2>
              <p className="text-blue-600 text-xs font-bold mt-2">ID: OT-KMB-001</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-black text-red-600 leading-none">Rp 120k</p>
              <p className="text-[10px] text-gray-400 line-through mt-1 italic">Rp 150.000</p>
            </div>
          </div>

          <div className="h-[1px] bg-gray-100 w-full my-6"></div>

          <div className="space-y-6">
            <div>
              <h3 className="font-black text-xs uppercase tracking-widest text-gray-400 mb-3">Warna</h3>
              <div className="flex gap-3">
                <button className="border-2 border-black px-5 py-2.5 rounded-2xl text-xs font-black shadow-sm bg-black text-white">Hitam</button>
                <button className="border-2 border-gray-100 px-5 py-2.5 rounded-2xl text-xs font-bold text-gray-400 bg-gray-50 hover:border-gray-300">Mocca</button>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-black text-xs uppercase tracking-widest text-gray-400">Pilih Size</h3>
                <span className="text-[10px] font-bold text-green-600 flex items-center gap-1"><Check size={10}/> Stok: 12 pcs</span>
              </div>
              <div className="flex gap-3">
                {['S', 'M', 'L', 'XL'].map(s => (
                  <button key={s} className={`w-12 h-12 rounded-2xl text-xs font-black flex items-center justify-center border-2 transition-all ${s === 'M' ? 'bg-black text-white border-black shadow-lg shadow-black/20' : 'border-gray-100 text-gray-400'}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
              <h3 className="font-black text-xs uppercase tracking-widest text-gray-400 mb-2">Info Produk</h3>
              <p className="text-xs text-gray-600 leading-relaxed font-medium">Bahan Katun Rayon Premium. Sejuk, jatuh, dan tidak menerawang. Jahitan rapi standar butik. Panjang baju 70cm.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 w-[85%] max-w-[340px] z-50">
        <button 
          onClick={() => {
            setCartCount(1);
            navigate('cart');
          }} 
          className="w-full bg-black text-white font-black py-5 rounded-2xl shadow-2xl flex items-center justify-center gap-3 active:scale-95 transition-transform"
        >
          <ShoppingCart size={20} /> TAMBAH KE KERANJANG
        </button>
      </div>
    </div>
  );

  const ScreenCart = () => (
    <div className="relative h-full flex flex-col p-5">
      <div className="flex-1 space-y-4">
        {/* Cart Item */}
        <div className="bg-white p-4 rounded-3xl flex gap-4 shadow-sm border border-gray-100 animate-in slide-in-from-bottom duration-300">
          <div className="w-24 h-24 bg-slate-100 rounded-2xl flex-shrink-0"></div>
          <div className="flex-1 flex flex-col justify-between py-1">
            <div>
              <h4 className="text-sm font-black uppercase tracking-tight">Kemeja Basic Hitam</h4>
              <p className="text-[10px] font-bold text-gray-400 uppercase">Warna: Hitam • Size: M</p>
              <p className="text-sm font-black mt-2">Rp 120.000</p>
            </div>
            <div className="flex justify-between items-end">
              <button className="text-red-400 hover:text-red-600 transition-colors"><Trash2 size={16} /></button>
              <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-200">
                <button className="w-8 h-8 flex items-center justify-center font-bold text-gray-400">-</button>
                <span className="w-8 text-center text-xs font-black">1</span>
                <button className="w-8 h-8 flex items-center justify-center font-bold">+</button>
              </div>
            </div>
          </div>
        </div>

        {/* Voucher Section */}
        <div className="bg-blue-50 border-2 border-blue-100 rounded-3xl p-4 flex gap-3 items-center">
          <div className="bg-blue-600 text-white p-2 rounded-xl"><Star size={18} fill="currentColor" /></div>
          <div className="flex-1">
            <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Hemat 10%</p>
            <p className="text-xs font-bold text-blue-900">TIKTOK10 <span className="font-normal opacity-50 ml-1">Terpasang</span></p>
          </div>
          <button className="text-[10px] font-black uppercase text-blue-600">Ganti</button>
        </div>
      </div>

      {/* Checkout Bar */}
      <div className="mt-auto pt-6 border-t border-gray-100 space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-bold text-gray-400 uppercase">
            <span>Subtotal</span>
            <span>Rp 120.000</span>
          </div>
          <div className="flex justify-between text-xs font-bold text-green-600 uppercase">
            <span>Diskon Promo</span>
            <span>- Rp 12.000</span>
          </div>
          <div className="flex justify-between items-center pt-2">
            <span className="text-sm font-black uppercase">Total Bayar</span>
            <span className="text-xl font-black text-black">Rp 108.000</span>
          </div>
        </div>
        <button onClick={() => navigate('checkout')} className="w-full bg-black text-white font-black py-5 rounded-3xl text-sm shadow-xl tracking-widest uppercase active:scale-95 transition-transform">
          Lanjut ke Pembayaran
        </button>
      </div>
    </div>
  );

  const ScreenCheckout = () => (
    <div className="p-5 space-y-6">
      <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm space-y-5">
        <h3 className="font-black text-xs uppercase tracking-widest text-gray-400 flex items-center gap-2">
          <User size={14} /> Pengiriman
        </h3>
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Nama Lengkap</label>
            <input type="text" placeholder="Masukkan nama..." className="w-full border-2 border-gray-100 rounded-2xl p-4 text-sm font-bold bg-gray-50 focus:border-black transition-colors" defaultValue="Siska Amalia" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">WhatsApp</label>
            <input type="text" placeholder="0812..." className="w-full border-2 border-gray-100 rounded-2xl p-4 text-sm font-bold bg-gray-50 focus:border-black" defaultValue="0812-3456-7890" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Alamat Detail</label>
            <textarea placeholder="Jl. Raya No..." className="w-full border-2 border-gray-100 rounded-2xl p-4 text-sm font-bold bg-gray-50 h-24 focus:border-black" defaultValue="Antapani, Bandung"></textarea>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm space-y-5">
        <h3 className="font-black text-xs uppercase tracking-widest text-gray-400">Pilih Pembayaran</h3>
        <div className="space-y-3">
          {['Transfer Bank (BCA)', 'QRIS (Gopay/OVO)', 'COD (Bayar di Tempat)'].map((p, i) => (
            <label key={i} className="flex items-center gap-4 border-2 border-gray-50 p-4 rounded-2xl hover:border-black cursor-pointer transition-all">
              <input type="radio" name="pay" defaultChecked={i===0} className="w-5 h-5 accent-black" />
              <span className="text-xs font-black uppercase tracking-tight">{p}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="pb-10">
        <button onClick={() => navigate('success')} className="w-full bg-green-600 text-white font-black py-5 rounded-3xl text-sm shadow-xl shadow-green-200 uppercase tracking-widest active:scale-95 transition-all">
          Buat Pesanan Sekarang
        </button>
      </div>
    </div>
  );

  const ScreenSuccess = () => (
    <div className="flex flex-col items-center justify-center h-full p-10 text-center animate-in zoom-in duration-500">
      <div className="w-24 h-24 bg-green-100 rounded-[2.5rem] flex items-center justify-center text-green-600 mb-8 border-4 border-green-50 shadow-lg shadow-green-100">
        <CheckCircle size={56} />
      </div>
      <h2 className="text-3xl font-black mb-3 tracking-tighter uppercase leading-none">ORDER BERHASIL!</h2>
      <p className="text-gray-400 text-sm font-medium mb-10 leading-relaxed px-4">Terima kasih Siska! Pesananmu sedang disiapkan oleh tim One Tone.</p>
      
      <div className="bg-white w-full p-6 rounded-[2.5rem] shadow-sm border border-gray-100 mb-10 text-left space-y-4">
        <div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Kode Pesanan</p>
          <p className="text-sm font-black uppercase">#ORD-OT-99120</p>
        </div>
        <div className="h-[1px] bg-gray-50"></div>
        <div className="flex justify-between">
           <div>
             <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Bayar</p>
             <p className="text-lg font-black">Rp 123.000</p>
           </div>
           <span className="bg-orange-100 text-orange-700 text-[10px] px-3 py-2 rounded-xl font-black self-center">PENDING</span>
        </div>
      </div>

      <div className="w-full space-y-3">
        <button onClick={() => navigate('landing')} className="w-full bg-black text-white font-black py-5 rounded-3xl text-xs uppercase tracking-widest shadow-xl">
          Kembali Beranda
        </button>
        <button className="w-full bg-green-50 text-green-700 font-black py-5 rounded-3xl text-xs uppercase tracking-widest border-2 border-green-100">
          Chat Admin (WA)
        </button>
      </div>
    </div>
  );

  // --- ADMIN SCREENS (WEB) ---

  const ScreenAdminDashboard = () => (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="grid grid-cols-4 gap-8">
        {[
          { label: 'Penjualan Hari Ini', value: 'Rp 4,2 Juta', up: '12%', color: 'blue' },
          { label: 'Order Baru', value: '28', color: 'orange' },
          { label: 'Total Omzet (Bulan)', value: 'Rp 148,5 Juta', up: '5%', color: 'green' },
          { label: 'Produk Habis', value: '3 SKU', color: 'red' },
        ].map((kpi, i) => (
          <div key={i} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className={`absolute top-0 right-0 w-24 h-24 bg-${kpi.color}-500 opacity-[0.03] rounded-bl-full`}></div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">{kpi.label}</p>
            <div className="flex items-end gap-3">
              <p className="text-3xl font-black tracking-tighter">{kpi.value}</p>
              {kpi.up && <span className="text-[10px] font-bold text-green-500 mb-1">↑{kpi.up}</span>}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-10">
         <div className="col-span-2 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center">
               <h3 className="font-black uppercase tracking-widest text-sm">Pesanan Terbaru</h3>
               <button onClick={() => navigate('admin-orders')} className="text-xs font-bold text-blue-600 hover:underline">Lihat Semua</button>
            </div>
            <div className="overflow-x-auto">
               <table className="w-full text-left">
                  <thead className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                     <tr>
                        <th className="px-8 py-4">ID Order</th>
                        <th className="px-8 py-4">Nama</th>
                        <th className="px-8 py-4">Channel</th>
                        <th className="px-8 py-4">Status</th>
                        <th className="px-8 py-4 text-right">Total</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm font-bold">
                     <tr className="hover:bg-slate-50 transition-colors">
                        <td className="px-8 py-5">#OT-99120</td>
                        <td className="px-8 py-5">Siska Amalia</td>
                        <td className="px-8 py-5"><span className="text-[10px] bg-slate-100 px-2 py-1 rounded-md">WEBSITE</span></td>
                        <td className="px-8 py-5"><span className="text-[10px] bg-yellow-100 text-yellow-700 px-2 py-1 rounded-md uppercase">Baru</span></td>
                        <td className="px-8 py-5 text-right font-black">Rp 123.000</td>
                     </tr>
                     <tr className="hover:bg-slate-50 transition-colors">
                        <td className="px-8 py-5">#OT-99119</td>
                        <td className="px-8 py-5">Budi Doremi</td>
                        <td className="px-8 py-5"><span className="text-[10px] bg-slate-100 px-2 py-1 rounded-md font-bold text-blue-600">TIKTOK</span></td>
                        <td className="px-8 py-5"><span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-1 rounded-md uppercase">Proses</span></td>
                        <td className="px-8 py-5 text-right font-black">Rp 210.000</td>
                     </tr>
                  </tbody>
               </table>
            </div>
         </div>

         <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
            <h3 className="font-black uppercase tracking-widest text-sm mb-6 pb-4 border-b">Produk Terlaris</h3>
            <div className="space-y-6">
               {[
                 { name: 'Kemeja Basic', var: 'Hitam M', sales: 120, stock: 12 },
                 { name: 'Blouse Rayon', var: 'Mocca L', sales: 95, stock: 5 },
                 { name: 'Kulot Pants', var: 'Cream XL', sales: 88, stock: 2 },
               ].map((p, i) => (
                 <div key={i} className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-100 rounded-2xl flex-shrink-0"></div>
                    <div className="flex-1">
                       <p className="text-sm font-bold truncate">{p.name}</p>
                       <p className="text-[10px] text-slate-400 font-medium">{p.var}</p>
                    </div>
                    <div className="text-right">
                       <p className="text-sm font-black text-slate-800">{p.sales}pcs</p>
                       <p className={`text-[9px] font-bold ${p.stock < 10 ? 'text-red-500' : 'text-slate-400'}`}>Sisa: {p.stock}</p>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );

  const ScreenAdminOrders = () => (
    <div className="space-y-6 animate-in slide-in-from-right duration-500">
      <div className="flex justify-between items-center">
         <div className="flex gap-4">
            <div className="relative group">
               <SearchIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
               <input type="text" placeholder="Cari pesanan..." className="pl-12 pr-6 py-4 bg-white border border-slate-200 rounded-2xl text-sm font-medium w-80 focus:ring-4 focus:ring-blue-100 transition-all outline-none" />
            </div>
            <select className="bg-white border border-slate-200 rounded-2xl px-6 text-sm font-bold uppercase tracking-widest text-slate-500">
               <option>Semua Status</option>
               <option>Menunggu</option>
               <option>Diproses</option>
               <option>Selesai</option>
            </select>
         </div>
         <button className="bg-black text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-black/10 flex items-center gap-2">
           <Package size={16} /> Update Status Massal
         </button>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden">
        <table className="w-full text-left">
           <thead className="bg-slate-900 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
              <tr>
                 <th className="px-10 py-6">Timestamp</th>
                 <th className="px-10 py-6">No. Order</th>
                 <th className="px-10 py-6">Customer</th>
                 <th className="px-10 py-6">Sumber</th>
                 <th className="px-10 py-6 text-right">Pembayaran</th>
                 <th className="px-10 py-6 text-center">Aksi</th>
              </tr>
           </thead>
           <tbody className="divide-y divide-slate-100 text-sm font-bold">
              {[1, 2, 3, 4, 5].map((item) => (
                <tr key={item} className="hover:bg-slate-50 transition-colors cursor-pointer group">
                   <td className="px-10 py-6 text-slate-400 font-medium">24 Oct, 10:30</td>
                   <td className="px-10 py-6 uppercase">#ORD-9912{item}</td>
                   <td className="px-10 py-6">
                      <p className="font-black">Siska Amalia</p>
                      <p className="text-[10px] text-slate-400">081234567890</p>
                   </td>
                   <td className="px-10 py-6">
                      <span className={`text-[9px] px-3 py-1.5 rounded-full font-black ${item % 2 === 0 ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'bg-slate-100 text-slate-600'}`}>
                         {item % 2 === 0 ? 'TIKTOK SHOP' : 'WEBSITE'}
                      </span>
                   </td>
                   <td className="px-10 py-6 text-right">
                      <p className="font-black">Rp 123.000</p>
                      <p className="text-[10px] text-green-600 uppercase">Lunas</p>
                   </td>
                   <td className="px-10 py-6 text-center">
                      <button onClick={() => navigate('admin-order-detail')} className="bg-slate-100 text-slate-800 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-tight hover:bg-black hover:text-white transition-all">Detail</button>
                   </td>
                </tr>
              ))}
           </tbody>
        </table>
      </div>
    </div>
  );

  const ScreenAdminOrderDetail = () => (
    <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom duration-500 pb-10">
       <div className="flex items-center gap-6">
          <button onClick={() => navigate('admin-orders')} className="w-12 h-12 flex items-center justify-center bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition-colors shadow-sm"><ChevronLeft size={24}/></button>
          <div>
             <h2 className="text-2xl font-black uppercase tracking-tighter">Order #ORD-99120</h2>
             <p className="text-sm font-medium text-slate-400 flex items-center gap-2">Status: <span className="text-yellow-600 font-black uppercase">Menunggu Diproses</span></p>
          </div>
          <div className="ml-auto flex gap-3">
             <button className="bg-blue-50 text-blue-700 border-2 border-blue-200 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest">Cetak Label</button>
             <button className="bg-black text-white px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl">Konfirmasi Pengiriman</button>
          </div>
       </div>

       <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2 space-y-8">
             <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm p-10">
                <h3 className="font-black text-xs uppercase tracking-[0.2em] text-slate-400 mb-8 pb-4 border-b">Detail Item</h3>
                <div className="flex items-center gap-6">
                   <div className="w-20 h-20 bg-slate-100 rounded-2xl shrink-0"></div>
                   <div className="flex-1">
                      <p className="font-black text-lg uppercase leading-none mb-2">Kemeja Basic One Tone</p>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">SKU: OT-KMB-HITAM-M</p>
                      <p className="text-xs font-bold text-blue-600 mt-1 uppercase">Hitam • Size M</p>
                   </div>
                   <div className="text-right">
                      <p className="text-lg font-black tracking-tight">Rp 120.000</p>
                      <p className="text-sm font-bold text-slate-400">x 1</p>
                   </div>
                </div>
             </div>

             <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm p-10">
                <h3 className="font-black text-xs uppercase tracking-[0.2em] text-slate-400 mb-8 pb-4 border-b">Aktivitas Log</h3>
                <div className="space-y-6">
                   <div className="flex gap-4 border-l-2 border-slate-100 ml-2 pl-6 relative">
                      <div className="absolute -left-[9px] top-1 w-4 h-4 bg-green-500 rounded-full border-4 border-white shadow-sm"></div>
                      <div>
                         <p className="text-sm font-black uppercase tracking-tight">Pesanan Dibuat</p>
                         <p className="text-xs text-slate-400">Oleh Customer (Siska Amalia) • 24 Oct, 10:30</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>

          <div className="space-y-8">
             <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm p-8">
                <h3 className="font-black text-xs uppercase tracking-[0.2em] text-slate-400 mb-6">Customer</h3>
                <p className="font-black text-lg mb-1">Siska Amalia</p>
                <p className="text-sm font-bold text-blue-600 mb-6">0812-3456-7890</p>
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Alamat Kirim</h4>
                <p className="text-sm font-medium leading-relaxed">Jl. Antapani No. 12, RT 01 RW 02, Kec. Cicadas, Kota Bandung, Jawa Barat</p>
             </div>
             <div className="bg-slate-900 text-white rounded-[2.5rem] shadow-xl p-8">
                <h3 className="font-black text-xs uppercase tracking-[0.2em] text-slate-500 mb-6">Ringkasan</h3>
                <div className="space-y-3 text-xs font-bold">
                   <div className="flex justify-between text-slate-400"><span>Subtotal</span><span>Rp 120.000</span></div>
                   <div className="flex justify-between text-slate-400"><span>Ongkir</span><span>Rp 15.000</span></div>
                   <div className="flex justify-between text-green-400 font-black uppercase tracking-widest"><span>Promo</span><span>- Rp 12.000</span></div>
                   <div className="h-[1px] bg-slate-800 my-4"></div>
                   <div className="flex justify-between text-lg font-black uppercase"><span>Total</span><span>Rp 123.000</span></div>
                </div>
             </div>
          </div>
       </div>
    </div>
  );

  const ScreenAdminProducts = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm">
         <div className="flex gap-4 items-center">
            <h3 className="font-black text-xs uppercase tracking-[0.2em] text-slate-400 mr-4">Filter:</h3>
            <button className="bg-slate-900 text-white px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest">Semua</button>
            <button className="bg-slate-50 text-slate-400 px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-slate-100 hover:text-black">Kemeja</button>
            <button className="bg-slate-50 text-slate-400 px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-slate-100 hover:text-black">Blouse</button>
         </div>
         <button className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-200 active:scale-95 transition-all">+ Tambah Produk</button>
      </div>

      <div className="grid grid-cols-4 gap-8">
         {[1, 2, 3, 4, 5, 6].map((item) => (
           <div key={item} className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <div className="bg-slate-100 aspect-square relative">
                 <div className="absolute top-4 right-4 flex gap-2">
                    <button className="bg-white/90 p-2 rounded-xl shadow-sm text-slate-400 hover:text-black"><MoreVertical size={16}/></button>
                 </div>
                 {item === 3 && (
                    <div className="absolute inset-0 bg-red-600/10 backdrop-blur-[2px] flex items-center justify-center">
                       <span className="bg-red-600 text-white text-[10px] font-black px-4 py-2 rounded-xl uppercase tracking-widest shadow-lg">Habis</span>
                    </div>
                 )}
              </div>
              <div className="p-8">
                 <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Kemeja</p>
                 <h4 className="font-black text-lg uppercase tracking-tighter mb-4 leading-none">Kemeja Basic One Tone</h4>
                 <div className="flex justify-between items-end">
                    <div>
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Base SKU</p>
                       <p className="text-sm font-bold uppercase">OT-KMB-BASIC</p>
                    </div>
                    <div className="text-right">
                       <p className="text-lg font-black text-slate-900 leading-none">Rp 120k</p>
                    </div>
                 </div>
                 <div className="h-[1px] bg-slate-50 w-full my-6"></div>
                 <div className="grid grid-cols-2 gap-2">
                    <button className="bg-slate-100 text-slate-800 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all">Stok</button>
                    <button className="bg-slate-100 text-slate-800 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all">Edit</button>
                 </div>
              </div>
           </div>
         ))}
      </div>
    </div>
  );

  // --- LAYAR GUDANG (MOBILE) ---

  const ScreenWarehouseDashboard = () => (
    <div className="p-6 flex flex-col h-full space-y-8 animate-in fade-in duration-500">
      <div className="bg-gradient-to-br from-blue-700 to-indigo-900 text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
        <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        <p className="text-xs font-black uppercase tracking-[0.2em] opacity-60 mb-2">Petugas Shift</p>
        <h2 className="text-3xl font-black tracking-tighter">ANDI GUMILAR</h2>
        <div className="mt-6 flex items-center gap-3">
           <span className="bg-green-400/20 text-green-400 text-[10px] px-3 py-1.5 rounded-full font-black uppercase tracking-widest border border-green-400/30 flex items-center gap-1.5">
             <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div> Aktif
           </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 flex-1 content-start pb-10">
        <button onClick={() => navigate('wh-inbound')} className="bg-white border-2 border-gray-100 rounded-[2.5rem] p-8 flex flex-col items-center justify-center gap-4 shadow-sm hover:border-black active:scale-90 transition-all group">
          <div className="bg-green-50 p-5 rounded-[1.8rem] text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors duration-500"><ArrowDownToLine size={36} strokeWidth={2.5} /></div>
          <span className="font-black text-center text-xs uppercase tracking-widest leading-tight">Barang<br/>Masuk</span>
        </button>
        
        <button onClick={() => navigate('wh-outbound')} className="bg-white border-2 border-gray-100 rounded-[2.5rem] p-8 flex flex-col items-center justify-center gap-4 shadow-sm hover:border-black active:scale-90 transition-all group">
          <div className="bg-orange-50 p-5 rounded-[1.8rem] text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors duration-500"><ArrowUpFromLine size={36} strokeWidth={2.5} /></div>
          <span className="font-black text-center text-xs uppercase tracking-widest leading-tight">Barang<br/>Keluar</span>
        </button>
        
        <button onClick={() => navigate('wh-stock')} className="bg-white border-2 border-gray-100 rounded-[2.5rem] p-8 flex flex-col items-center justify-center gap-5 shadow-sm hover:border-black active:scale-90 transition-all group col-span-2">
          <div className="bg-blue-50 p-6 rounded-[2rem] text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500"><ScanLine size={48} strokeWidth={2} /></div>
          <span className="font-black text-center text-sm uppercase tracking-[0.2em]">Cek Stok Barang</span>
        </button>
      </div>

      <button onClick={() => handleRoleChange('customer')} className="py-6 text-red-500 font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 border-2 border-transparent hover:border-red-50 rounded-[2rem] transition-all">
        <LogOut size={20} /> Tutup Shift Kerja
      </button>
    </div>
  );

  const ScreenWarehouseInbound = () => (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Visual Scanner Area */}
      <div className="bg-slate-900 h-72 relative flex items-center justify-center overflow-hidden">
         <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] scale-150"></div>
         <div className="w-56 h-56 border-2 border-green-500/50 rounded-3xl relative animate-in zoom-in duration-700">
           <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-green-500 rounded-tl-xl -mt-1 -ml-1"></div>
           <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-green-500 rounded-tr-xl -mt-1 -mr-1"></div>
           <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-green-500 rounded-bl-xl -mb-1 -ml-1"></div>
           <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-green-500 rounded-br-xl -mb-1 -mr-1"></div>
           <div className="w-full h-1 bg-green-500 absolute top-1/2 -translate-y-1/2 shadow-[0_0_15px_rgba(34,197,94,0.8)] animate-[scan_2s_ease-in-out_infinite]"></div>
         </div>
         <div className="absolute bottom-6 bg-black/50 backdrop-blur-md px-6 py-2 rounded-full border border-white/10">
           <p className="text-white text-[10px] font-black uppercase tracking-widest">Scanning Barcode...</p>
         </div>
      </div>

      <div className="p-6 -mt-10 relative z-10 flex-1 overflow-y-auto space-y-6">
        <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-gray-100 flex flex-col items-center">
          <div className="bg-green-100 text-green-700 px-5 py-2.5 rounded-full font-black text-[10px] uppercase tracking-widest flex items-center gap-2 mb-6 animate-pulse border border-green-200">
            <Check size={14} /> Terdeteksi
          </div>
          <h3 className="font-black text-2xl tracking-tighter uppercase text-center leading-none">KEMEJA BASIC HITAM</h3>
          <p className="text-sm font-bold text-gray-400 mt-3 uppercase tracking-widest">SKU: OT-KMB-BLK-M</p>
          
          <div className="w-full h-[1px] bg-gray-50 my-8"></div>

          <div className="w-full space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Sumber Makloon</label>
              <select className="w-full border-2 border-gray-100 rounded-2xl p-5 text-sm font-black bg-gray-50 outline-none focus:border-black appearance-none">
                <option>MAHKOTA GARMENT (SMG)</option>
                <option>SUMBER JAYA TEXTILE</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Qty Barang Masuk</label>
              <div className="flex items-center gap-4">
                <button className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center font-black text-2xl active:bg-black active:text-white transition-colors">-</button>
                <input type="number" defaultValue="50" className="flex-1 text-center font-black text-4xl py-3 border-b-4 border-black bg-transparent outline-none" />
                <button className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center font-black text-2xl active:bg-black active:text-white transition-colors">+</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 bg-white border-t border-gray-100 sticky bottom-0">
        <button onClick={() => { alert('Data stok tersimpan!'); navigate('wh-dashboard'); }} className="w-full bg-black text-white font-black py-6 rounded-[2rem] text-sm uppercase tracking-[0.2em] shadow-2xl shadow-black/20 active:scale-95 transition-all">
          Simpan ke Inventory
        </button>
      </div>

      <style>{`
        @keyframes scan {
          0%, 100% { top: 0%; }
          50% { top: 100%; }
        }
      `}</style>
    </div>
  );

  const ScreenWarehouseOutbound = () => (
    <div className="p-6 flex flex-col h-full bg-gray-50 space-y-6">
      <div className="space-y-2">
        <h3 className="font-black text-xs uppercase tracking-[0.2em] text-gray-400 ml-1">Pindai No. Pesanan</h3>
        <div className="flex gap-3">
          <input type="text" placeholder="Scan Label Pengiriman..." className="flex-1 border-2 border-gray-100 rounded-[1.5rem] p-5 font-black text-sm uppercase bg-white shadow-sm outline-none focus:border-black transition-all" value="ORD-OT-99120" readOnly />
          <button className="bg-black text-white p-5 rounded-[1.5rem] shadow-lg active:scale-90 transition-all"><QrCode size={24} /></button>
        </div>
      </div>

      <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border-2 border-orange-500/20 space-y-8 flex-1 overflow-y-auto">
        <div className="flex justify-between items-start pb-6 border-b border-gray-50">
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">ID Pesanan</p>
            <p className="text-xl font-black uppercase">#ORD-OT-99120</p>
          </div>
          <div className="text-right">
             <span className="bg-orange-100 text-orange-700 text-[10px] px-3 py-1.5 rounded-full font-black uppercase tracking-widest">Siap Packing</span>
          </div>
        </div>

        <div className="space-y-6">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Daftar Barang:</p>
          
          {/* Packing Item Card */}
          <div className="flex items-center gap-4 p-5 rounded-3xl border-4 border-orange-500 bg-orange-50/30 group animate-pulse">
             <div className="w-10 h-10 rounded-xl border-4 border-orange-500 bg-white flex items-center justify-center shrink-0">
                <Check size={20} className="text-orange-500" strokeWidth={4} />
             </div>
             <div className="flex-1">
               <p className="font-black text-sm uppercase leading-none mb-1">Kemeja Basic Hitam</p>
               <p className="text-[10px] font-bold text-gray-500 uppercase">SKU: OT-KMB-HITAM-M</p>
             </div>
             <p className="font-black text-2xl tracking-tighter">x1</p>
          </div>
          
          <div className="p-6 border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center gap-4 opacity-50 grayscale">
             <div className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center font-black">?</div>
             <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Scan barang selanjutnya</p>
          </div>
        </div>
      </div>

      <button className="w-full bg-gray-200 text-gray-400 font-black py-6 rounded-[2rem] text-sm uppercase tracking-[0.2em] transition-all cursor-not-allowed" disabled>
        Selesaikan Packing
      </button>
    </div>
  );

  const ScreenWarehouseStock = () => (
    <div className="p-6 space-y-8 animate-in slide-in-from-bottom duration-500">
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <SearchIcon size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Cari SKU / Nama Produk..." className="w-full border-2 border-gray-100 rounded-[2rem] pl-14 pr-6 py-5 font-black text-sm uppercase bg-white shadow-sm outline-none focus:border-black transition-all" />
        </div>
        <button className="bg-black text-white p-5 rounded-[2rem] shadow-xl active:scale-90 transition-all"><Barcode size={24} /></button>
      </div>

      <div className="space-y-4 pb-10">
        <h3 className="font-black text-[10px] uppercase tracking-[0.2em] text-gray-400 ml-2">Hasil Pencarian (3)</h3>
        
        {[
          { name: 'Kemeja Basic One Tone', var: 'Hitam - M', sku: 'OT-KMB-HIT-M', stock: 12, loc: 'RAK A-01' },
          { name: 'Kemeja Basic One Tone', var: 'Hitam - L', sku: 'OT-KMB-HIT-L', stock: 5, loc: 'RAK A-01' },
          { name: 'Kemeja Basic One Tone', var: 'Putih - M', sku: 'OT-KMB-WHT-M', stock: 0, loc: 'RAK A-02' }
        ].map((item, i) => (
          <div key={i} className={`bg-white p-6 rounded-[2.5rem] shadow-sm border-2 transition-all flex justify-between items-center ${item.stock === 0 ? 'border-red-100 bg-red-50/20 opacity-80' : 'border-gray-50'}`}>
            <div className="flex-1 pr-4">
              <p className="font-black text-sm uppercase tracking-tight leading-none mb-1">{item.name}</p>
              <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-3">{item.var}</p>
              <div className="flex gap-4">
                 <div className="bg-gray-100 px-3 py-1 rounded-lg text-[9px] font-black text-gray-500 uppercase tracking-widest">{item.sku}</div>
                 <div className="bg-slate-800 text-white px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest">{item.loc}</div>
              </div>
            </div>
            <div className={`w-20 h-20 rounded-3xl flex flex-col items-center justify-center border-4 ${item.stock > 10 ? 'bg-green-50 border-green-100 text-green-700' : item.stock > 0 ? 'bg-orange-50 border-orange-100 text-orange-700' : 'bg-red-100 border-red-200 text-red-700'}`}>
              <p className="text-[8px] font-black uppercase mb-1">Stok</p>
              <p className="text-3xl font-black leading-none">{item.stock}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // --- LOGIKA RENDER UTAMA ---

  const renderScreen = () => {
    switch (currentScreen) {
      // Customer
      case 'landing': return <MobileWrapper title="Beranda One Tone"><ScreenLanding /></MobileWrapper>;
      case 'catalog': return <MobileWrapper title="Katalog Produk"><ScreenCatalog /></MobileWrapper>;
      case 'product-detail': return <MobileWrapper title="Produk Detail" showBack onBack={() => navigate('catalog')}><ScreenProductDetail /></MobileWrapper>;
      case 'cart': return <MobileWrapper title="Keranjang Saya" showBack onBack={() => navigate('catalog')}><ScreenCart /></MobileWrapper>;
      case 'checkout': return <MobileWrapper title="Pembayaran" showBack onBack={() => navigate('cart')}><ScreenCheckout /></MobileWrapper>;
      case 'success': return <MobileWrapper title="Berhasil"><ScreenSuccess /></MobileWrapper>;
      
      // Admin Web
      case 'admin-dashboard': return <WebWrapper><ScreenAdminDashboard /></WebWrapper>;
      case 'admin-orders': return <WebWrapper><ScreenAdminOrders /></WebWrapper>;
      case 'admin-order-detail': return <WebWrapper><ScreenAdminOrderDetail /></WebWrapper>;
      case 'admin-products': return <WebWrapper><ScreenAdminProducts /></WebWrapper>;
      
      // Warehouse Mobile
      case 'wh-dashboard': return <MobileWrapper title="Gudang Utama"><ScreenWarehouseDashboard /></MobileWrapper>;
      case 'wh-inbound': return <MobileWrapper title="Barang Masuk" showBack onBack={() => navigate('wh-dashboard')}><ScreenWarehouseInbound /></MobileWrapper>;
      case 'wh-outbound': return <MobileWrapper title="Packing Order" showBack onBack={() => navigate('wh-dashboard')}><ScreenWarehouseOutbound /></MobileWrapper>;
      case 'wh-stock': return <MobileWrapper title="Cek Inventory" showBack onBack={() => navigate('wh-dashboard')}><ScreenWarehouseStock /></MobileWrapper>;
      
      default: return <MobileWrapper title="One Tone"><ScreenLanding /></MobileWrapper>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Simulation Controller Bar */}
      <div className="bg-slate-900 border-b border-slate-800 p-2 flex flex-wrap justify-center gap-2 items-center sticky top-0 z-[100] shadow-2xl">
        <span className="text-slate-500 font-black text-[10px] uppercase tracking-widest mr-4">Preview Mode:</span>
        <div className="bg-slate-800 p-1.5 rounded-2xl flex gap-1">
          <button 
            onClick={() => handleRoleChange('customer')} 
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${role === 'customer' ? 'bg-white text-black shadow-lg shadow-white/10' : 'text-slate-400 hover:text-white hover:bg-slate-700'}`}
          >
            <Smartphone size={14} /> Customer
          </button>
          <button 
            onClick={() => handleRoleChange('admin')} 
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${role === 'admin' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-400 hover:text-white hover:bg-slate-700'}`}
          >
            <Monitor size={14} /> Admin Web
          </button>
          <button 
            onClick={() => handleRoleChange('warehouse')} 
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${role === 'warehouse' ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 'text-slate-400 hover:text-white hover:bg-slate-700'}`}
          >
            <Barcode size={14} /> Gudang
          </button>
        </div>
      </div>

      {/* App Component */}
      <div className="mx-auto">
        {renderScreen()}
      </div>

      {/* Global CSS for hiding scrollbars and aesthetics */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        @font-face {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 100 900;
          font-display: swap;
          src: url(https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGkyMZhrib2Bg-4.woff2) format('woff2');
        }

        body {
          font-family: 'Inter', sans-serif;
          background-color: #f1f5f9;
        }

        input:focus, textarea:focus, select:focus {
          outline: none;
        }
      `}</style>
    </div>
  );
}