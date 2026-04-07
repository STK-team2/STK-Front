import { instance } from '../../../shared/api/instance';
import type { ApiResponse } from '../../../shared/types/api';
import type {
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  VerifyEmailRequest,
  SendVerificationCodeRequest,
  RefreshTokenRequest,
  RefreshTokenResponse,
} from '../types';

export const authApi = {
  signIn: (body: SignInRequest) =>
    instance.post<ApiResponse<SignInResponse>>('/auth/sign-in', body).then((r) => r.data),

  sendVerificationCode: (body: SendVerificationCodeRequest) =>
    instance.post<ApiResponse<void>>('/auth/send-verification-code', body).then((r) => r.data),

  verifyEmail: (body: VerifyEmailRequest) =>
    instance.post<ApiResponse<void>>('/auth/verify-email', body).then((r) => r.data),

  signUp: (body: SignUpRequest) =>
    instance.post<ApiResponse<void>>('/auth/sign-up', body).then((r) => r.data),

  signOut: (body: RefreshTokenRequest) =>
    instance.post<ApiResponse<void>>('/auth/sign-out', body).then((r) => r.data),

  refresh: (body: RefreshTokenRequest) =>
    instance.post<ApiResponse<RefreshTokenResponse>>('/auth/refresh', body).then((r) => r.data),
};
