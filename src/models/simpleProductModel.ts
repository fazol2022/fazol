import TagModel from './tagModel';

export default interface SimpleProductModel {
  id?: number | string;
  name?: string;
  quantities?: number[];
  unit?;
  index?: number;
  open?: boolean;
  price?: number;
  priceUnit?; //! TODO add unit
  capacity?: number;
  servingSize?: number;
  expirationDate?: Date;
  expirationAfterOpen?;
  tags?: TagModel[];
  brand?;
  discounts?: [];
  storage?;
  storeStorage?;
  storeInstance?;
  parameters?;
}
