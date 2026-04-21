import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const wrapper = css`
  display: flex;
  flex-direction: row;
  height: 100vh;
  overflow: hidden;
  background: #ffffff;

  @media (max-width: 768px) {
    height: 100dvh;
  }
`;

export const sidebar = css`
  width: 220px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  height: 100vh;
  border-right: 1px solid #f0f1f4;

  @media (max-width: 1280px) {
    width: 190px;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

export const logoWrap = css`
  padding: 20px 16px 16px;
`;

export const logoClip = css`
  width: 88px;
  overflow: hidden;
`;

export const logo = css`
  display: block;
  width: 242px;
  height: auto;
`;

export const nav = css`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const navItem = css`
  display: flex;
  align-items: center;
  height: 48px;
  padding: 0 20px;
  background: none;
  border: none;
  border-left: 3px solid transparent;
  font-family: 'Pretendard Variable', sans-serif;
  font-size: 16px;
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

  @media (max-width: 1280px) {
    font-size: 15px;
    height: 44px;
  }
`;

export const navItemActive = css`
  border-left-color: #0068e0;
  background: linear-gradient(to right, rgba(0, 104, 224, 0.12), rgba(0, 104, 224, 0.01));
  color: #0068e0;
  font-weight: 600;
  &:hover {
    background: linear-gradient(to right, rgba(0, 104, 224, 0.18), rgba(0, 104, 224, 0.04));
  }
`;

export const logoutBtn = css`
  padding: 20px;
  background: none;
  border: none;
  font-family: 'Pretendard Variable', sans-serif;
  font-size: 16px;
  color: #9497a0;
  cursor: pointer;
  text-align: left;
  font-feature-settings: 'ss05' 1;
  &:hover {
    color: #595b66;
  }
`;

export const content = css`
  flex: 1;
  min-width: 0;
  height: 100vh;
  overflow-y: auto;
  background: #ffffff;

  @media (max-width: 768px) {
    height: 100dvh;
    padding-bottom: 60px;
  }
`;

export const bottomNav = css`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 60px;
    background: #fff;
    border-top: 1px solid #f0f1f4;
    z-index: 100;
  }
`;

const bottomNavItemBase = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
  font-size: 10px;
  color: #9497a0;
  background: none;
  border: none;
  cursor: pointer;
  font-family: 'Pretendard Variable', sans-serif;
  font-feature-settings: 'ss05' 1;
  padding: 0;
  line-height: 1;
`;

const bottomNavItemActiveStyle = css`
  color: #0068e0;
`;

export const Wrapper = styled.div`${wrapper}`;
export const Sidebar = styled.aside`${sidebar}`;
export const LogoWrap = styled.div`${logoWrap}`;
export const LogoClip = styled.div`${logoClip}`;
export const Logo = styled.img`${logo}`;
export const Nav = styled.nav`${nav}`;
export const NavItem = styled('button', {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active?: boolean }>`
  ${navItem}
  ${({ active }) => active && navItemActive}
`;
export const LogoutBtn = styled.button`${logoutBtn}`;
export const Content = styled.main`${content}`;
export const BottomNav = styled.nav`${bottomNav}`;
export const BottomNavItem = styled('button', {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active?: boolean }>`
  ${bottomNavItemBase}
  ${({ active }) => active && bottomNavItemActiveStyle}
`;
