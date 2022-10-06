import React from 'react';
import './App.scss';
import {
  createHashRouter,
  RouterProvider,
} from 'react-router-dom';
import Index from './pages/Index';
import Composing from './pages/Composing';
import PrintIdCard from './pages/Composing/PrintIdCard';
import PrintResidenceBooklet from './pages/Composing/PrintResidenceBooklet';
import PrintHealthCode from './pages/Composing/PrintHealthCode';
import CreatePrintOrder from './pages/CreatePrintOrder';

const router = createHashRouter([
  {
    path: '/',
    element: <Index />,
  },
  {
    path: '/composing',
    element: <Composing />,
    children: [
      {
        path: 'id-card/:type',
        element: <PrintIdCard />,
      },
      {
        path: 'residence-booklet/:type',
        element: <PrintResidenceBooklet />,
      },
      {
        path: 'health-code/:type',
        element: <PrintHealthCode />,
      },
    ]
  },
  {
    path: '/create-print-order',
    element: <CreatePrintOrder />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
