import { z } from 'zod';

const variantSchema = z.object({
  type: z.string().min(1, 'Type is required'),
  value: z.string().min(1, 'Value is required'),
});

const inventorySchema = z.object({
  quantity: z
    .number()
    .int()
    .nonnegative('Quantity must be a non-negative integer'),
  inStock: z.boolean(),
});

const productZodvalidationSchema = z.object({
  name: z.string().min(1, 'Name must be needed, please insert the name'),
  description: z.string().min(1, 'Please provide some description'),
  price: z.number().nonnegative('Price is missing, please add the price'),
  category: z.string().min(1, 'Every Product have to have a category'),
  tags: z.array(z.string()).min(1, 'Please add the tags'),
  variants: variantSchema.optional(),
  inventory: inventorySchema,
});

export default productZodvalidationSchema;
