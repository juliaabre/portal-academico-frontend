import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import AppShell from '@/components/layout/AppShell'
import { PortalProvider, usePortal } from '@/context/PortalContext'
import AcademicPage from '@/pages/AcademicPage'
import CommunicationPage from '@/pages/CommunicationPage'
import ContentPage from '@/pages/ContentPage'
import DashboardPage from '@/pages/DashboardPage'
import LoginPage from '@/pages/LoginPage'
import PerformancePage from '@/pages/PerformancePage'
import RequestsPage from '@/pages/RequestsPage'

function PortalRoutes() {
  const { user, signIn } = usePortal()
  const navigate = useNavigate()

  if (!user) return <Routes><Route path="/login" element={<LoginPage onLogin={(nextUser) => { signIn(nextUser); navigate('/') }} />} /><Route path="*" element={<Navigate to="/login" replace />} /></Routes>

  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<DashboardPage />} />
        <Route path="disciplinas" element={<AcademicPage />} />
        <Route path="desempenho" element={<PerformancePage />} />
        <Route path="materiais" element={<ContentPage />} />
        <Route path="comunicados" element={<CommunicationPage />} />
        <Route path="solicitacoes" element={<RequestsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default function App() {
  return <PortalProvider><PortalRoutes /></PortalProvider>
}
