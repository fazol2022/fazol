/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect, useState } from 'react';
import { LanguageContext } from '../../contexts/language/context';
import { HostContext } from '../../contexts/host/context';
import { request } from 'minimal-components-react/dist/requests';
import NotificationContext from '../../contexts/notification/context';
import { Text } from 'minimal-components-react/dist/components/Text';
import ThemeModel from '../../models/themeModel';
import { translateText } from 'minimal-components-react/dist/requests/translate';
import Input from 'minimal-components-react/dist/components/Input';
import Image from 'minimal-components-react/dist/components/Image';
import { UserContext } from '../../contexts/user/context';
import Loading from '../Loading';
import { withTheme } from 'styled-components';

const Settings = () => {
  const hostContext = useContext(HostContext);
  const userContext = useContext(UserContext);
  const language = useContext(LanguageContext);
  const notification = useContext(NotificationContext);
  const [logo, setLogo] = useState<string | undefined>('');
  const [favicon, setFavicon] = useState<string | undefined>('');
  const [disableSellerStoreId, setDisableSellerStoreId] = useState<
    boolean | undefined
  >(undefined);
  const [minimumQuantity, setMinimumQuantity] = useState<number | undefined>(
    undefined
  );
  const [priceTable, setPriceTable] = useState<number | undefined>(undefined);
  const [store, setStore] = useState<number | undefined>(undefined);

  const [loading, setLoading] = useState(false);
  // const [progress, _setProgress] = useState(0);
  // const [progress2, _setProgress2] = useState(0);

  // const getConfig = async () => {
  //   try {
  //     setLoading(true);
  //     const received = await request(
  //       hostContext?.host?.address,
  //       'get',
  //       undefined,
  //       userContext?.token?.current
  //     );
  //     let data: Array<ConfigModel> | ConfigModel | undefined = received?.data;
  //     if (Array.isArray(data)) {
  //       if (data?.length > 0) {
  //         data = data[0];
  //       } else {
  //         data = undefined;
  //       }
  //     }
  //     setStore(data?.store);
  //     setMinimumQuantity(data?.minimumQuantity);
  //     setDisableSellerStoreId(data?.disableSellerStoreId);
  //     setPriceTable(data?.priceTable);
  //     setLoading(false);
  //     return data;
  //   } catch (error: any) {
  //     const message = await translateText(
  //       'AIzaSyADq2LAWuqexdzpgMFvDsxo7JDuEBXMsdk',
  //       error.message,
  //       language?.format.locale
  //     );
  //     notification.setError(true);
  //     notification.setText(message);
  //     setLoading(false);
  //   }
  // };

  const getTheme = async () => {
    try {
      setLoading(true);
      const received = await request(
        hostContext?.host?.address,
        'get',
        undefined,
        userContext?.token?.current
      );
      let data: Array<ThemeModel> | ThemeModel | undefined = received?.data;
      if (Array.isArray(data)) {
        if (data?.length > 0) {
          data = data[0];
        } else {
          data = undefined;
        }
      }
      setLogo(data?.logos ? data?.logos[0] : undefined);
      setFavicon(data?.favicons ? data?.favicons[0] : undefined);
      setLoading(false);
      return data;
    } catch (error: any) {
      const message = await translateText(
        'AIzaSyADq2LAWuqexdzpgMFvDsxo7JDuEBXMsdk',
        error.message,
        language?.format.locale
      );
      notification.setError(true);
      notification.setText(message);
      setLoading(false);
    }
  };

  useEffect(() => {
    // getConfig();
    getTheme();
  }, []);

  useEffect(() => {}, [
    logo,
    favicon,
    store,
    minimumQuantity,
    disableSellerStoreId,
    priceTable,
  ]);

  const updateStore = async (store: number) => {
    try {
      setLoading(true);
      const updateURL = hostContext?.host?.address;
      await updateConfig(updateURL, { store });
      setStore(store);
      setLoading(false);
    } catch (error: any) {
      const message = await translateText(
        'AIzaSyADq2LAWuqexdzpgMFvDsxo7JDuEBXMsdk',
        error.message,
        language?.format.locale
      );
      notification.setError(true);
      notification.setText(message);
      setLoading(false);
    }
  };
  const updateMinimumQuantity = async (minimumQuantity: number) => {
    try {
      setLoading(true);
      const updateURL = hostContext?.host?.address;
      await updateConfig(updateURL, { minimumQuantity });
      setMinimumQuantity(minimumQuantity);
      setLoading(false);
    } catch (error: any) {
      const message = await translateText(
        'AIzaSyADq2LAWuqexdzpgMFvDsxo7JDuEBXMsdk',
        error.message,
        language?.format.locale
      );
      notification.setError(true);
      notification.setText(message);
      setLoading(false);
    }
  };

  const updatePriceTable = async (priceTable: number) => {
    try {
      setLoading(true);
      const updateURL = hostContext?.host?.address;
      await updateConfig(updateURL, { priceTable });
      setPriceTable(priceTable);
      setLoading(false);
    } catch (error: any) {
      const message = await translateText(
        'AIzaSyADq2LAWuqexdzpgMFvDsxo7JDuEBXMsdk',
        error.message,
        language?.format.locale
      );
      notification.setError(true);
      notification.setText(message);
      setLoading(false);
    }
  };
  const updateDisabled = async (disableSellerStoreId: boolean) => {
    try {
      setLoading(true);
      const updateURL = hostContext?.host?.address;
      await updateConfig(updateURL, { disableSellerStoreId });
      setDisableSellerStoreId(disableSellerStoreId);
      setLoading(false);
    } catch (error: any) {
      const message = await translateText(
        'AIzaSyADq2LAWuqexdzpgMFvDsxo7JDuEBXMsdk',
        error.message,
        language?.format.locale
      );
      notification.setError(true);
      notification.setText(message);
      setLoading(false);
    }
  };

  const updateConfig = async (
    updateURL?: string,
    update?: {
      logos?: string[];
      favicons?: string[];
      disableSellerStoreId?: boolean;
      minimumQuantity?: number;
      store?: number;
      priceTable?: number;
    }
  ) => {
    const received = await request(
      updateURL,
      'put',
      undefined,
      userContext?.token?.current,
      update
    );
    return received;
  };

  return (
    /* @ts-ignore */
    <Loading
      loading={loading}
      // progress={progress}
      // progress2={progress2}
    >
      <div
        title={language?.settings?.logo}
        style={{ position: 'relative', width: '50%', height: '50vw' }}
      >
        <Image src={logo} />
      </div>
      <div
        title={language?.settings?.icon}
        style={{ position: 'relative', width: '50%', height: '50vw' }}
      >
        <Image src={favicon} />
      </div>

      <Input
        style={{
          fontSize: '16px',
          width: 'calc( 100% - 20px )',
          float: 'left',
          display: 'flex',
          boxSizing: 'border-box',
          margin: '10px',
          padding: '0px',
        }}
        title={language?.settings?.store}
        name={language?.settings?.store}
        type="number"
        defaultValue={store}
        aria-label={language?.settings?.store}
        placeholder={language?.settings?.store}
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            updateStore(e.target.value);
          }
        }}
      />

      <Input
        style={{
          fontSize: '16px',
          width: 'calc( 100% - 20px )',
          float: 'left',
          display: 'flex',
          boxSizing: 'border-box',
          margin: '10px',
          padding: '0px',
        }}
        title={language?.settings?.minimumQuantity}
        name={language?.settings?.minimumQuantity}
        type="number"
        defaultValue={minimumQuantity}
        aria-label={language?.settings?.minimumQuantity}
        placeholder={language?.settings?.minimumQuantity}
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            updateMinimumQuantity(e.target.value);
          }
        }}
      />

      <Input
        style={{
          fontSize: '16px',
          width: 'calc( 100% - 20px )',
          float: 'left',
          display: 'flex',
          boxSizing: 'border-box',
          margin: '10px',
          padding: '0px',
        }}
        title={language?.settings?.priceTable}
        name={language?.settings?.priceTable}
        type="number"
        defaultValue={priceTable}
        aria-label={language?.settings?.priceTable}
        placeholder={language?.settings?.priceTable}
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            updatePriceTable(e.target.value);
          }
        }}
      />

      <Text sizeType={'h3'}>{language?.settings?.disableSellerStoreId}:</Text>
      <div style={{ width: '40px' }}>
        <Input
          type={'checkbox'}
          value={disableSellerStoreId}
          setValue={updateDisabled}
        />
      </div>
    </Loading>
  );
};

export default withTheme(Settings);
