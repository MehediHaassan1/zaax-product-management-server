import { TProduct } from "./product.interface";
import { Product } from "./product.model";
import productValidationSchema from "./product.validation";

const createProductIntoDB = async (productData: TProduct) => {
    const sanitizedProductData = productValidationSchema.parse(productData);
    const result = await Product.create(sanitizedProductData)
    return result;
}

const getAllProductsFromDB = async () => {
    const result = await Product.find();
    return result;
}

const getSingleProductFromDB = async (id: string) => {
    const result = await Product.findById(id)
    return result;
}


export const ProductServices = {
    createProductIntoDB,
    getAllProductsFromDB,
    getSingleProductFromDB
}