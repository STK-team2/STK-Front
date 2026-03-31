import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 100svh;
  background: #ffffff;
`;

export const Sidebar = styled.aside`
  width: 160px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  position: sticky;
  top: 0;
  height: 100svh;

  @media (max-width: 1440px) {
    width: 140px;
  }
`;

export const LogoWrap = styled.div`
  padding: 20px 16px 16px;
`;

export const LogoClip = styled.div`
  width: 88px;
  overflow: hidden;
`;

export const Logo = styled.img`
  display: block;
  width: 242px;
  height: auto;
`;

export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const NavItem = styled('button', {
  shouldForwardProp: prop => prop !== 'active',
})<{ active?: boolean }>`
  display: flex;
  align-items: center;
  height: 44px;
  padding: 0 16px;
  background: none;
  border: none;
  border-left: 3px solid transparent;
  font-family: 'Pretendard Variable', sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #595b66;
  cursor: pointer;
  text-align: left;
  width: 100%;
  box-sizing: border-box;
  font-feature-settings: 'ss05' 1;
  &:hover {
    background: #f5f6f8;
  }

  @media (max-width: 1440px) {
    font-size: 13px;
    height: 40px;
  }

  ${({ active }) => active && css`
    border-left-color: #0068e0;
    background: linear-gradient(to right, rgba(0, 104, 224, 0.12), rgba(0, 104, 224, 0.01));
    color: #0068e0;
    font-weight: 600;
    &:hover {
      background: linear-gradient(to right, rgba(0, 104, 224, 0.18), rgba(0, 104, 224, 0.04));
    }
  `}
`;

export const LogoutBtn = styled.button`
  padding: 20px;
  background: none;
  border: none;
  font-family: 'Pretendard Variable', sans-serif;
  font-size: 14px;
  color: #9497a0;
  cursor: pointer;
  text-align: left;
  font-feature-settings: 'ss05' 1;
  &:hover {
    color: #595b66;
  }
`;

export const Content = styled.div`
  flex: 1;
  min-width: 0;
  background: #ffffff;
  overflow-y: auto;
`;
