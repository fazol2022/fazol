/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useContext, useEffect, useState } from 'react'; //, { useContext } from "react";
import { StyledFooter } from './styles';
import { withTheme } from 'styled-components';
import { HeaderWrapper } from '../Header/styles';
import Drawer from 'minimal-components-react/dist/components/Drawer';
import List from 'minimal-components-react/dist/components/List';
import { Toggle } from 'minimal-components-react/dist/components/Input/styles';
import ToggleButton from 'minimal-components-react/dist/components/Input/toggleButton';
import Input from 'minimal-components-react/dist/components/Input';
import { Link, useLocation } from 'react-router-dom';
import { FixedLink, Text } from 'minimal-components-react/dist/components/Text';
import {
  BasicItemHolder,
  IconItem,
  ItemHolder,
} from 'minimal-components-react/dist/components/Drawer/styles';
import { getPaths, notInPages } from 'minimal-components-react/dist/utils/path';
import { default as map } from '../../maps/map.json';
import { default as lightTheme } from '../../styles/themes/light.json';
import { default as darkTheme } from '../../styles/themes/dark.json';
import { Theme } from 'minimal-components-react/dist/components/Image/Icons/styles';

const Scroll = dynamic(
  () => import('minimal-components-react/dist/components/ScrollToSection'),
  {
    ssr: false,
  }
);

import IconModel from '../../models/iconModel';

import { UserContext } from '../../contexts/user/context';
import { CartContext } from '../../contexts/cart/context';
import {
  LanguageContext,
  LanguageSetterContext,
} from '../../contexts/language/context';
import dynamic from 'next/dynamic';
import { MenuContext } from '../../contexts/menu/context';
import { ThemeSetterContext } from '../../contexts/theme/context';
import { appendPath } from '../../util/util';

// const searchFullSize = 'calc(100% - 30px - 30px - 30px - 30px - 50px)';

