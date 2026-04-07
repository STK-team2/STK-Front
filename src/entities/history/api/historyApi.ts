import { instance } from '../../../shared/api/instance';
import type { ApiResponse } from '../../../shared/types/api';
import type { ChangeHistoryDto, GetChangeHistoryParams } from '../types';

export const historyApi = {
  getChangeHistory: (params?: GetChangeHistoryParams) =>
    instance
      .get<ApiResponse<ChangeHistoryDto[]>>('/history', { params })
      .then((r) => r.data),

  downloadChangeHistory: (params?: GetChangeHistoryParams) =>
    instance
      .get('/history/download', { params, responseType: 'blob' })
      .then((r) => r.data as Blob),
};
