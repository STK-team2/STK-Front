import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/Login';
import RegisterPage from '../pages/Register';
import IncomingManagementPage from '../pages/IncomingManagement';
import OutgoingManagementPage from '../pages/OutgoingManagement';
import ClosingManagementPage from '../pages/ClosingManagement';
import InventoryManagementPage from '../pages/InventoryManagement';

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/incoming" element={<IncomingManagementPage />} />
      <Route path="/outgoing" element={<OutgoingManagementPage />} />
      <Route path="/closing" element={<ClosingManagementPage />} />
      <Route path="/inventory" element={<InventoryManagementPage />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  </BrowserRouter>
);
export default AppRouter;
