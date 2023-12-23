import { request } from 'minimal-components-react/dist/requests';
import { addPath, genPath } from 'minimal-components-react/dist/utils/path';
import PlaceModel from '../models/placeModel';
import ProductModel from '../models/productInstanceModel';
import StorageModel from '../models/storageModel';

const getParentType = (type?: string) => {
  switch (type) {
    case 'product':
      return 'storage';
    case 'storage':
      return 'place';
    default:
      return '';
  }
};

const getLanguageType = (type?: string) => {
  return type + 's';
};

const getWrapperType = (content: string, type?: string): string => {
  let wrapperType = '';
  switch (type) {
    case 'product':
    case 'storage':
    case 'place':
      wrapperType = 'ObjectId';
      break;
    default:
      break;
  }
  if (content != undefined && wrapperType !== '') {
    return `${wrapperType}(${content})`;
  }
  return content;
};

const getPathType = (type?: string) => {
  switch (type) {
    case 'product':
      return 'product/instance';
    default:
      return type;
  }
};

const getElement = async (
  id: string,
  type: 'place' | 'storage' | 'product' | undefined,
  hostContext?,
  userContext?
): Promise<PlaceModel | StorageModel | ProductModel | undefined> => {
  let data: any = undefined;
  const path = addPath('', genPath('id', getWrapperType(id, type)) || '');
  const uri =
    hostContext?.host?.productPath + '/api/' + getPathType(type) + path;
  console.log('uri', uri);
  const received = await request(
    uri,
    'get',
    undefined,
    userContext?.token?.current
  );

  data = received?.data;
  if (data == '') {
    data = undefined;
  }
  if (Array.isArray(data)) {
    data = data[0];
  }
  return data;
};

const getElements = async (
  type: 'place' | 'storage' | 'product' | undefined,
  hostContext?,
  userContext?,
  filter?: object,
  path?: string,
  page?: number,
  pageSize?: number,
  noCache?: boolean
): Promise<
  | {
      elements?: Array<PlaceModel | StorageModel | ProductModel>;
      pages?: number;
    }
  | undefined
> => {
  let data: any[] | string | undefined = undefined;
  if (filter) {
    for (const key in filter) {
      if (Object.prototype.hasOwnProperty.call(filter, key)) {
        const element = filter[key];
        path = addPath(path, genPath(key, element));
      }
    }
  }
  // console.log('pre uri', type);
  const uri =
    hostContext?.host?.productPath +
    '/api/' +
    getPathType(type) +
    (path ? path : '');
  console.log('uri', uri);
  const received = await request(
    uri,
    'get',
    undefined,
    userContext?.token?.current,
    undefined,
    undefined,
    page,
    pageSize,
    noCache
  );

  data = received?.data;
  if (data == '') {
    data = [];
  }
  if (!Array.isArray(data)) {
    data = [data];
  }
  const currentPages =
    received?.headers?.pages ||
    received?.headers?.numberOfPages ||
    received?.headers?.numberofpages ||
    1;
  return {
    elements: data,
    pages: currentPages,
  };
};

type BaseData = {
  id?: number | string;
  name?: string;
};

type BaseDataArray = {
  elements?: BaseData[];
  pages?: number;
};

type BaseOption = {
  value?: number | string;
  label?: string;
};

const toOption = (data: BaseData | undefined): BaseOption => {
  return { value: data?.id, label: data?.name };
};

const toOptions = (
  data: BaseDataArray | undefined
): BaseOption[] | undefined => {
  console.log('data', data);
  const options = data?.elements?.map((item) => toOption(item));
  console.log('options', options);

  return options;
};

export {
  getElement,
  getElements,
  toOption,
  toOptions,
  getPathType,
  getWrapperType,
  getParentType,
  getLanguageType,
};
