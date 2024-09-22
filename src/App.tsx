import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { routes } from './Components/router/router';

interface Props {
  // Define your component's props here
}

export const App: React.FC<Props> = () => {
  // Implement your component's logic here

  return (
    <RouterProvider router={ routes} ></RouterProvider>
  );
};
