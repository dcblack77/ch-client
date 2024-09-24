// src/App.tsx

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import { routes } from './Components/router/router'

// Crear un cliente de React Query
const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes} />
    </QueryClientProvider>
  );
};

export default App;





// import React from 'react';
// import { RouterProvider } from 'react-router-dom';
// import { routes } from './Components/router/router';

// interface Props {
//   // Define your component's props here
// }

// export const App: React.FC<Props> = () => {
//   // Implement your component's logic here

//   return (
//     <RouterProvider router={ routes} ></RouterProvider>
//   );
// };
