/** @jsxImportSource @emotion/react */
import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../entities/auth/model/authStore';
import { useSignOut } from '../../features/auth/api/queries';
import { useGetCurrentStock } from '../../features/stock/api/queries';
import { useSearchItems } from '../../features/item/api/queries';
import {
  Wrapper, Sidebar, LogoWrap, LogoClip, Logo, Nav, NavItem, LogoutBtn, Content,
  BottomNav, BottomNavItem, BellWrap, BellBtn, BellBadge, AlertDropdown,
  AlertDropdownTitle, AlertList, AlertItem, AlertItemName, AlertItemStock,
  NavSection, NavSectionLabel,
} from './style';

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

const adminNavItems = [
  {
    label: '이력', path: '/history',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3h18v4H3z"/><path d="M3 10h18v4H3z"/><path d="M3 17h18v4H3z"/></svg>,
  },
  {
    label: '사용자', path: '/users',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  },
];

const BellIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
);

const Layout = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const role = useAuthStore((state) => state.role);
  const signOutMutation = useSignOut();
  const [bellOpen, setBellOpen] = useState(false);

  const { data: stocks = [] } = useGetCurrentStock();
  const { data: items = [] } = useSearchItems('');

  const lowStockItems = useMemo(() => {
    const stockMap = new Map(stocks.map((s) => [s.itemId, s.currentStock]));
    return items.filter((item) => {
      if (!item.lowStockThreshold) return false;
      const current = stockMap.get(item.id) ?? 0;
      return current <= item.lowStockThreshold;
    });
  }, [stocks, items]);

  const handleLogout = () => {
    void signOutMutation.mutate();
  };

  return (
    <Wrapper>
      <Sidebar>
        <LogoWrap>
          <LogoClip>
            <Logo src="/STKFullName.svg" alt="STK" />
          </LogoClip>
        </LogoWrap>
        <Nav>
          {navItems.map((item) => (
            <NavItem
              key={item.path}
              active={location.pathname === item.path}
              onClick={() => navigate(item.path)}
              type="button"
            >
              {item.label}
            </NavItem>
          ))}
          {role === 'ADMIN' && (
            <>
              <NavSection>
                <NavSectionLabel>관리자</NavSectionLabel>
              </NavSection>
              {adminNavItems.map((item) => (
                <NavItem
                  key={item.path}
                  active={location.pathname === item.path}
                  onClick={() => navigate(item.path)}
                  type="button"
                >
                  {item.label}
                </NavItem>
              ))}
            </>
          )}
        </Nav>

        <BellWrap>
          <BellBtn type="button" onClick={() => setBellOpen((v) => !v)}>
            <BellIcon />
            {lowStockItems.length > 0 && (
              <BellBadge>{lowStockItems.length > 99 ? '99+' : lowStockItems.length}</BellBadge>
            )}
            저재고 알림
          </BellBtn>
          {bellOpen && (
            <AlertDropdown>
              <AlertDropdownTitle>
                저재고 품목 {lowStockItems.length}건
              </AlertDropdownTitle>
              <AlertList>
                {lowStockItems.length === 0 ? (
                  <AlertItem>저재고 품목이 없습니다.</AlertItem>
                ) : (
                  lowStockItems.map((item) => {
                    const current = stocks.find((s) => s.itemId === item.id)?.currentStock ?? 0;
                    return (
                      <AlertItem key={item.id}>
                        <AlertItemName>{item.itemName}</AlertItemName>
                        <AlertItemStock>
                          {current} / {item.lowStockThreshold}
                        </AlertItemStock>
                      </AlertItem>
                    );
                  })
                )}
              </AlertList>
            </AlertDropdown>
          )}
        </BellWrap>

        <LogoutBtn type="button" onClick={handleLogout} disabled={signOutMutation.isPending}>로그아웃</LogoutBtn>
      </Sidebar>
      <Content onClick={() => setBellOpen(false)}>
        {children}
      </Content>
      <BottomNav>
        {navItems.map((item) => (
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
