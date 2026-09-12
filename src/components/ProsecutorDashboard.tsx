import { useState } from 'react';
import Layout from './shared/Layout';

const navItems = [
  { id: 'dashboard', icon: '🏠', label: 'Dashboard' },
  { id: 'mycases', icon: '📁', label: 'My Cases' },
  { id: 'allcases', icon: '📂', label: 'Show All Cases', sub: '' },
  { id: 'documents', icon: '📄', label: 'Case Documents', sub: '' },
  { id: 'legalsearch', icon: '🔍', label: 'Legal Search' },
  { id: 'ai', icon: '🤖', label: 'AI Case Summary', sub: '' },
  { id: 'evidence', icon: '📦', label: 'Evidence Review', sub: '' },
  { id: 'legal', icon: '⚖️', label: 'Legal Assessment', sub: '' },
  { id: 'hearings', icon: '📅', label: 'Hearings' },
  { id: 'requests', icon: '📝', label: 'Requests' },
  { id: 'alerts', icon: '🚨', label: 'Alerts' },
  { id: 'activity', icon: '📋', label: 'My Activity' },
  { id: 'profile', icon: '⚙️', label: 'Profile' },
];

const cases = [
  { id: 'C-1023', type: 'Theft', status: 'Active', updated: '10 Sep', court: 'Court 2' },
  { id: 'C-1024', type: 'Cyber', status: 'Ready', updated: '11 Sep', court: 'Court 1' },
  { id: 'C-1025', type: 'Fraud', status: 'Revision', updated: '11 Sep', court: 'Court 3' },
  { id: 'C-1026', type: 'Theft', status: 'Completed', updated: '12 Sep', court: 'Court 1' },
  { id: 'C-1027', type: 'Fraud', status: 'Completed', updated: '12 Sep', court: 'Court 2' },
];

const hearings = [
  { case: 'C-1023', date: '15 Sep', time: '10:30 AM', court: 'Court 2', type: 'Trial' },
  { case: 'C-1024', date: '16 Sep', time: '11:00 AM', court: 'Court 1', type: 'Hearing' },
  { case: 'C-1025', date: '18 Sep', time: '02:00 PM', court: 'Court 3', type: 'Appeal' },
  { case: 'C-1026', date: '20 Sep', time: '10:00 AM', court: 'Court 1', type: 'Judgment' },
];

function statusBadge(status: string) {
  const map: Record<string, string> = { Active: 'badge-active', Ready: 'badge-done', Revision: 'badge-warning', Completed: 'badge-pending', Review: 'badge-done' };
  return map[status] || 'badge-done';
}

export default function ProsecutorDashboard({ onLogout }: { onLogout: () => void }) {
  const [activeNav, setActiveNav] = useState('dashboard');

  return (
    <Layout title="Prosecution Workspace" titleIcon="⚖️" userLabel="Prosecutor 1" userIcon="⚖️"
      navItems={navItems} activeNav={activeNav} onNavChange={setActiveNav} onLogout={onLogout}
      accentColor="#60a5fa">
      {activeNav === 'dashboard' && <DashboardView />}
      {activeNav === 'mycases' && <MyCasesView />}
      {activeNav === 'hearings' && <HearingsView />}
      {!['dashboard', 'mycases', 'hearings'].includes(activeNav) && (
        <PlaceholderView title={navItems.find(n => n.id === activeNav)?.label || activeNav} />
      )}
    </Layout>
  );
}

