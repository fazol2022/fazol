/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable no-constant-condition */
/* eslint-disable prettier/prettier */
import React, { Fragment, useEffect, useState } from 'react';
import Home from '../Home';
import Layout from '../Layout';
import { withTheme } from 'styled-components';

const Router = (props: { title?: string }) => {
  // console.log('Router props', navigate, location);

  const [title, setTitle] = useState(props?.title || '');
  const [search, setSearch] = useState('');

  // @ts-ignore
  const [signedIn, _setSignedIn] = useState<boolean>(false);

  useEffect(() => {}, [title, setTitle]);

  useEffect(() => {}, [search, setSearch]);

  return (
    <Fragment>
      {/* @ts-ignore */}
      <Layout
        title={title}
        setTitle={setTitle}
        search={search}
        setSearch={setSearch}
      >
        <Home
          /* @ts-ignore */
          title={title}
          setTitle={setTitle}
          search={search}
          setSearch={setSearch}
        />
      </Layout>
    </Fragment>
  );
};

export default withTheme(Router);
