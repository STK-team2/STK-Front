import { useEffect } from 'react';
import type { ReactElement } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { authApi } from '../entities/auth/api/authApi';
import { useAuthStore } from '../entities/auth/model/authStore';

let bootstrapStarted = false;
import RegisterPage from '../pages/Register';
import DashboardPage from '../pages/Dashboard';
import IncomingManagementPage from '../pages/IncomingManagement';
import OutgoingManagementPage from '../pages/OutgoingManagement';
import ClosingManagementPage from '../pages/ClosingManagement';
import InventoryManagementPage from '../pages/InventoryManagement';
import EditHistoryManagementPage from '../pages/EditHistoryManagement';
import UserManagementPage from '../pages/UserManagement';
import LoginPage from '@/pages/Login';

const ProtectedRoute = ({ children }: { children: ReactElement }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isAuthReady = useAuthStore((state) => state.isAuthReady);

  if (!isAuthReady) return null;
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const PublicRoute = ({ children }: { children: ReactElement }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isAuthReady = useAuthStore((state) => state.isAuthReady);

  if (!isAuthReady) return null;
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
};

const AdminRoute = ({ children }: { children: ReactElement }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isAuthReady = useAuthStore((state) => state.isAuthReady);
  const role = useAuthStore((state) => state.role);

  if (!isAuthReady) return null;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (role !== 'ADMIN') return <Navigate to="/dashboard" replace />;
  return children;
};

const RouterContent = () => {
  const refreshToken = useAuthStore((state) => state.refreshToken);
  const setTokens = useAuthStore((state) => state.setTokens);
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const setAuthReady = useAuthStore((state) => state.setAuthReady);
  const clearTokens = useAuthStore((state) => state.clearTokens);

  useEffect(() => {
    if (bootstrapStarted) return;
    bootstrapStarted = true;

    const bootstrapAuth = async () => {
      if (!refreshToken) {
        setAuthReady(true);
        return;
      }

      try {
        const response = await authApi.refresh({ refreshToken });

        if (response.success && response.data?.accessToken) {
          if (response.data.refreshToken) {
            setTokens(response.data.accessToken, response.data.refreshToken);
          } else {
            setAccessToken(response.data.accessToken);
          }
          setAuthReady(true);
          return;
        }

        clearTokens();
      } catch {
        clearTokens();
      }
    };

    void bootstrapAuth();
  }, [clearTokens, refreshToken, setAccessToken, setAuthReady, setTokens]);

  return (
    <Routes>
      <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
      <Route path="/incoming" element={<ProtectedRoute><IncomingManagementPage /></ProtectedRoute>} />
      <Route path="/outgoing" element={<ProtectedRoute><OutgoingManagementPage /></ProtectedRoute>} />
      <Route path="/closing" element={<ProtectedRoute><ClosingManagementPage /></ProtectedRoute>} />
      <Route path="/inventory" element={<ProtectedRoute><InventoryManagementPage /></ProtectedRoute>} />
      <Route path="/history" element={<AdminRoute><EditHistoryManagementPage /></AdminRoute>} />
      <Route path="/users" element={<AdminRoute><UserManagementPage /></AdminRoute>} />
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
