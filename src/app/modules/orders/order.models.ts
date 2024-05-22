import { Schema, model } from 'mongoose';
import { TOrder } from './order.interface';

const orderSchema = new Schema<TOrder>({
  email: {
    type: String,
    required: [true, 'Email is needed'],
  },
  productId: {
    type: String,
    required: [true, 'Product ID is requred'],
  },
  price: {
    type: Number,
    required: [true, 'Price is meassing, please add the price'],
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity Must be positive number'],
  },
});
export const Orders = model<TOrder>('Orders', orderSchema);
