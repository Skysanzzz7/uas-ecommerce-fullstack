const express = require('express');
const Product = require('../models/Product');
const { protect, adminOnly } = require('../middleware/auth');
const router = express.Router();

// GET /api/products
router.get('/', (req, res) => {
  Product.getAll((err, results) => {
    if (err) {
      console.error('Error GET products:', err.message);
      return res.status(500).json({ message: 'Gagal mengambil data produk' });
    }
    res.json(results);
  });
});

// POST /api/products
router.post('/', protect, adminOnly, (req, res) => {
  Product.create(req.body, (err, result) => {
    if (err) {
      console.error('Error CREATE product:', err.message);
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ message: 'Produk dengan nama ini sudah ada' });
      }
      return res.status(500).json({ message: 'Gagal menambah produk' });
    }
    res.status(201).json(result);
  });
});

// GET /api/products/:id
router.get('/:id', (req, res) => {
  Product.getById(req.params.id, (err, results) => {
    if (err) {
      console.error('Error GET product by ID:', err.message);
      return res.status(500).json({ message: 'Gagal mengambil data produk' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Produk tidak ditemukan' });
    }
    res.json(results[0]);
  });
});

// PUT /api/products/:id
router.put('/:id', protect, adminOnly, (req, res) => {
  Product.update(req.params.id, req.body, (err, result) => {
    if (err) {
      console.error('Error UPDATE product:', err.message);
      return res.status(500).json({ message: 'Gagal mengupdate produk' });
    }
    res.json({ message: 'Produk berhasil diupdate', data: result });
  });
});

// DELETE /api/products/:id
router.delete('/:id', protect, adminOnly, (req, res) => {
  Product.delete(req.params.id, (err, result) => {
    if (err) {
      console.error('Error DELETE product:', err.message);
      // Cek foreign key constraint
      if (err.code === 'ER_ROW_IS_REFERENCED_2') {
        return res.status(400).json({ 
          message: 'Tidak bisa menghapus produk yang sudah pernah dipesan' 
        });
      }
      return res.status(500).json({ message: 'Gagal menghapus produk' });
    }
    res.json({ message: 'Produk berhasil dihapus' });
  });
});

module.exports = router;