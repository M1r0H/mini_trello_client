import { useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import type { TaskFormData } from '@/types/types';
import { taskBatchUpdateThunk, taskCreateThunk, taskDeleteThunk, taskUpdateThunk } from '@/thunks/task.thunk.ts';
import { emptyResponse } from '@/lib/api.ts';
import type { UseTasksResult } from '@/types/hooks.ts';

export const useTask = (columnId?: string): UseTasksResult => {
  const dispatch = useAppDispatch();
  const columns = useAppSelector((state) => state.column.list.entities);

  const tasks = useMemo(() => {
    if (!columns) {
      return [];
    }

    const column = columns.find((col) => col.id === columnId);

    return column?.tasks || [];
  }, [columns, columnId]);

  const create = useCallback((data: TaskFormData) => {
    return dispatch(taskCreateThunk({ ...data })).unwrap().catch(emptyResponse);
  }, []);

  const update = useCallback((taskId: string, data: Partial<TaskFormData>) => {
    return dispatch(taskUpdateThunk({ id: taskId, data })).unwrap().catch(emptyResponse);
  }, []);

  const remove = useCallback((taskId: string) => {
    return dispatch(taskDeleteThunk(taskId)).unwrap().catch(emptyResponse);
  }, []);

  const batchUpdate = useCallback((updates: TaskFormData[]) => {
    return dispatch(taskBatchUpdateThunk({ updates })).unwrap().catch(emptyResponse);
  }, []);

  return {
    tasks,
    create,
    batchUpdate,
    update,
    remove,
  };
};
