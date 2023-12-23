import React, { useContext, useEffect, useRef, useState } from 'react';
import { LanguageContext } from '../../contexts/language/context';
import { Error } from 'minimal-components-react/dist/components/Text';
import { HostContext } from '../../contexts/host/context';
import NotificationContext from '../../contexts/notification/context';
import { translateText } from 'minimal-components-react/dist/requests/translate';
import { UserContext } from '../../contexts/user/context';
import Input from 'minimal-components-react/dist/components/Input';
import Loading from '../Loading';
import { withTheme } from 'styled-components';
import { Form } from 'minimal-components-react/dist/components/Content';
import Select from 'react-select';
import { selectStyle } from 'minimal-components-react/dist/components/Input/styles';
import { getPaths } from 'minimal-components-react/dist/utils/path';
import {
  getElement,
  getElements,
  toOption,
  toOptions,
} from '../../util/element';
import { updateStorage } from '../../util/product';

// @ts-ignore
const Storage = (props: { id?; navigate; location; theme? }) => {
  const hostContext = useContext(HostContext);
  const userContext = useContext(UserContext);
  const notification = useContext(NotificationContext);
  const language = useContext(LanguageContext);
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [nameError, setNameError] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);

  const getStorageId = () => {
    const id: string | undefined =
      location?.search?.split('=')?.[1]?.split('&')?.[0] || undefined;
    console.log('id', id);
    return id;
  };

  const getStorage = async () => {
    const id = getStorageId();
    let storage;
    if (id) {
      storage = {};
      const rStorage = await getElement(id, 'storage', hostContext, useContext);
      console.log('storage', rStorage);
      if (rStorage?.name) {
        storage.name = rStorage.name;
      }
      if ((storage as any)?.place && place == undefined) {
        storage.place = await getPlace((rStorage as any)?.place);
      }
    }
    return storage;
  };

  const setStorage = async (storage?: { name?: string; place? }) => {
    if (storage?.name) {
      setName(storage.name);
    }
    if ((storage as any)?.place && place == undefined) {
      setPlace((storage as any)?.place);
    }
  };

  const getPlaceId = () => {
    const names: string[] = getPaths(location?.pathname);
    console.log('names', names, location);
    return names.length > 1 ? names[0] : undefined;
  };

  const getPlace = async (id?: string) => {
    id = id || getPlaceId();
    if (id == undefined) return undefined;
    const place = toOption(
      await getElement(id, 'place', hostContext, userContext)
    );
    console.log('place', place);
    return place;
  };

  const getPlaces = async () => {
    const places = toOptions(
      await getElements('place', hostContext, userContext)
    );
    console.log('places', places);
    return places;
  };

  const [place, setPlace] = useState<any | undefined>();

  const [places, setPlaces] = useState<any | undefined>();

  useEffect(() => {
    getPlace().then((place) => setPlace(place));
    getPlaces().then((places) => setPlaces(places));
    getStorage().then((storage) => setStorage(storage));
  }, []);

  useEffect(() => {
    if (name !== '' && name !== ' ') {
      setNameError('');
    }
  }, [name]);

  useEffect(() => {
    if (name) {
      setError('');
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  });

  const handleValidate = () => {
    let hasError = false;

    if (name === '' || name === ' ') {
      setNameError(language?.signUp?.error?.name || '');
      hasError = true;
    }

    if (hasError) {
      setError(language?.signUp?.error?.general || '');
      setDisabled(true);
    } else {
      setError('');
      setDisabled(false);
    }
  };

  const handleSubmit = async (e) => {
    try {
      // setLoading(true);
      e.persist();
      e.preventDefault();
      handleValidate();
      if (!error) {
        setLoading(true);
        const newStorage = {
          name,
          place: `${place.value}`,
        };

        // console.log('newStorage', newStorage);
        await updateStorage(
          newStorage,
          getStorageId(),
          hostContext,
          userContext
        );
        props?.navigate?.('../', { replace: true });

        setLoading(false);
      } else {
        setError(language?.signUp?.error?.general || '');
        setLoading(false);
      }
    } catch (error: any) {
      const message = await translateText(
        'AIzaSyADq2LAWuqexdzpgMFvDsxo7JDuEBXMsdk',
        error.message,
        language?.format?.locale
      );
      notification.setError(true);
      notification.setText(message);
      setLoading(false);
    }
  };

  return (
    <Loading loading={loading}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input
          name="name"
          type="text"
          value={name}
          aria-label={language?.signUp?.name}
          placeholder={language?.signUp?.name}
          setValue={setName}
        />
        {nameError !== '' && nameError !== ' ' ? (
          <Error>{nameError}</Error>
        ) : null}
        <br />
        <Select
          defaultValue={place}
          placeholder={language?.places?.selectPlace}
          isClearable={true}
          isSearchable={false}
          value={place}
          onChange={setPlace}
          options={places}
          // @ts-ignore
          styles={selectStyle(props)}
        />
        <br />
        <Input
          type="submit"
          disabled={disabled}
          onClick={(e) => {
            if (!disabled) handleSubmit(e);
          }}
          value={language?.places?.save}
        ></Input>
      </Form>
    </Loading>
  );
};

export default withTheme(Storage);
