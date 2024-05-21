import { Schema, model } from 'mongoose';
import { TInventory, TProduct, TVariant } from './products/product.interface';

const variantSchema = new Schema<TVariant>({
  type: {
    type: String,
    required: [true, 'Type is required'],
  },
  value: {
    type: String,
    required: [true, 'Value is required'],
  },
});

const inventorySchema = new Schema<TInventory>({
  quantity: String,
  inStock: Boolean,
});

const productSchema = new Schema<TProduct>({
  name: {
    type: String,
    required: [true, 'Name must be needed, please insert the name'],
  },
  description: {
    type: String,
    required: [true, 'Please provied some description'],
  },
  price: {
    type: Number,
    required: [true, 'Price is meassing, please add the price'],
  },
  category: {
    type: String,
    required: [true, 'Every Product have to have category'],
  },
  tags: {
    type: [String],
    required: [true, 'Please add the tags'],
  },
  variants: {
    type: variantSchema,
  },
  inventory: {
    type: inventorySchema,
  },
});
export const Product = model<TProduct>('Product', productSchema);
