import { Product } from '../product.model';
import { TProduct } from './product.interface';

const createProductIntoDB = async (product: TProduct) => {
  const result = await Product.create(product);
  return result;
};

const getAllProductFromDB = async (searchname?: string) => {
  if (searchname) {
    const result = await Product.find({ name: RegExp(searchname, 'i') });
    return result;
  } else {
    const result = await Product.find();
    return result;
  }
};

const getSingleProductFromDB = async (id: string) => {
  const result = await Product.findById(id);
  return result;
};

const updateSingleProductOfDB = async (
  id: string,
  payload: Partial<TProduct>,
) => {
  const result = await Product.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteProductFromDB = async (id: string) => {
  const result = await Product.findByIdAndDelete({ _id: id });
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductFromDB,
  getSingleProductFromDB,
  updateSingleProductOfDB,
  deleteProductFromDB,
};
