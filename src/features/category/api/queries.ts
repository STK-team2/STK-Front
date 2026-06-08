import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { categoryApi } from '../../../entities/category/api/categoryApi';
import type { CreateCategoryRequest } from '../../../entities/category/types';

export const categoryKeys = {
  all: ['categories'] as const,
};

export const useGetCategories = () =>
  useQuery({
    queryKey: categoryKeys.all,
    queryFn: () => categoryApi.getCategories(),
    select: (res) => res.data ?? [],
  });

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: CreateCategoryRequest) => categoryApi.createCategory(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.all });
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => categoryApi.deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.all });
    },
  });
};
