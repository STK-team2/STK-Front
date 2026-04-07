import { instance } from '../../../shared/api/instance';
import type { ApiResponse } from '../../../shared/types/api';

export interface ImportExcelResponse {
  processedItemCount: number;
  processedMovementCount: number;
  errors: string[];
  message: string;
  success: boolean;
}

export const excelApi = {
  importExcel: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return instance
      .post<ApiResponse<ImportExcelResponse>>('/excel/import', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((r) => r.data);
  },
};
