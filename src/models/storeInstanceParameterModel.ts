import { TimeType } from './types';

export default interface StoreInstanceParameterModel {
  date?: Date;
  damaged?: boolean;
  quantity?: number;
  storeProductIndex?: number;
  expiration?: Date;
  expirationAfterOpen?: {
    time?: number;
    type?: TimeType;
  };
  fabrication?: Date;
  lot?: string;
}
