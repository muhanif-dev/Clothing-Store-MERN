import React from 'react';
import { AddProduct } from './AddProduct';
import { ProductList } from './ProductList';
import { ShopCatalog } from '../customer/ShopCatalog';

export const AdminDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="max-w-4xl mx-auto mb-8 bg-white p-4 rounded shadow flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Admin Panel — Clothing Store</h1>
        <span className="text-sm bg-black text-white px-3 py-1 rounded">Administrator</span>
      </header>
      <main className="space-y-8">
        <AddProduct />
        <ProductList />
        <ShopCatalog />
      </main>
    </div>
  );
};