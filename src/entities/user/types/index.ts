export type UserRole = 'ADMIN' | 'EMPLOYEE';

export interface UserResponse {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
}
