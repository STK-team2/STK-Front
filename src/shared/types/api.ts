export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error: ErrorResponse | null;
}

export interface ErrorResponse {
  code: string;
  message: string;
}
