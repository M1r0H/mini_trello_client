import type {
  AuthLoginFormData,
  AuthRegistrationFormData,
  AuthResponse,
  BoardColumn,
  ColumnFormData,
  RequestStatus,
  Task,
  TaskFormData,
  User,
  ValueOf,
} from '@/types/types.ts';

export interface UseAuthResult {
  status: RequestStatus;
  clear: () => void;
  login: (value: AuthLoginFormData) => Promise<AuthResponse | undefined>;
  user: User | null;
  registration: (value: AuthRegistrationFormData) => Promise<AuthResponse | undefined>;
  check: () => Promise<AuthResponse | undefined>;
  checked: boolean;
}

export interface UseColumnsParams {
  autoload?: boolean;
}

export interface UseColumnsResult {
  status: ValueOf<RequestStatus>;
  list: BoardColumn[] | null;
  get: () => BoardColumn[] | null;
  load: () => Promise<BoardColumn[] | undefined>;
  setAutoload: (value: boolean) => void;
  create: (value: ColumnFormData) => Promise<BoardColumn | undefined>;
}

export interface UseTasksResult {
  create: (value: TaskFormData) => Promise<Task | undefined>;
  tasks: Task[] | null;
  update: (taskId: string, data: Partial<TaskFormData>) => Promise<Task | undefined>;
  remove: (id: string) => Promise<void>;
  batchUpdate: (value: TaskFormData[]) => Promise<void>;
}
