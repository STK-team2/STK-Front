import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../../../entities/auth/api/authApi';
import { useAuthStore } from '../../../entities/auth/model/authStore';
import type {
  SignInRequest,
  SignUpRequest,
  VerifyEmailRequest,
  SendVerificationCodeRequest,
} from '../../../entities/auth/types';

export const useSignIn = () => {
  const setTokens = useAuthStore((state) => state.setTokens);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (body: SignInRequest) => authApi.signIn(body),
    onSuccess: (res) => {
      if (res.success) {
        setTokens(res.data.accessToken, res.data.refreshToken);
        navigate('/incoming');
      }
    },
  });
};

export const useSendVerificationCode = () =>
  useMutation({
    mutationFn: (body: SendVerificationCodeRequest) => authApi.sendVerificationCode(body),
  });

export const useVerifyEmail = () =>
  useMutation({
    mutationFn: (body: VerifyEmailRequest) => authApi.verifyEmail(body),
  });

export const useSignUp = () =>
  useMutation({
    mutationFn: (body: SignUpRequest) => authApi.signUp(body),
  });

export const useSignOut = () => {
  const refreshToken = useAuthStore((state) => state.refreshToken);
  const clearTokens = useAuthStore((state) => state.clearTokens);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => authApi.signOut({ refreshToken: refreshToken ?? '' }),
    onSettled: () => {
      clearTokens();
      navigate('/login');
    },
  });
};
