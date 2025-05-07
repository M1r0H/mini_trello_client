import type { ErrorType } from '@/types/api.ts';
import type { RootState } from '@/store';

export interface BaseAsyncThunkOptions<E = ErrorType[], S = RootState> {
  rejectValue: E;
  state: S;
}
