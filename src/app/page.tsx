'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
import 'bootstrap/dist/css/bootstrap.css';
import React, {
  // Dispatch,
  // SetStateAction,
  // useContext,
  useEffect,
  useState,
} from 'react';
import Router from '../components/Router';
import { BrowserRouter } from 'react-router-dom';
// import {
//   //GetServerSideProps,
//   GetStaticProps,
// } from 'next';
import { decode } from 'jsonwebtoken';

import HostModel from '../models/hostModel';

import Head from 'next/head';
import {
  isSignedIn,
  refreshToken,
  signOut as basicSignOut,
  UserFlow,
  UserType,
} from 'minimal-components-react/dist/contexts/user';
import { default as lightTheme } from '../styles/themes/light.json';
import { default as darkTheme } from '../styles/themes/dark.json';
import { default as langBR } from '../contexts/language/langBR.json';
import { default as langEN } from '../contexts/language/langEN.json';
import { HostContext } from '../contexts/host/context';
import { UserContext } from '../contexts/user/context';
import UserModel from '../models/userModel';
import {
  CartContext,
  getCart,
  getNumberOfItems,
  getQuantity,
} from '../contexts/cart/context';
import {
  LanguageContext,
  LanguageSetterContext,
} from '../contexts/language/context';
import { ThemeSetterContext } from '../contexts/theme/context';
import NotificationContext from '../contexts/notification/context';
import { ThemeProvider } from 'styled-components';
// import ProductModel from '../models/productModel';
import { MenuContext } from '../contexts/menu/context';

// import {
// IonApp,
// IonRouterOutlet,
// IonSplitPane,
// setupIonicReact
// } from '@ionic/react';
// import { IonReactRouter } from '@ionic/react-router';
// import { translateText } from 'minimal-components-react/dist/request/translate';
// import { LanguageContext } from '../lang/context';
// import jwt from 'jsonwebtoken';
// import { StatusBar, Style } from '@capacitor/status-bar';

// setupIonicReact({});

// window.matchMedia("(prefers-color-scheme: dark)").addListener(async (status) => {
//   try {
//     await StatusBar.setStyle({
//       style: status.matches ? Style.Dark : Style.Light,
//     });
//   } catch {}
// });

// const AppShell = () => {
//   return (
//     <IonApp>
//       <IonReactRouter>
//         <IonSplitPane contentId="main">
//           <Menu />
//           <IonRouterOutlet id="main">
//             <Route path="/tabs" render={() => <Tabs />} />
//             <Route exact path="/" render={() => <Redirect to="/tabs" />} />
//           </IonRouterOutlet>
//         </IonSplitPane>
//       </IonReactRouter>
//     </IonApp>
//   );
// };

const menus = ['regular', 'transparent', 'inverted'];

