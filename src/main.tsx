import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { store } from '@/store';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { authRoutes } from '@/routs/authRoutes.tsx';
import { dashboardRoutes } from '@/routs/dashboardRoutes.tsx';
import { StrictMode } from 'react';

export const appRoutes = createBrowserRouter(
  [
    {
      errorElement: <div>Something went wrong</div>,
      element: <App/>,
      children: [
        ...authRoutes,
        ...dashboardRoutes,
      ],
    },
  ],
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={ store }>
      <RouterProvider router={ appRoutes }/>
    </Provider>,
  </StrictMode>,
);
