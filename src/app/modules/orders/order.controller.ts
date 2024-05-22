import TZodOrder from './oeder.validation';
import { orderServices } from './order.services';
import { Request, Response } from 'express';

const createOrder = async (req: Request, res: Response) => {
  try {
    const { orders: orderData } = req.body;
    console.log(orderData);

    const zodPasreData = TZodOrder.parse(orderData);

    const result = await orderServices.createOrderIntoDB(zodPasreData);
    res.status(200).json({
      success: true,
      message: 'Order is Crested Succesfuly',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Somthing went wrong',
      data: err,
    });
  }
};

const getAllOrder = async (req: Request, res: Response): Promise<void> => {
  const searchTerm = req.query.searchTerm as string;
  console.log(searchTerm);
  try {
    const result = await orderServices.getAllOrderFromDB(searchTerm);
    res.status(200).json({
      success: true,
      message: 'All order retrive succesfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Somthing Went Wrong',
      error: err,
    });
  }
};

export const orderController = {
  createOrder,
  getAllOrder,
};
