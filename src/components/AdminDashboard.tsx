import { useState } from 'react';
import Layout from './shared/Layout';

const navItems = [
  { id: 'dashboard', icon: '🏠', label: 'Dashboard' },
  { id: 'users', icon: '👥', label: 'Users' },
  { id: 'roles', icon: '🔑', label: 'Roles & Permissions', sub: '' },
  { id: 'audit', icon: '📜', label: 'Audit Logs' },
  { id: 'security', icon: '🚨', label: 'Security Center', sub: '' },
  { id: 'docs', icon: '📄', label: 'Document Governance', sub: '' },
  { id: 'policies', icon: '🔐', label: 'Security Policies', sub: '' },
  { id: 'signature', icon: '✍️', label: 'Digital Signature', sub: '' },
  { id: 'analytics', icon: '📊', label: 'System Analytics', sub: '' },
  { id: 'health', icon: '💾', label: 'System Health', sub: '' },
  { id: 'settings', icon: '⚙️', label: 'Settings' },
  { id: 'profile', icon: '👤', label: 'Admin Profile', sub: '' },
];

const users = [
  { dept: '👮 Police', count: 156, pct: 63 },
  { dept: '⚖️ Prosecutor', count: 32, pct: 13 },
  { dept: '👨‍⚖️ Judge', count: 18, pct: 7 },
  { dept: '🛡️ Admin', count: 5, pct: 2 },
  { dept: '📋 Others', count: 37, pct: 15 },
];

const securityAlerts = [
  { type: '⚠️ Failed Login', count: 3, sev: 'warning' },
  { type: '🔐 Access Violation', count: 1, sev: 'error' },
  { type: '📄 Integrity Warning', count: 2, sev: 'warning' },
  { type: '🔑 Permission Changes', count: 4, sev: 'done' },
];

const recentActivity = [
  { user: 'Officer01', action: 'Document Upload', time: '10:32', status: '✓', ok: true },
  { user: 'Admin02', action: 'Role Updated', time: '10:35', status: '✓', ok: true },
  { user: 'User15', action: 'Failed Login', time: '10:41', status: '⚠️', ok: false },
  { user: 'Judge03', action: 'Case Accessed', time: '10:44', status: '✓', ok: true },
  { user: 'Prose02', action: 'Document Downloaded', time: '10:47', status: '✓', ok: true },
  { user: 'Officer07', action: 'Evidence Uploaded', time: '10:52', status: '✓', ok: true },
];

const allUsers = [
  { id: 'OFF001', name: 'Officer Sharma', role: 'Police', dept: 'Cyber Crime', status: 'Active', lastLogin: '10:32 today' },
  { id: 'ADM002', name: 'Admin Verma', role: 'Admin', dept: 'IT Division', status: 'Active', lastLogin: '09:15 today' },
  { id: 'PRO003', name: 'Prosecutor Singh', role: 'Prosecutor', dept: 'District Court', status: 'Active', lastLogin: '08:44 today' },
  { id: 'JUD004', name: 'Hon. Justice Roy', role: 'Judge', dept: 'High Court', status: 'Active', lastLogin: 'Yesterday' },
  { id: 'OFF005', name: 'Officer Patel', role: 'Police', dept: 'Fraud Squad', status: 'Suspended', lastLogin: '3 days ago' },
];

export default function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [activeNav, setActiveNav] = useState('dashboard');

  return (
    <Layout title="Administration Console" titleIcon="🛡️" userLabel="Admin" userIcon="👤"
      navItems={navItems} activeNav={activeNav} onNavChange={setActiveNav} onLogout={onLogout}>

      {activeNav === 'dashboard' && <DashboardView />}
      {activeNav === 'users' && <UsersView />}
      {activeNav === 'audit' && <AuditView />}
      {activeNav === 'security' && <SecurityView />}
      {!['dashboard', 'users', 'audit', 'security'].includes(activeNav) && (
        <PlaceholderView title={navItems.find(n => n.id === activeNav)?.label || activeNav} />
      )}
    </Layout>
  );
}

