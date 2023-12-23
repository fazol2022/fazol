/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable no-constant-condition */
/* eslint-disable prettier/prettier */
import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Home from '../Home';
import Layout from '../Layout';
import NotFound from 'minimal-components-react/dist/components/NotFound';
import SignUp from '../SignUp';
import SignIn from '../SignIn';
import { withTheme } from 'styled-components';

const useQuery = () => {
  const { search } = useLocation();
  const query = useMemo(() => new URLSearchParams(search), [search]);
  return query;
};

const Router = (props: { title?: string }) => {
  const navigate = useNavigate();
  const location = useLocation();
  // console.log('Router props', navigate, location);

  const [title, setTitle] = useState(props?.title || '');
  const [search, setSearch] = useState('');
  const query = useQuery();
  const get = (param) => {
    const result = query.get(param) || undefined;
    return result;
  };

  // @ts-ignore
  const [signedIn, _setSignedIn] = useState<boolean>(false);

  // isSignedIn(props.host.publicKey).then((signedIn) => {
  //   setSignedIn(signedIn);
  // });

  // useEffect(() => {} , [signedIn]);

  console.log('get("id")', get('id'));
  console.log('query', useQuery());

  useEffect(() => {}, [title, setTitle]);

  useEffect(() => {}, [search, setSearch]);

  return (
    <Fragment>
      <Layout
        title={title}
        setTitle={setTitle}
        search={search}
        setSearch={setSearch}
      >
        <Routes>
          <Route path="/">
            { true ? (
              <>
                <Route path="">
                  <Route
                    path=""
                    element={
                      <Home
                        navigate={navigate}
                        location={location}
                        type={'place'}
                        title={title}
                        setTitle={setTitle}
                        search={search}
                        setSearch={setSearch}
                      />
                    }
                  />
                </Route>
              </>
            ) : (
              <>
                <Route
                  path="signUp"
                  element={<SignUp navigate={navigate} location={location} />}
                />
                <Route
                  path="signIn"
                  element={<SignIn navigate={navigate} location={location} />}
                />
                <Route
                  path=""
                  element={<SignIn navigate={navigate} location={location} />}
                />
              </>
            )}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Layout>
    </Fragment>
  );
};

export default withTheme(Router);
