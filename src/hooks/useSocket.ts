import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useColumn } from '@/hooks/useColumn';

const socket = io(import.meta.env.VITE_WS_URL, {
  transports: ['websocket'],
});

export const useSocket = () => {
  const { load } = useColumn();

  useEffect(() => {
    socket.on('connect', () => {
      console.log('✅ Connected to WebSocket');
    });

    socket.on('columnCreated', () => {
      load();
    });

    socket.on('taskCreated', () => {
      load();
    });

    socket.on('taskUpdated', () => {
      load();
    });

    socket.on('taskBatchUpdated', () => {
      load();
    });

    socket.on('taskDeleted', () => {
      load();
    });

    return () => {
      socket.disconnect();
    };
  }, [load]);

  return { socket };
};
