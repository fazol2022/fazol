import DiscountModel from './discountModel';
import PersonModel from './personModel';
import ProductParameterModel from './productParameterModel';
import TagModel from './tagModel';
import { ProductType } from './types';

export default interface ProductModel {
  id?: number | string;
  name?: string;
  parameters?: ProductParameterModel[];
  barcode?: string;
  discounts?: DiscountModel[];
  children?: ProductModel[];
  parent?: ProductModel;
  type?: ProductType;
  brand?: PersonModel;
  tags?: TagModel[];
}
