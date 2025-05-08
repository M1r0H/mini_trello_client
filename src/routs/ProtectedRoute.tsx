import { Route } from 'wouter';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth.tsx';
import type { ProtectedRouteProps } from '@/types/types.ts';

export function ProtectedRoute(props: ProtectedRouteProps) {
  const { path, component: Component } = props;
  const { checked } = useAuth();
  const { pathname, search } = useLocation();

  return (
    <Route path={ path }>
      { () => {

        if (!checked) {
          return <Navigate to="/" state={ { from: pathname + search } }/>;
        }

        return <Component/>;
      } }
    </Route>
  );
}
