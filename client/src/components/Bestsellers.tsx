import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

interface Product {
  _id: string;
  name: string;
  price: number;
  images: string[];
  category: string;
  bestSeller: boolean;
}

export const Bestsellers: React.FC = () => {
  const [bestsellers, setBestsellers] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    const fetchBestsellers = async () => {
      try {
        const response = await API.get('/products');
        // Filter products where bestSeller is true, limiting to 4 items
        const popular = response.data.filter((p: Product) => p.bestSeller).slice(0, 4);
        setBestsellers(popular);
      } catch (err) {
        console.error('Failed to fetch bestsellers', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBestsellers();
  }, []);

  if (loading) return <div className="text-center py-8">Loading bestsellers...</div>;
  if (bestsellers.length === 0) return null; // Hide section if no bestsellers are flagged

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center py-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">BEST SELLERS</h2>
        <p className="text-gray-500 max-w-xl mx-auto text-sm">
          Discover the pieces everyone is talking about. Tried, tested, and loved by our customers.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {bestsellers.map((product) => {
          const isWishlisted = isInWishlist(product._id);
          return (
            <div key={product._id} className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
              <div className="relative h-64 bg-gray-100">
                <img
                  src={product.images[0] || 'https://via.placeholder.com/300'}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() =>
                    isWishlisted
                      ? removeFromWishlist(product._id)
                      : addToWishlist({
                          productId: product._id,
                          name: product.name,
                          price: product.price,
                          image: product.images[0],
                        })
                  }
                  className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition"
                >
                  {isWishlisted ? '❤️' : '🤍'}
                </button>
              </div>

              <div className="p-4">
                <span className="text-xs text-gray-500 uppercase">{product.category}</span>
                <h3 className="font-semibold text-gray-800 text-lg truncate mt-1">{product.name}</h3>
                <p className="text-black font-bold mt-2">${product.price}</p>

                <button
                  onClick={() =>
                    addToCart({
                      productId: product._id,
                      name: product.name,
                      price: product.price,
                      image: product.images[0],
                      size: 'M',
                      quantity: 1,
                    })
                  }
                  className="w-full mt-4 bg-black text-white py-2 rounded text-sm font-medium hover:bg-gray-800 transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};