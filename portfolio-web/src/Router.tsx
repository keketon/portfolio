import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import RoutingErrorPage from './pages/RoutingErrorPage';
import PfGame from './pages/PfGame';
import GakCalculator from './pages/GakCalculator';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Home />,
      errorElement: <RoutingErrorPage />,
    },
    {
      path: '/about',
      element: <About />,
    },
    {
      path: '/pf-game',
      element: <PfGame />,
    },
    {
      path: '/gak-calculator',
      element: <GakCalculator />,
    },
  ],
  { basename: '/portfolio' }
);

const Router: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default Router;
