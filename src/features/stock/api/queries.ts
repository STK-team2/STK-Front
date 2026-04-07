import { useMutation, useQuery } from '@tanstack/react-query';
import { stockApi } from '../../../entities/stock/api/stockApi';
import type { GetLedgerParams } from '../../../entities/stock/types';

export const stockKeys = {
  currentStock: ['stock', 'current'] as const,
  ledger: (params: GetLedgerParams) => ['stock', 'ledger', params] as const,
};

export const useGetCurrentStock = () =>
  useQuery({
    queryKey: stockKeys.currentStock,
    queryFn: () => stockApi.getCurrentStock(),
    select: (res) => res.data,
  });

export const useGetLedger = (params: GetLedgerParams, enabled = true) =>
  useQuery({
    queryKey: stockKeys.ledger(params),
    queryFn: () => stockApi.getLedger(params),
    select: (res) => res.data,
    enabled,
  });

export const useDownloadCurrentStock = () =>
  useMutation({
    mutationFn: () => stockApi.downloadCurrentStock(),
    onSuccess: (blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `현재재고_${new Date().toISOString().slice(0, 10)}.xlsx`;
      a.click();
      URL.revokeObjectURL(url);
    },
  });

export const useDownloadLedger = () =>
  useMutation({
    mutationFn: (params: GetLedgerParams) => stockApi.downloadLedger(params),
    onSuccess: (blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `수불현황_${new Date().toISOString().slice(0, 10)}.xlsx`;
      a.click();
      URL.revokeObjectURL(url);
    },
  });
