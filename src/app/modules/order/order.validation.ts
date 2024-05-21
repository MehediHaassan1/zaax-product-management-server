import { z } from 'zod';

// Define the Zod schema for TOrder
const orderValidationSchema = z.object({
    email: z.string().email(),
    productId: z.string(),
    price: z.number().positive(),
    quantity: z.number().int().min(1)
});

// Export the schema
export default orderValidationSchema;