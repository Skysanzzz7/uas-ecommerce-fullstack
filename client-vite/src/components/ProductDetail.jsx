import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        toast.error('Gagal memuat detail produk');
        navigate('/products');
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const addToCart = () => {
    if (!selectedSize) {
      toast.error('Pilih ukuran terlebih dahulu!');
      return;
    }

    // Cek stok
    if (quantity > product.stock_barang) {
      toast.error(`Stok hanya tersedia ${product.stock_barang} pcs!`);
      return;
    }

    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existing = cart.find(item => item.id === product.id && item.size === selectedSize);
    
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({ 
        ...product, 
        quantity, 
        size: selectedSize 
      });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    toast.success('✅ Produk ditambahkan ke keranjang!');
    navigate('/cart');
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-600 dark:text-gray-400">Memuat detail produk...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-600 dark:text-gray-400">Produk tidak ditemukan.</p>
        <button 
          onClick={() => navigate('/products')}
          className="mt-4 text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          ← Kembali ke Produk
        </button>
      </div>
    );
  }

  // Parse size guide dari deskripsi (jika ada)
  const sizeGuide = [
    { size: 'S', lebar: '49 cm', panjang: '68 cm' },
    { size: 'M', lebar: '51 cm', panjang: '70 cm' },
    { size: 'L', lebar: '53 cm', panjang: '72 cm' },
    { size: 'XL', lebar: '55 cm', panjang: '74 cm' }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <button 
        onClick={() => navigate('/products')}
        className="mb-6 flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
      >
        ← Kembali ke Produk
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Gambar Produk */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
          <img 
            src={product.gambar_url} 
            alt={product.nama_barang}
            className="w-full h-auto rounded-lg shadow-md"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/500x600?text=No+Image';
            }}
          />
        </div>

        {/* Detail Produk */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {product.nama_barang}
          </h1>
          
          <div className="mb-4">
            <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
              Rp{product.harga_barang.toLocaleString('id-ID')}
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Stok tersedia: <span className="font-semibold">{product.stock_barang} pcs</span>
            </p>
          </div>

          {/* Deskripsi Produk */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Deskripsi</h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Bahan Premium:</strong> Lembut di kulit dan adem dipakai sepanjang hari.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mt-2">
                <strong>Fit Nyaman:</strong> Desain oversize yang trendy dan tidak ketat, cocok untuk berbagai aktivitas.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mt-2">
                <strong>Perawatan:</strong> Cuci dengan air dingin, jangan gunakan pemutih, dan jemur di tempat teduh untuk menjaga kualitas bahan.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mt-2">
                <strong>Kombinasi Warna:</strong> Tersedia dalam berbagai pilihan warna menarik yang mudah dipadupadankan dengan outfit sehari-hari.
              </p>
            </div>
          </div>

          {/* Size Guide */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Panduan Ukuran</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-700 dark:text-gray-300">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th className="px-4 py-2">Size</th>
                    <th className="px-4 py-2">Lebar Dada</th>
                    <th className="px-4 py-2">Panjang Baju</th>
                  </tr>
                </thead>
                <tbody>
                  {sizeGuide.map((size, index) => (
                    <tr key={index} className="border-b dark:border-gray-700">
                      <td className="px-4 py-2 font-medium">{size.size}</td>
                      <td className="px-4 py-2">{size.lebar}</td>
                      <td className="px-4 py-2">{size.panjang}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              *Ukuran dalam cm, kemungkinan selisih 1-2 cm
            </p>
          </div>

          {/* Pilihan Ukuran & Quantity */}
          <div className="mb-6">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Pilih Ukuran
              </label>
              <div className="flex flex-wrap gap-2">
                {['S', 'M', 'L', 'XL'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-lg border ${
                      selectedSize === size
                        ? 'border-indigo-600 bg-indigo-600 text-white'
                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Jumlah
              </label>
              <input
                type="number"
                min="1"
                max={product.stock_barang}
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                className="w-24 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          {/* Tombol Aksi */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={addToCart}
              className="flex-1 bg-indigo-600 dark:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition"
            >
              ➕ Tambah ke Keranjang
            </button>
            <button
              onClick={() => {
                addToCart();
                navigate('/cart');
              }}
              className="flex-1 bg-black dark:bg-gray-700 text-white font-medium py-3 px-6 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition"
            >
              💳 Beli Sekarang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;