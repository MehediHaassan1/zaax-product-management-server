import { Schema, model } from 'mongoose';
import { TInventory, TProduct, TVariant } from './product.interface';


const variantSchema = new Schema<TVariant>({
    type: { type: String, required: true },
    value: { type: String, required: true }
});

// Define the schema for inventory
const inventorySchema = new Schema<TInventory>({
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, required: true }
});

// Define the main product schema
const productSchema = new Schema<TProduct>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    tags: { type: [String], required: true },
    variants: { type: [variantSchema], required: true },
    inventory: { type: inventorySchema, required: true }
});

// middlewares

// update the inStock field based on quantity
productSchema.pre('save', function (next) {
    if (this.inventory.quantity === 0) {
        this.inventory.inStock = false;
    } else {
        this.inventory.inStock = true;
    }
    next();
});

// Create the Mongoose model
export const Product = model<TProduct>('Product', productSchema);