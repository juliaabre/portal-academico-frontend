import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'

export function PageHeader({ eyebrow, title, description, action }: { eyebrow?: string; title: string; description: string; action?: ReactNode }) {
  return (
    <div className="page-heading">
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        <p className="page-description">{description}</p>
      </div>
      {action && <div className="heading-action">{action}</div>}
    </div>
  )
}

export function StatCard({ label, value, note, icon: Icon, tone = 'blue' }: { label: string; value: string | number; note: string; icon: LucideIcon; tone?: string }) {
  return (
    <article className="stat-card">
      <div className={`stat-icon tone-${tone}`}><Icon aria-hidden="true" /></div>
      <div className="stat-copy">
        <p>{label}</p>
        <strong>{value}</strong>
        <span>{note}</span>
      </div>
    </article>
  )
}

export function Panel({ title, description, action, children, className = '' }: { title: string; description?: string; action?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={`panel ${className}`}>
      <div className="panel-heading">
        <div><h2>{title}</h2>{description && <p>{description}</p>}</div>
        {action && <div>{action}</div>}
      </div>
      {children}
    </section>
  )
}

export function StatusPill({ children, tone = 'neutral' }: { children: ReactNode; tone?: 'neutral' | 'success' | 'warning' | 'info' | 'danger' }) {
  return <span className={`status-pill status-${tone}`}>{children}</span>
}

export function EmptyState({ title, description }: { title: string; description: string }) {
  return <div className="empty-state"><span className="empty-mark">—</span><strong>{title}</strong><p>{description}</p></div>
}

export function FormMessage({ children, kind = 'success' }: { children: ReactNode; kind?: 'success' | 'error' }) {
  return <div className={`form-message form-message-${kind}`} role={kind === 'error' ? 'alert' : 'status'}>{children}</div>
}

export function IconButton({ label, children, onClick, className = '' }: { label: string; children: ReactNode; onClick: () => void; className?: string }) {
  return <button type="button" className={`icon-button ${className}`} aria-label={label} onClick={onClick}>{children}</button>
}
