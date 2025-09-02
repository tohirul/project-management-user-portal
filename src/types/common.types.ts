// src/types/common.types.ts
export type ApiResponse<T> = {
  success: boolean;
  message: string;
  response: string;
  data: T;
  meta?: {
    total: number;
    page: number;
    limit: number;
  };
};

export interface Api<T, Q> {
  endpoints: T;
  util: Q;
}
