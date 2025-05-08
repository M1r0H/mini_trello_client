import type { JSX } from 'react';

export interface AuthLoginFormData {
  email: string;
}

export interface AuthRegistrationFormData {
  email: string;
}

export enum RequestStatus {
  Loading = 'loading',
  Success = 'success',
  Error = 'error',
  Unset = 'unset'
}

export interface AuthResponse {
  user: User;
  checked?: boolean;
}

export interface User {
  id: string;
  email: string;
}

export type ProtectedRouteProps = {
  path: string;
  component: () => JSX.Element;
  allowedRoles?: string[];
};

export type BoardColumn = {
  id: string;
  title: string;
  order: number;
  tasks: Task[];
}

export type Task = {
  id: string;
  title: string;
  description: string;
  order: number;
  columnId: string;
}

export type TaskFormData = {
  id?: string;
  title?: string;
  description?: string;
  order?: number;
  columnId?: string;
}

export type ValueOf<T> = T[keyof T];

export interface ColumnFormData {
  title: string;
  order: number;
}
