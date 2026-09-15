import { Routes, Route } from 'react-router-dom';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { Collection } from './pages/customer/Collection';
import { ProductDetails } from './pages/customer/ProductDetails';
import { Cart } from './pages/customer/Cart';
import { PlaceOrder } from './pages/customer/PlaceOrder';
import CustomHomePage from './pages/CustomHomePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<CustomHomePage />} />
      <Route path="/collection" element={<Collection />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/place-order" element={<PlaceOrder />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  );
}

export default App;