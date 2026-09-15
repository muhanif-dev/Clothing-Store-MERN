import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import API from '../../services/api';

export const PlaceOrder: React.FC = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const subtotal = getCartTotal();
  const shippingFee = subtotal > 0 ? 10 : 0;
  const total = subtotal + shippingFee;

  // Form state for delivery details
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  });

  // Payment method state (EasyPaisa, JazzCash, COD)
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      setError('Your cart is empty.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const orderPayload = {
        items: cartItems,
        amount: total,
        address: formData,
        paymentMethod,
      };

      // FIXED: Corrected endpoint from '/orders' to '/orders/place'
      await API.post('/orders/place', orderPayload);
      clearCart();
      navigate('/orders');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error('Failed to place order', err);
      setError(err.response?.data?.message || 'Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-12">
      {/* Delivery Information Inputs */}
      <div className="md:col-span-2 space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">DELIVERY INFORMATION</h2>

        {error && <div className="bg-red-50 text-red-600 p-3 rounded text-sm">{error}</div>}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            required
            placeholder="First name"
            name="firstName"
            value={formData.firstName}
            onChange={onChangeHandler}
            className="border border-gray-300 p-3 rounded text-sm focus:outline-none focus:ring-1 focus:ring-black"
          />
          <input
            type="text"
            required
            placeholder="Last name"
            name="lastName"
            value={formData.lastName}
            onChange={onChangeHandler}
            className="border border-gray-300 p-3 rounded text-sm focus:outline-none focus:ring-1 focus:ring-black"
          />
        </div>

        <input
          type="email"
          required
          placeholder="Email address"
          name="email"
          value={formData.email}
          onChange={onChangeHandler}
          className="w-full border border-gray-300 p-3 rounded text-sm focus:outline-none focus:ring-1 focus:ring-black"
        />

        <input
          type="text"
          required
          placeholder="Street address"
          name="street"
          value={formData.street}
          onChange={onChangeHandler}
          className="w-full border border-gray-300 p-3 rounded text-sm focus:outline-none focus:ring-1 focus:ring-black"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            required
            placeholder="City"
            name="city"
            value={formData.city}
            onChange={onChangeHandler}
            className="border border-gray-300 p-3 rounded text-sm focus:outline-none focus:ring-1 focus:ring-black"
          />
          <input
            type="text"
            required
            placeholder="State / Province"
            name="state"
            value={formData.state}
            onChange={onChangeHandler}
            className="border border-gray-300 p-3 rounded text-sm focus:outline-none focus:ring-1 focus:ring-black"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            required
            placeholder="Zipcode"
            name="zipcode"
            value={formData.zipcode}
            onChange={onChangeHandler}
            className="border border-gray-300 p-3 rounded text-sm focus:outline-none focus:ring-1 focus:ring-black"
          />
          <input
            type="text"
            required
            placeholder="Country"
            name="country"
            value={formData.country}
            onChange={onChangeHandler}
            className="border border-gray-300 p-3 rounded text-sm focus:outline-none focus:ring-1 focus:ring-black"
          />
        </div>

        <input
          type="text"
          required
          placeholder="Phone number"
          name="phone"
          value={formData.phone}
          onChange={onChangeHandler}
          className="w-full border border-gray-300 p-3 rounded text-sm focus:outline-none focus:ring-1 focus:ring-black"
        />
      </div>

      {/* Cart Summary & Payment Method Selection */}
      <div className="space-y-6">
        <div className="bg-gray-50 p-6 rounded-lg border space-y-6">
          <h2 className="text-xl font-bold text-gray-900 border-b pb-4">CART TOTALS</h2>

          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-medium text-gray-900">${subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping Fee</span>
              <span className="font-medium text-gray-900">${shippingFee}</span>
            </div>
            <div className="border-t pt-3 flex justify-between text-base font-bold text-gray-900">
              <span>Total</span>
              <span>${total}</span>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="space-y-3 pt-4 border-t">
            <p className="font-semibold text-sm text-gray-800">PAYMENT METHOD</p>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('easypaisa')}
                className={`border p-2 rounded text-xs font-medium transition ${
                  paymentMethod === 'easypaisa' ? 'border-black bg-black text-white' : 'border-gray-300 text-gray-700'
                }`}
              >
                EasyPaisa
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('jazzcash')}
                className={`border p-2 rounded text-xs font-medium transition ${
                  paymentMethod === 'jazzcash' ? 'border-black bg-black text-white' : 'border-gray-300 text-gray-700'
                }`}
              >
                JazzCash
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('cod')}
                className={`border p-2 rounded text-xs font-medium transition ${
                  paymentMethod === 'cod' ? 'border-black bg-black text-white' : 'border-gray-300 text-gray-700'
                }`}
              >
                C.O.D
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded font-medium hover:bg-gray-800 transition disabled:opacity-50"
          >
            {loading ? 'PLACING ORDER...' : 'PLACE ORDER'}
          </button>
        </div>
      </div>
    </form>
  );
};