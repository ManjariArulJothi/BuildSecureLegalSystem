import { useState } from 'react';

interface NavItem {
  id: string;
  icon: string;
  label: string;
  sub?: string;
}

interface LayoutProps {
  title: string;
  titleIcon: string;
  userLabel: string;
  userIcon: string;
  navItems: NavItem[];
  activeNav: string;
  onNavChange: (id: string) => void;
  onLogout: () => void;
  children: React.ReactNode;
  accentColor?: string;
}

export default function Layout({ title, titleIcon, userLabel, userIcon, navItems, activeNav, onNavChange, onLogout, children, accentColor = 'var(--accent)' }: LayoutProps) {
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--background)' }}>
      {/* Top bar */}
      <div style={{ height: 48, background: 'var(--card)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px 0 0', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 0, height: '100%' }}>
          <div style={{ width: 220, height: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '0 16px', borderRight: '1px solid var(--border)', background: 'var(--secondary)' }}>
            <span style={{ fontSize: 18 }}>{titleIcon}</span>
            <div>
              <div style={{ fontFamily: 'Oswald, sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: accentColor, textTransform: 'uppercase', lineHeight: 1.2 }}>{title}</div>
              <div style={{ fontSize: 10, color: 'var(--muted-foreground)', letterSpacing: '0.04em' }}>SECURE SYSTEM</div>
            </div>
          </div>
          <div style={{ padding: '0 16px', fontSize: 11, color: 'var(--muted-foreground)', fontFamily: 'JetBrains Mono, monospace' }}>
            {new Date().toLocaleDateString('en-IN', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' })} · {new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'var(--muted-foreground)', fontFamily: 'JetBrains Mono, monospace' }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80' }} />
            ONLINE
          </div>
          <button onClick={() => setNotifOpen(!notifOpen)} style={{ background: 'var(--secondary)', border: '1px solid var(--border)', borderRadius: 4, padding: '4px 8px', cursor: 'pointer', color: 'var(--foreground)', position: 'relative' }}>
            🔔
            <span style={{ position: 'absolute', top: -4, right: -4, background: '#ef4444', borderRadius: '50%', width: 14, height: 14, fontSize: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700 }}>3</span>
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 10px', background: 'var(--secondary)', border: '1px solid var(--border)', borderRadius: 4 }}>
            <span style={{ fontSize: 14 }}>{userIcon}</span>
            <span style={{ fontSize: 12, color: 'var(--foreground)', fontWeight: 600 }}>{userLabel}</span>
          </div>
          <button onClick={onLogout} style={{ background: 'none', border: '1px solid var(--border)', borderRadius: 4, padding: '4px 10px', cursor: 'pointer', fontSize: 11, color: 'var(--muted-foreground)', transition: 'all 0.15s' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#f87171')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted-foreground)')}>
            LOGOUT
          </button>
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Sidebar */}
        <div style={{ width: 220, background: 'var(--secondary)', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', flexShrink: 0, overflowY: 'auto' }}>
          <div style={{ padding: '12px 8px', flex: 1 }}>
            {navItems.map(item => (
              <div key={item.id} className={`nav-item ${activeNav === item.id ? 'active' : ''}`} onClick={() => onNavChange(item.id)}>
                <span style={{ fontSize: 14, flexShrink: 0 }}>{item.icon}</span>
                <div>
                  <div style={{ lineHeight: 1.2 }}>{item.label}</div>
                  {item.sub && <div style={{ fontSize: 10, color: 'var(--muted-foreground)', lineHeight: 1 }}>{item.sub}</div>}
                </div>
              </div>
            ))}
          </div>
          <div style={{ padding: '12px', borderTop: '1px solid var(--border)' }}>
            <div style={{ fontSize: 10, color: 'var(--muted-foreground)', fontFamily: 'JetBrains Mono, monospace', textAlign: 'center' }}>v2.4.1 · BUILD 20260912</div>
          </div>
        </div>

        {/* Main content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 20 }}>
          {children}
        </div>
      </div>
    </div>
  );
}
