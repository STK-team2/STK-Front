/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import * as s from './style';

const stkBg = '/STK.svg';

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
    <div css={s.registerWrapper}>
      <div css={s.leftPanel}>
        <img css={s.leftBgImage} src={stkBg} alt="" />
        <div css={s.leftBgOverlay} />
      </div>

      <div css={s.rightPanel}>
        <div css={s.formContainer}>
          <div css={s.heading}>
            <p css={s.title}>회원가입</p>
            <p css={s.subtitle}>정보를 입력해주세요.</p>
          </div>

          <div css={s.fieldsContainer}>
            <div css={s.inputGroup}>
              <label css={s.inputLabel}>이메일</label>
              <input
                css={s.inputField}
                type="email"
                placeholder="예) 홍길동"
                value={form.email}
                onChange={handleChange('email')}
              />
            </div>

            <div css={s.inputGroup}>
              <label css={s.inputLabel}>이메일 인증번호 입력</label>
              <div css={s.verifyRow}>
                <input
                  css={s.verifyInput}
                  type="text"
                  placeholder="인증번호를 입력해주세요."
                  value={form.verifyCode}
                  onChange={handleChange('verifyCode')}
                />
                <button css={s.verifyBtn} type="button">
                  인증번호 확인
                </button>
              </div>
            </div>

            <div css={s.inputGroup}>
              <label css={s.inputLabel}>비밀번호</label>
              <div css={s.passwordWrapper}>
                <input
                  css={s.passwordInput}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="비밀번호를 입력해주세요."
                  value={form.password}
                  onChange={handleChange('password')}
                />
                <button css={s.visibilityBtn} type="button" onClick={() => setShowPassword(v => !v)}>
                  <EyeIcon show={showPassword} />
                </button>
              </div>
            </div>

            <div css={s.inputGroup}>
              <label css={s.inputLabel}>비밀번호 재입력</label>
              <input
                css={s.inputField}
                type="password"
                placeholder="비밀번호를 다시 입력해주세요."
                value={form.passwordConfirm}
                onChange={handleChange('passwordConfirm')}
              />
            </div>
          </div>

          <button
            css={[s.submitBtn, isFormFilled ? s.submitBtnActive : undefined]}
            type="button"
            disabled={!isFormFilled}
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
