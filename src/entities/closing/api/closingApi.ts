import { instance } from '../../../shared/api/instance';
import type { ApiResponse } from '../../../shared/types/api';
import type {
  CloseMonthRequest,
  CloseMonthResponse,
  ClosingStockResponse,
  GetClosingStockParams,
} from '../types';

export const closingApi = {
  getClosingStock: (params?: GetClosingStockParams) =>
    instance
      .get<ApiResponse<ClosingStockResponse[]>>('/closing', { params })
      .then((r) => r.data),

  closeMonth: (body: CloseMonthRequest) =>
    instance
      .post<ApiResponse<CloseMonthResponse[]>>('/closing', body)
      .then((r) => r.data),

  cancelClosing: (id: string) =>
    instance.patch<ApiResponse<void>>(`/closing/${id}/cancel`).then((r) => r.data),
};
