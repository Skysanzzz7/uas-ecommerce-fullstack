import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, getUser } from '../utils/auth';
import { toast } from 'react-toastify';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
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
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }
    const saved = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(saved);
  }, [navigate]);

  const updateQuantity = (id, newQty) => {
    if (newQty < 1) return;
    const updated = cart.map(item => 
      item.id === id ? { ...item, quantity: newQty } : item
    );
    setCart(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const removeFromCart = (id) => {
    const updated = cart.filter(item => item.id !== id);
    setCart(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
    toast.info('produk dihapus dari keranjang');
  };

  const getTotal = () => cart.reduce((sum, item) => sum + (item.harga_barang * item.quantity), 0);

  const handleCheckout = async () => {
    if (cart.length === 0) {
      toast.error('Keranjang kosong!');
      return;
    }

    const token = localStorage.getItem('token');
    const items = cart.map(item => ({ product_id: item.id, quantity: item.quantity }));

    try {
      setLoading(true);
      const res = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ items })
      });

      const data = await res.json();
      if (res.ok) {
        toast.success('Pesanan berhasil! Terima kasih.');
        localStorage.removeItem('cart');
        navigate('/');
      } else {
        toast.error(data.message || 'Gagal checkout');
      }
    } catch (err) {
      toast.error('Error saat checkout');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Keranjang Belanja</h1>
        <button
          onClick={() => navigate('/')}
          className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
        >
          ← Kembali ke Produk
        </button>
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">Keranjangmu kosong.</p>
          <a
            href="/"
            className="inline-block px-6 py-3 bg-indigo-600 dark:bg-indigo-700 text-white font-medium rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition"
          >
            Lihat Produk
          </a>
        </div>
      ) : (
        <>
          <div className="space-y-4 mb-8">
            {cart.map(item => (
  <div key={item.id} className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm">
    <div className="flex flex-col md:flex-row md:items-center">
      {/* GAMBAR + INFO PRODUK */}
      <div className="flex items-center mb-3 md:mb-0 md:mr-4">
        <img 
          src={item.gambar_url} 
          alt={item.nama_barang}
          className="w-16 h-16 object-cover rounded-lg mr-3"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/64x64?text=No+Image';
          }}
        />
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white">{item.nama_barang}</h3>
          <p className="text-indigo-600 dark:text-indigo-400 font-medium">
            Rp{item.harga_barang.toLocaleString('id-ID')}
          </p>
        </div>
      </div>
      
      {/* KONTROL QUANTITY + HAPUS */}
      <div className="flex items-center mt-3 md:mt-0 ml-0 md:ml-auto">
        <input
          type="number"
          min="1"
          value={item.quantity}
          onChange={e => updateQuantity(item.id, parseInt(e.target.value) || 1)}
          className="w-20 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-center"
        />
        <button
          onClick={() => removeFromCart(item.id)}
          className="ml-3 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 font-medium"
        >
          Hapus
        </button>
      </div>
      
      {/* TOTAL PER ITEM */}
      <div className="mt-3 md:mt-0 font-bold text-gray-900 dark:text-white ml-0 md:ml-4">
        Rp{(item.harga_barang * item.quantity).toLocaleString('id-ID')}
      </div>
    </div>
  </div>
))}
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Total: Rp{getTotal().toLocaleString('id-ID')}
              </h2>
              <button
                onClick={handleCheckout}
                disabled={loading}
                className="px-6 py-3 bg-indigo-600 dark:bg-indigo-700 text-white font-medium rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition disabled:opacity-75"
              >
                {loading ? 'Memproses...' : '🛒 Checkout'}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;