import PersonModel from './personModel';
import PlaceModel from './placeModel';

export default interface StorePlaceModel extends PlaceModel {
  company?: PersonModel;
}
