import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { isAuthenticated, getUser, logout } from '../utils/auth';
import { toast } from 'react-toastify';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartMessage, setCartMessage] = useState({});
  const [darkMode, setDarkMode] = useState(false);
  const [search, setSearch] = useState('');
  const [isAdding, setIsAdding] = useState({});
  const user = getUser();
  const navigate = useNavigate();

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    const loadProducts = () => {
      axios.get('http://localhost:5000/api/products')
        .then(res => {
          setProducts(res.data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Gagal memuat produk:', err);
          setLoading(false);
        });
    };

    loadProducts();
  }, []);

  const addToCart = async (product) => {
    setIsAdding(prev => ({ ...prev, [product.id]: true }));
    
    try {
      const res = await axios.get(`http://localhost:5000/api/products/${product.id}`);
      const updatedProduct = res.data;
      
      if (updatedProduct.stock_barang <= 0) {
        toast.error('Stok produk habis!');
        return;
      }

      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const existing = cart.find(item => item.id === product.id);
      
      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }
      
      localStorage.setItem('cart', JSON.stringify(cart));
      toast.success('✅ Produk ditambahkan ke keranjang!');
    } catch (err) {
      toast.error('Gagal menambahkan ke keranjang');
    } finally {
      setTimeout(() => setIsAdding(prev => ({ ...prev, [product.id]: false })), 300);
    }
  };

  const filteredProducts = products.filter(p =>
    p.nama_barang.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Produk</h1>
          <div className="mt-4 max-w-md">
            <input
              type="text"
              placeholder="Cari produk..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <a
            href="/cart"
            className="inline-block mt-4 md:mt-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium"
          >
            Lihat Keranjang
          </a>
        </div>
        
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          {user && (
            <div className="text-right">
              <p className="text-gray-700 dark:text-gray-300">Halo, <span className="font-semibold">{user.username}</span></p>
              <button
                onClick={logout}
                className="mt-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {user?.role === 'admin' && (
        <div className="mb-8">
          <a
            href="/admin"
            className="inline-block px-4 py-2 bg-indigo-600 dark:bg-indigo-700 text-white font-medium rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition"
          >
            Dashboard Admin
          </a>
        </div>
      )}

      {/* Loading Skeleton */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-4">
              <Skeleton height={192} className="rounded-xl mb-4" />
              <Skeleton height={20} width="80%" className="mb-2" />
              <Skeleton height={24} width="60%" className="mb-3" />
              <Skeleton height={36} />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400 col-span-full">Tidak ada produk yang dapat ditemukan. </p>
          ) : (
            filteredProducts.map(product => (
              <motion.div
                key={product.id}
                whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                transition={{ duration: 0.2 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden cursor-pointer"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <div className="h-48 bg-gray-100 dark:bg-gray-700 overflow-hidden">
                  <img 
                    src={product.gambar_url} 
                    alt={product.nama_barang}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                    }}
                  />
                </div>
                
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{product.nama_barang}</h3>
                  <p className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mt-2">
                    Rp{product.harga_barang.toLocaleString('id-ID')}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">Stok: {product.stock_barang}</p>
                  {product.deskripsi && (
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 line-clamp-2">{product.deskripsi}</p>
                  )}
                  <button
                    onClick={() => addToCart(product)}
                    disabled={isAdding[product.id]}
                    className={`mt-4 w-full py-2.5 font-medium rounded-lg transition ${
                      isAdding[product.id] 
                        ? 'bg-green-600 dark:bg-green-700' 
                        : 'bg-indigo-600 dark:bg-indigo-700 hover:bg-indigo-700 dark:hover:bg-indigo-600'
                    } text-white`}
                  >
                    {isAdding[product.id] ? '✅ Ditambahkan!' : '➕ Tambah ke Keranjang'}
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ProductList;