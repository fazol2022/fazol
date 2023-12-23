/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useContext } from 'react';

import Header from '../../components/Header';
// @ts-ignore
import Footer from '../../components/Footer';

import NotificationContext from '../../contexts/notification/context';
import Notification from 'minimal-components-react/dist/components/Notification';
import { Wrapper } from 'minimal-components-react/dist/components/Content';

import { LayoutWrapper } from 'minimal-components-react/dist/components/Content';
import { UserContext } from '../../contexts/user/context';
import {
  isSignedIn,
  UserType,
} from 'minimal-components-react/dist/contexts/user';
import { withTheme } from 'styled-components';

// const menu = ['regular', 'transparent', 'inverted'];

const Layout = (props: {
  children?;
  title?: string;
  setTitle;
  search;
  setSearch;
}) => {
  //! TODO: Menu
  const userContext = useContext(UserContext);

  return (
    <>
      <Wrapper isBackground>
        <>
          {!isSignedIn(userContext?.current, [
            UserType.client,
            UserType.seller,
            UserType.regular,
          ]) && <Header setTitle={props?.setTitle} title={props?.title} />}
          {isSignedIn(userContext?.current, [
            UserType.client,
            UserType.seller,
            UserType.regular,
          ]) && <Notification context={NotificationContext} />}
          <LayoutWrapper id="mainLayoutWrapper">
            {props?.children}
          </LayoutWrapper>
          {/* {!isSignedIn(userContext?.current, [
            UserType.client,
            UserType.seller,
            UserType.regular,
          ]) && <Footer search={props?.search} setSearch={props?.setSearch} />} */}
        </>
      </Wrapper>
    </>
  );
};

export default withTheme(Layout);
