import { useEffect } from 'react';
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
      <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
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
