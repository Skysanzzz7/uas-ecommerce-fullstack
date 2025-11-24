// server/routes/orders.js
const express = require('express');
const db = require('../config/db');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/', protect, async (req, res) => {
  const userId = req.user.id;
  const { items } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ message: 'Keranjang kosong' });
  }

  try {
    // Mulai transaksi
    await db.promise().beginTransaction();

    let total = 0;
    const orderItems = [];

    // Validasi stok & hitung total
    for (const item of items) {
      const [productRows] = await db.promise().query('SELECT harga_barang, stock_barang FROM products WHERE id = ?', [item.product_id]);
      if (productRows.length === 0) {
        await db.promise().rollback();
        return res.status(400).json({ message: `Produk tidak ditemukan: ${item.product_id}` });
      }

      const product = productRows[0];
      if (product.stock_barang < item.quantity) {
        await db.promise().rollback();
        return res.status(400).json({ message: `Stok tidak cukup untuk produk ID ${item.product_id}` });
      }

      total += product.harga_barang * item.quantity;
      orderItems.push({
        product_id: item.product_id,
        quantity: item.quantity,
        price_per_item: product.harga_barang
      });

      // Kurangi stok
      await db.promise().query('UPDATE products SET stock_barang = stock_barang - ? WHERE id = ?', [item.quantity, item.product_id]);
    }

    // Simpan order
    const [orderResult] = await db.promise().query(
      'INSERT INTO orders (user_id, total_harga, status) VALUES (?, ?, ?)',
      [userId, total, 'paid']
    );

    const orderId = orderResult.insertId;

    // Simpan order_items
    for (const item of orderItems) {
      await db.promise().query(
        'INSERT INTO order_items (order_id, product_id, quantity, price_per_item) VALUES (?, ?, ?, ?)',
        [orderId, item.product_id, item.quantity, item.price_per_item]
      );
    }

    await db.promise().commit();
    res.status(201).json({ message: 'Pesanan berhasil dibuat', orderId });

  } catch (err) {
    await db.promise().rollback();
    console.error(err);
    res.status(500).json({ message: 'Gagal membuat pesanan' });
  }
});

router.get('/', protect, async (req, res) => {
  const userId = req.user.id;
  
  try {
    const query = `
      SELECT 
        o.id, 
        o.total_harga, 
        o.status, 
        o.created_at,
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'product_id', oi.product_id,
            'quantity', oi.quantity,
            'price_per_item', oi.price_per_item,
            'nama_barang', p.nama_barang,
            'gambar_url', p.gambar_url
          )
        ) as items
      FROM orders o
      JOIN order_items oi ON o.id = oi.order_id
      JOIN products p ON oi.product_id = p.id
      WHERE o.user_id = ?
      GROUP BY o.id
      ORDER BY o.created_at DESC
    `;
    
    const [results] = await db.promise().query(query, [userId]);
    
    // Parse JSON items
    const orders = results.map(order => ({
      ...order,
      items: JSON.parse(order.items)
    }));
    
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal mengambil riwayat pesanan' });
  }
});

module.exports = router;