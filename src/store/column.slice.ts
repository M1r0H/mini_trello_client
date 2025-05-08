import { createSlice } from '@reduxjs/toolkit';
import { columnsListThunk } from '@/thunks/column.thunk.ts';
import { type BoardColumn, RequestStatus } from '@/types/types';
import type { ErrorType } from '@/types/api.ts';

export interface ColumnState {
  list: {
    id: string | null;
    status: RequestStatus;
    entities: BoardColumn[] | null;
    error: ErrorType[] | null;
  }
}

export const initialState: ColumnState = {
  list: {
    id: null,
    status: RequestStatus.Unset,
    entities: [],
    error: null,
  },
};

export const columnSlice = createSlice({
  name: 'column',
  initialState,
  reducers: {
    clearBoard: (state) => {
      state.list.entities = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(columnsListThunk.pending, (state) => {
        state.list.status = RequestStatus.Loading;
      })
      .addCase(columnsListThunk.fulfilled, (state, action) => {
        state.list.entities = action.payload;
        state.list.status = RequestStatus.Success;
      })
      .addCase(columnsListThunk.rejected, (state) => {
        state.list.status = RequestStatus.Error;
      });
  },
});
