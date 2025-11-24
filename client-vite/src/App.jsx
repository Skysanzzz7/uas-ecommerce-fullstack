import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import komponen baru
import SplashScreen from './components/SplashScreen';
import LandingPage from './components/LandingPage';
import Navbar from './components/Navbar';

// Komponen lain
import Register from './components/Register';
import Login from './components/Login';
import ProductList from './components/ProductList';
import AdminDashboard from './components/AdminDashboard';
import Cart from './components/Cart';
import OrderHistory from './components/OrderHistory';
import ProductDetail from './components/ProductDetail';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  // Load dark mode dari localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Sembunyikan splash screen setelah 2.5 detik
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500); // 2.5 detik

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/*" element={
            <>
              <Navbar />
              <main className="pt-16">
                <Routes>
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/products" element={<ProductList />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/orders" element={<OrderHistory />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="*" element={<Navigate to="/products" replace />} />
                </Routes>
              </main>
            </>
          } />
        </Routes>
        
        <ToastContainer 
          position="top-right"
          autoClose={2000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </Router>
  );
}

export default App;