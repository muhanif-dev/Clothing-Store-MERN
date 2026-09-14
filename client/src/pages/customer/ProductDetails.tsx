import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../../services/api';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  subCategory: string;
  sizes: string[];
}

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('M');

  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await API.get(`/products/${id}`);
        const data = response.data;
        setProduct(data);
        if (data.images && data.images.length > 0) {
          setSelectedImage(data.images[0]);
        }
        if (data.sizes && data.sizes.length > 0) {
          setSelectedSize(data.sizes[0]);
        }
      } catch (err) {
        console.error('Failed to fetch product details', err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProductDetails();
  }, [id]);

  if (loading) return <div className="text-center py-24">Loading product details...</div>;
  if (!product) return <div className="text-center py-24 text-red-500">Product not found.</div>;

  const isWishlisted = isInWishlist(product._id);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div className="flex flex-col-reverse md:flex-row gap-4">
          {/* Thumbnails */}
          <div className="flex md:flex-col gap-3 overflow-x-auto">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${product.name} ${index}`}
                onClick={() => setSelectedImage(img)}
                className={`w-20 h-20 object-cover rounded cursor-pointer border-2 transition ${
                  selectedImage === img ? 'border-black' : 'border-transparent'
                }`}
              />
            ))}
          </div>
          {/* Main Display Image */}
          <div className="flex-1 bg-gray-100 rounded-lg overflow-hidden h-[450px]">
            <img src={selectedImage || product.images[0]} alt={product.name} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Product Information */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-2xl font-bold text-black">${product.price}</p>
          <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>

          {/* Size Selector */}
          <div>
            <p className="font-semibold text-sm text-gray-800 mb-3">Select Size</p>
            <div className="flex gap-3">
              {product.sizes?.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-12 border rounded font-medium transition ${
                    selectedSize === size ? 'bg-black text-white border-black' : 'bg-gray-50 text-gray-700 border-gray-300'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            <button
              onClick={() =>
                addToCart({
                  productId: product._id,
                  name: product.name,
                  price: product.price,
                  image: product.images[0],
                  size: selectedSize,
                  quantity: 1,
                })
              }
              className="flex-1 bg-black text-white py-3 rounded font-medium hover:bg-gray-800 transition"
            >
              ADD TO CART
            </button>
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
              className="px-6 border border-gray-300 rounded font-medium hover:bg-gray-50 transition"
            >
              {isWishlisted ? '❤️ Remove' : '🤍 Wishlist'}
            </button>
          </div>

          {/* Additional Info / Policies */}
          <div className="border-t pt-6 space-y-2 text-xs text-gray-500">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
    </div>
  );
};