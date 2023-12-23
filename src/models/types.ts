/* eslint-disable no-unused-vars */

export enum PlaceType {
  home = 0,
  house = 1,
  shared = 10,
  temporary = 20,
  store = 100,
  factory = 110,
  warehouse = 120,
  distributionCenter = 130,
}

export enum TimeType {
  nanoseconds = 0,
  microseconds,
  miliseconds,
  seconds,
  hours,
  days,
  weeks,
  months,
  years,
}

export enum ProductType {
  product = 0,
  model,
  line,
}

export enum PersonType {
  person = 0,
  company,
}

export enum CompanyType {
  store = 0,
  marketplace,
  warehouse,
  group,
  brand,
}

export type RangedValue = {
  range?: {
    min?: number;
    max?: number;
  };
  value?: number;
};
