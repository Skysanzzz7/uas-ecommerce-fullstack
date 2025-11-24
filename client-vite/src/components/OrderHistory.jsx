import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, getUser } from '../utils/auth';
import { toast } from 'react-toastify';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }

    const fetchOrders = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    
    const res = await fetch('http://localhost:5000/api/orders', {
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (res.ok) {
      const data = await res.json();
      setOrders(data);
    } else {
      const errorData = await res.json();
      toast.error(errorData.message || 'Gagal memuat riwayat pesanan');
    }
  } catch (err) {
    console.error('Error:', err);
    toast.error('Error saat memuat riwayat');
  } finally {
    setLoading(false);
  }
};

    fetchOrders();
  }, [navigate]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid': return 'text-green-600 bg-green-100 dark:bg-green-900/30';
      case 'pending': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30';
      case 'cancelled': return 'text-red-600 bg-red-100 dark:bg-red-900/30';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-800';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Riwayat Pesanan</h1>
        <button
          onClick={() => navigate('/')}
          className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
        >
          ← Kembali ke Produk
        </button>
      </div>

      {loading ? (
        <p className="text-gray-600 dark:text-gray-400">Memuat riwayat pesanan...</p>
      ) : orders.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">Belum ada pesanan.</p>
          <a
            href="/"
            className="inline-block px-6 py-3 bg-indigo-600 dark:bg-indigo-700 text-white font-medium rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition"
          >
            Lihat Produk
          </a>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Pesanan #{order.id}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    {new Date(order.created_at).toLocaleDateString('id-ID', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium mt-2 md:mt-0 ${getStatusColor(order.status)}`}>
                  {order.status === 'paid' ? 'Dibayar' : 
                   order.status === 'pending' ? 'Menunggu' : 'Dibatalkan'}
                </span>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Detail Produk:</h4>
                <div className="space-y-3">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <img 
                        src={item.gambar_url} 
                        alt={item.nama_barang}
                        className="w-12 h-12 object-cover rounded-lg mr-3"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/48x48?text=No+Image';
                        }}
                      />
                      <div className="flex-1">
                        <p className="text-gray-900 dark:text-white">{item.nama_barang}</p>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          {item.quantity} × Rp{item.price_per_item.toLocaleString('id-ID')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4 flex justify-between items-center">
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  Total: Rp{order.total_harga.toLocaleString('id-ID')}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;