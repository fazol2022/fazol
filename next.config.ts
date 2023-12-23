import pwa from 'next-pwa';

module.exports = pwa({
  dest: 'public',
})({
  serverRuntimeConfig: {
    // Will only be available on the server side
    // index: stringify(Index),
    // index: serialize(Index),
  },
  async headers() {
    return [
      {
        // matching all API routes
        source: '/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization, authorization',
          },
        ],
      },
    ];
  },
  // .
  // ..
  // ... other Next.js config values
  webpack: (config) => {
    const assetRule = config.module.rules.find((rule) => {
      return rule?.loader === 'next-image-loader';
    });

    const assetLoader = {
      loader: assetRule.loader,
      options: assetRule.options || assetRule.query,
    };
    config.module.rules.unshift({
      test: /\.svg$/,
      use: ['@svgr/webpack', assetLoader],
    });
    config.module.rules = [{ oneOf: config.module.rules }];
    config.resolve.fallback = {
      ...config.resolve.fallback,
      vm: require.resolve('vm-browserify'),
      path: require.resolve('path-browserify'),
      timers: require.resolve('timers-browserify'),
      tty: require.resolve('tty-browserify'),
      os: require.resolve('os-browserify'),
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      zlib: require.resolve('browserify-zlib'),
      console: require.resolve('console-browserify'),
      constants: require.resolve('constants-browserify'),
      https: require.resolve('https-browserify'),
      http: require.resolve('stream-http'),
      domain: require.resolve('domain-browser'),
      assert: require.resolve('assert'),
      url: require.resolve('url'),
      fs: require.resolve('fs'),
      buffer: require.resolve('buffer'),
      events: require.resolve('events'),
      util: require.resolve('util'),
      punycode: require.resolve('punycode'),
      process: require.resolve('process/browser'),
      querystring: require.resolve('querystring-es3'),
      string_decoder: require.resolve('string_decoder'),
      sys: require.resolve('util'),
    };
    // config.entry = {
    //   pages: [
    //     './src/pages/_app.tsx',
    //     './src/pages/[route].tsx',
    //     './src/pages/index.tsx',
    //   ],
    // };
    // entry function
    // const originalEntry = config.entry;
    // config.entry = async () => {
    //   const entries = await originalEntry();
    //   if (
    //     entries['main.js'] &&
    //     !entries['main.js'].includes('./src/pages/_app.tsx')
    //   ) {
    //     entries['main.js'].unshift('./src/pages/_app.tsx');
    //   }
    //   return entries;
    // };
    return config;
  },
});
