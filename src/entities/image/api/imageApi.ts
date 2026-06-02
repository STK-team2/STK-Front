import { instance } from '../../../shared/api/instance';
import type { ApiResponse } from '../../../shared/types/api';

export const imageApi = {
  getImageUrl: (itemId: string) =>
    instance
      .get<ApiResponse<Record<string, string>>>(`/items/${itemId}/image`)
      .then((r) => r.data),

  uploadImage: (itemId: string, file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return instance
      .post<ApiResponse<Record<string, string>>>(`/items/${itemId}/image`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((r) => r.data);
  },

  deleteImage: (itemId: string) =>
    instance
      .delete<ApiResponse<void>>(`/items/${itemId}/image`)
      .then((r) => r.data),
};
