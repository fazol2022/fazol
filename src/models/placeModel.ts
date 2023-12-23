import { PlaceType } from './types';

export default interface PlaceModel {
  id?: number | string;
  name?: string;
  postalCode?: string | number;
  district?: string;
  street?: string;
  number?: string;
  complement?: string;
  city?: string;
  state?: string;
  country?: string;
  type?: PlaceType;
  headquarters?: boolean;
}
