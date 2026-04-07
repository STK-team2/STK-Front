import { instance } from '../../../shared/api/instance';
import type { ApiResponse } from '../../../shared/types/api';
import type { CurrentStockResponse, GetLedgerParams, LedgerResponse } from '../types';

export const stockApi = {
  getCurrentStock: () =>
    instance.get<ApiResponse<CurrentStockResponse[]>>('/stock/current').then((r) => r.data),

  getLedger: (params: GetLedgerParams) =>
    instance
      .get<ApiResponse<LedgerResponse[]>>('/stock/ledger', { params })
      .then((r) => r.data),

  downloadCurrentStock: () =>
    instance
      .get('/stock/current/download', { responseType: 'blob' })
      .then((r) => r.data as Blob),

  downloadLedger: (params: GetLedgerParams) =>
    instance
      .get('/stock/ledger/download', { params, responseType: 'blob' })
      .then((r) => r.data as Blob),
};
