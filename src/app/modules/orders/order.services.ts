import { TOrder } from './order.interface';
import { Orders } from './order.models';

const createOrderIntoDB = async (order: TOrder) => {
  const result = await Orders.create(order);
  return result;
};
const getAllOrderFromDB = async (searchTerm?: string) => {
  if (searchTerm) {
    const result = await Orders.find({ email: RegExp(searchTerm, 'i') });
    return result;
  } else {
    const result = await Orders.find();
    return result;
  }
};

export const orderServices = {
  createOrderIntoDB,
  getAllOrderFromDB,
};
