import { Request, Response } from "express";
import { ProductServices } from "./product.service";
import { TProduct } from "./product.interface";

const createProduct = async (req: Request, res: Response) => {
    try {
        const productData = req.body;
        const result = await ProductServices.createProductIntoDB(productData);
        res.status(200).json({
            success: true,
            message: "Product created successfully",
            data: result
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || "Something went wrong",
            error: err
        });
    }
}

const getAllProducts = async (req: Request, res: Response) => {
    try {
        const searchTerm = req.query.searchTerm;
        if (!searchTerm) {
            const result = await ProductServices.getAllProductsFromDB();
            res.status(200).json({
                success: true,
                message: "Product fetched successfully",
                data: result
            });
        } else {
            const result = await ProductServices.getAllProductsFromDB(searchTerm as string);
            res.status(200).json({
                success: true,
                message: `Products matching search term ${searchTerm} fetched successfully!`,
                data: result
            });
        }
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || "Something went wrong",
            error: err
        });
    }
}

const getSingleProduct = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params;
        const result = await ProductServices.getSingleProductFromDB(productId);
        res.status(200).json({
            success: true,
            message: "Product fetched successfully",
            data: result
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || "Something went wrong",
            error: err
        });
    }
}

const updateProduct = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params;
        const productData: Partial<TProduct> = req.body;
        const result = await ProductServices.updateProductIntoDB(productId, productData);
        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: result
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || "Something went wrong",
            error: err
        });
    }
}

const deleteSingleProduct = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params;
        await ProductServices.deleteProductFromDB(productId);
        res.status(200).json({
            success: true,
            message: "Product deleted successfully.",
            data: null
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || "Something went wrong",
            error: err
        });
    }

}

export const ProductController = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteSingleProduct,
}