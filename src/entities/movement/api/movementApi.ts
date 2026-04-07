import { instance } from '../../../shared/api/instance';
import type { ApiResponse } from '../../../shared/types/api';
import type {
  MovementResponse,
  NewItemInboundResponse,
  RegisterInboundRequest,
  RegisterItemAndInboundRequest,
  RegisterOutboundRequest,
  UpdateMovementRequest,
  GetMovementsParams,
} from '../types';

export const movementApi = {
  getMovements: (params?: GetMovementsParams) =>
    instance
      .get<ApiResponse<MovementResponse[]>>('/movements', { params })
      .then((r) => r.data),

  registerInbound: (body: RegisterInboundRequest) =>
    instance.post<ApiResponse<MovementResponse>>('/movements/inbound', body).then((r) => r.data),

  registerNewItemInbound: (body: RegisterItemAndInboundRequest) =>
    instance
      .post<ApiResponse<NewItemInboundResponse>>('/movements/inbound/new-item', body)
      .then((r) => r.data),

  registerOutbound: (body: RegisterOutboundRequest) =>
    instance
      .post<ApiResponse<MovementResponse>>('/movements/outbound', body)
      .then((r) => r.data),

  updateMovement: (id: string, body: UpdateMovementRequest) =>
    instance
      .patch<ApiResponse<MovementResponse>>(`/movements/${id}`, body)
      .then((r) => r.data),

  deleteMovement: (id: string) =>
    instance.delete<ApiResponse<void>>(`/movements/${id}`).then((r) => r.data),

  downloadMovements: (params?: GetMovementsParams) =>
    instance
      .get('/movements/download', { params, responseType: 'blob' })
      .then((r) => r.data as Blob),
};
