/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as s from './style';
import { EyeIcon, ArrowIcon } from '@/shared/ui/Icons';

const stkFullName = '/STKFullName.svg';

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
