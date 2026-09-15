import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../services/api';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { Link } from 'react-router-dom';

interface Product {
  _id: string;
  name: string;
  price: number;
  images: string[];
  category: string;
  subCategory: string;
}

export const Collection: React.FC = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter states
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState('relevant');

  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await API.get('/products');
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (err) {
        console.error('Failed to fetch collection products', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Handle Category checkbox toggle
  const toggleCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSelectedCategory((prev) =>
      prev.includes(value) ? prev.filter((c) => c !== value) : [...prev, value]
    );
  };

  // Handle SubCategory checkbox toggle
  const toggleSubCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSelectedSubCategory((prev) =>
      prev.includes(value) ? prev.filter((s) => s !== value) : [...prev, value]
    );
  };

  // Apply filters and sorting
  useEffect(() => {
    let result = [...products];

    // Search filter
    if (search.trim()) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory.length > 0) {
      result = result.filter((p) => selectedCategory.includes(p.category));
    }

    // SubCategory filter
    if (selectedSubCategory.length > 0) {
      result = result.filter((p) => selectedSubCategory.includes(p.subCategory));
    }

    // Sorting
    if (sortOption === 'low-high') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'high-low') {
      result.sort((a, b) => b.price - a.price);
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFilteredProducts(result);
  }, [search, selectedCategory, selectedSubCategory, sortOption, products]);

  if (loading) return <div className="text-center py-16">Loading collection...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
      {/* Filters Sidebar */}
      <div className="w-full md:w-64 space-y-6">
        <h2 className="text-xl font-bold text-gray-900">FILTERS</h2>

        {/* Search input */}
        <div>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded text-sm focus:outline-none focus:ring-1 focus:ring-black"
          />
        </div>

        {/* Categories */}
        <div className="border border-gray-200 p-4 rounded-lg">
          <p className="font-semibold text-sm mb-3 text-gray-800">CATEGORIES</p>
          <div className="space-y-2 text-sm text-gray-600">
            {['Men', 'Women', 'Kids'].map((cat) => (
              <label key={cat} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  value={cat}
                  onChange={toggleCategory}
                  className="rounded border-gray-300 text-black focus:ring-black"
                />
                {cat}
              </label>
            ))}
          </div>
        </div>

        {/* SubCategories */}
        <div className="border border-gray-200 p-4 rounded-lg">
          <p className="font-semibold text-sm mb-3 text-gray-800">TYPE</p>
          <div className="space-y-2 text-sm text-gray-600">
            {['Topwear', 'Bottomwear', 'Winterwear'].map((sub) => (
              <label key={sub} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  value={sub}
                  onChange={toggleSubCategory}
                  className="rounded border-gray-300 text-black focus:ring-black"
                />
                {sub}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Main Product Display */}
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 pb-4 border-b">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">ALL COLLECTIONS</h1>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border border-gray-300 text-sm p-2 rounded mt-2 sm:mt-0 focus:outline-none"
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {filteredProducts.length === 0 ? (
          <p className="text-gray-500 py-12 text-center">No products found matching your filters.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => {
              const isWishlisted = isInWishlist(product._id);
              return (
                <div
                  key={product._id}
                  onClick={() => navigate(`/product/${product._id}`)}
                  className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer"
                >
                  <div className="relative h-64 bg-gray-100">
                        <Link to={`/product/${product._id}`}>
                            <img
                            src={product.images[0] || 'https://via.placeholder.com/300'}
                            alt={product.name}
                            className="w-full h-full object-cover"
                            />
                        </Link>
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
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart({
                          productId: product._id,
                          name: product.name,
                          price: product.price,
                          image: product.images[0],
                          size: 'M',
                          quantity: 1,
                        });
                      }}
                      className="w-full mt-4 bg-black text-white py-2 rounded text-sm font-medium hover:bg-gray-800 transition"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};