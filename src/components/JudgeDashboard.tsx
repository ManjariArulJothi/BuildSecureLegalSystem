import { useState } from 'react';
import Layout from './shared/Layout';

const navItems = [
  { id: 'dashboard', icon: '🏠', label: 'Dashboard' },
  { id: 'mycases', icon: '📁', label: 'My Cases' },
  { id: 'allcases', icon: '📂', label: 'Show All Cases', sub: '' },
  { id: 'hearings', icon: '📅', label: 'Hearings' },
  { id: 'casefiles', icon: '📂', label: 'Digital Case Files', sub: '' },
  { id: 'documents', icon: '📄', label: 'Court Documents', sub: '' },
  { id: 'evidence', icon: '📦', label: 'Evidence' },
  { id: 'search', icon: '🔍', label: 'Case Search' },
  { id: 'ai', icon: '🤖', label: 'AI Case Overview', sub: '' },
  { id: 'proceedings', icon: '📜', label: 'Proceedings' },
  { id: 'orders', icon: '⚖️', label: 'Orders' },
  { id: 'signature', icon: '✍️', label: 'Digital Signature', sub: '' },
  { id: 'alerts', icon: '🚨', label: 'Alerts' },
  { id: 'activity', icon: '📋', label: 'My Activity' },
  { id: 'profile', icon: '⚙️', label: 'Profile' },
];

const todayHearings = [
  { id: 'C-101', time: '10:00', type: 'Bail Application', parties: 'State vs Patel', status: 'Scheduled' },
  { id: 'C-102', time: '11:30', type: 'Trial Hearing', parties: 'State vs Kumar', status: 'In Progress' },
  { id: 'C-103', time: '14:00', type: 'Appeal', parties: 'Sharma vs State', status: 'Scheduled' },
  { id: 'C-104', time: '15:30', type: 'Judgment', parties: 'State vs Singh', status: 'Scheduled' },
  { id: 'C-105', time: '16:30', type: 'Bail Hearing', parties: 'State vs Gupta', status: 'Scheduled' },
];

const myCases = [
  { id: 'C-101', title: 'State vs Patel', type: 'Criminal', status: 'Active', stage: 'Hearing' },
  { id: 'C-102', title: 'State vs Kumar', type: 'Criminal', status: 'Active', stage: 'Trial' },
  { id: 'C-103', title: 'Sharma vs State', type: 'Appeal', status: 'Active', stage: 'Appeal' },
  { id: 'C-104', title: 'State vs Singh', type: 'Criminal', status: 'Judgment', stage: 'Judgment' },
  { id: 'C-105', title: 'State vs Gupta', type: 'Criminal', status: 'Active', stage: 'Bail' },
];

export default function JudgeDashboard({ onLogout }: { onLogout: () => void }) {
  const [activeNav, setActiveNav] = useState('dashboard');

  return (
    <Layout title="Judicial Workspace" titleIcon="⚖️" userLabel="Hon. Judge 1" userIcon="👨‍⚖️"
      navItems={navItems} activeNav={activeNav} onNavChange={setActiveNav} onLogout={onLogout}
      accentColor="#a78bfa">
      {activeNav === 'dashboard' && <DashboardView />}
      {activeNav === 'mycases' && <MyCasesView />}
      {activeNav === 'hearings' && <HearingsDetailView />}
      {activeNav === 'orders' && <OrdersView />}
      {!['dashboard', 'mycases', 'hearings', 'orders'].includes(activeNav) && (
        <PlaceholderView title={navItems.find(n => n.id === activeNav)?.label || activeNav} />
      )}
    </Layout>
  );
}

