const db = require('../config/db');

const Product = {
  getAll: (callback) => {
    db.query('SELECT * FROM products', callback);
  },
  getById: (id, callback) => {
    db.query('SELECT * FROM products WHERE id = ?', [id], callback);
  },
  create: (data, callback) => {
    const { nama_barang, harga_barang, deskripsi, stock_barang, gambar_url } = data;
    const imageUrl = gambar_url || 'https://via.placeholder.com/400x300?text=No+Image';
    const query = 'INSERT INTO products (nama_barang, harga_barang, deskripsi, stock_barang, gambar_url) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [nama_barang, harga_barang, deskripsi, stock_barang, imageUrl], (err, result) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, { id: result.insertId, ...data });
    });
  },
  update: (id, data, callback) => {
    const { nama_barang, harga_barang, deskripsi, stock_barang, gambar_url } = data;
    const imageUrl = gambar_url || 'https://via.placeholder.com/400x300?text=No+Image';
    const query = 'UPDATE products SET nama_barang = ?, harga_barang = ?, deskripsi = ?, stock_barang = ?, gambar_url = ? WHERE id = ?';
    db.query(query, [nama_barang, harga_barang, deskripsi, stock_barang, imageUrl, id], (err, result) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, { id, ...data });
    });
  },
  delete: (id, callback) => {
    const query = 'DELETE FROM products WHERE id = ?';
    db.query(query, [id], (err, result) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, result);
    });
  }
};

module.exports = Product;