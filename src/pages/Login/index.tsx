/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as s from './style';

const stkFullName = '/STKFullName.svg';

const EyeIcon = ({ show }: { show: boolean }) =>
  show ? (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22" stroke="#9497A0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ) : (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="#9497A0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="12" r="3" stroke="#9497A0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

const ArrowIcon = () => (
  <svg width="21" height="21" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" fill="#9497A0" />
  </svg>
);

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  return (
    <div css={s.loginWrapper}>
      <div css={s.formContainer}>
        <div css={s.logoContainer}>
          <img src={stkFullName} alt="STK Engineering" css={s.logoImage} />
        </div>

        <div css={s.fieldsContainer}>
          <div css={s.inputGroup}>
            <label css={s.inputLabel}>이메일</label>
            <input css={s.inputField} type="email" placeholder="예) 홍길동" />
          </div>
          <div css={s.inputGroup}>
            <label css={s.inputLabel}>비밀번호</label>
            <div css={s.passwordWrapper}>
              <input
                css={s.passwordInput}
                type={showPassword ? 'text' : 'password'}
                placeholder="비밀번호를 입력해주세요."
              />
              <button css={s.visibilityBtn} type="button" onClick={() => setShowPassword(v => !v)}>
                <EyeIcon show={showPassword} />
              </button>
            </div>
          </div>
        </div>

        <div css={s.actionsContainer}>
          <button css={s.loginBtn} type="button">
            로그인
          </button>
          <div css={s.registerLinkRow}>
            <button css={s.registerBtn} type="button" onClick={() => navigate('/register')}>
              회원가입
              <ArrowIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
