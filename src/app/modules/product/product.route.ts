import express from 'express';
import { ProductController } from './product.controller';

const router = express.Router();


// get all product + search query product
router.get('/', ProductController.getAllProducts);

// post product
router.post('/', ProductController.createProduct);


// get single product
router.get('/:productId', ProductController.getSingleProduct)

// update product
router.put('/:productId', ProductController.updateProduct);

// delete product
router.delete('/:productId', ProductController.deleteSingleProduct);


export const ProductRouter = router;

