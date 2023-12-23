import ContactModel from './contactModel';
import DiscountModel from './discountModel';
import PlaceModel from './placeModel';
import StorePlaceModel from './storePlaceModel';
import TagModel from './tagModel';
import { CompanyType, PersonType } from './types';

export default interface PersonModel {
  id?: number | string;
  givenName?: string;
  familyName?: string;
  tags?: TagModel[];
  pictureLink?: string;
  sponsor?: number | string;
  type?: PersonType;
  companyType?: CompanyType;
  places?: (PlaceModel | StorePlaceModel)[];
  from?: PersonModel[];
  discounts?: DiscountModel[];
  contacts?: ContactModel[];
  parents?: PersonModel[];
  children?: PersonModel[];
}
