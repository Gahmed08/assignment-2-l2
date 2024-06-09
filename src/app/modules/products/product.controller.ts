import { Request, Response } from 'express';
import { ProductServices } from './product.service';
import productZodvalidationSchema from './productValidation';

const createProduct = async (req: Request, res: Response) => {
  try {
    const zodPasreData = await productZodvalidationSchema.parseAsync({
      body: req.body,
    });

    const result = await ProductServices.createProductIntoDB(zodPasreData.body);
    res.status(200).json({
      success: true,
      message: 'Product created successfully!',
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

const getAllProduct = async (req: Request, res: Response) => {
  const searchTerm: string = req.query.searchTerm as string;
  try {
    const result = await ProductServices.getAllProductFromDB(searchTerm);

    if (searchTerm && result.length > 0) {
      res.status(200).json({
        success: true,
        message: `Products matching search term '${searchTerm}' fetched successfully! `,
        data: result,
      });
    } else if (searchTerm && result.length === 0) {
      res.status(200).json({
        success: true,
        message: `All Product of this name ${searchTerm}  is not there!`,
        data: result,
      });
    } else {
      res.status(200).json({
        success: true,
        message: `Products fetched successfully!`,
        data: result,
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Somthing Went Wrong',
      error: err,
    });
  }
};

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const result = await ProductServices.getSingleProductFromDB(productId);
    res.status(200).json({
      success: true,
      message: 'Product fetched successfully!',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      massage: 'Somthing Went Wrong',
      error: err,
    });
  }
};
const updateSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const result = await ProductServices.updateSingleProductOfDB(
      productId,
      req.body,
    );

    res.status(200).json({
      success: true,
      message: 'Product is updated successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      massage: 'Somthing Went Wrong',
      error: err,
    });
  }
};

const deleteSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    await ProductServices.deleteProductFromDB(productId);
    const result = await ProductServices.getSingleProductFromDB(productId);
    res.status(200).json({
      success: true,
      message: 'Product is Deleted successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      massage: 'Somthing Went Wrong',
      error: error,
    });
  }
};

export const ProductControler = {
  createProduct,
  getAllProduct,
  getSingleProduct,
  updateSingleProduct,
  deleteSingleProduct,
};
