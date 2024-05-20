import { TProduct } from "./product.interface";
import { Product } from "./product.model";
import productValidationSchema from "./product.validation";

const createProductIntoDB = async (productData: TProduct) => {
    const sanitizedProductData = productValidationSchema.parse(productData);
    const result = await Product.create(sanitizedProductData)
    return result;
}


export const ProductServices = {
    createProductIntoDB
}