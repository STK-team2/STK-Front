import { useEffect } from 'react';
import type { ReactElement } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { authApi } from '../entities/auth/api/authApi';
import { useAuthStore } from '../entities/auth/model/authStore';
import LoginPage from '../pages/Login';
import RegisterPage from '../pages/Register';
import DashboardPage from '../pages/Dashboard';
import IncomingManagementPage from '../pages/IncomingManagement';
import OutgoingManagementPage from '../pages/OutgoingManagement';
import ClosingManagementPage from '../pages/ClosingManagement';
import InventoryManagementPage from '../pages/InventoryManagement';

const ProtectedRoute = ({ children }: { children: ReactElement }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isAuthReady = useAuthStore((state) => state.isAuthReady);

  if (!isAuthReady) {
    return null;
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const PublicRoute = ({ children }: { children: ReactElement }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isAuthReady = useAuthStore((state) => state.isAuthReady);

  if (!isAuthReady) {
    return null;
  }

  return isAuthenticated ? <Navigate to="/incoming" replace /> : children;
};

const RouterContent = () => {
  const refreshToken = useAuthStore((state) => state.refreshToken);
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const setAuthReady = useAuthStore((state) => state.setAuthReady);
  const clearTokens = useAuthStore((state) => state.clearTokens);

  useEffect(() => {
    let cancelled = false;

    const bootstrapAuth = async () => {
      if (!refreshToken) {
        setAuthReady(true);
        return;
      }

      try {
        const response = await authApi.refresh({ refreshToken });
        if (!cancelled && response.success) {
          setAccessToken(response.data.accessToken);
          setAuthReady(true);
        }
      } catch {
        if (!cancelled) {
          clearTokens();
        }
      }
    };

    void bootstrapAuth();

    return () => {
      cancelled = true;
    };
  }, [clearTokens, refreshToken, setAccessToken, setAuthReady]);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/incoming" element={<IncomingManagementPage />} />
      <Route path="/outgoing" element={<OutgoingManagementPage />} />
      <Route path="/closing" element={<ClosingManagementPage />} />
      <Route path="/inventory" element={<InventoryManagementPage />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

const AppRouter = () => (
  <BrowserRouter>
    <RouterContent />
  </BrowserRouter>
);
export default AppRouter;
