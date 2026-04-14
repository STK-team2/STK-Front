import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { EyeIcon } from '@/shared/ui/Icons';
import {
  useSendVerificationCode,
  useSignUp,
  useVerifyEmail,
} from '@/features/auth/api/queries';
import type { ApiResponse } from '@/shared/types/api';
import {
  RegisterWrapper, LeftPanel, LeftBgImage, LeftBgOverlay,
  RightPanel, FormContainer, Heading, Title, Subtitle,
  FieldsContainer, InputGroup, InputLabel, InputField,
  VerifyRow, VerifyInput, VerifyBtn,
  PasswordWrapper, PasswordInput, VisibilityBtn, SubmitBtn, StatusMessage,
} from './style';

const stkBg = '/STK.svg';
const COMPANY_EMAIL_PATTERN = /^[A-Za-z0-9._%+-]+@stk-eng\.com$/;
const VERIFICATION_CODE_PATTERN = /^\d{6}$/;

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [isStatusError, setIsStatusError] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    verifyCode: '',
    password: '',
    passwordConfirm: '',
  });
  const navigate = useNavigate();
  const sendVerificationCodeMutation = useSendVerificationCode();
  const verifyEmailMutation = useVerifyEmail();
  const signUpMutation = useSignUp();

  const email = form.email.trim();
  const verifyCode = form.verifyCode.trim();
  const name = form.name.trim();
  const isValidEmail = COMPANY_EMAIL_PATTERN.test(email);
  const isValidVerifyCode = VERIFICATION_CODE_PATTERN.test(verifyCode);
  const isValidName = name.length >= 2 && name.length <= 20;
  const isValidPassword = form.password.length >= 8 && form.password.length <= 20;
  const isFormFilled =
    name && email && verifyCode && form.password && form.passwordConfirm;
  const isPasswordMatched = form.password === form.passwordConfirm;
  const canSubmit =
    Boolean(isFormFilled) &&
    isValidName &&
    isValidEmail &&
    isValidVerifyCode &&
    isValidPassword &&
    isPasswordMatched &&
    isEmailVerified &&
    !signUpMutation.isPending;

  const handleChange = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setForm((prev) => ({ ...prev, [field]: value }));

    if (field === 'email') {
      setIsEmailVerified(false);
      setStatusMessage('');
      setIsStatusError(false);
    }

    if (field === 'verifyCode') {
      setStatusMessage('');
      setIsStatusError(false);
    }
  };

  const handleSendVerificationCode = async () => {
    if (!email || sendVerificationCodeMutation.isPending) {
      return;
    }

    if (!isValidEmail) {
      setStatusMessage('@stk-eng.com 이메일만 인증할 수 있습니다.');
      setIsStatusError(true);
      return;
    }

    try {
      const response = await sendVerificationCodeMutation.mutateAsync({ email });

      if (response.success) {
        setIsEmailVerified(false);
        setStatusMessage('인증번호를 전송했습니다. 메일을 확인해주세요.');
        setIsStatusError(false);
      }
    } catch (error) {
      if (axios.isAxiosError<ApiResponse<null>>(error)) {
        setStatusMessage(error.response?.data?.error?.message ?? '인증번호 전송에 실패했습니다.');
      } else {
        setStatusMessage('인증번호 전송에 실패했습니다.');
      }
      setIsStatusError(true);
    }
  };

  const handleVerifyEmail = async () => {
    if (!email || !verifyCode || verifyEmailMutation.isPending) {
      return;
    }

    if (!isValidEmail) {
      setStatusMessage('@stk-eng.com 이메일만 인증할 수 있습니다.');
      setIsStatusError(true);
      return;
    }

    if (!isValidVerifyCode) {
      setStatusMessage('인증번호는 6자리 숫자여야 합니다.');
      setIsStatusError(true);
      return;
    }

    try {
      const response = await verifyEmailMutation.mutateAsync({ email, code: verifyCode });

      if (response.success) {
        setIsEmailVerified(true);
        setStatusMessage('이메일 인증이 완료되었습니다.');
        setIsStatusError(false);
      }
    } catch (error) {
      setIsEmailVerified(false);
      if (axios.isAxiosError<ApiResponse<null>>(error)) {
        setStatusMessage(error.response?.data?.error?.message ?? '인증번호 확인에 실패했습니다.');
      } else {
        setStatusMessage('인증번호 확인에 실패했습니다.');
      }
      setIsStatusError(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValidName) {
      setStatusMessage('이름은 2자 이상 20자 이하여야 합니다.');
      setIsStatusError(true);
      return;
    }

    if (!isValidEmail) {
      setStatusMessage('@stk-eng.com 이메일만 가입할 수 있습니다.');
      setIsStatusError(true);
      return;
    }

    if (!isValidVerifyCode) {
      setStatusMessage('인증번호는 6자리 숫자여야 합니다.');
      setIsStatusError(true);
      return;
    }

    if (!isValidPassword) {
      setStatusMessage('비밀번호는 8자 이상 20자 이하여야 합니다.');
      setIsStatusError(true);
      return;
    }

    if (!isPasswordMatched) {
      setStatusMessage('비밀번호가 일치하지 않습니다.');
      setIsStatusError(true);
      return;
    }

    if (!isEmailVerified || !canSubmit) {
      if (!isEmailVerified) {
        setStatusMessage('이메일 인증을 완료해주세요.');
        setIsStatusError(true);
      }
      return;
    }

    try {
      const response = await signUpMutation.mutateAsync({
        email,
        name,
        password: form.password,
      });

      if (response.success) {
        navigate('/login');
      }
    } catch (error) {
      if (axios.isAxiosError<ApiResponse<null>>(error)) {
        setStatusMessage(error.response?.data?.error?.message ?? '회원가입에 실패했습니다.');
      } else {
        setStatusMessage('회원가입에 실패했습니다.');
      }
      setIsStatusError(true);
    }
  };

  return (
    <RegisterWrapper>
      <LeftPanel>
        <LeftBgImage src={stkBg} alt="" />
        <LeftBgOverlay />
      </LeftPanel>

      <RightPanel>
        <form onSubmit={handleSubmit}>
          <FormContainer>
            <Heading>
              <Title>회원가입</Title>
              <Subtitle>정보를 입력해주세요.</Subtitle>
            </Heading>

            <FieldsContainer>
              <InputGroup>
                <InputLabel>이름</InputLabel>
                <InputField
                  type="text"
                  placeholder="이름을 입력해주세요."
                  value={form.name}
                  onChange={handleChange('name')}
                  autoComplete="name"
                  maxLength={20}
                />
              </InputGroup>

              <InputGroup>
                <InputLabel>이메일</InputLabel>
                <VerifyRow>
                  <VerifyInput
                    type="email"
                    placeholder="이메일을 입력해주세요."
                    value={form.email}
                    onChange={handleChange('email')}
                    autoComplete="email"
                    inputMode="email"
                  />
                  <VerifyBtn
                    type="button"
                    onClick={handleSendVerificationCode}
                    disabled={!form.email.trim() || sendVerificationCodeMutation.isPending}
                  >
                    {sendVerificationCodeMutation.isPending ? '전송 중...' : '인증번호 발송'}
                  </VerifyBtn>
                </VerifyRow>
              </InputGroup>

              <InputGroup>
                <InputLabel>이메일 인증번호 입력</InputLabel>
                <VerifyRow>
                  <VerifyInput
                    type="text"
                    placeholder="인증번호를 입력해주세요."
                    value={form.verifyCode}
                    onChange={handleChange('verifyCode')}
                    inputMode="numeric"
                    maxLength={6}
                  />
                  <VerifyBtn
                    type="button"
                    onClick={handleVerifyEmail}
                    disabled={!form.verifyCode.trim() || verifyEmailMutation.isPending}
                  >
                    {verifyEmailMutation.isPending ? '확인 중...' : '인증번호 확인'}
                  </VerifyBtn>
                </VerifyRow>
              </InputGroup>

              <InputGroup>
                <InputLabel>비밀번호</InputLabel>
                <PasswordWrapper>
                  <PasswordInput
                    type={showPassword ? 'text' : 'password'}
                    placeholder="비밀번호를 입력해주세요."
                    value={form.password}
                    onChange={handleChange('password')}
                    autoComplete="new-password"
                    maxLength={20}
                  />
                  <VisibilityBtn type="button" onClick={() => setShowPassword(v => !v)}>
                    <EyeIcon show={showPassword} />
                  </VisibilityBtn>
                </PasswordWrapper>
              </InputGroup>

              <InputGroup>
                <InputLabel>비밀번호 재입력</InputLabel>
                <InputField
                  type="password"
                  placeholder="비밀번호를 다시 입력해주세요."
                  value={form.passwordConfirm}
                  onChange={handleChange('passwordConfirm')}
                  autoComplete="new-password"
                  maxLength={20}
                />
              </InputGroup>
            </FieldsContainer>

            <StatusMessage error={isStatusError}>
              {statusMessage || (isEmailVerified ? '이메일 인증이 완료되었습니다.' : '이메일 인증 후 회원가입이 가능합니다.')}
            </StatusMessage>

            <SubmitBtn
              active={canSubmit}
              type="submit"
              disabled={!canSubmit}
            >
              {signUpMutation.isPending ? '가입 중...' : '회원가입'}
            </SubmitBtn>
          </FormContainer>
        </form>
      </RightPanel>
    </RegisterWrapper>
  );
};

export default RegisterPage;
