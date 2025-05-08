import { lazy } from 'react';
import { ProtectedRoute } from '@/routs/ProtectedRoute.tsx';
import { DashboardPage } from '@/pages/DashboardPage.tsx';

const DashboardModule = lazy(() => import('@/modules/DashboardModule'));

export const dashboardRoutes = [
  {
    path: '/dashboard',
    element: <ProtectedRoute path="/dashboard" component={(() => <DashboardModule/>)} />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
    ],
  },
];
