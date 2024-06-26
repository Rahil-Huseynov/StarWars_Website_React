import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import People from './components/People/People';
import Films from './components/Films/Films';
import Planets from './components/Planets/Planets';
import Species from './components/Species/Species';
import Starships from './components/Starships/Starships';
import Vehicles from './components/Vehicles/Vehicles';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: 'people',
    element: <People />,
  },
  {
    path: 'films',
    element: <Films />
  },
  {
    path: 'planets',
    element: <Planets />
  },
  {
    path: 'species',
    element: <Species />
  },
  {
    path: 'starships',
    element: <Starships />
  },
  {
    path: 'vehicles',
    element: <Vehicles />
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
