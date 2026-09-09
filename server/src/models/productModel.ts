import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  images: string[];
  category: 'Men' | 'Women' | 'Kids';
  subCategory: 'Topwear' | 'Bottomwear' | 'Winterwear';
  sizes: string[];
  bestSeller: boolean;
  createdAt: Date;
}

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  images: { type: [String], required: true, validate: [(val: string[]) => val.length <= 4, 'Maximum of 4 images allowed'] },
  category: { type: String, required: true, enum: ['Men', 'Women', 'Kids'] },
  subCategory: { type: String, required: true, enum: ['Topwear', 'Bottomwear', 'Winterwear'] },
  sizes: { type: [String], required: true },
  bestSeller: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const Product = mongoose.model<IProduct>('Product', productSchema);

export default Product;