import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AuthLoginFormData, AuthRegistrationFormData, AuthResponse } from '@/types/types';
import type { BaseAsyncThunkOptions } from '@/types/state';
import { authService } from '@/services/auth.service';
import { handleHttpError } from '@/lib/api';
import type { HttpResponseErrorType } from '@/types/api';

export const loginThunk = createAsyncThunk<
  AuthResponse,
  AuthLoginFormData,
  BaseAsyncThunkOptions
>(
  'auth/login',
  (payload: AuthLoginFormData, { rejectWithValue }) => {
    try {
      return authService.login(payload);
    } catch (e) {
      return rejectWithValue([handleHttpError(e as HttpResponseErrorType).error]);
    }
  },
);

export const registerThunk = createAsyncThunk<
  AuthResponse,
  AuthRegistrationFormData,
  BaseAsyncThunkOptions
>(
  'auth/register',
  async (payload: AuthRegistrationFormData, { rejectWithValue }) => {
    try {
      return authService.register(payload);
    } catch (e) {
      return rejectWithValue([handleHttpError(e as HttpResponseErrorType).error]);
    }
  },
);

export const authCheckThunk = createAsyncThunk<
  AuthResponse,
  undefined,
  BaseAsyncThunkOptions
>(
  'auth/check',
  async (_payload, { rejectWithValue }) => {
    try {
      return authService.checkAuth();
    } catch (e) {
      return rejectWithValue([handleHttpError(e as HttpResponseErrorType).error]);
    }
  },
);
