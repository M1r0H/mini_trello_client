import { api } from '@/lib/api';
import type { Task, TaskFormData } from '@/types/types.ts';

export const taskService = {
  async create(value: TaskFormData): Promise<Task> {
    const response = await api.post('/tasks/common', value);

    return response.data;
  },

  async edit(id: string, value:  Partial<TaskFormData>): Promise<Task> {
    const response = await api.patch(`/tasks/common/${id}`, value);

    return response.data;
  },

  async delete(id: string): Promise<Task> {
    const response = await api.delete(`/tasks/common/${id}`);

    return response.data;
  },

  async batchUpdate(value: TaskFormData[]): Promise<void> {
    await api.patch('/tasks/batch', { tasks: value });
  },
};
