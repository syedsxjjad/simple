export type APIResponse<T> = {
  status: boolean;
  message: string;
  data: T | null;
};
