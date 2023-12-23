import ProductInstanceParameterModel from './productInstanceParameterModel';
import StorageModel from './storageModel';
import StoreInstanceModel from './storeInstanceModel';
import TagModel from './tagModel';

export default interface ProductInstanceModel {
  id?: number | string;
  name?: string;
  boughtAt?: Date;
  parameters?: ProductInstanceParameterModel[];
  storage?: StorageModel;
  storeInstance?: StoreInstanceModel;
  tags?: TagModel[];
}
