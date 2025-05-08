import { type ReactElement } from 'react';
import { Outlet } from 'react-router-dom';
import { useColumn } from '@/hooks/useColumn.tsx';

const DashboardModule = (): ReactElement => {
  useColumn({
    autoload: true,
  });

  return <Outlet/>;
};

export default DashboardModule;
