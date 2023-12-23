import StoreInstanceParameterModel from './storeInstanceParameterModel';
import StoreProductModel from './storeProductModel';
import StoreStorageModel from './storeStorageModel';

export default interface StoreInstanceModel {
  id?: number | string;
  parameters: StoreInstanceParameterModel[];
  storage: StoreStorageModel;
  storeProduct: StoreProductModel;
}