function DashboardView() {
  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 4px' }}>Prosecution Dashboard</h2>
        <p style={{ fontSize: 12, color: 'var(--muted-foreground)', margin: 0 }}>Prosecutor: Advocate Sharma · District Court, New Delhi</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12, marginBottom: 20 }}>
        {[
          { label: 'My Cases', value: '24', icon: '📁' },
          { label: 'Active Cases', value: '16', icon: '🟢' },
          { label: 'Pending Review', value: '6', icon: '⏳', warn: true },
          { label: 'Completed', value: '8', icon: '✅' },
          { label: 'Upcoming Hearings', value: '4', icon: '📅', warn: true },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: 11, color: 'var(--muted-foreground)', fontFamily: 'Oswald, sans-serif', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>{s.label}</div>
                <div style={{ fontSize: 28, fontFamily: 'Oswald, sans-serif', fontWeight: 700, color: s.warn ? '#f59e0b' : 'var(--foreground)', lineHeight: 1 }}>{s.value}</div>
              </div>
              <span style={{ fontSize: 18, opacity: 0.7 }}>{s.icon}</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        {/* Case overview */}
        <div className="section-card">
          <div className="section-card-header">My Case Overview</div>
          <div className="section-card-body">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 16 }}>
              {[
                { label: 'Under Review', count: 6, color: '#60a5fa' },
                { label: 'Ready', count: 9, color: '#4ade80' },
                { label: 'Revision', count: 3, color: '#f59e0b' },
                { label: 'Completed', count: 8, color: '#a78bfa' },
              ].map(s => (
                <div key={s.label} style={{ textAlign: 'center', padding: '12px 8px', background: 'var(--secondary)', borderRadius: 4, border: `1px solid ${s.color}33` }}>
                  <div style={{ fontSize: 24, fontFamily: 'Oswald, sans-serif', fontWeight: 700, color: s.color }}>{s.count}</div>
                  <div style={{ fontSize: 10, color: 'var(--muted-foreground)', marginTop: 2, lineHeight: 1.2 }}>{s.label}</div>
                </div>
              ))}
            </div>
            {/* Bar chart */}
            <div style={{ height: 80, display: 'flex', alignItems: 'flex-end', gap: 8, padding: '0 8px' }}>
              {[
                { label: 'Review', pct: 40, color: '#60a5fa' },
                { label: 'Ready', pct: 58, color: '#4ade80' },
                { label: 'Revision', pct: 20, color: '#f59e0b' },
                { label: 'Completed', pct: 53, color: '#a78bfa' },
              ].map(b => (
                <div key={b.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <div style={{ width: '100%', height: `${b.pct}%`, background: b.color, borderRadius: '2px 2px 0 0', opacity: 0.8 }} />
                  <div style={{ fontSize: 9, color: 'var(--muted-foreground)', textAlign: 'center' }}>{b.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming hearings */}
        <div className="section-card">
          <div className="section-card-header">Upcoming Hearings</div>
          <div style={{ padding: 0 }}>
            {hearings.map((h, i) => (
              <div key={i} style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 40, height: 40, background: 'var(--secondary)', borderRadius: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid var(--border)' }}>
                  <div style={{ fontSize: 14, fontFamily: 'Oswald, sans-serif', fontWeight: 700, lineHeight: 1 }}>{h.date.split(' ')[0]}</div>
                  <div style={{ fontSize: 9, color: 'var(--muted-foreground)' }}>Sep</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span className="mono" style={{ fontSize: 12, color: '#60a5fa' }}>{h.case}</span>
                    <span style={{ fontSize: 11, color: 'var(--muted-foreground)' }}>{h.court}</span>
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--muted-foreground)', marginTop: 2 }}>{h.type} · {h.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* My cases table */}
        <div className="section-card">
          <div className="section-card-header">My Cases</div>
          <table className="data-table">
            <thead><tr><th>Case ID</th><th>Type</th><th>Status</th><th>Updated</th></tr></thead>
            <tbody>
              {cases.map(c => (
                <tr key={c.id} style={{ cursor: 'pointer' }}>
                  <td className="mono" style={{ fontSize: 12, color: '#60a5fa' }}>{c.id}</td>
                  <td>{c.type}</td>
                  <td><span className={`badge ${statusBadge(c.status)}`}>{c.status}</span></td>
                  <td className="mono" style={{ fontSize: 11, color: 'var(--muted-foreground)' }}>{c.updated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Required actions */}
        <div className="section-card">
          <div className="section-card-header">Required Actions</div>
          <div className="section-card-body">
            {[
              { icon: '📄', text: '3 documents require review', count: 3, sev: 'badge-warning' },
              { icon: '📦', text: '2 evidence records need verification', count: 2, sev: 'badge-warning' },
              { icon: '📑', text: '1 charge sheet requires revision', count: 1, sev: 'badge-error' },
              { icon: '⚖️', text: '1 legal assessment pending', count: 1, sev: 'badge-done' },
            ].map(a => (
              <div key={a.text} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 16 }}>{a.icon}</span>
                  <span style={{ fontSize: 13 }}>{a.text}</span>
                </div>
                <span className={`badge ${a.sev}`}>{a.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MyCasesView() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0 }}>My Cases</h2>
        <div style={{ display: 'flex', gap: 8 }}>
          <input className="field-input" type="text" placeholder="Search cases..." style={{ maxWidth: 220 }} />
          <select className="field-input" style={{ maxWidth: 140 }}><option>All Status</option><option>Active</option><option>Ready</option><option>Revision</option></select>
        </div>
      </div>
      <div className="section-card">
        <table className="data-table">
          <thead><tr><th>Case ID</th><th>Type</th><th>Accused</th><th>Status</th><th>Court</th><th>Last Updated</th><th>Actions</th></tr></thead>
          <tbody>
            {cases.map(c => (
              <tr key={c.id}>
                <td className="mono" style={{ fontSize: 12, color: '#60a5fa' }}>{c.id}</td>
                <td>{c.type}</td>
                <td style={{ color: 'var(--muted-foreground)' }}>Raj Kumar</td>
                <td><span className={`badge ${statusBadge(c.status)}`}>{c.status}</span></td>
                <td style={{ color: 'var(--muted-foreground)' }}>{c.court}</td>
                <td className="mono" style={{ fontSize: 11, color: 'var(--muted-foreground)' }}>{c.updated} Sep</td>
                <td><button className="btn-secondary" style={{ padding: '4px 12px', fontSize: 11 }}>View</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function HearingsView() {
  return (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 20px' }}>Scheduled Hearings</h2>
      <div className="section-card">
        <table className="data-table">
          <thead><tr><th>Case ID</th><th>Date</th><th>Time</th><th>Type</th><th>Court</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {hearings.map((h, i) => (
              <tr key={i}>
                <td className="mono" style={{ fontSize: 12, color: '#60a5fa' }}>{h.case}</td>
                <td>{h.date} 2026</td>
                <td className="mono" style={{ fontSize: 12 }}>{h.time}</td>
                <td>{h.type}</td>
                <td>{h.court}</td>
                <td><span className="badge badge-pending">Scheduled</span></td>
                <td><button className="btn-secondary" style={{ padding: '4px 12px', fontSize: 11 }}>Prepare</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PlaceholderView({ title }: { title: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 400, color: 'var(--muted-foreground)' }}>
      <div style={{ fontSize: 48, marginBottom: 16, opacity: 0.3 }}>⚖️</div>
      <h3 style={{ fontFamily: 'Oswald, sans-serif', fontSize: 18, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 8px' }}>{title}</h3>
      <p style={{ fontSize: 13 }}>This module is available in the full deployment.</p>
    </div>
  );
}
