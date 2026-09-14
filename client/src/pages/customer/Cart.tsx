import React from 'react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

export const Cart: React.FC = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart();
  const navigate = useNavigate();

  const subtotal = getCartTotal();
  const shippingFee = subtotal > 0 ? 10 : 0;
  const total = subtotal + shippingFee;

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">YOUR CART IS EMPTY</h2>
        <p className="text-gray-500 mb-8">Looks like you haven't added any clothing items to your cart yet.</p>
        <button
          onClick={() => navigate('/collection')}
          className="bg-black text-white px-8 py-3 rounded font-medium hover:bg-gray-800 transition"
        >
          SHOP NOW
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">YOUR SHOPPING CART</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map((item) => (
            <div
              key={`${item.productId}-${item.size}`}
              className="flex flex-col sm:flex-row items-center justify-between border-b pb-6 gap-4"
            >
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <img
                  src={item.image || 'https://via.placeholder.com/100'}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded border"
                />
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">{item.name}</h3>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                    <p className="font-bold text-black">${item.price}</p>
                    <span className="border px-2 py-0.5 rounded bg-gray-50 uppercase text-xs">
                      Size: {item.size}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quantity Controls & Remove */}
              <div className="flex items-center justify-between w-full sm:w-auto gap-6">
                <div className="flex items-center border rounded">
                  <button
                    onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1)}
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 font-medium text-gray-800">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)}
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition"
                  >
                    +
                  </button>
                </div>

                <p className="font-bold text-gray-900 w-20 text-right">
                  ${item.price * item.quantity}
                </p>

                <button
                  onClick={() => removeFromCart(item.productId, item.size)}
                  className="text-red-500 hover:text-red-700 text-sm font-medium transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Summary Totals */}
        <div className="bg-gray-50 p-6 rounded-lg border h-fit space-y-6">
          <h2 className="text-xl font-bold text-gray-900 border-b pb-4">ORDER TOTALS</h2>

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

          <button
            onClick={() => navigate('/place-order')}
            className="w-full bg-black text-white py-3 rounded font-medium hover:bg-gray-800 transition"
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
};