function DashboardView() {
  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 4px' }}>Judicial Dashboard</h2>
        <p style={{ fontSize: 12, color: 'var(--muted-foreground)', margin: 0 }}>Hon. Justice Ramesh · Additional Sessions Court, New Delhi</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12, marginBottom: 20 }}>
        {[
          { label: 'Total Cases', value: '1,245', icon: '📁' },
          { label: 'My Cases', value: '32', icon: '⚖️' },
          { label: 'Active Cases', value: '18', icon: '🟢' },
          { label: "Today's Hearings", value: '8', icon: '📅', warn: true },
          { label: 'Upcoming', value: '15', icon: '🗓️' },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: 11, color: 'var(--muted-foreground)', fontFamily: 'Oswald, sans-serif', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>{s.label}</div>
                <div style={{ fontSize: 26, fontFamily: 'Oswald, sans-serif', fontWeight: 700, color: s.warn ? '#a78bfa' : 'var(--foreground)', lineHeight: 1 }}>{s.value}</div>
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
                { label: 'Active', count: 18, color: '#4ade80' },
                { label: 'Hearing', count: 5, color: '#a78bfa' },
                { label: 'Judgment', count: 4, color: '#f59e0b' },
                { label: 'Completed', count: 5, color: '#6b7fa8' },
              ].map(s => (
                <div key={s.label} style={{ textAlign: 'center', padding: '12px 6px', background: 'var(--secondary)', borderRadius: 4, border: `1px solid ${s.color}33` }}>
                  <div style={{ fontSize: 22, fontFamily: 'Oswald, sans-serif', fontWeight: 700, color: s.color }}>{s.count}</div>
                  <div style={{ fontSize: 10, color: 'var(--muted-foreground)', marginTop: 2 }}>{s.label}</div>
                </div>
              ))}
            </div>
            <div style={{ height: 80, display: 'flex', alignItems: 'flex-end', gap: 8, padding: '0 8px' }}>
              {[
                { label: 'Active', pct: 80, color: '#4ade80' },
                { label: 'Hearing', pct: 28, color: '#a78bfa' },
                { label: 'Judgment', pct: 22, color: '#f59e0b' },
                { label: 'Completed', pct: 28, color: '#6b7fa8' },
              ].map(b => (
                <div key={b.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <div style={{ width: '100%', height: `${b.pct}%`, background: b.color, borderRadius: '2px 2px 0 0', opacity: 0.8 }} />
                  <div style={{ fontSize: 9, color: 'var(--muted-foreground)', textAlign: 'center' }}>{b.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Today's hearings */}
        <div className="section-card">
          <div className="section-card-header">Today's Hearings — {new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
          <div>
            {todayHearings.slice(0, 4).map((h, i) => (
              <div key={i} style={{ padding: '10px 16px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, fontWeight: 600, color: '#a78bfa', flexShrink: 0, width: 44 }}>{h.time}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span className="mono" style={{ fontSize: 11, color: 'var(--accent)' }}>{h.id}</span>
                    <span className={`badge ${h.status === 'In Progress' ? 'badge-active' : 'badge-pending'}`}>{h.status}</span>
                  </div>
                  <div style={{ fontSize: 12, marginTop: 2 }}>{h.type}</div>
                  <div style={{ fontSize: 11, color: 'var(--muted-foreground)', marginTop: 1 }}>{h.parties}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Required actions */}
      <div className="section-card">
        <div className="section-card-header">Required Actions</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0 }}>
          {[
            { icon: '⚖️', text: '3 cases awaiting hearing date assignment', sev: 'badge-warning', count: 3 },
            { icon: '📜', text: '2 orders pending signature and issuance', sev: 'badge-error', count: 2 },
            { icon: '📄', text: '2 documents require judicial review', sev: 'badge-done', count: 2 },
          ].map(a => (
            <div key={a.text} style={{ padding: '16px', borderRight: '1px solid var(--border)', display: 'flex', gap: 12 }}>
              <span style={{ fontSize: 22, flexShrink: 0 }}>{a.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, lineHeight: 1.4 }}>{a.text}</div>
                <div style={{ marginTop: 8 }}>
                  <span className={`badge ${a.sev}`}>{a.count} pending</span>
                </div>
              </div>
            </div>
          ))}
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
          <select className="field-input" style={{ maxWidth: 140 }}><option>All Stages</option><option>Active</option><option>Hearing</option><option>Judgment</option></select>
        </div>
      </div>
      <div className="section-card">
        <table className="data-table">
          <thead><tr><th>Case ID</th><th>Title</th><th>Type</th><th>Stage</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {myCases.map(c => (
              <tr key={c.id}>
                <td className="mono" style={{ fontSize: 12, color: '#a78bfa' }}>{c.id}</td>
                <td style={{ fontWeight: 500 }}>{c.title}</td>
                <td><span className="badge badge-done">{c.type}</span></td>
                <td>{c.stage}</td>
                <td><span className={`badge ${c.status === 'Active' ? 'badge-active' : c.status === 'Judgment' ? 'badge-warning' : 'badge-done'}`}>{c.status}</span></td>
                <td style={{ display: 'flex', gap: 6 }}>
                  <button className="btn-secondary" style={{ padding: '3px 10px', fontSize: 11 }}>View</button>
                  <button className="btn-secondary" style={{ padding: '3px 10px', fontSize: 11 }}>Order</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function HearingsDetailView() {
  return (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 20px' }}>Hearing Schedule</h2>
      <div className="section-card">
        <table className="data-table">
          <thead><tr><th>Case ID</th><th>Time</th><th>Hearing Type</th><th>Parties</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {todayHearings.map((h, i) => (
              <tr key={i}>
                <td className="mono" style={{ fontSize: 12, color: '#a78bfa' }}>{h.id}</td>
                <td className="mono" style={{ fontSize: 13, fontWeight: 600 }}>{h.time}</td>
                <td>{h.type}</td>
                <td style={{ color: 'var(--muted-foreground)' }}>{h.parties}</td>
                <td><span className={`badge ${h.status === 'In Progress' ? 'badge-active' : 'badge-pending'}`}>{h.status}</span></td>
                <td style={{ display: 'flex', gap: 6 }}>
                  <button className="btn-secondary" style={{ padding: '3px 10px', fontSize: 11 }}>Open</button>
                  <button className="btn-secondary" style={{ padding: '3px 10px', fontSize: 11 }}>Notes</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function OrdersView() {
  const orders = [
    { id: 'ORD-2026-441', case: 'C-104', type: 'Bail Order', status: 'Draft', date: '12 Sep' },
    { id: 'ORD-2026-440', case: 'C-102', type: 'Remand Order', status: 'Signed', date: '11 Sep' },
    { id: 'ORD-2026-439', case: 'C-101', type: 'Interim Order', status: 'Issued', date: '10 Sep' },
  ];
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0 }}>Court Orders</h2>
        <button className="btn-primary" style={{ fontSize: 12 }}>+ DRAFT ORDER</button>
      </div>
      <div className="section-card">
        <table className="data-table">
          <thead><tr><th>Order ID</th><th>Case</th><th>Type</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.id}>
                <td className="mono" style={{ fontSize: 11, color: '#a78bfa' }}>{o.id}</td>
                <td className="mono" style={{ fontSize: 12, color: 'var(--accent)' }}>{o.case}</td>
                <td>{o.type}</td>
                <td><span className={`badge ${o.status === 'Draft' ? 'badge-pending' : o.status === 'Signed' ? 'badge-active' : 'badge-done'}`}>{o.status}</span></td>
                <td className="mono" style={{ fontSize: 11, color: 'var(--muted-foreground)' }}>{o.date} 2026</td>
                <td style={{ display: 'flex', gap: 6 }}>
                  {o.status === 'Draft' && <button className="btn-primary" style={{ padding: '3px 12px', fontSize: 11 }}>✍️ Sign</button>}
                  <button className="btn-secondary" style={{ padding: '3px 10px', fontSize: 11 }}>View</button>
                </td>
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
      <div style={{ fontSize: 48, marginBottom: 16, opacity: 0.3 }}>👨‍⚖️</div>
      <h3 style={{ fontFamily: 'Oswald, sans-serif', fontSize: 18, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 8px' }}>{title}</h3>
      <p style={{ fontSize: 13 }}>This module is available in the full deployment.</p>
    </div>
  );
}
