import { RangedValue } from './types';

export default interface DiscountModel {
  id?: number | string;
  name?: string;
  description: string;
  value: RangedValue;
  disabled: boolean;
  quantity: RangedValue;
  start: Date;
  end: Date;
}
