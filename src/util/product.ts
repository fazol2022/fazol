import { request } from 'minimal-components-react/dist/requests';
import {
  addPath,
  cleanFromObject,
  genPath,
} from 'minimal-components-react/dist/utils/path';
import GeocodeModel from '../models/geocodeModel';
import PlaceModel from '../models/placeModel';
import ProductInstanceModel from '../models/productInstanceModel';
import SimpleProductModel from '../models/simpleProductModel';
import StorageModel from '../models/storageModel';
import TagModel from '../models/tagModel';
import { getWrapperType, getPathType, getParentType } from './element';
import { geocodeToPlace } from './location';

export const isProductArray = (type) => {
  return type.includes('product');
};

export const toSimpleElements = (elements, type) => {
  return isProductArray(type) ? toSimpleProducts(elements) : elements;
};

export const filterElements = (
  elements?: SimpleProductModel[],
  search?: string
  // _filters?
) => {
  //! TODO add filters and search by tags
  const searches =
    search
      ?.match(/(".*?"|[^" \s]+)(?=\s* |\s*$)/g)
      ?.map((search) => search.replaceAll('"', '')) || [];
  return search && search?.trim?.() !== ''
    ? elements?.filter((product) => {
        for (const search of searches) {
          if (
            !product?.name?.includes?.(search) &&
            !product?.brand?.name?.includes?.(search)
          ) {
            let hasTag: undefined | boolean | number = product?.tags?.findIndex(
              (tag) => tag?.name?.includes?.(search)
            );
            hasTag = hasTag != undefined ? hasTag > -1 : false;
            if (!hasTag) return false;
          }
        }
        return true;
      })
    : elements;
};

export const getFrom = (tags?: TagModel[]) => {
  let from: TagModel[] = [];
  return tags
    ?.map((mem) => {
      const m = { ...mem }; // use spread operator
      if (m.from && m.from.length) {
        from = [...from, ...m.from];
      }
      delete m.from; // this will not affect the original array object
      return m;
    })
    ?.concat(from.length ? getFrom(from) : from);
};

export const toSimpleProducts = (
  products: ProductInstanceModel[]
): SimpleProductModel[] => {
  console.log('toSimpleProducts products', products);

  const simpleProducts: SimpleProductModel[] = [];
  for (const instance of products) {
    const storeInstance = instance.storeInstance;
    const storeProduct = storeInstance?.storeProduct;
    const product = storeProduct?.product || {};
    const arragedA: any[] = [];
    if (instance?.parameters)
      for (const parameter of instance.parameters) {
        const currentStoreInstance =
          storeInstance?.parameters?.[parameter?.storeInstanceIndex || 0];
        const currentStoreProduct =
          storeProduct?.parameters?.[
            currentStoreInstance?.storeProductIndex || 0
          ];
        const currentProduct =
          product?.parameters?.[currentStoreProduct?.productIndex || 0];
        const quantities: number[] = [];
        for (let i = 0; i < (parameter.quantity || 1); i++) {
          quantities.push(parameter.content || 0);
        }
        product.tags = getFrom(product.tags);
        const aProduct = {
          id: instance.id,
          quantities: quantities,
          unit: '', //! TODO add unit
          index: parameter.storeInstanceIndex,
          open: parameter.open,
          price: currentStoreProduct?.price,
          priceUnit: '', //! TODO add unit
          capacity: currentProduct?.capacity,
          servingSize: currentProduct?.servingSize,
          expirationDate: currentStoreInstance?.expiration,
          expirationAfterOpen: currentStoreInstance?.expirationAfterOpen,
          tags: product.tags,
          brand: product.brand,
          name: product.name,
          discounts: [
            ...(product?.discounts || []),
            ...(storeProduct?.discounts || []),
          ],
          storage: instance.storage,
          storeStorage: storeInstance?.storage,
        };
        arragedA.push(aProduct);
      }
    for (const element of arragedA) {
      const index = arragedA.indexOf(element);
      if (index === 0) {
        simpleProducts.push(element);
      } else {
        const found = simpleProducts.findIndex(
          (i) => i.index === element.index
        );
        if (found !== -1) {
          simpleProducts[found].quantities = [
            ...(simpleProducts?.[found]?.quantities || []),
            ...element.quantities,
          ];
        }
      }
    }
  }

  console.log('toSimpleProducts simpleProducts', simpleProducts);
  return simpleProducts;
};

export const updatePlace = async (
  place: PlaceModel,
  id?: string,
  hostContext?,
  userContext?
) => {
  console.log('setPlace', place);
  const path = id
    ? addPath('', genPath('id', getWrapperType(id, 'place')) || '')
    : '';
  const uri =
    hostContext?.host?.productPath + '/api/' + getPathType('place') + path;
  console.log('uri', uri);
  const received = await request(
    uri,
    id ? 'put' : 'post',
    undefined,
    userContext?.token?.current,
    place
  );
  const data: GeocodeModel[] = received?.data?.results;
  if (data) return geocodeToPlace(data, false, hostContext, userContext);
  return data;
};

export const updateStorage = async (
  storage: StorageModel,
  id?: string,
  hostContext?,
  userContext?
) => {
  console.log('setStorage', storage);
  const path = id
    ? addPath('', genPath('id', getWrapperType(id, 'storage')) || '')
    : '';
  const uri =
    hostContext?.host?.productPath + '/api/' + getPathType('storage') + path;
  console.log('uri', uri);
  const received = await request(
    uri,
    id ? 'put' : 'post',
    undefined,
    userContext?.token?.current,
    storage
  );
  const data: GeocodeModel[] = received?.data?.results;
  if (data) return geocodeToPlace(data, false, hostContext, userContext);
  return data;
};

export const updateProduct = async (
  product: ProductInstanceModel,
  id?: string,
  hostContext?,
  userContext?
) => {
  console.log('setProduct', product);
  const path = id
    ? addPath('', genPath('id', getWrapperType(id, 'product')) || '')
    : '';
  const uri =
    hostContext?.host?.productPath + '/api/' + getPathType('product') + path;
  console.log('uri', uri);
  const received = await request(
    uri,
    id ? 'put' : 'post',
    undefined,
    userContext?.token?.current,
    product
  );
  const data: GeocodeModel[] = received?.data?.results;
  if (data) return geocodeToPlace(data, false, hostContext, userContext);
  return data;
};

export const getId = (props, map) => {
  // console.log('getId', props?.id, props?.location?.pathname, props?.location);
  let id: undefined | string | string[] = props?.location?.pathname
    ?.split('/')
    ?.filter((id) => id);
  id = id?.[id?.length - 1];

  id = cleanFromObject(map.pages, id);
  id = cleanFromObject(map.add, id);

  return id as string;
};

export const getName = async (
  props,
  map,
  hostContext,
  userContext
): Promise<string | undefined> => {
  let data: Array<any> | any = [];
  const id = getId(props, map);
  const path = addPath('', genPath('id', getWrapperType(id, 'product')) || '');
  console.log(
    'getName',
    id,
    'product',
    genPath('id', getWrapperType(id, 'product')),
    getWrapperType(id, 'product')
  );
  if (getParentType('product') !== '') {
    const uri =
      (hostContext?.host?.productPath || '') +
      '/api/' +
      getParentType('product') +
      path;
    const received = await request(
      uri,
      'get',
      undefined,
      userContext?.token?.current,
      undefined,
      undefined,
      undefined,
      undefined,
      true
    );

    data = received?.data;
    if (data == '') {
      data = [];
    }
    if (!Array.isArray(data)) data = [data];

    const name = data?.[0]?.name;
    return name;
  }
};
