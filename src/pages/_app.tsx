/* eslint-disable filenames/match-regex */
import React from 'react';
import GlobalStyle from '../styles/global';
import config from 'react-reveal/globals';
import Router from 'next/router';
import NProgress from 'nprogress';
import Head from 'next/head';
import 'nprogress/nprogress.css';

//Binding events
Router.events.on('routeChangeStart', () => {
  NProgress.start();
});
Router.events.on('routeChangeComplete', (_url) => {
  NProgress.done();
});
Router.events.on('routeChangeError', () => {
  NProgress.done();
});

config({ ssrFadeout: true });
const App = (props: { Component; pageProps }) => {
  const page = (
    <>
      <Head>
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/react/15.1.0/react.min.js"
          defer
        ></script>

        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/react/15.1.0/react-dom.min.js"
          defer
        ></script>

        <link rel="icon" href="favicon.svg" />
        <link rel="manifest" href="/manifest.json" />

        <link
          rel="preload"
          href="/fonts/Spartan/Spartan-Thin.ttf"
          as="font"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/Spartan/Spartan-ExtraLight.ttf"
          as="font"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/Spartan/Spartan-Light.ttf"
          as="font"
          crossOrigin=""
        />

        <meta name="msapplication-TileColor" content="#fff" />
        <meta name="theme-color" content="#fff" />
        <meta name="keywords" content="catalog, catalogo, roupas, clothes" />
        <meta name="description" content="Catalog store" />
        <meta name="language" content="Portuguese" />
        <meta name="revisit-after" content="30 days" />
        <meta name="author" content="JL CONSULTING" />
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <props.Component {...props.pageProps} />
      <GlobalStyle />
    </>
  );
  return page;
};

export default App;
