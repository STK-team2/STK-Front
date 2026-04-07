import { useMutation, useQueryClient } from '@tanstack/react-query';
import { excelApi } from '../../../entities/excel/api/excelApi';
import { movementKeys } from '../../movement/api/queries';
import { stockKeys } from '../../stock/api/queries';

export const useImportExcel = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (file: File) => excelApi.importExcel(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: movementKeys.all });
      queryClient.invalidateQueries({ queryKey: stockKeys.currentStock });
    },
  });
};
