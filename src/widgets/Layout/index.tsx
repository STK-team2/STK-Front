/** @jsxImportSource @emotion/react */
import type { ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Wrapper, Sidebar, LogoWrap, LogoClip, Logo, Nav, NavItem, LogoutBtn, Content, BottomNav, BottomNavItem } from './style';

const navItems = [
  {
    label: '홈', path: '/dashboard',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  },
  {
    label: '입고', path: '/incoming',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 4v6h-6"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>,
  },
  {
    label: '출고', path: '/outgoing',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 4v6h6"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>,
  },
  {
    label: '재고', path: '/inventory',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>,
  },
  {
    label: '마감', path: '/closing',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><polyline points="9 16 11 18 15 14"/></svg>,
  },
];

const Layout = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Wrapper>
      <Sidebar>
        <LogoWrap>
          <LogoClip>
            <Logo src="/STKFullName.svg" alt="STK" />
          </LogoClip>
        </LogoWrap>
        <Nav>
          {navItems.map(item => (
            <NavItem
              key={item.path}
              active={location.pathname === item.path}
              onClick={() => navigate(item.path)}
              type="button"
            >
              {item.label}
            </NavItem>
          ))}
        </Nav>
        <LogoutBtn type="button">로그아웃</LogoutBtn>
      </Sidebar>
      <Content>
        {children}
      </Content>
      <BottomNav>
        {navItems.map(item => (
          <BottomNavItem
            key={item.path}
            active={location.pathname === item.path}
            onClick={() => navigate(item.path)}
            type="button"
          >
            {item.icon}
            {item.label}
          </BottomNavItem>
        ))}
      </BottomNav>
    </Wrapper>
  );
};

export default Layout;
