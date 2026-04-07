import { useEffect } from 'react';
import type { ReactElement } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { authApi } from '../entities/auth/api/authApi';
import { useAuthStore } from '../entities/auth/model/authStore';
import LoginPage from '../pages/Login';
import RegisterPage from '../pages/Register';
import IncomingManagementPage from '../pages/IncomingManagement';
import OutgoingManagementPage from '../pages/OutgoingManagement';
import ClosingManagementPage from '../pages/ClosingManagement';
import InventoryManagementPage from '../pages/InventoryManagement';

const ProtectedRoute = ({ children }: { children: ReactElement }) => {
  const { isAuthenticated, isAuthReady } = useAuthStore((state) => ({
    isAuthenticated: state.isAuthenticated,
    isAuthReady: state.isAuthReady,
  }));

  if (!isAuthReady) {
    return null;
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const PublicRoute = ({ children }: { children: ReactElement }) => {
  const { isAuthenticated, isAuthReady } = useAuthStore((state) => ({
    isAuthenticated: state.isAuthenticated,
    isAuthReady: state.isAuthReady,
  }));

  if (!isAuthReady) {
    return null;
  }

  return isAuthenticated ? <Navigate to="/incoming" replace /> : children;
};

const RouterContent = () => {
  const {
    refreshToken,
    setAccessToken,
    setAuthReady,
    clearTokens,
  } = useAuthStore((state) => ({
    refreshToken: state.refreshToken,
    setAccessToken: state.setAccessToken,
    setAuthReady: state.setAuthReady,
    clearTokens: state.clearTokens,
  }));

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
      <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
      <Route path="/incoming" element={<ProtectedRoute><IncomingManagementPage /></ProtectedRoute>} />
      <Route path="/outgoing" element={<ProtectedRoute><OutgoingManagementPage /></ProtectedRoute>} />
      <Route path="/closing" element={<ProtectedRoute><ClosingManagementPage /></ProtectedRoute>} />
      <Route path="/inventory" element={<ProtectedRoute><InventoryManagementPage /></ProtectedRoute>} />
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
