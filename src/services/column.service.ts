import { api } from '@/lib/api';
import type { BoardColumn, ColumnFormData } from '@/types/types.ts';

export const columnService = {
  async getList(): Promise<BoardColumn[]> {
    const response = await api.get('/columns');

    return response.data;
  },

  async create(value: ColumnFormData): Promise<BoardColumn> {
    const response = await api.post('/columns', value);

    return response.data;
  },

  async batchUpdate(value: ColumnFormData[]): Promise<BoardColumn[]> {
    const response = await api.patch('/columns/batch', value);

    return response.data;
  },
};
