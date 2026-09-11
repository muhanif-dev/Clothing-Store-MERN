import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 mt-20">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-gray-800">
        <div className="space-y-4">
          <h3 className="text-2xl font-bold tracking-wider">CLOTHING STORE</h3>
          <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
            Elevating everyday style with premium quality fabrics, contemporary designs, and unmatched comfort.
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-semibold tracking-wide">COMPANY</h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><a href="#" className="hover:text-white transition">Home</a></li>
            <li><a href="#" className="hover:text-white transition">About us</a></li>
            <li><a href="#" className="hover:text-white transition">Delivery</a></li>
            <li><a href="#" className="hover:text-white transition">Privacy policy</a></li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-semibold tracking-wide">GET IN TOUCH</h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>+92 300 1234567</li>
            <li>support@clothingstore.com</li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-8 text-center text-gray-500 text-xs">
        <p>© 2026 ClothingStore. All Rights Reserved.</p>
      </div>
    </footer>
  );
};