import { TProduct } from "./product.interface";
import { Product } from "./product.model";
import productValidationSchema from "./product.validation";

const createProductIntoDB = async (productData: TProduct) => {
    const sanitizedProductData = productValidationSchema.parse(productData);
    const result = await Product.create(sanitizedProductData)
    return result;
}

const getAllProductsFromDB = async (searchTerm?: string) => {
    if (!searchTerm) {
        const result = await Product.find();
        return result;
    } else {
        const regex = new RegExp(searchTerm, 'i');
        const result = await Product.find({
            $or: [
                { name: { $regex: regex } },
                { description: { $regex: regex } },
                { category: { $regex: regex } }
            ]
        });
        return result;
    }
}

const getSingleProductFromDB = async (id: string) => {
    const result = await Product.findById(id)
    return result;
}

const updateProductIntoDB = async (productID: string, updatedProductData: Partial<TProduct>) => {
    const result = await Product.findByIdAndUpdate(productID,
        { $set: updatedProductData },
        { new: true, runValidators: true }
    )
    return result;
}

const deleteProductFromDB = async (productID: string) => {
    const result = await Product.deleteOne({ _id: productID });
    return result;
}


export const ProductServices = {
    createProductIntoDB,
    getAllProductsFromDB,
    getSingleProductFromDB,
    updateProductIntoDB,
    deleteProductFromDB,
}