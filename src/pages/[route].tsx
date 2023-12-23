// import { GetStaticPaths, GetStaticPathsResult } from 'next';
// import { default as map } from '../maps/map.json';

import Index, {
  //getServerSideProps,
  getStaticProps,
} from '.';
// import { ParsedUrlQuery } from 'querystring';

// const getStaticPaths: GetStaticPaths = async () => {
//   const routes = [
//     ...new Set([
//       ...Object.values(map?.pages || {}),
//       ...Object.keys(map?.pages || {}),
//     ]),
//   ].filter(
//     (route) =>
//       route !== '/' &&
//       route !== '' &&
//       !(route as string)?.includes('http') &&
//       !(route as string)?.includes('videos')
//   );
//   const fullRoutes = routes.map((route) => ({
//     params: {
//       route,
//     },
//   }));

//   const fullroute = {
//     paths: fullRoutes,
//     fallback: true,
//   } as unknown as GetStaticPathsResult<ParsedUrlQuery>;
//   return fullroute;
// };

export default Index;
export {
  // getServerSideProps,
  getStaticProps,
  // getStaticPaths,
};
