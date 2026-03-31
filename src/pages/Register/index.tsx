import { useState } from 'react';
import { EyeIcon } from '@/shared/ui/Icons';
import {
  RegisterWrapper, LeftPanel, LeftBgImage, LeftBgOverlay,
  RightPanel, FormContainer, Heading, Title, Subtitle,
  FieldsContainer, InputGroup, InputLabel, InputField,
  VerifyRow, VerifyInput, VerifyBtn,
  PasswordWrapper, PasswordInput, VisibilityBtn, SubmitBtn,
} from './style';

const stkBg = '/STK.svg';

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: '',
    verifyCode: '',
    password: '',
    passwordConfirm: '',
  });

  const isFormFilled =
    form.email && form.verifyCode && form.password && form.passwordConfirm;

  const handleChange = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <RegisterWrapper>
      <LeftPanel>
        <LeftBgImage src={stkBg} alt="" />
        <LeftBgOverlay />
      </LeftPanel>

      <RightPanel>
        <FormContainer>
          <Heading>
            <Title>회원가입</Title>
            <Subtitle>정보를 입력해주세요.</Subtitle>
          </Heading>

          <FieldsContainer>
            <InputGroup>
              <InputLabel>이메일</InputLabel>
              <InputField
                type="email"
                placeholder="예) 홍길동"
                value={form.email}
                onChange={handleChange('email')}
              />
            </InputGroup>

            <InputGroup>
              <InputLabel>이메일 인증번호 입력</InputLabel>
              <VerifyRow>
                <VerifyInput
                  type="text"
                  placeholder="인증번호를 입력해주세요."
                  value={form.verifyCode}
                  onChange={handleChange('verifyCode')}
                />
                <VerifyBtn type="button">인증번호 확인</VerifyBtn>
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
              />
            </InputGroup>
          </FieldsContainer>

          <SubmitBtn
            active={!!isFormFilled}
            type="button"
            disabled={!isFormFilled}
          >
            회원가입
          </SubmitBtn>
        </FormContainer>
      </RightPanel>
    </RegisterWrapper>
  );
};

export default RegisterPage;
