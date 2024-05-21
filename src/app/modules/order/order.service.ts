import { TOrder } from "./order.interface";
import { Order } from "./order.model";

const createOrderIntoDB = async (orderData: TOrder) => {
    const result = await Order.create(orderData);
    return result;
}

const getAllOrdersFromDB = async (email?: string) => {
    if (!email) {
        const result = await Order.find();
        return result;
    } else {
        const result = await Order.find({ email });
        return result;
    }

}

export const OrderServices = {
    createOrderIntoDB,
    getAllOrdersFromDB
}