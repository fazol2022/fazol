import ThemeModel from './themeModel';

export default interface HostModel {
  address: string;
  theme: ThemeModel;
  authPath: string;
  productPath: string;
  google: {
    clientId: string;
    key: string;
    geocode: {
      url: string;
      key: string;
    };
  };
}
