import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { movementApi } from '../../../entities/movement/api/movementApi';
import type {
  GetMovementsParams,
  RegisterInboundRequest,
  RegisterItemAndInboundRequest,
  RegisterOutboundRequest,
  UpdateMovementRequest,
} from '../../../entities/movement/types';

export const movementKeys = {
  all: ['movements'] as const,
  list: (params?: GetMovementsParams) => ['movements', 'list', params] as const,
};

export const useGetMovements = (params?: GetMovementsParams) =>
  useQuery({
    queryKey: movementKeys.list(params),
    queryFn: () => movementApi.getMovements(params),
    select: (res) => res.data,
  });

export const useRegisterInbound = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: RegisterInboundRequest) => movementApi.registerInbound(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: movementKeys.all });
    },
  });
};

export const useRegisterNewItemInbound = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: RegisterItemAndInboundRequest) => movementApi.registerNewItemInbound(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: movementKeys.all });
    },
  });
};

export const useRegisterOutbound = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: RegisterOutboundRequest) => movementApi.registerOutbound(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: movementKeys.all });
    },
  });
};

export const useUpdateMovement = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: UpdateMovementRequest }) =>
      movementApi.updateMovement(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: movementKeys.all });
    },
  });
};

export const useDeleteMovement = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => movementApi.deleteMovement(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: movementKeys.all });
    },
  });
};

export const useDownloadMovements = () =>
  useMutation({
    mutationFn: (params?: GetMovementsParams) => movementApi.downloadMovements(params),
    onSuccess: (blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `입출고내역_${new Date().toISOString().slice(0, 10)}.xlsx`;
      a.click();
      URL.revokeObjectURL(url);
    },
  });
