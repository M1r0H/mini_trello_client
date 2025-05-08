import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Task, TaskFormData } from '@/types/types';
import { handleHttpError } from '@/lib/api';
import type { BaseAsyncThunkOptions } from '@/types/state.ts';
import type { HttpResponseErrorType } from '@/types/api.ts';
import { taskService } from '@/services/task.service.ts';

export const taskCreateThunk = createAsyncThunk<
  Task,
  TaskFormData,
  BaseAsyncThunkOptions
>(
  'task/create',
  async (data, { rejectWithValue }) => {
    try {
      return taskService.create(data);
    } catch (e) {
      return rejectWithValue([handleHttpError(e as HttpResponseErrorType).error]);
    }
  },
);

export const taskUpdateThunk = createAsyncThunk<
  Task,
  { id: string; data: Partial<TaskFormData> },
  BaseAsyncThunkOptions
>(
  'task/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return taskService.edit(id, data);
    } catch (e) {
      return rejectWithValue([handleHttpError(e as HttpResponseErrorType).error]);
    }
  },
);

export const taskBatchUpdateThunk = createAsyncThunk<
  void,
  { updates: TaskFormData[] },
  BaseAsyncThunkOptions
>(
  'task/batchUpdate',
  async ({ updates }, { rejectWithValue }) => {
    try {
      await taskService.batchUpdate(updates);
    } catch (e) {
      return rejectWithValue([handleHttpError(e as HttpResponseErrorType).error]);
    }
  },
);

export const taskDeleteThunk = createAsyncThunk<
  void,
  string,
  BaseAsyncThunkOptions
>(
  'task/delete',
  async (id, { rejectWithValue }) => {
    try {
      await taskService.delete(id);
    } catch (e) {
      return rejectWithValue([handleHttpError(e as HttpResponseErrorType).error]);
    }
  },
);
