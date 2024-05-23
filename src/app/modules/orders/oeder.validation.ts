import { z } from 'zod';

const TZodOrder = z.object({
  email: z
    .string()
    .email({ message: `{VALUE} is not a valid email` })
    .refine((value) => value.length > 0, { message: 'Email is required' }),
  productId: z.string().min(1, 'Product ID is required'),
  price: z
    .number()
    .min(0, { message: 'Price is missing, please add the price' }),
  quantity: z.number().positive('Quantity must be a positive number'),
});

export default TZodOrder;
