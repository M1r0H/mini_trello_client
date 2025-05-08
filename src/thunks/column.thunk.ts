import { createAsyncThunk } from '@reduxjs/toolkit';
import type { BoardColumn, ColumnFormData } from '@/types/types';
import type { BaseAsyncThunkOptions } from '@/types/state.ts';
import { handleHttpError } from '@/lib/api.ts';
import type { HttpResponseErrorType } from '@/types/api.ts';
import { columnService } from '@/services/column.service.ts';

export const columnsListThunk = createAsyncThunk<
  BoardColumn[],
  undefined,
  BaseAsyncThunkOptions
>(
  'column/list',
  async (_payload, { rejectWithValue }) => {
    try {
      return columnService.getList();
    } catch (e) {
      return rejectWithValue([handleHttpError(e as HttpResponseErrorType).error]);
    }
  },
);

export const columnsCreateThunk = createAsyncThunk<
  BoardColumn,
  ColumnFormData,
  BaseAsyncThunkOptions
>(
  'column/create',
  async (payload, { rejectWithValue }) => {
    try {
      return columnService.create(payload);
    } catch (e) {
      return rejectWithValue([handleHttpError(e as HttpResponseErrorType).error]);
    }
  },
);
