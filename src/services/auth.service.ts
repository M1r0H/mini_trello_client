import { api } from '@/lib/api';
import type { AuthResponse } from '@/types/types.ts';

export const authService = {
  async checkAuth(): Promise<AuthResponse> {
    const response = await api.get('/auth');

    return response.data;
  },

  async login(payload: { email: string }): Promise<AuthResponse> {
    const response = await api.post('/auth/login', { email: payload.email });

    return response.data;
  },

  async register(payload: { email: string }): Promise<AuthResponse> {
    const response = await api.post('/auth/registration', { email: payload.email });

    return response.data;
  },
};