const Footer = (props: { search; setSearch; theme }) => {
  // const navigate = useNavigate();
  const location = useLocation();
  const { quantity } = useContext(CartContext);
  const userContext = useContext(UserContext);
  const languageSetter = useContext(LanguageSetterContext);
  const themeSetter = useContext(ThemeSetterContext);
  const menu = useContext(MenuContext);
  const language = useContext(LanguageContext);
  const [navItems, _setNavItems] = useState<IconModel[]>([]);

  const getLogoLight = () => {
    return '/img/logo.svg';
  };

  const getLogoDark = () => {
    return '/img/logoInvert.svg';
  };

  const getAddLight = () => {
    return '/img/add.svg';
  };

  const getAddDark = () => {
    return '/img/addInvert.svg';
  };

  const getEditLight = () => {
    return '/img/edit.svg';
  };

  const getEditDark = () => {
    return '/img/editInvert.svg';
  };

  const [logoLight] = useState(getLogoLight());
  const [logoDark] = useState(getLogoDark());
  const [logo, setLogo] = useState(logoLight);

  const [addLight] = useState(getAddLight());
  const [addDark] = useState(getAddDark());
  const [add, setAdd] = useState(addLight);

  const [editLight] = useState(getEditLight());
  const [editDark] = useState(getEditDark());
  const [edit, setEdit] = useState(editLight);

  const [toLink, setToLink] = useState('');

  // const searchBaseSize = 'auto';
  // const [searchWidth, setSearchWidth] = useState(searchBaseSize);

  useEffect(() => {}, [navItems]);

  useEffect(() => {
    const logo =
      props.theme !== lightTheme || menu?.menu === 2 ? logoDark : logoLight;
    setLogo(logo);
  }, [logo, logoDark, props.theme]);

  useEffect(() => {
    const add =
      props.theme !== lightTheme || menu?.menu === 2 ? addDark : addLight;
    setAdd(add);
  }, [add, addDark, props.theme]);

  useEffect(() => {
    const edit =
      props.theme !== lightTheme || menu?.menu === 2 ? editDark : editLight;
    setEdit(edit);
  }, [edit, editDark, props.theme]);

  const themeIcon = (theme) => {
    return (
      <div style={{ margin: 20 }}>
        {theme !== lightTheme ? (
          <Theme
            viewBox="0 0 25 25"
            width="25"
            height="25"
            stroke={darkTheme.primary}
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            fill="none"
            shape-rendering="geometricPrecision"
          >
            <circle cx="12" cy="12" r="5"></circle>
            <path d="M12 1v2"></path>
            <path d="M12 21v2"></path>
            <path d="M4.22 4.22l1.42 1.42"></path>
            <path d="M18.36 18.36l1.42 1.42"></path>
            <path d="M1 12h2"></path>
            <path d="M21 12h2"></path>
            <path d="M4.22 19.78l1.42-1.42"></path>
            <path d="M18.36 5.64l1.42-1.42"></path>
          </Theme>
        ) : (
          <Theme
            viewBox="0 0 25 25"
            width="25"
            height="25"
            stroke={lightTheme.primary}
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            fill="none"
            shape-rendering="geometricPrecision"
          >
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
          </Theme>
        )}
      </div>
    );
  };

  useEffect(() => {}, [logo]);

  useEffect(() => {}, [quantity]);

  useEffect(() => {
    const names = getPaths(location?.pathname);
    console.log('names', names, location);
    switch (names?.length) {
      case 1:
        setToLink(appendPath(location?.pathname, 'storage'));
        break;

      case 2:
        setToLink(appendPath(location?.pathname, 'product'));
        break;

      default:
        setToLink(appendPath(location?.pathname, 'place'));
        break;
    }
  }, [location?.pathname]);

  useEffect(() => {}, [toLink]);

  // useEffect(() => {
  // }, [props.search]);

  return (
    <StyledFooter>
      {/* <Content> */}
      {/* @ts-ignore */}
      <HeaderWrapper menu={menu?.menu}>
        <Drawer
          top={false}
          navToggleIndexes={[0]}
          childrenCloseIndexes={[0]}
          nav={
            <>
              <List>
                <ToggleButton>
                  <Toggle>
                    <span></span>
                  </Toggle>
                </ToggleButton>
              </List>
              <List
                style={{
                  maxWidth: '100%',
                  width: '100%',
                  justifyContent: 'center',
                  // textAlign: 'center',
                  textAlign: '-webkit-center',
                }}
              >
                {notInPages(location?.pathname, language?.pages) ? (
                  <BasicItemHolder
                    style={{
                      maxWidth: '100%',
                      width: '100%',
                      justifyContent: 'center',
                      // textAlign: 'center',
                      textAlign: '-webkit-center',
                    }}
                  >
                    <Input
                      type="search"
                      name="search"
                      size={'20px'}
                      style={{
                        marginTop: '0px',
                        marginBottom: '0px',
                        fontSize: '16px',
                      }}
                      placeholder={language?.nav?.search}
                      setValue={(value) => {
                        props.setSearch(value);
                      }}
                      value={props.search}
                      // onfocus="this.placeholder = 'Search'"
                      // onblur="this.placeholder = ''"
                    />
                  </BasicItemHolder>
                ) : null}
              </List>
              <List style={{ color: 'red' }}>
                {notInPages(location?.pathname, language?.pages) &&
                toLink !== '' ? (
                  <BasicItemHolder>
                    <Link to={toLink}>
                      <FixedLink>
                        <IconItem
                          style={{ margin: '7.5px' }}
                          size={'large'}
                          src={add}
                          alt="add"
                        />
                      </FixedLink>
                    </Link>
                  </BasicItemHolder>
                ) : null}
              </List>
            </>
          }
        >
          <ItemHolder>
            <Text onClick={userContext?.doSignOut}>
              {language?.nav?.signOut}
            </Text>
          </ItemHolder>
          <ItemHolder>
            <div
              style={{
                minWidth: '100%',
                width: '100%',
                display: 'table-cell',
                //@ts-ignore
                textAlign: '-webkit-center',
              }}
              onClick={themeSetter?.toggleTheme}
            >
              {themeIcon(props.theme)}
            </div>
          </ItemHolder>
          <ItemHolder>
            <Text onClick={languageSetter?.toggleLanguage}>
              {language?.language}
            </Text>
          </ItemHolder>
        </Drawer>
        <Scroll map={map} />
      </HeaderWrapper>
    </StyledFooter>
  );
};

export default withTheme(Footer);
