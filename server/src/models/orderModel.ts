import mongoose, { Document, Schema } from 'mongoose';

export interface IOrderItem {
  productId: mongoose.Types.ObjectId;
  name: string;
  price: number;
  quantity: number;
  size: string;
  image: string;
}

export interface IDeliveryAddress {
  name: string;
  address: string;
  phone: string;
  city: string;
  email: string;
}

export interface IOrder extends Document {
  userId: mongoose.Types.ObjectId;
  items: IOrderItem[];
  amount: number;
  address: IDeliveryAddress;
  paymentMethod: 'EasyPaisa' | 'JazzCash' | 'Cash on Delivery';
  paymentStatus: boolean;
  status: 'Order Placed' | 'Packing' | 'Shipped' | 'Out for Delivery' | 'Delivered';
  createdAt: Date;
}

const orderSchema = new Schema<IOrder>({
  userId: {
        type: Schema.Types.ObjectId,
        ref: 'User', 
        required: true 
    },
  items: [
    {
      productId: { 
        type: Schema.Types.ObjectId, 
        ref: 'Product', 
        required: true
     },
      name: { 
        type: String, 
        required: true
     },
      price: { 
        type: Number, 
        required: true
     },
      quantity: { 
        type: Number, 
        required: true
     },
      size: { 
        type: String, 
        required: true 
    },
      image: { 
        type: String, 
        required: true
     },
    },
  ],
  amount: {
     type: Number, 
     required: true 
    },
  address: {
    name: { 
     type: String, 
     required: true
     },
    address: {
         type: String, 
         required: true
         },
    phone: {
         type: String, 
         required: true
         },
    city: {
         type: String, 
         required: true
         },
    email: {
         type: String, 
         required: true
         },
  },
  paymentMethod: { 
    type: String, 
    required: true, 
    enum: ['EasyPaisa', 'JazzCash', 'Cash on Delivery'] 
  },
  paymentStatus: { type: Boolean, default: false },
  status: { 
    type: String, 
    required: true, 
    default: 'Order Placed',
    enum: ['Order Placed', 'Packing', 'Shipped', 'Out for Delivery', 'Delivered'] 
  },
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model<IOrder>('Order', orderSchema);

export default Order;