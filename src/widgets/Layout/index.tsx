/** @jsxImportSource @emotion/react */
import type { ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import * as s from './style';

const navItems = [
  { label: '홈', path: '/dashboard' },
  { label: '입고 관리', path: '/incoming' },
  { label: '출고 관리', path: '/outgoing' },
  { label: '재고 조회', path: '/inventory' },
  { label: '마감 처리', path: '/closing' },
];

const Layout = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div css={s.wrapper}>
      <aside css={s.sidebar}>
        <div css={s.logoWrap}>
          <div css={s.logoClip}>
            <img src="/STKFullName.svg" alt="STK" css={s.logo} />
          </div>
        </div>
        <nav css={s.nav}>
          {navItems.map(item => (
            <button
              key={item.path}
              css={[s.navItem, location.pathname === item.path && s.navItemActive]}
              onClick={() => navigate(item.path)}
              type="button"
            >
              {item.label}
            </button>
          ))}
        </nav>
        <button css={s.logoutBtn} type="button">로그아웃</button>
      </aside>
      <div css={s.content}>
        {children}
      </div>
    </div>
  );
};

export default Layout;
