import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { itemApi } from '../../../entities/item/api/itemApi';
import type { RegisterItemRequest } from '../../../entities/item/types';

export const itemKeys = {
  all: ['items'] as const,
  search: (query: string) => ['items', 'search', query] as const,
};

export const useSearchItems = (query = '') =>
  useQuery({
    queryKey: itemKeys.search(query),
    queryFn: () => itemApi.search(query),
    select: (res) => res.data,
  });

export const useRegisterItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: RegisterItemRequest) => itemApi.register(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: itemKeys.all });
    },
  });
};

export const useDeleteItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => itemApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: itemKeys.all });
    },
  });
};
