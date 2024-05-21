import { z } from 'zod';

// Define the Zod schema for the TVariant interface
const variantZodSchema = z.object({
  type: z.string().min(5, 'Type is required'),
  value: z.string().min(5, 'Value is required'),
});

// Define the Zod schema for the TInventory interface
const inventoryZodSchema = z.object({
  quantity: z.string(),
  inStock: z.boolean(),
});

const productZodSchema = z.object({
  name: z.string().min(3, 'Name must be needed, please insert the name'),
  description: z.string().min(3, 'Please provide some description'),
  price: z.number().nonnegative('Price is missing, please add the price'),
  category: z.string().min(3, 'Every product must have a category'),
  tags: z.array(z.string()).min(3, 'Please add the tags'),
  variants: variantZodSchema.optional(),
  inventory: inventoryZodSchema.optional(),
});

export default productZodSchema;
