import React, { lazy } from 'react';

const Home = lazy(() => import('../components/containers/Home'));
const River = lazy(() => import('../components/containers/River'));
const City = lazy(() => import('../components/containers/City'));
const Mountain = lazy(() => import('../components/containers/Mountain'));
const PageNotFound = lazy(() =>
  import('../components/presentional/PageNotFound'),
);

const routerConfig = [
  {
    path: '/',
    exact: true,
    component: <Home />,
  },
  {
    path: '/river',
    exact: false,
    component: <River />,
  },
  {
    path: '/city',
    exact: false,
    component: <City />,
  },
  {
    path: '/mountain',
    exact: false,
    component: <Mountain />,
  },
  {
    path: '*',
    exact: false,
    component: <PageNotFound />,
  },
];

export default routerConfig;
