import { Request, Response } from "express";
import mongoose from 'mongoose';
import { Product } from "../product/product.model";
import { Order } from "./order.model";
import { OrderServices } from "./order.service";

const createOrder = async (req: Request, res: Response) => {

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const orderData = req.body;
        const product = await Product.findById(orderData?.productId).session(session);

        if (!product) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        if (product.inventory.quantity < orderData.quantity) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({
                success: false,
                message: 'Insufficient quantity available in inventory'
            });
        }

        const newOrder = new Order(orderData);
        const result = await newOrder.save({ session })

        product.inventory.quantity -= orderData.quantity;
        await product.save({ session });

        await session.commitTransaction();
        session.endSession();

        res.status(200).json({
            success: true,
            message: "Order created successfully",
            data: result
        })

    } catch (err: any) {
        await session.abortTransaction();
        session.endSession();

        res.status(500).json({
            success: false,
            message: err.message || "Something went wrong",
            error: err
        });
    }
}

const getAllOrders = async (req: Request, res: Response) => {
    try {
        const email = req.query.email as string;
        if (!email) {
            const result = await OrderServices.getAllOrdersFromDB();
            res.status(200).json({
                success: true,
                message: "Orders fetched successfully!",
                data: result
            })
        } else {
            const result = await OrderServices.getAllOrdersFromDB(email);
            if (result.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Order not found"
                })
            } else {
                res.status(200).json({
                    success: true,
                    message: "Orders fetched successfully for user email!",
                    data: result
                })
            }
        }

    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || "Something went wrong",
            error: err
        });
    }
}

export const OrderControllers = {
    createOrder,
    getAllOrders
}