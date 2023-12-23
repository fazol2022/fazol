import GeocodeComponentModel from './geocodeComponentModel';

export default interface GeocodeModel {
  address_components?: GeocodeComponentModel[];
  formatted_address?: string;
}
