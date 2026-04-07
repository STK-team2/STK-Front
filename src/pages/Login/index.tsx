import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EyeIcon, ArrowIcon } from '@/shared/ui/Icons';
import {
  LoginWrapper, FormContainer, LogoContainer, LogoImage,
  FieldsContainer, InputGroup, InputLabel, InputField,
  PasswordWrapper, PasswordInput, VisibilityBtn,
  ActionsContainer, LoginBtn, RegisterLinkRow, RegisterBtn,
} from './style';

const stkFullName = '/STKFullName.svg';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  return (
    <LoginWrapper>
      <FormContainer>
        <LogoContainer>
          <LogoImage src={stkFullName} alt="STK Engineering" />
        </LogoContainer>

        <FieldsContainer>
          <InputGroup>
            <InputLabel>이메일</InputLabel>
            <InputField type="email" placeholder="예) 홍길동" />
          </InputGroup>
          <InputGroup>
            <InputLabel>비밀번호</InputLabel>
            <PasswordWrapper>
              <PasswordInput
                type={showPassword ? 'text' : 'password'}
                placeholder="비밀번호를 입력해주세요."
              />
              <VisibilityBtn type="button" onClick={() => setShowPassword(v => !v)}>
                <EyeIcon show={showPassword} />
              </VisibilityBtn>
            </PasswordWrapper>
          </InputGroup>
        </FieldsContainer>

        <ActionsContainer>
          <LoginBtn type="button">로그인</LoginBtn>
          <RegisterLinkRow>
            <RegisterBtn type="button" onClick={() => navigate('/register')}>
              회원가입
              <ArrowIcon />
            </RegisterBtn>
          </RegisterLinkRow>
        </ActionsContainer>
      </FormContainer>
    </LoginWrapper>
  );
};

export default LoginPage;
