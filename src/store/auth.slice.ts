import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus } from '@/types/types.ts';
import { authCheckThunk, loginThunk, registerThunk } from '@/thunks/auth.thunk.ts';

interface User {
  id: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  status: RequestStatus;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: true,
  status: RequestStatus.Unset,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clear(state) {
      state.status = RequestStatus.Unset;
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers(builder) {
    // check auth
    builder
      .addCase(authCheckThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(authCheckThunk.fulfilled, (state, { payload }) => {
        state.isAuthenticated = !!payload.checked;
        state.user = payload.checked ? payload.user : null;
        state.loading = false;
      })
      .addCase(authCheckThunk.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
      })

      // login
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginThunk.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.isAuthenticated = true;
      })
      .addCase(loginThunk.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
      })

      // register
      .addCase(registerThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerThunk.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.isAuthenticated = true;
      })
      .addCase(registerThunk.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
      });
  },
});
