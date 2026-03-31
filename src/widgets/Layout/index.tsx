import { ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Wrapper, Sidebar, LogoWrap, LogoClip, Logo, Nav, NavItem, LogoutBtn, Content } from './style';

const navItems = [
  { label: '입고 관리', path: '/incoming' },
  { label: '출고 관리', path: '/outgoing' },
  { label: '재고 조회', path: '/inventory' },
  { label: '마감 처리', path: '/closing' },
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
    </Wrapper>
  );
};

export default Layout;
