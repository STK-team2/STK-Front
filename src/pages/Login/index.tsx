import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { EyeIcon, ArrowIcon } from '@/shared/ui/Icons';
import { useSignIn } from '@/features/auth/api/queries';
import type { ApiResponse } from '@/shared/types/api';
import { showApiErrorToast, showErrorToast } from '@/shared/lib/toast';
import {
  LoginWrapper, FormContainer, LogoContainer, LogoImage,
  FieldsContainer, InputGroup, InputLabel, InputField,
  PasswordWrapper, PasswordInput, VisibilityBtn,
  ActionsContainer, LoginBtn, RegisterLinkRow, RegisterBtn, StatusMessage,
} from './style';

const stkFullName = '/STKFullName.svg';
const COMPANY_EMAIL_PATTERN = /^[A-Za-z0-9._%+-]/;

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [isStatusError, setIsStatusError] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const signInMutation = useSignIn();

  const email = form.email.trim();
  const isValidEmail = COMPANY_EMAIL_PATTERN.test(email);
  const isFormFilled = email && form.password.trim();
  const canSubmit = Boolean(isFormFilled) && isValidEmail && !signInMutation.isPending;

  const handleChange = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setStatusMessage('');
    setIsStatusError(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isFormFilled || signInMutation.isPending) {
      return;
    }

    if (!isValidEmail) {
      setStatusMessage('`@stk-eng.com` 이메일만 로그인할 수 있습니다.');
      setIsStatusError(true);
      showErrorToast('@stk-eng.com 이메일만 로그인할 수 있습니다.');
      return;
    }

    try {
      await signInMutation.mutateAsync({
        email,
        password: form.password,
      });
    } catch (error) {
      if (axios.isAxiosError<ApiResponse<null>>(error)) {
        setStatusMessage(error.response?.data?.error?.message ?? '로그인에 실패했습니다.');
      } else {
        setStatusMessage('로그인에 실패했습니다.');
      }
      setIsStatusError(true);
      showApiErrorToast(error, '로그인에 실패했습니다.');
    }
  };

  return (
    <LoginWrapper>
      <form onSubmit={handleSubmit}>
        <FormContainer>
          <LogoContainer>
            <LogoImage src={stkFullName} alt="STK Engineering" />
          </LogoContainer>

          <FieldsContainer>
            <InputGroup>
              <InputLabel>이메일</InputLabel>
              <InputField
                type="email"
                placeholder="이메일을 입력해주세요."
                value={form.email}
                onChange={handleChange('email')}
                autoComplete="email"
                inputMode="email"
              />
            </InputGroup>
            <InputGroup>
              <InputLabel>비밀번호</InputLabel>
              <PasswordWrapper>
                <PasswordInput
                  type={showPassword ? 'text' : 'password'}
                  placeholder="비밀번호를 입력해주세요."
                  value={form.password}
                  onChange={handleChange('password')}
                  autoComplete="current-password"
                />
                <VisibilityBtn type="button" onClick={() => setShowPassword(v => !v)}>
                  <EyeIcon show={showPassword} />
                </VisibilityBtn>
              </PasswordWrapper>
            </InputGroup>
          </FieldsContainer>

          <ActionsContainer>
            <StatusMessage error={isStatusError}>
              {statusMessage || 'STK 사내 이메일 계정으로 로그인하세요.'}
            </StatusMessage>
            <LoginBtn type="submit" disabled={!canSubmit}>
              {signInMutation.isPending ? '로그인 중...' : '로그인'}
            </LoginBtn>
            <RegisterLinkRow>
              <RegisterBtn type="button" onClick={() => navigate('/register')}>
                회원가입
                <ArrowIcon />
              </RegisterBtn>
            </RegisterLinkRow>
          </ActionsContainer>
        </FormContainer>
      </form>
    </LoginWrapper>
  );
};

export default LoginPage;