const Index = (props: { token: string; host: HostModel; handleToken }) => {
  const [currentLanguage, setCurrentLanguage] = useState(langBR);
  const [currentTheme, setCurrentTheme] = useState(lightTheme);
  const [currentMenu, setCurrentMenu] = useState<number | undefined>(0);
  const [host, setHost] = useState<HostModel | undefined>(props?.host);
  const [currentToken, setCurrentToken] = useState<string | undefined>(
    (typeof window !== 'undefined' && localStorage?.getItem?.('current' + 2)) ||
      undefined
  );
  const [lastToken, setLastToken] = useState<string | undefined>(
    (typeof window !== 'undefined' && localStorage?.getItem?.('current' + 1)) ||
      undefined
  );
  const [baseToken, setBaseToken] = useState<string | undefined>(
    (typeof window !== 'undefined' && localStorage?.getItem?.('current' + 0)) ||
      undefined
  );
  const [currentUser, setCurrentUser] = useState<UserModel | undefined>(
    undefined
  );
  const [lastUser, setLastUser] = useState<UserModel | undefined>(undefined);
  const [baseUser, setBaseUser] = useState<UserModel | undefined>(undefined);
  const [currentTimeout, setCurrentTimeout] = useState<
    NodeJS.Timeout | undefined
  >(undefined);
  const [lastTimeout, setLastTimeout] = useState<NodeJS.Timeout | undefined>(
    undefined
  );
  const [baseTimeout, setBaseTimeout] = useState<NodeJS.Timeout | undefined>(
    undefined
  );
  const [currentTimeoutFunction, setCurrentTimeoutFunction] = useState<
    NodeJS.Timeout | undefined
  >(undefined);
  const [lastTimeoutFunction, setLastTimeoutFunction] = useState<
    NodeJS.Timeout | undefined
  >(undefined);
  const [baseTimeoutFunction, setBaseTimeoutFunction] = useState<
    NodeJS.Timeout | undefined
  >(undefined);
  const [favicon, _setFavicon] = useState('/favicon.svg');
  const [cart, setCurrentCart] = useState(getCart());
  const [quantity, setQuantity] = useState(getQuantity());
  const [numberOfItems, setNumberOfItems] = useState(getNumberOfItems());
  const [notificationText, setNotificationText] = useState<string | undefined>(
    undefined
  );
  const [notificationChildren, setNotificationChildren] = useState<
    [] | undefined
  >([]);
  const [notificationError, setNotificationError] = useState<
    boolean | undefined
  >(false);
  const [notificationTimer, setNotificationTimer] = useState<
    number | undefined
  >(60000);

  const [isBrowser, setIsBrowser] = useState<boolean | undefined>(false);

  const [isBrowserDark, setIsBrowserDark] = useState<boolean | undefined>(
    false
  );

  const toggleLanguage = () => {
    switch (currentLanguage) {
      case langEN:
        setCurrentLanguage(langBR);
        break;
      case langBR:
        setCurrentLanguage(langEN);
        break;
    }
    return currentLanguage;
  };

  const toggleTheme = () => {
    switch (currentTheme) {
      case lightTheme:
        setCurrentTheme(darkTheme);
        break;
      case darkTheme:
        setCurrentTheme(lightTheme);
        break;
    }
  };

  const toggleMenu = () => {
    const cMenu = currentMenu || 0;
    if (cMenu < menus.length - 1) setCurrentMenu(cMenu + 1);
    else setCurrentMenu(0);
  };

  useEffect(() => {
    let systemTheme = lightTheme;
    if (isBrowserDark) systemTheme = darkTheme;
    setCurrentTheme(systemTheme);

    const detectBrowserLanguage = require('detect-browser-language');
    if (
      detectBrowserLanguage() &&
      (detectBrowserLanguage().toLowerCase().includes('en') ||
        detectBrowserLanguage().toLowerCase().includes('us'))
    )
      setCurrentLanguage(langEN);
    else setCurrentLanguage(langBR);
  }, []);

  const setTimeoutFunction = (userFlow: UserFlow, timeout) => {
    switch (userFlow) {
      case UserFlow.current:
        return setCurrentTimeoutFunction(timeout);

      case UserFlow.last:
        return setLastTimeoutFunction(timeout);

      default:
        return setBaseTimeoutFunction(timeout);
    }
  };

  const getTimeoutFunction = (userFlow: UserFlow) => {
    switch (userFlow) {
      case UserFlow.current:
        return currentTimeoutFunction;

      case UserFlow.last:
        return lastTimeoutFunction;

      default:
        return baseTimeoutFunction;
    }
  };

  const setTimeout = (userFlow: UserFlow, timeout) => {
    switch (userFlow) {
      case UserFlow.current:
        return setCurrentTimeout(timeout);

      case UserFlow.last:
        return setLastTimeout(timeout);

      default:
        return setBaseTimeout(timeout);
    }
  };

  const getTimeout = (userFlow: UserFlow) => {
    switch (userFlow) {
      case UserFlow.current:
        return currentTimeout;

      case UserFlow.last:
        return lastTimeout;

      default:
        return baseTimeout;
    }
  };

  const setToken = (userFlow: UserFlow, token) => {
    switch (userFlow) {
      case UserFlow.current:
        return setCurrentToken(token);

      case UserFlow.last:
        return setLastToken(token);

      default:
        return setBaseToken(token);
    }
  };

  const getToken = (userFlow: UserFlow) => {
    switch (userFlow) {
      case UserFlow.current:
        return currentToken;

      case UserFlow.last:
        return lastToken;

      default:
        return baseToken;
    }
  };

  const setUser = (userFlow: UserFlow, user) => {
    switch (userFlow) {
      case UserFlow.current:
        // console.log('setCurrentUser on setUser', user);
        // console.log('setCurrentUser on setUser', typeof user);
        return setCurrentUser(user);

      case UserFlow.last:
        return setLastUser(user);

      default:
        return setBaseUser(user);
    }
  };

  const refreshCurrentToken = async (
    address?: string,
    path?: string,
    data?,
    offset?: number
  ) =>
    refreshToken(
      getToken.bind(this),
      setToken.bind(this),
      setUser.bind(this),
      getTimeout.bind(this),
      setTimeout.bind(this),
      getTimeoutFunction.bind(this),
      setTimeoutFunction.bind(this),
      address,
      path,
      data,
      offset
      // 'put'
    );

  const signOut = async () => {
    setCurrentToken(undefined);
    setCurrentUser(undefined);
    setCurrentTimeout(undefined);
    setLastToken(undefined);
    setLastUser(undefined);
    setLastTimeout(undefined);
    setBaseToken(undefined);
    setBaseUser(undefined);
    setBaseTimeout(undefined);
    return basicSignOut(
      getToken.bind(this),
      setToken.bind(this),
      setUser.bind(this),
      getTimeout.bind(this),
      setTimeout.bind(this),
      getTimeoutFunction.bind(this),
      setTimeoutFunction.bind(this),
      undefined,
      undefined,
      true
    );
  };

  const doSignOut = () => {
    return signOut();
  };

  const isHidden = (
    item?: {
      content?: string;
      href?: string;
    },
    userTypes?: UserType[]
  ): boolean => {
    // console.log('isHidden', item, userTypes);

    const filteredUserTypes = userTypes?.filter?.(
      (userType) => userType !== UserType.seller
    );
    const signedIn = isSignedIn(currentUser, filteredUserTypes);
    if (
      item?.href === '' ||
      item?.href === '/orders' ||
      item?.href == undefined
    ) {
      // console.log('isHidden', item, !signedIn, signedIn);
      return !signedIn;
    } else if (item?.href === '/signIn' || item?.href === '/signUp') {
      // console.log('isHidden', item, signedIn, signedIn);
      return signedIn;
    }
    return false;
  };

  useEffect(() => {
    if (typeof window !== 'undefined') setIsBrowser(true);
    if (
      isBrowser &&
      window &&
      window?.matchMedia &&
      window?.matchMedia('(prefers-color-scheme: dark)')?.matches
    )
      setIsBrowserDark(true);
  });

  useEffect(() => {}, [isBrowser, isBrowserDark]);

  useEffect(() => {}, [favicon]);

  useEffect(() => {}, [
    currentToken,
    lastToken,
    baseToken,
    currentUser,
    lastUser,
    baseUser,
    currentTimeout,
    lastTimeout,
    baseTimeout,
    currentTimeoutFunction,
    lastTimeoutFunction,
    baseTimeoutFunction,
  ]);

  useEffect(() => {
    // console.log('useEffect index');
    if (typeof window !== 'undefined') {
      const currentToken = localStorage?.getItem?.('current' + 2) || undefined;
      const lastToken = localStorage?.getItem?.('current' + 1) || undefined;
      const baseToken = localStorage?.getItem?.('current' + 0) || undefined;

      setCurrentToken(currentToken);
      setLastToken(lastToken);
      setBaseToken(baseToken);

      setCurrentUser(decode(currentToken));
      setLastUser(decode(lastToken));
      setBaseUser(decode(baseToken));
    } else {
      // console.log('You are on the server');
    }
  }, []);

  const clearCart = () => {
    setCurrentCart([]);
  };

  const setToCart = (newProduct: any) => {
    // console.log('setToCart', newProduct);

    const oldCart = JSON.parse(JSON.stringify(cart));

    if (newProduct && newProduct.colors && newProduct.colors.length > 0) {
      const newColor = newProduct?.colors[0];
      const newSize = newColor?.sizes ? newColor.sizes[0] : undefined;

      // console.log('newColor', newColor);
      // console.log('newSize', newSize);
      if (newSize) {
        const oldProductIndex = oldCart.findIndex(
          (product) => product.id === newProduct?.id
        );

        const oldProduct = oldCart[oldProductIndex];

        // console.log('oldProduct:', oldProduct);
        // console.log('newProduct:', newProduct);

        const oldColorIndex = oldProduct.colors.findIndex(
          (color) => color.id === newColor?.id
        );
        const oldColor = oldProduct.colors[oldColorIndex];
        // console.log('oldColor:', oldColor);

        const oldSizeIndex = oldColor.sizes.findIndex(
          (size) => size.id === newSize?.id
        );
        const oldSize = oldColor.sizes[oldSizeIndex];
        // console.log('oldSize:', oldSize);
        // console.log('newSize:', newSize);
        if (oldSize && newSize) {
          // console.log('oldSize:', oldSize);
          // console.log('newSize:', newSize);
          // alert('oldSize:' + oldSize?.quantity);
          // alert('newSize:' + newSize?.quantity);

          const oldQuantity = oldSize?.quantity || 0;
          oldSize.quantity = newSize?.quantity || oldQuantity || 0;
          oldColor.quantity =
            oldColor.quantity -
            oldQuantity +
            (newSize?.quantity ? newSize?.quantity : 0);
          oldProduct.quantity =
            oldProduct.quantity -
            oldQuantity +
            (newSize?.quantity ? newSize?.quantity : 0);

          // console.log('new size quantity:', oldSize.quantity);
          // console.log('new color quantity:', oldColor.quantity);
          // console.log('new product quantity:', oldProduct.quantity);
        }
        // console.log('cart:', oldCart);
        // alert('stop:');

        // newCart.push(newProduct);
        setCurrentCart(oldCart);
      }
    }
  };

  const addToCart = (newProduct: any) => {
    // console.log('addToCart',newProduct);
    const newCart = JSON.parse(JSON.stringify(cart));
    if (newProduct && newProduct.colors && newProduct.colors.length > 0) {
      const newColor = newProduct?.colors[0];
      if (
        newColor &&
        newColor?.sizes &&
        newColor?.sizes.length > 0 &&
        newColor?.sizes[0] &&
        newColor.sizes[0].quantity != undefined //&&
        // newColor.sizes[0].quantity > 0
      ) {
        const newSize = newColor?.sizes[0];
        const product = newCart.find(
          (product) => product?.id === newProduct?.id
        );
        if (product) {
          if (product.colors) {
            const color = product.colors.find(
              (color) => color.id === newColor.id
            );
            if (color) {
              if (color.sizes) {
                const size = color.sizes.find((size) => size.id === newSize.id);
                if (size) {
                  size.quantity = size.quantity || 0;
                  size.quantity += newSize.quantity || 0;
                  size.quantity =
                    (size.quantity > size?.maxQuantity
                      ? size?.maxQuantity
                      : size?.quantity) || 0;
                } else {
                  color.sizes.push(newSize);
                }
              } else {
                color.sizes = [];
                color.sizes.push(newSize);
              }
              color.quantity = color.sizes.reduce(
                (acc, size) => acc + size.quantity,
                0
              );
            } else {
              product.colors.push(newColor);
            }
          } else {
            product.colors = [];
            product.colors.push(newColor);
          }
          product.quantity = product.colors.reduce(
            (acc, color) => acc + color.quantity,
            0
          );
        } else {
          newCart.push(newProduct);
        }
        setCurrentCart(newCart);
      }
    }
  };

  const subFromCart = (removeProduct: any) => {
    // console.log('subFromCart',removeProduct);
    const newCart = JSON.parse(JSON.stringify(cart));
    if (
      removeProduct &&
      removeProduct.colors &&
      removeProduct.colors.length > 0
    ) {
      const removeColor = removeProduct?.colors[0];
      if (
        removeColor &&
        removeColor?.sizes &&
        removeColor?.sizes.length > 0 &&
        removeColor?.sizes[0] &&
        removeColor.sizes[0].quantity != undefined &&
        removeColor.sizes[0].quantity > 0
      ) {
        const removeSize = removeColor?.sizes[0];
        const productIndex = newCart.findIndex(
          (product) => product.id === removeProduct.id
        );
        const product = newCart[productIndex];
        if (product) {
          if (product.quantity <= 0) {
            newCart.splice(productIndex, 1);
          } else if (product.colors) {
            const colorIndex = product.colors.findIndex(
              (color) => color.id === removeColor.id
            );
            const color = product.colors[colorIndex];
            if (color) {
              if (color.quantity <= 0) {
                product.colors.splice(colorIndex, 1);
              } else if (color.sizes) {
                const sizeIndex = color.sizes.findIndex(
                  (size) => size.id === removeSize.id
                );
                const size = color.sizes[sizeIndex];
                if (size) {
                  size.quantity = size.quantity || 0;
                  size.quantity -= removeSize.quantity || 0;
                  if (size.quantity <= 0) {
                    color.sizes.splice(sizeIndex, 1);
                  }
                }
              }
              color.quantity = color.sizes.reduce(
                (acc, size) => acc + size.quantity,
                0
              );
            }
          }
          product.quantity = product.colors.reduce(
            (acc, color) => acc + color.quantity,
            0
          );
        }
        setCurrentCart(newCart);
      }
    }
  };

  useEffect(() => {}, [host]);
  useEffect(() => {
    setHost(props?.host);
  }, [props, props?.host]);
  useEffect(() => {}, [props.host]);
  return (
    <HostContext.Provider
      value={{
        setHost: setHost,
        host: host,
      }}
    >
      <UserContext.Provider
        value={{
          token: {
            refresh: refreshCurrentToken,
            current: currentToken,
          },

          current: currentUser,

          signOut: signOut,
          // @ts-ignore
          doSignOut: doSignOut,
          isHidden: isHidden,
        }}
      >
        <ThemeSetterContext.Provider
          value={{ setTheme: setCurrentTheme, toggleTheme }}
        >
          <ThemeProvider theme={currentTheme}>
            <MenuContext.Provider
              value={{
                setMenu: setCurrentMenu,
                toggleMenu,
                menus,
                menu: currentMenu,
              }}
            >
              <LanguageSetterContext.Provider
                value={{ setLanguage: setCurrentLanguage, toggleLanguage }}
              >
                <LanguageContext.Provider value={currentLanguage}>
                  <CartContext.Provider
                    value={{
                      cart,
                      setCart: setCurrentCart,
                      quantity: quantity,
                      setQuantity,
                      numberOfItems: numberOfItems,
                      setNumberOfItems,
                      addToCart,
                      subFromCart,
                      clearCart,
                      setToCart,
                    }}
                  >
                    <NotificationContext.Provider
                      value={{
                        timer: notificationTimer,
                        children: notificationChildren,
                        text: notificationText,
                        error: notificationError,
                        setTimer: setNotificationTimer,
                        setChildren: setNotificationChildren,
                        setText: setNotificationText,
                        setError: setNotificationError,
                      }}
                    >
                      {
                        <>
                          <Head>
                            <link
                              rel="shortcut icon"
                              id="favicon"
                              className="favicon"
                              href={favicon}
                            />
                          </Head>
                          {isBrowser && (
                            <BrowserRouter>
                              <Router />
                            </BrowserRouter>
                          )}
                        </>
                      }
                    </NotificationContext.Provider>
                  </CartContext.Provider>
                </LanguageContext.Provider>
              </LanguageSetterContext.Provider>
            </MenuContext.Provider>
          </ThemeProvider>
        </ThemeSetterContext.Provider>
      </UserContext.Provider>
    </HostContext.Provider>
  );
};

export default Index;
