/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../context/AuthContext';
import API from '../../services/api';

// Define Yup validation schema
const validationSchema = Yup.object({
  name: Yup.string().required('Product name is required'),
  description: Yup.string().required('Product description is required'),
  price: Yup.number()
    .typeError('Price must be a number')
    .positive('Price must be greater than zero')
    .required('Price is required'),
  category: Yup.string().required('Category is required'),
  subCategory: Yup.string().required('Sub-category is required'),
});

export const AddProduct: React.FC = () => {
  const { user } = useAuth();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [sizes, setSizes] = useState<string[]>(['M', 'L']);
  const [images, setImages] = useState<File[]>([]);

  const handleSizeToggle = (size: string) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setImages(selectedFiles.slice(0, 4)); // Max 4 images
    }
  };

  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      price: '',
      category: 'Men',
      subCategory: 'Topwear',
      bestSeller: false,
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setSuccessMessage('');
      setErrorMessage('');

      if (images.length === 0) {
        setErrorMessage('Please upload at least one product image.');
        return;
      }

      try {
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('description', values.description);
        formData.append('price', values.price);
        formData.append('category', values.category);
        formData.append('subCategory', values.subCategory);
        formData.append('sizes', JSON.stringify(sizes));
        formData.append('bestSeller', String(values.bestSeller));

        images.forEach((image) => {
          formData.append('images', image);
        });

        await API.post('/products', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${user?.token}`,
          },
        });

        setSuccessMessage('Product added successfully!');
        resetForm();
        setImages([]);
        setSizes(['M', 'L']);
      } catch (error: any) {
        setErrorMessage(error.response?.data?.message || 'Failed to add product');
      }
    },
  });

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md my-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Product (Formik + Yup)</h2>

      {successMessage && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">{successMessage}</div>}
      {errorMessage && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{errorMessage}</div>}

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {/* Product Images Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Upload Images (Max 4)</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border border-gray-300 p-2 rounded"
          />
          <p className="text-xs text-gray-500 mt-1">{images.length} file(s) selected</p>
        </div>

        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
          <input
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Classic Black Blazer"
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-xs text-red-500 mt-1">{formik.errors.name}</p>
          )}
        </div>

        {/* Product Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            rows={4}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter product description..."
          />
          {formik.touched.description && formik.errors.description && (
            <p className="text-xs text-red-500 mt-1">{formik.errors.description}</p>
          )}
        </div>

        {/* Category, SubCategory, Price Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              name="category"
              value={formik.values.category}
              onChange={formik.handleChange}
              className="w-full border border-gray-300 p-2 rounded"
            >
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sub Category</label>
            <select
              name="subCategory"
              value={formik.values.subCategory}
              onChange={formik.handleChange}
              className="w-full border border-gray-300 p-2 rounded"
            >
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
            <input
              type="number"
              name="price"
              value={formik.values.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full border border-gray-300 p-2 rounded"
              placeholder="4500"
            />
            {formik.touched.price && formik.errors.price && (
              <p className="text-xs text-red-500 mt-1">{formik.errors.price}</p>
            )}
          </div>
        </div>

        {/* Sizes Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Available Sizes</label>
          <div className="flex gap-3">
            {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
              <button
                type="button"
                key={size}
                onClick={() => handleSizeToggle(size)}
                className={`px-4 py-2 border rounded ${
                  sizes.includes(size) ? 'bg-black text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Bestseller Checkbox */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="bestSeller"
            id="bestSeller"
            checked={formik.values.bestSeller}
            onChange={formik.handleChange}
            className="w-4 h-4 text-blue-600 rounded"
          />
          <label htmlFor="bestSeller" className="text-sm font-medium text-gray-700">
            Add to Bestseller
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="w-full bg-black text-white py-3 rounded font-medium hover:bg-gray-800 transition"
        >
          {formik.isSubmitting ? 'Uploading...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
};