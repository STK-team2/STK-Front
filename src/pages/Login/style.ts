import styled from '@emotion/styled';

export const LoginWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  text-align: left;
  padding: 40px 24px;
  min-height: 100svh;
  box-sizing: border-box;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 48px;
  width: 100%;
  max-width: 584px;

  @media (max-width: 1440px) {
    max-width: 440px;
    gap: 36px;
  }

  @media (max-width: 768px) {
    gap: 32px;
  }

  @media (max-width: 480px) {
    gap: 28px;
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const LogoImage = styled.img`
  width: 432px;
  height: auto;
  max-width: 100%;

  @media (max-width: 1440px) {
    width: 324px;
  }

  @media (max-width: 480px) {
    width: 260px;
  }
`;

export const FieldsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

export const InputLabel = styled.label`
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 1.3;
  color: #595b66;
  font-feature-settings: 'ss05' 1;
  margin: 0;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

export const InputField = styled.input`
  width: 100%;
  height: 48px;
  padding: 10px 16px;
  border: 1px solid #bbbcc2;
  border-radius: 6px;
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.6;
  color: #1a1b1e;
  font-feature-settings: 'ss05' 1;
  outline: none;
  box-sizing: border-box;
  background: #ffffff;
  &::placeholder {
    color: #9497a0;
  }
  &:focus {
    border-color: #0068e0;
  }

  @media (max-width: 480px) {
    height: 44px;
    font-size: 15px;
  }
`;

export const PasswordWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const PasswordInput = styled.input`
  width: 100%;
  height: 48px;
  padding: 10px 48px 10px 16px;
  border: 1px solid #bbbcc2;
  border-radius: 6px;
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.6;
  color: #1a1b1e;
  font-feature-settings: 'ss05' 1;
  outline: none;
  box-sizing: border-box;
  background: #ffffff;
  &::placeholder {
    color: #9497a0;
  }
  &:focus {
    border-color: #0068e0;
  }

  @media (max-width: 480px) {
    height: 44px;
    font-size: 15px;
  }
`;

export const VisibilityBtn = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  color: #9497a0;
`;

export const ActionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 31px;
  width: 100%;
`;

export const LoginBtn = styled.button`
  width: 100%;
  height: 57px;
  background: #0068e0;
  border: none;
  border-radius: 5px;
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 500;
  font-size: 21px;
  line-height: 1.3;
  color: #ffffff;
  cursor: pointer;
  font-feature-settings: 'ss05' 1;
  &:hover {
    background: #0056b8;
  }

  @media (max-width: 1440px) {
    height: 48px;
    font-size: 17px;
  }

  @media (max-width: 480px) {
    height: 44px;
    font-size: 16px;
  }
`;

export const RegisterLinkRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 38px;
`;

export const RegisterBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 2px;
  background: none;
  border: none;
  cursor: pointer;
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 400;
  font-size: 21px;
  line-height: 1.6;
  color: #9497a0;
  font-feature-settings: 'ss05' 1;
  padding: 0;

  @media (max-width: 1440px) {
    font-size: 17px;
  }

  @media (max-width: 480px) {
    font-size: 15px;
  }
`;
