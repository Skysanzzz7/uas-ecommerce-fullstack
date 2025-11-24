# 🛍️ E-Commerce Fullstack UAS

Proyek e-commerce fullstack dengan fitur lengkap untuk UAS. Sistem ini memiliki **dua role**: **user biasa** dan **admin**, dengan antarmuka modern dan responsif.

## Fitur Utama

###  **Autentikasi & Keamanan**
- Login/Register dengan **JWT (JSON Web Token)**
- Password di-**hash** dengan **bcrypt**
- Proteksi **role-based** (user vs admin)
- **Dark mode** yang disimpan di localStorage

###  **User Features**
- **Landing page** profesional
- **Daftar produk** dengan gambar
- **Pencarian produk** real-time
- **Keranjang belanja** (disimpan di localStorage)
- **Checkout** dengan validasi stok
- **Riwayat pesanan** lengkap
- **Detail produk** dengan:
  - Deskripsi lengkap (bahan, perawatan)
  - **Size guide** untuk produk baju
  - Gambar high-quality

###  **Admin Features**
- **Dashboard admin** terpisah
- **CRUD Produk** lengkap (tambah, edit, hapus)
- **Statistik toko** (total produk, pesanan, pendapatan)
- Input **URL gambar** untuk produk
- Validasi stok real-time

###  **User Experience**
- **Splash screen** animasi saat pertama buka
- **Loading skeleton** saat data dimuat
- **Toast notification** untuk feedback
- **Hover effects** interaktif
- **Responsive design** (mobile & desktop)
- **Logo toko** 

## Teknologi yang Digunakan

| Layer | Teknologi |
|-------|-----------|
| **Backend** | Node.js, Express.js, MySQL, bcrypt, jsonwebtoken |
| **Frontend** | React, Vite, Tailwind CSS, framer-motion |
| **Database** | MySQL (relational) |
| **Tools** | Postman (testing API), phpMyAdmin (database) |

### Cara Menjalankan Aplikasi:

  Prasyarat
  -Node.js v18+
  -MySQL Server
  -ImgBB (opsional, untuk upload gambar)
  
## 1. Clone Repository
   -git clone https://github.com/Skysanzzz7/uas-ecommerce-fullstack.git
   -cd uas-ecommerce-fullstack
## 2. Setup Database
   -Buat database ecommerce_db di MySQL
   -Jalankan Sql Berikut:
   
   CREATE DATABASE ecommerce_db;
USE ecommerce_db;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama_barang VARCHAR(100) NOT NULL,
    harga_barang INT UNSIGNED NOT NULL,
    deskripsi TEXT,
    stock_barang INT DEFAULT 0,
    gambar_url VARCHAR(500) DEFAULT 'https://via.placeholder.com/400x300?text=No+Image',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    total_harga INT NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price_per_item INT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

## 3. Setup Frontend:
  -cd client-vite
  -npm install
  -npm run dev

## 4. Setup Backend:
  -cd server
  -npm install
  -#Edit .env sesuai konfigurasi MySQL kamu
  -npm run dev
