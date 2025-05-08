import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import type { UseAuthResult } from '@/types/hooks.ts';
import type { AuthLoginFormData, AuthRegistrationFormData } from '@/types/types';
import { emptyResponse } from '@/lib/api';
import { authSlice } from '@/store/auth.slice';
import { authCheckThunk, loginThunk, registerThunk } from '@/thunks/auth.thunk.ts';

export const useAuth = (): UseAuthResult => {
  const dispatch = useAppDispatch();
  const status = useAppSelector((store) => store.auth.status);
  const user = useAppSelector((store) => store.auth.user);
  const checked = useAppSelector((store) => store.auth.isAuthenticated);

  // login request
  const login = useCallback((value: AuthLoginFormData) => {
    return dispatch(loginThunk(value)).unwrap();
  }, []);

  // registration request
  const registration = useCallback((value: AuthRegistrationFormData) => {
    return dispatch(registerThunk(value)).unwrap().catch(emptyResponse);
  }, []);

  // check auth token
  const check = useCallback(() => {
    return dispatch(authCheckThunk()).unwrap().catch(emptyResponse);
  }, []);

  const clear = useCallback(() => {
    dispatch(authSlice.actions.clear());
  }, []);

  return {
    status,
    login,
    user,
    registration,
    check,
    checked,
    clear,
  };
};
