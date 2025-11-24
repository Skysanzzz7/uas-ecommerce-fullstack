import React from 'react';
import { motion } from 'framer-motion';

const SplashScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-white dark:bg-gray-900 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 260, 
          damping: 20,
          delay: 0.2
        }}
        className="text-center"
      >
        {/* Logo Animasi */}
        <motion.div
          animate={{ 
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <img 
            src="/public/logoBDGCLUB.jpeg" 
            alt="Logo Toko"
            className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-indigo-200 dark:border-indigo-800 shadow-xl"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/128x128/4F46E5/FFFFFF?text=EC';
            }}
          />
        </motion.div>
        
        {/* Nama Toko */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-3xl font-bold text-gray-900 dark:text-white mb-2"
        >
          BDGCLUB.id STORE
        </motion.h1>
        
        {/* Subtitle */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-gray-600 dark:text-gray-400"
        >
          Loading your experience...
        </motion.p>
        
        {/* Loading Dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="flex justify-center mt-6 space-x-2"
        >
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              animate={{ 
                scale: [1, 1.2, 1],
                backgroundColor: ['#4F46E5', '#6366F1', '#4F46E5']
              }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                delay: index * 0.2
              }}
              className="w-3 h-3 rounded-full bg-indigo-600"
            />
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default SplashScreen;