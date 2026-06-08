import { instance } from '../../../shared/api/instance';
import type { ApiResponse } from '../../../shared/types/api';
import type { Category, CreateCategoryRequest } from '../types';

export const categoryApi = {
  getCategories: () =>
    instance
      .get<ApiResponse<Category[]>>('/categories')
      .then((r) => r.data),

  createCategory: (body: CreateCategoryRequest) =>
    instance
      .post<ApiResponse<Category>>('/categories', body)
      .then((r) => r.data),

  deleteCategory: (id: string) =>
    instance
      .delete<ApiResponse<void>>(`/categories/${id}`)
      .then((r) => r.data),
};
