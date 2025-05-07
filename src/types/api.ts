import type { AxiosError } from 'axios';

export type HttpResponseErrorType = AxiosError<{
  name: string;
  message: string;
}>;

export interface ResponseBodyFailed {
  ok: false;
  error: ErrorType;
}

export interface ErrorType {
  message: string;
  name: string;
  code?: number;
}
