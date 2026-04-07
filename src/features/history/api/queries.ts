import { useMutation, useQuery } from '@tanstack/react-query';
import { historyApi } from '../../../entities/history/api/historyApi';
import type { GetChangeHistoryParams } from '../../../entities/history/types';

export const historyKeys = {
  all: ['history'] as const,
  list: (params?: GetChangeHistoryParams) => ['history', 'list', params] as const,
};

export const useGetChangeHistory = (params?: GetChangeHistoryParams, enabled = true) =>
  useQuery({
    queryKey: historyKeys.list(params),
    queryFn: () => historyApi.getChangeHistory(params),
    select: (res) => res.data,
    enabled,
  });

export const useDownloadChangeHistory = () =>
  useMutation({
    mutationFn: (params?: GetChangeHistoryParams) => historyApi.downloadChangeHistory(params),
    onSuccess: (blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `변경이력_${new Date().toISOString().slice(0, 10)}.xlsx`;
      a.click();
      URL.revokeObjectURL(url);
    },
  });