function DashboardView() {
  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 4px' }}>Administration Dashboard</h2>
        <p style={{ fontSize: 12, color: 'var(--muted-foreground)', margin: 0 }}>System overview and security monitoring</p>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 20 }}>
        {[
          { label: 'Total Cases', value: '1,245', icon: '📁', delta: '+12 today' },
          { label: 'Total Users', value: '248', icon: '👥', delta: '+2 this week' },
          { label: 'Active Users', value: '183', icon: '🟢', delta: 'Online now' },
          { label: 'Security Alerts', value: '12', icon: '🚨', delta: '3 critical', warn: true },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: 11, color: 'var(--muted-foreground)', fontFamily: 'Oswald, sans-serif', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>{s.label}</div>
                <div style={{ fontSize: 28, fontFamily: 'Oswald, sans-serif', fontWeight: 700, color: s.warn ? '#f87171' : 'var(--foreground)', lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: 11, color: s.warn ? '#f87171' : 'var(--muted-foreground)', marginTop: 4 }}>{s.delta}</div>
              </div>
              <span style={{ fontSize: 22, opacity: 0.7 }}>{s.icon}</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        {/* System Overview */}
        <div className="section-card">
          <div className="section-card-header">System Overview — User Distribution</div>
          <div className="section-card-body">
            {users.map(u => (
              <div key={u.dept} style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 13 }}>{u.dept}</span>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--accent)' }}>{u.count}</span>
                </div>
                <div style={{ height: 4, background: 'var(--secondary)', borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${u.pct}%`, background: 'linear-gradient(90deg, var(--primary), var(--accent))', borderRadius: 2 }} />
                </div>
              </div>
            ))}
            <div style={{ marginTop: 16, paddingTop: 12, borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
              <span style={{ color: 'var(--muted-foreground)' }}>Total Cases</span>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', color: 'var(--accent)', fontWeight: 600 }}>1,245</span>
            </div>
          </div>
        </div>

        {/* Security Activity */}
        <div className="section-card">
          <div className="section-card-header">Security Activity — Last 24h</div>
          <div className="section-card-body">
            {securityAlerts.map(a => (
              <div key={a.type} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                <span style={{ fontSize: 13 }}>{a.type}</span>
                <span className={`badge badge-${a.sev}`}>{a.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="section-card">
        <div className="section-card-header">Recent System Activity</div>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Action</th>
                <th>Timestamp</th>
                <th>IP Address</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentActivity.map((r, i) => (
                <tr key={i}>
                  <td style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12 }}>{r.user}</td>
                  <td>{r.action}</td>
                  <td style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--muted-foreground)' }}>Today {r.time}</td>
                  <td style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--muted-foreground)' }}>192.168.{i + 1}.{(i + 1) * 10}</td>
                  <td><span className={`badge ${r.ok ? 'badge-active' : 'badge-warning'}`}>{r.ok ? 'SUCCESS' : 'FAILED'}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function UsersView() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0 }}>User Management</h2>
        <button className="btn-primary" style={{ fontSize: 12 }}>+ ADD USER</button>
      </div>
      <div className="section-card">
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr><th>User ID</th><th>Name</th><th>Role</th><th>Department</th><th>Status</th><th>Last Login</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {allUsers.map(u => (
                <tr key={u.id}>
                  <td className="mono" style={{ fontSize: 12 }}>{u.id}</td>
                  <td style={{ fontWeight: 500 }}>{u.name}</td>
                  <td><span className="badge badge-done">{u.role}</span></td>
                  <td style={{ color: 'var(--muted-foreground)' }}>{u.dept}</td>
                  <td><span className={`badge ${u.status === 'Active' ? 'badge-active' : 'badge-error'}`}>{u.status}</span></td>
                  <td className="mono" style={{ fontSize: 11, color: 'var(--muted-foreground)' }}>{u.lastLogin}</td>
                  <td style={{ display: 'flex', gap: 6 }}>
                    <button className="btn-secondary" style={{ padding: '3px 10px', fontSize: 11 }}>Edit</button>
                    <button className="btn-secondary" style={{ padding: '3px 10px', fontSize: 11 }}>Disable</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function AuditView() {
  return (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 20px' }}>Audit Logs</h2>
      <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
        <input className="field-input" type="text" placeholder="Search logs..." style={{ maxWidth: 300 }} />
        <select className="field-input" style={{ maxWidth: 160 }}>
          <option>All Actions</option>
          <option>Login Events</option>
          <option>Document Access</option>
          <option>Role Changes</option>
        </select>
        <select className="field-input" style={{ maxWidth: 160 }}>
          <option>Today</option>
          <option>Last 7 days</option>
          <option>Last 30 days</option>
        </select>
      </div>
      <div className="section-card">
        <table className="data-table">
          <thead><tr><th>Timestamp</th><th>User</th><th>Action</th><th>Resource</th><th>IP</th><th>Result</th></tr></thead>
          <tbody>
            {[...Array(10)].map((_, i) => (
              <tr key={i}>
                <td className="mono" style={{ fontSize: 11, color: 'var(--muted-foreground)' }}>2026-09-12 10:{(30 + i).toString().padStart(2, '0')}</td>
                <td>User{(i + 1).toString().padStart(2, '0')}</td>
                <td>{['Document Upload', 'Case Access', 'Login', 'Role Change', 'File Download', 'Evidence Upload', 'Report View', 'Profile Update', 'Search', 'Logout'][i]}</td>
                <td className="mono" style={{ fontSize: 11 }}>C-{1020 + i}</td>
                <td className="mono" style={{ fontSize: 11, color: 'var(--muted-foreground)' }}>10.0.{i}.{i * 5 + 1}</td>
                <td><span className={`badge ${i === 2 || i === 7 ? 'badge-error' : 'badge-active'}`}>{i === 2 || i === 7 ? 'DENIED' : 'SUCCESS'}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SecurityView() {
  return (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 20px' }}>Security Center</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {[
          { title: 'Active Threats', items: [{ label: 'Brute Force Attempts', count: 3, sev: 'error' }, { label: 'Suspicious IPs', count: 2, sev: 'warning' }, { label: 'Anomalous Access', count: 1, sev: 'warning' }] },
          { title: 'System Integrity', items: [{ label: 'Hash Mismatches', count: 0, sev: 'active' }, { label: 'Unauthorized Edits', count: 0, sev: 'active' }, { label: 'Certificate Validity', count: 100, sev: 'active' }] },
        ].map(s => (
          <div key={s.title} className="section-card">
            <div className="section-card-header">{s.title}</div>
            <div className="section-card-body">
              {s.items.map(it => (
                <div key={it.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                  <span>{it.label}</span>
                  <span className={`badge badge-${it.sev}`}>{it.count}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PlaceholderView({ title }: { title: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 400, color: 'var(--muted-foreground)' }}>
      <div style={{ fontSize: 48, marginBottom: 16, opacity: 0.3 }}>🔐</div>
      <h3 style={{ fontFamily: 'Oswald, sans-serif', fontSize: 18, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 8px' }}>{title}</h3>
      <p style={{ fontSize: 13 }}>This module is available in the full deployment.</p>
    </div>
  );
}
