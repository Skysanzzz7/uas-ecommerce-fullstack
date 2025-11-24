import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getUser } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ nama_barang: '', harga_barang: '', deskripsi: '', stock_barang: 0 });
  const [editingId, setEditingId] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const token = localStorage.getItem('token');
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

  const loadProducts = () => {
    axios.get('http://localhost:5000/api/products')
      .then(res => setProducts(res.data));
  };

  useEffect(() => {
    const user = getUser();
    if (user?.role !== 'admin') {
      navigate('/');
    }
    loadProducts();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/products/${editingId}`, form, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Produk berhasil diupdate!');
      } else {
        await axios.post('http://localhost:5000/api/products', form, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Produk berhasil ditambahkan!');
      }
      loadProducts();
      setForm({ nama_barang: '', harga_barang: '', deskripsi: '', stock_barang: 0 });
      setEditingId(null);
    } catch (err) {
      toast.error('Gagal menyimpan produk');
    }
  };

  const handleEdit = (product) => {
    setForm({
      nama_barang: product.nama_barang,
      harga_barang: product.harga_barang,
      deskripsi: product.deskripsi,
      stock_barang: product.stock_barang
    });
    setEditingId(product.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Hapus produk ini?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Produk berhasil dihapus!');
      loadProducts();
    } catch (err) {
      toast.error('Gagal menghapus produk');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Admin</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
          <button
            onClick={() => navigate('/')}
            className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
          >
            ← Kembali ke Produk
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          {editingId ? 'Edit Produk' : 'Tambah Produk Baru'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
  <input
    value={form.nama_barang}
    onChange={e => setForm({ ...form, nama_barang: e.target.value })}
    placeholder="Nama Barang"
    required
    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
  />
  <input
    type="number"
    value={form.harga_barang}
    onChange={e => setForm({ ...form, harga_barang: parseInt(e.target.value) || 0 })}
    placeholder="Harga (angka saja)"
    required
    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
  />
  <textarea
    value={form.deskripsi}
    onChange={e => setForm({ ...form, deskripsi: e.target.value })}
    placeholder="Deskripsi"
    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
  />
  <input
    type="number"
    value={form.stock_barang}
    onChange={e => setForm({ ...form, stock_barang: parseInt(e.target.value) || 0 })}
    placeholder="Stok"
    required
    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
  />
  
  {/* INPUT GAMBAR BARU */}
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
      URL Gambar (opsional)
    </label>
    <input
      type="text" value={form.gambar_url || ''} onChange={e => setForm({ ...form, gambar_url: e.target.value })} placeholder="/images/product1.jpg" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"/>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Contoh: /public/(product).jpg
        </p>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
        Kosongkan untuk menggunakan gambar default
      </p>
  </div>
  
  <div className="flex space-x-3">
    <button
      type="submit"
      className="px-4 py-2 bg-indigo-600 dark:bg-indigo-700 text-white font-medium rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition"
    >
      {editingId ? 'Update' : 'Tambah'}
    </button>
    {editingId && (
      <button
        type="button"
        onClick={() => {
          setEditingId(null);
          setForm({ nama_barang: '', harga_barang: '', deskripsi: '', stock_barang: 0, gambar_url: '' });
        }}
        className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
      >
        Batal
      </button>
    )}
  </div>
</form>
      </div>

      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Daftar Produk</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(p => (
          <div key={p.id} className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm">
            <h3 className="font-semibold text-gray-900 dark:text-white">{p.nama_barang}</h3>
            <p className="text-indigo-600 dark:text-indigo-400 font-medium mt-1">
              Rp{p.harga_barang.toLocaleString('id-ID')}
            </p>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Stok: {p.stock_barang}</p>
            {p.deskripsi && <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">{p.deskripsi}</p>}
            <div className="mt-4 flex space-x-2">
              <button
                onClick={() => handleEdit(p)}
                className="px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium rounded hover:bg-blue-200 dark:hover:bg-blue-900/50 transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(p.id)}
                className="px-3 py-1.5 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-sm font-medium rounded hover:bg-red-200 dark:hover:bg-red-900/50 transition"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;