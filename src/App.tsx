import { Outlet } from 'react-router-dom';
import { useSocket } from '@/hooks/useSocket.ts';

function App() {
  useSocket();

  return (
    <Outlet/>
  );
}

export default App;
