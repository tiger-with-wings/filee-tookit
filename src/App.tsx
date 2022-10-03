import React from 'react';
import './App.scss';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Index from './pages/Index';
import Composing from './pages/Composing';
import PrintIdCard from './pages/PrintIdCard';
import PrintResidenceBooklet from './pages/PrintResidenceBooklet';
import HealthCode from './pages/HealthCode';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Index />,
  },
  {
    path: '/composing',
    element: <Composing />,
  },
  {
    path: '/composing/id-card/:type',
    element: <PrintIdCard />,
  },
  {
    path: '/composing/residence-booklet/:type',
    element: <PrintResidenceBooklet />,
  },
  {
    path: '/composing/health-code/:type',
    element: <HealthCode />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
