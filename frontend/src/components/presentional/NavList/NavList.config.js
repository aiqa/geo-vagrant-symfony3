import React from 'react';

import Home from '@material-ui/icons/Home';
import LocationCity from '@material-ui/icons/LocationCity';
import Terrain from '@material-ui/icons/Terrain';
import DirectionsBoat from '@material-ui/icons/DirectionsBoat';

const routes = [
  {
    name: 'Home',
    path: '/',
    icon: <Home />,
  },
  {
    name: 'Cities',
    path: '/city',
    icon: <LocationCity />,
  },
  {
    name: 'Rivers',
    path: '/river',
    icon: <DirectionsBoat />,
  },
  {
    name: 'Mountains',
    path: '/mountain',
    icon: <Terrain />,
  },
];

export default routes;
