import DiscountModel from './discountModel';
import ProductModel from './productModel';
import StoreProductParameterModel from './storeProductParameterModel';

export default interface StoreProductModel {
  id?: number | string;
  product?: ProductModel;
  parameters?: StoreProductParameterModel[];
  discounts?: DiscountModel[];
}
