import { useState } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Bell, BookOpen, ChevronDown, ClipboardList, FileText, Home, LogOut, Megaphone, Menu, UserRound, X } from 'lucide-react'
import { usePortal } from '@/context/PortalContext'
import type { NavItem } from '@/types'

const navigation: NavItem[] = [
  { label: 'Painel acadêmico', path: '/', icon: Home },
  { label: 'Disciplinas e horários', path: '/disciplinas', icon: BookOpen },
  { label: 'Notas e desempenho', path: '/desempenho', icon: FileText },
  { label: 'Materiais e atividades', path: '/materiais', icon: ClipboardList },
  { label: 'Comunicados', path: '/comunicados', icon: Megaphone },
  { label: 'Solicitações', path: '/solicitacoes', icon: UserRound },
]

const pageTitles: Record<string, string> = {
  '/': 'Painel acadêmico',
  '/disciplinas': 'Disciplinas e horários',
  '/desempenho': 'Notas e desempenho',
  '/materiais': 'Materiais e atividades',
  '/comunicados': 'Comunicados e notificações',
  '/solicitacoes': 'Solicitações acadêmicas',
}

export default function AppShell() {
  const { user, signOut, data } = usePortal()
  const navigate = useNavigate()
  const location = useLocation()
  const [profileOpen, setProfileOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const unread = data.announcements.filter((item) => !item.read).length

  function logOut() {
    signOut()
    navigate('/login')
  }

  return (
    <div className="app-shell">
      {mobileMenuOpen && <button className="mobile-scrim" aria-label="Fechar navegação" onClick={() => setMobileMenuOpen(false)} />}
      <aside className={`sidebar ${mobileMenuOpen ? 'sidebar-open' : ''}`} aria-label="Navegação principal">
        <div className="brand-lockup">
          <span className="brand-mark"><BookOpen aria-hidden="true" /></span>
          <span><strong>portal</strong><small>acadêmico</small></span>
          <button className="mobile-close" aria-label="Fechar menu" onClick={() => setMobileMenuOpen(false)}><X /></button>
        </div>
        <div className="sidebar-profile">
          <span className="avatar avatar-small">{user?.name.split(' ').map((part) => part[0]).slice(0, 2).join('')}</span>
          <div><strong>{user?.name}</strong><span>{user?.role === 'aluno' ? 'Aluno' : 'Professor'}</span></div>
        </div>
        <p className="nav-caption">MENU PRINCIPAL</p>
        <nav className="sidebar-nav">
          {navigation.map(({ label, path, icon: Icon }) => (
            <NavLink key={path} to={path} end={path === '/'} onClick={() => setMobileMenuOpen(false)} className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}>
              <Icon aria-hidden="true" /><span>{label}</span>
              {path === '/comunicados' && unread > 0 && <span className="nav-count">{unread}</span>}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="semester-note"><span className="semester-dot" /><div><strong>Período letivo</strong><span>2026.2 · Em andamento</span></div></div>
          <div className="sidebar-footer"><span>Portal Acadêmico</span><span>Versão de demonstração</span></div>
        </div>
      </aside>

      <div className="main-area">
        <header className="topbar">
          <div className="topbar-left">
            <button className="menu-trigger" aria-label="Abrir menu" onClick={() => setMobileMenuOpen(true)}><Menu /></button>
            <div className="breadcrumbs"><span>Portal</span><span className="crumb-divider">/</span><strong>{pageTitles[location.pathname] ?? 'Portal Acadêmico'}</strong></div>
          </div>
          <div className="topbar-actions">
            <button className="notification-trigger" aria-label={`Notificações${unread ? `, ${unread} não lidas` : ''}`} onClick={() => navigate('/comunicados')}>
              <Bell aria-hidden="true" />{unread > 0 && <span className="notification-dot" />}
            </button>
            <div className="profile-wrap">
              <button className={`profile-trigger ${profileOpen ? 'profile-trigger-open' : ''}`} aria-expanded={profileOpen} onClick={() => setProfileOpen((open) => !open)}>
                <span className="avatar">{user?.name.split(' ').map((part) => part[0]).slice(0, 2).join('')}</span>
                <span className="profile-copy"><strong>{user?.name}</strong><small>{user?.role === 'aluno' ? 'Aluno' : 'Professor'}</small></span>
                <ChevronDown aria-hidden="true" />
              </button>
              {profileOpen && <div className="profile-menu"><div className="profile-menu-heading">{user?.email}</div><button onClick={logOut}><LogOut aria-hidden="true" />Sair do portal</button></div>}
            </div>
          </div>
        </header>
        <main className="page-content"><Outlet /></main>
        <footer className="content-footer"><span>© 2026 Portal Acadêmico</span><span>Ambiente de demonstração acadêmica</span></footer>
      </div>
    </div>
  )
}
