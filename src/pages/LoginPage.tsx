import { useState, type FormEvent } from 'react'
import { ArrowRight, BookOpen, Eye, EyeOff, GraduationCap, ShieldCheck } from 'lucide-react'
import { demoUsers } from '@/mocks/seed'
import { findDemoUser } from '@/services/api/auth-service'
import type { PortalUser } from '@/types'

export default function LoginPage({ onLogin }: { onLogin: (user: PortalUser) => void }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const user = findDemoUser(email, password)
    if (!user) {
      setError('Não encontramos esse acesso. Confira os dados ou escolha um perfil de demonstração.')
      return
    }
    setError('')
    onLogin(user)
  }

  return (
    <main className="login-page">
      <section className="login-story">
        <div className="login-brand"><span className="brand-mark brand-mark-light"><BookOpen /></span><span><strong>portal</strong><small>acadêmico</small></span></div>
        <div className="login-story-copy">
          <span className="story-kicker"><span /> SUA JORNADA, EM UM SÓ LUGAR</span>
          <h1>Aprender é construir caminhos.</h1>
          <p>Acompanhe suas disciplinas, descubra novos materiais e mantenha sua vida acadêmica em movimento.</p>
        </div>
        <div className="login-story-bottom"><span><ShieldCheck />Acesso de demonstração</span><span>© 2026 Portal Acadêmico</span></div>
        <div className="story-orb story-orb-one" /><div className="story-orb story-orb-two" />
      </section>
      <section className="login-main">
        <div className="login-card-wrap">
          <div className="login-heading"><p className="eyebrow">BEM-VINDO DE VOLTA</p><h2>Entre no seu portal</h2><p>Use seu e-mail acadêmico para continuar.</p></div>
          <form className="login-form" onSubmit={submit}>
            <label htmlFor="email">E-mail acadêmico</label>
            <input id="email" type="email" autoComplete="username" placeholder="voce@instituicao.edu.br" value={email} onChange={(event) => setEmail(event.target.value)} required />
            <div className="password-label"><label htmlFor="password">Senha</label><button type="button" className="text-link" onClick={() => setPassword('portal2026')}>Usar senha demo</button></div>
            <div className="password-field"><input id="password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" placeholder="Sua senha" value={password} onChange={(event) => setPassword(event.target.value)} required /><button type="button" aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'} onClick={() => setShowPassword((show) => !show)}>{showPassword ? <EyeOff /> : <Eye />}</button></div>
            {error && <p className="login-error" role="alert">{error}</p>}
            <button className="button button-primary login-submit" type="submit">Entrar <ArrowRight /></button>
          </form>
          <div className="demo-separator"><span /> <span>Acesso rápido para demonstração</span> <span /></div>
          <div className="demo-options">
            {demoUsers.map((user) => <button className="demo-option" key={user.id} onClick={() => onLogin(user)}><span className={`demo-icon ${user.role}`}><GraduationCap /></span><span><strong>Entrar como {user.role}</strong><small>{user.name}</small></span><ArrowRight className="demo-arrow" /></button>)}
          </div>
          <p className="demo-credentials">Senha de demonstração: <strong>portal2026</strong></p>
        </div>
        <div className="login-mobile-footer">Portal Acadêmico · Ambiente de demonstração</div>
      </section>
    </main>
  )
}
