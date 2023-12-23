import { request } from 'minimal-components-react/dist/requests';
import GeocodeComponentModel from '../models/geocodeComponentModel';
import GeocodeModel from '../models/geocodeModel';
import PlaceModel from '../models/placeModel';

const checkPostalCode = (postalCode?: string | number): string => {
  const normalPostalCode =
    typeof postalCode === 'string'
      ? postalCode
          ?.split('.')
          ?.join('')
          ?.split('-')
          ?.join('')
          ?.split('/')
          ?.join('')
      : '' + postalCode;
  return normalPostalCode;
};

const geocodeToPlace = (
  geocodes?: GeocodeModel[],
  doNotGetAddress?: boolean,
  hostContext?,
  userContext?
): PlaceModel => {
  const geocodeComponents = geocodes?.[0]?.address_components;
  const postalCode = geocodeComponents?.find((component) =>
    component.types?.includes('postal_code')
  );
  let streetNumber: GeocodeComponentModel | string | undefined =
    geocodeComponents?.find((component) =>
      component.types?.includes('street_number')
    );
  let route: GeocodeComponentModel | string | undefined =
    geocodeComponents?.find((component) => component.types?.includes('route'));
  const district = geocodeComponents?.find((component) =>
    component.types?.includes('sublocality_level_1')
  );
  const city = geocodeComponents?.find((component) =>
    component.types?.includes('administrative_area_level_2')
  );
  const state = geocodeComponents?.find((component) =>
    component.types?.includes('administrative_area_level_1')
  );
  const country = geocodeComponents?.find((component) =>
    component.types?.includes('country')
  );
  route = route?.long_name || route?.short_name;
  streetNumber = streetNumber?.long_name || streetNumber?.short_name;
  if (
    !doNotGetAddress &&
    route === undefined &&
    streetNumber === undefined &&
    geocodes?.[0]?.formatted_address != undefined &&
    geocodes?.[0]?.formatted_address !== ''
  ) {
    getAddressFromFormattedAddress(
      geocodes?.[0]?.formatted_address,
      true,
      hostContext,
      userContext
    );
  }
  // const address = route != undefined && route !== '' ?
  //     (route +
  //         (
  //             (streetNumber != undefined && streetNumber !== '') ?
  //                 ', ' + streetNumber :
  //                 ''
  //         )
  //     )
  //     : streetNumber;
  const place: PlaceModel = {
    postalCode: postalCode?.long_name || postalCode?.short_name,
    street: route,
    number: streetNumber,
    district: district?.long_name || district?.short_name,
    city: city?.long_name || city?.short_name,
    state: state?.long_name || state?.short_name,
    country: country?.long_name || country?.short_name,
  };
  return place;
};

const getLocation = async (hostContext?, userContext?) => {
  return new Promise<PlaceModel>((resolve, reject) => {
    navigator?.geolocation?.getCurrentPosition(
      (position) =>
        resolve(getAddressFromPosition(position, hostContext, userContext)),
      reject
    );
  });
};

const getAddressFromFormattedAddress = async (
  formattedAddress: string,
  doNotGetAddress?: boolean,
  hostContext?,
  userContext?
) => {
  console.log('getAddressFromFormattedAddress', formattedAddress);
  const received = await request(
    hostContext?.host?.google.geocode.url,
    'get',
    '?address=' +
      formattedAddress +
      '&key=' +
      hostContext?.host?.google.geocode.key,
    userContext?.token?.current,
    undefined,
    true
  );
  const data: GeocodeModel[] = received?.data?.results;
  if (data)
    return geocodeToPlace(data, doNotGetAddress, hostContext, userContext);
  return data;
};

const getAddressFromPosition = async (position, hostContext?, userContext?) => {
  console.log('getAddressFromPosition', position);
  const received = await request(
    hostContext?.host?.google.geocode.url,
    'get',
    '?latlng=' +
      position.coords.latitude +
      ',' +
      position.coords.longitude +
      '&key=' +
      hostContext?.host?.google.geocode.key,
    userContext?.token?.current,
    undefined,
    true
  );
  const data: GeocodeModel[] = received?.data?.results;
  if (data) return geocodeToPlace(data, false, hostContext, userContext);
  return data;
};

const getAddressFromPostalCode = async (
  postalCode: string,
  hostContext?,
  userContext?
) => {
  console.log('getAddressFromPostalCode', postalCode);
  const received = await request(
    hostContext?.host?.google.geocode.url,
    'get',
    '?components=postal_code:' +
      postalCode +
      '&key=' +
      hostContext?.host?.google.geocode.key,
    userContext?.token?.current,
    undefined,
    true
  );
  const data: GeocodeModel[] = received?.data?.results;
  if (data) return geocodeToPlace(data, false, hostContext, userContext);
  return data;
};

const toNumber = (value: string): number => {
  return parseInt(value.replace(/[^0-9]+/g, ''));
};

const addressFill = async (
  placeModel: PlaceModel,
  name?: string,
  setName?,
  setPostalCode?,
  setStreet?,
  setNumber?,
  setDistrict?,
  setCity?,
  setState?,
  setCountry?
) => {
  console.log('addressFill', placeModel);
  const currentPostalCode = checkPostalCode(placeModel?.postalCode || '');
  if (
    currentPostalCode !== '' &&
    currentPostalCode !== ' ' &&
    currentPostalCode !== undefined
  ) {
    setPostalCode(currentPostalCode);
  }
  setStreet(placeModel?.street || '');
  setNumber(placeModel?.number || '');
  setDistrict(placeModel?.district || '');
  setCity(placeModel?.city || '');
  setState(placeModel?.state || '');
  setCountry(placeModel?.country || '');
  if (name === '' || name === ' ' || name === undefined) {
    const fullAddress =
      placeModel?.street != undefined && placeModel?.street !== ''
        ? placeModel?.street +
          (placeModel?.number != undefined && placeModel?.number !== ''
            ? ' ' + placeModel?.number
            : '') +
          (placeModel?.complement != undefined && placeModel?.complement !== ''
            ? ', ' + placeModel?.complement
            : '')
        : placeModel?.number;
    setName(fullAddress || '');
  }
};

export {
  getAddressFromFormattedAddress,
  getAddressFromPosition,
  getAddressFromPostalCode,
  getLocation,
  geocodeToPlace,
  toNumber,
  checkPostalCode,
  addressFill,
};
