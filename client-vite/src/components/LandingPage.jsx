import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-gray-900 dark:to-indigo-900">
      {/* Navbar */}
      <nav className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <img 
            src="/public/logoBDGCLUB.jpeg" 
            alt="Logo Toko"
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">BDGCLUB.id Store</span>
        </Link>
        <div className="space-x-4">
          <Link 
            to="/login" 
            className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium"
          >
            Login
          </Link>
          <Link 
            to="/register" 
            className="bg-indigo-600 dark:bg-indigo-700 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition font-medium"
          >
            Daftar
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <img 
              src="/public/logoBDGCLUB.jpeg" 
              alt="Logo Toko"
              className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-white dark:border-gray-800 shadow-lg"
            />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Selamat Datang di <span className="text-indigo-600 dark:text-indigo-400">BDGCLUB.id Store</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Toko online terpercaya dengan produk berkualitas, harga terjangkau, 
            dan pelayanan terbaik untuk memenuhi style hidup Anda.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <Link 
              to="/register" 
              className="bg-indigo-600 dark:bg-indigo-700 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
            >
              🚀 Mulai Belanja Sekarang
            </Link>
            <Link 
              to="/login" 
              className="bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 px-8 py-4 rounded-xl font-semibold text-lg border-2 border-indigo-600 dark:border-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition transform hover:-translate-y-1"
            >
              👤 Sudah Punya Akun?
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 pb-24">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-16">
            Kenapa Memilih <span className="text-indigo-600 dark:text-indigo-400">BDGCLUB.id Store</span>?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
              <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Pengiriman Cepat</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Produk dikirim dalam waktu 24 jam setelah pemesanan.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
              <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Aman & Terpercaya</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Sistem keamanan terjamin dan transaksi 100% aman.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
              <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl">💯</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Kualitas Terjamin</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Produk berkualitas dengan garansi kepuasan pelanggan.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-4">
            <img 
              src="/public/logoBDGCLUB.jpeg" 
              alt="Logo Toko"
              className="w-12 h-12 rounded-full"
            />
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} BDGCLUB.id Store. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;