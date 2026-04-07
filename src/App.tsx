import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import ArchitecturePage from './pages/ArchitecturePage';
import ClientZonePage from './pages/ClientZonePage';
import DispatcherPage from './pages/DispatcherPage';
import LandingPage from './pages/LandingPage';
import NurseZonePage from './pages/NurseZonePage';
import OrderWizardPage from './pages/OrderWizardPage';
import StaffAdminPage from './pages/StaffAdminPage';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/order/new" element={<OrderWizardPage />} />
        <Route path="/client" element={<ClientZonePage />} />
        <Route path="/dispatcher" element={<DispatcherPage />} />
        <Route path="/nurse" element={<NurseZonePage />} />
        <Route path="/staff" element={<StaffAdminPage />} />
        <Route path="/architecture" element={<ArchitecturePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
