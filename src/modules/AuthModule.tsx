import { useAuth } from '@/hooks/useAuth';
import { type ReactElement, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const AuthModule = (): ReactElement => {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // not checked
    if (!auth.checked) {
      void auth.check();

      return;
    }

    if (auth.checked) {
      navigate(location.state?.from || '/dashboard', { replace: true });

      return;
    }
  }, [auth.checked]);

  return <Outlet/>;
};

export default AuthModule;
