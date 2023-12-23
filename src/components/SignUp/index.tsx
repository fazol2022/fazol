/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect, useRef, useState } from 'react';
import { LanguageContext } from '../../contexts/language/context';
import { Text, Error } from 'minimal-components-react/dist/components/Text';
import { HostContext } from '../../contexts/host/context';
import NotificationContext from '../../contexts/notification/context';
import { translateText } from 'minimal-components-react/dist/requests/translate';
import GoogleLogin from 'react-google-login';
import Input from 'minimal-components-react/dist/components/Input';
import Loading from '../Loading';
import { withTheme } from 'styled-components';
import { Form } from 'minimal-components-react/dist/components/Content';

const SignUp = (_props?: { navigate? }) => {
  const notification = useContext(NotificationContext);
  const hostContext = useContext(HostContext);
  const [_gToken, setGToken] = useState({});
  const language = useContext(LanguageContext);
  const [givenName, setGivenName] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [error, setError] = useState('');
  const [givenNameError, setGivenNameError] = useState('');
  const [familyNameError, setFamilyNameError] = useState('');
  const [birthdayError, setBirthdayError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    if (email !== '' && email !== ' ') {
      setEmailError('');
    }
  }, [email]);

  useEffect(() => {
    if (password !== '' && password !== ' ') {
      setPasswordError('');
    }
  }, [password]);

  useEffect(() => {
    if (givenName !== '' && givenName !== ' ') {
      setGivenNameError('');
    }
  }, [givenName]);

  useEffect(() => {
    if (familyName !== '' && familyName !== ' ') {
      setFamilyNameError('');
    }
  }, [familyName]);

  useEffect(() => {
    if (birthday !== '' && birthday !== ' ') {
      setBirthdayError('');
    }
  }, [birthday]);

  useEffect(() => {
    if (givenName && familyName && birthday && email && password) {
      setError('');
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  });

  const handleValidate = () => {
    let hasError = false;

    if (email === '' || email === ' ') {
      setEmailError(language?.signUp?.error?.email || '');
      hasError = true;
    }

    if (password === '' || password === ' ') {
      setPasswordError(language?.signUp?.error?.password || '');
      hasError = true;
    }

    if (givenName === '' || givenName === ' ') {
      setGivenNameError(language?.signUp?.error?.givenName || '');
      hasError = true;
    }

    if (familyName === '' || familyName === ' ') {
      setFamilyNameError(language?.signUp?.error?.familyName || '');
      hasError = true;
    }

    if (birthday === '' || birthday === ' ') {
      setBirthdayError(language?.signUp?.error?.birthday || '');
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
        // const newClient = {
        //   givenName,
        //   familyName,
        //   birthday
        // };
        // const received = await request(
        //   hostContext?.host?.signUpPath,
        //   'post',
        //   undefined,
        //   userContext?.token?.current,
        //   newClient
        // );
        // const user = received?.data;
        // if (user) {
        //   setUser(user);
        //   navigate('../', { replace: true });
        // }
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

  const login = async (response) => {
    setLoading(true);

    setGToken({
      accessToken: response.accessToken,
      tokenId: response.tokenId,
    });

    setEmail(response.profileObj.email);
    setLoading(false);
  };

  const failure = (response?) => {
    // console.error('failure:', response);
    setError((language?.signUp?.error?.specific || '') + 'failure:' + response);
    setEmail('');
    setGToken({});
    setLoading(false);
  };

  return (
    /* @ts-ignore */
    <Loading loading={loading}>
      <Text
        sizeType={'h2'}
        style={{ paddingTop: '15px', paddingBottom: '10px', width: '100%' }}
      >
        {language?.signUp?.title}
      </Text>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input
          name="givenName"
          type="text"
          value={givenName}
          aria-label={language?.signUp?.givenName}
          placeholder={language?.signUp?.givenName}
          setValue={setGivenName}
        />
        {givenNameError !== '' && givenNameError !== ' ' ? (
          <Error>{givenNameError}</Error>
        ) : null}
        <br />
        <Input
          name="familyName"
          type="text"
          value={familyName}
          aria-label={language?.signUp?.familyName}
          placeholder={language?.signUp?.familyName}
          setValue={setFamilyName}
        />
        {familyNameError !== '' && familyNameError !== ' ' ? (
          <Error>{familyNameError}</Error>
        ) : null}
        <br />
        <Input
          name="birthday"
          type="date"
          singleLine
          value={birthday}
          label={language?.signUp?.birthday}
          aria-label={language?.signUp?.birthday}
          placeholder={language?.signUp?.birthday}
          setValue={setBirthday}
        />
        {birthdayError !== '' && birthdayError !== ' ' ? (
          <Error>{birthdayError}</Error>
        ) : null}
        <br />
        <Input
          name="email"
          type="email"
          value={email}
          aria-label={language?.signUp?.email}
          placeholder={language?.signUp?.email}
          setValue={setEmail}
        />
        {emailError !== '' && emailError !== ' ' ? (
          <Error>{emailError}</Error>
        ) : null}
        <br />
        <Input
          name="password"
          type="password"
          value={password}
          aria-label={language?.signUp?.password}
          placeholder={language?.signUp?.password}
          setValue={setPassword}
        />
        {passwordError !== '' && passwordError !== ' ' ? (
          <Error>{passwordError}</Error>
        ) : null}
        <br />
        <Input
          type="submit"
          disabled={disabled}
          onClick={(e) => {
            if (!disabled) handleSubmit(e);
          }}
          value={language?.signUp?.submit}
        ></Input>
        <br />
        <GoogleLogin
          render={(renderProps) => (
            <Input
              type="button"
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              value={language?.signUp?.gSignUp}
            />
          )}
          clientId={hostContext?.host?.google.clientId || ''}
          onSuccess={login}
          onFailure={failure}
          responseType="code,token"
        />
      </Form>
    </Loading>
  );
};

export default withTheme(SignUp);
