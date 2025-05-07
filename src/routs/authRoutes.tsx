import { lazy } from 'react';
import LoginPage from '@/pages/LoginPage.tsx';

const AuthModule = lazy(() => import('@/modules/AuthModule'));

export const authRoutes = [
  {
    path: '/',
    element: <AuthModule/>,
    children: [
      {
        index: true,
        element: <LoginPage/>,
      },
    ],
  },
];
