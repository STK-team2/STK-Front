import { instance } from '../../../shared/api/instance';
import type { ApiResponse } from '../../../shared/types/api';
import type { ItemResponse, RegisterItemRequest, UpdateItemRequest } from '../types';

export const itemApi = {
  search: (query = '') =>
    instance
      .get<ApiResponse<ItemResponse[]>>('/items', { params: { query } })
      .then((r) => r.data),

  register: (body: RegisterItemRequest) =>
    instance.post<ApiResponse<ItemResponse>>('/items', body).then((r) => r.data),

  update: (id: string, body: UpdateItemRequest) =>
    instance.patch<ApiResponse<ItemResponse>>(`/items/${id}`, body).then((r) => r.data),

  delete: (id: string) =>
    instance.delete<ApiResponse<void>>(`/items/${id}`).then((r) => r.data),
};
