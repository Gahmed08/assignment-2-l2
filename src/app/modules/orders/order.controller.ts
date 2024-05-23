import { Product } from '../product.model';
import { ProductServices } from '../products/product.service';
import TZodOrder from './oeder.validation';
import { orderServices } from './order.services';
import { Request, Response } from 'express';

const createOrder = async (req: Request, res: Response) => {
  try {
    const { orders: orderData } = req.body;
    const zodPasreData = TZodOrder.parse(orderData);
    const orderId = orderData.productId;
    const productData = await ProductServices.getSingleProductFromDB(orderId);
    const producID = productData?._id.toString();

    if (orderId === producID) {
      const productQuantity = parseInt(productData?.inventory?.quantity);
      const orderQuntaty = parseInt(orderData.quantity);
      if (orderQuntaty > productQuantity) {
        res.status(500).json({
          success: false,
          message: 'Insufficient quantity available in inventory',
        });
      } else {
        const updatedQuantity = productQuantity - orderQuntaty;
        const inStock = updatedQuantity > 0;
        await Product.findByIdAndUpdate(
          producID,
          {
            $set: {
              'inventory.quantity': updatedQuantity >= 0 ? updatedQuantity : 0,
              'inventory.inStock': inStock,
            },
          },
          { new: true },
        );

        const result = await orderServices.createOrderIntoDB(zodPasreData);
        res.status(200).json({
          success: true,
          message: 'Order is Crested Succesfuly',
          data: result,
        });
      }
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Somthing went wrong',
      data: err,
    });
  }
};

const getAllOrder = async (req: Request, res: Response) => {
  const searchTerm = req.query.email as string;

  try {
    const result = await orderServices.getAllOrderFromDB(searchTerm);

    if (result.length === 0) {
      res.status(500).json({
        success: false,
        message: 'Order not found',
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'Order fetched successfully!',
        data: result,
      });
    }
  } catch (err) {
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
