/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable filenames/match-regex */
import './globals.css';
import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import 'nprogress/nprogress.css';

// config({ ssrFadeout: true });
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // console.log('App props', props);

  const page = (
    <html lang="pt-BR">
      <head>
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

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap"
          rel="stylesheet"
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
      </head>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
  return page;
}
