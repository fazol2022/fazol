import React, { useContext, useEffect, useRef, useState } from 'react';
import { LanguageContext } from '../../contexts/language/context';
import { Text, Error } from 'minimal-components-react/dist/components/Text';
import { GoogleLogin } from 'react-google-login';
// import NotificationContext from '../../notification/context';
// import LoadingBag from '../LoadingBag';
// import axios from 'axios';
import Input from 'minimal-components-react/dist/components/Input';
import { HostContext } from '../../contexts/host/context';
import { UserContext } from '../../contexts/user/context';
import Loading from '../Loading';
import { withTheme } from 'styled-components';
import { Form } from 'minimal-components-react/dist/components/Content';

const SignIn = (props?: { navigate? }) => {
  // const notification = useContext(NotificationContext);
  const hostContext = useContext(HostContext);
  const userContext = useContext(UserContext);
  const language = useContext(LanguageContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
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
    if (email) {
      setError('');
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  });

  const handleValidate = () => {
    let hasError = false;

    if (emailError !== '' && emailError != undefined) {
      hasError = true;
    }

    if (passwordError !== '' && passwordError != undefined) {
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

  const login = async (response) => {
    setLoading(true);
    const body = {
      type: 'GOOGLE',
      identification: response.profileObj.email,
    };
    try {
      await userContext?.token?.refresh(
        hostContext?.host?.authPath,
        undefined,
        body
      );

      setLoading(false);
    } catch (error) {
      console.error(error);
      setError((language?.signIn?.error?.specific || '') + error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.persist();
    e.preventDefault();
    handleValidate();

    const body = {
      type: 'LOCAL',
      identification: email,
      key: password,
    };

    if (!error) {
      try {
        await userContext?.token?.refresh(
          hostContext?.host?.authPath,
          undefined,
          body
        );
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError((language?.signIn?.error?.specific || '') + error);
        setLoading(false);
      }
    } else {
      setError(language?.signIn?.error?.general || '');
      setLoading(false);
    }
  };

  // const logout = () => {
  //   props.handleToken(undefined);
  //   setLoading(false);
  // };

  const failure = (response?) => {
    // console.error('failure:', response);
    setError((language?.signIn?.error?.specific || '') + 'failure:' + response);
    setLoading(false);
  };

  return (
    <Loading loading={loading}>
      <Text
        sizeType={'h2'}
        style={{ paddingTop: '15px', paddingBottom: '10px', width: '100%' }}
      >
        {language?.signIn?.title}
      </Text>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input
          name="email"
          type="email"
          value={email}
          aria-label={language?.signUp?.email}
          placeholder={language?.signUp?.email}
          title={language?.signUp?.email}
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
          title={language?.signUp?.password}
          setValue={setPassword}
        />
        {passwordError !== '' && passwordError !== ' ' ? (
          <Error>{passwordError}</Error>
        ) : null}
        <br />
        <Input
          type="button"
          disabled={disabled}
          onClick={(e) => {
            if (!disabled) handleSubmit(e);
          }}
          value={language?.signIn?.signIn}
        />
        <br />
        <GoogleLogin
          render={(renderProps) => (
            <Input
              type="button"
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              value={language?.signIn?.gSignIn}
            />
          )}
          clientId={hostContext?.host?.google?.clientId || ''}
          onSuccess={login}
          onFailure={failure}
          responseType="code,token"
        />
        <br />
        <Input
          type="button"
          onClick={() => {
            props?.navigate?.({ pathname: 'signUp' });
          }}
          value={language?.signIn?.signUp}
        />
      </Form>
    </Loading>
  );
};

export default withTheme(SignIn);
