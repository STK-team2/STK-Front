import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { closingApi } from '../../../entities/closing/api/closingApi';
import type { CloseMonthRequest, GetClosingStockParams } from '../../../entities/closing/types';

export const closingKeys = {
  all: ['closing'] as const,
  list: (params?: GetClosingStockParams) => ['closing', 'list', params] as const,
};

export const useGetClosingStock = (params?: GetClosingStockParams) =>
  useQuery({
    queryKey: closingKeys.list(params),
    queryFn: () => closingApi.getClosingStock(params),
    select: (res) => res.data,
  });

export const useCloseMonth = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: CloseMonthRequest) => closingApi.closeMonth(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: closingKeys.all });
    },
  });
};

export const useCancelClosing = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => closingApi.cancelClosing(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: closingKeys.all });
    },
  });
};
