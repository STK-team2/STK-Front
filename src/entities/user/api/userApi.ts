import { instance } from '../../../shared/api/instance';
import type { ApiResponse } from '../../../shared/types/api';
import type { UserResponse, UserRole } from '../types';

export const userApi = {
  getUsers: () =>
    instance
      .get<ApiResponse<UserResponse[]>>('/users')
      .then((r) => r.data),

  changeRole: (id: string, role: UserRole) =>
    instance
      .patch<ApiResponse<void>>(`/users/${id}/role`, { role })
      .then((r) => r.data),
};
