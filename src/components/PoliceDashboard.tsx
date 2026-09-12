import { useState } from 'react';
import Layout from './shared/Layout';

const navItems = [
  { id: 'dashboard', icon: '🏠', label: 'Dashboard' },
  { id: 'mycases', icon: '📁', label: 'My Cases' },
  { id: 'allcases', icon: '📂', label: 'Show All Cases', sub: '' },
  { id: 'documents', icon: '📄', label: 'Documents' },
  { id: 'upload', icon: '⬆️', label: 'Upload Document', sub: '' },
  { id: 'evidence', icon: '📦', label: 'Evidence' },
  { id: 'chargesheet', icon: '📑', label: 'Charge Sheet' },
  { id: 'search', icon: '🔍', label: 'Smart Search' },
  { id: 'ai', icon: '🤖', label: 'AI Analysis' },
  { id: 'versions', icon: '🔄', label: 'Version History', sub: '' },
  { id: 'alerts', icon: '🚨', label: 'Alerts' },
  { id: 'activity', icon: '📋', label: 'My Activity' },
  { id: 'profile', icon: '⚙️', label: 'Profile' },
];

const myCases = [
  { id: 'C-1023', title: 'XYZ Investigation', type: 'Theft', status: 'Active', priority: 'High', updated: '12 Sep 2026' },
  { id: 'C-1031', title: 'Bank Fraud Case', type: 'Fraud', status: 'Active', priority: 'Critical', updated: '11 Sep 2026' },
  { id: 'C-1018', title: 'Cybercrime Incident', type: 'Cyber', status: 'Pending', priority: 'Medium', updated: '10 Sep 2026' },
  { id: 'C-1009', title: 'Assault Complaint', type: 'Assault', status: 'Closed', priority: 'Low', updated: '08 Sep 2026' },
];

export default function PoliceDashboard({ onLogout }: { onLogout: () => void }) {
  const [activeNav, setActiveNav] = useState('dashboard');
  const [selectedCase, setSelectedCase] = useState('C-1023');

  return (
    <Layout title="Police Workspace" titleIcon="🛡️" userLabel="Police 1" userIcon="👮"
      navItems={navItems} activeNav={activeNav} onNavChange={setActiveNav} onLogout={onLogout}>
      {activeNav === 'dashboard' && <DashboardView onNav={setActiveNav} />}
      {activeNav === 'mycases' && <MyCasesView cases={myCases} onSelect={id => { setSelectedCase(id); setActiveNav('chargesheet'); }} />}
      {activeNav === 'chargesheet' && <ChargeSheetView caseId={selectedCase} />}
      {activeNav === 'upload' || activeNav === 'documents' ? <UploadView /> : null}
      {!['dashboard', 'mycases', 'chargesheet', 'upload', 'documents'].includes(activeNav) && (
        <PlaceholderView title={navItems.find(n => n.id === activeNav)?.label || activeNav} />
      )}
    </Layout>
  );
}

function DashboardView({ onNav }: { onNav: (id: string) => void }) {
  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 4px' }}>Police Dashboard</h2>
        <p style={{ fontSize: 12, color: 'var(--muted-foreground)', margin: 0 }}>Officer: Police 1 · Station: Cyber Crime Division</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 20 }}>
        {[
          { label: 'My Cases', value: '8', icon: '📁' },
          { label: 'Active Cases', value: '5', icon: '🟢' },
          { label: 'Pending Review', value: '2', icon: '⏳', warn: true },
          { label: 'Alerts', value: '3', icon: '🚨', warn: true },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: 11, color: 'var(--muted-foreground)', fontFamily: 'Oswald, sans-serif', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>{s.label}</div>
                <div style={{ fontSize: 32, fontFamily: 'Oswald, sans-serif', fontWeight: 700, color: s.warn ? '#f59e0b' : 'var(--foreground)', lineHeight: 1 }}>{s.value}</div>
              </div>
              <span style={{ fontSize: 22, opacity: 0.7 }}>{s.icon}</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <div className="section-card">
          <div className="section-card-header">My Active Cases</div>
          <div className="section-card-body" style={{ padding: 0 }}>
            {myCases.slice(0, 3).map(c => (
              <div key={c.id} style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)', cursor: 'pointer', transition: 'background 0.15s' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--secondary)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                onClick={() => onNav('chargesheet')}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span className="mono" style={{ fontSize: 12, color: 'var(--accent)' }}>{c.id}</span>
                  <span className={`badge ${c.status === 'Active' ? 'badge-active' : c.status === 'Pending' ? 'badge-pending' : 'badge-done'}`}>{c.status}</span>
                </div>
                <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 2 }}>{c.title}</div>
                <div style={{ fontSize: 11, color: 'var(--muted-foreground)' }}>{c.type} · Updated {c.updated}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="section-card">
          <div className="section-card-header">Required Actions</div>
          <div className="section-card-body">
            {[
              { icon: '📑', text: '1 charge sheet pending submission', sev: 'warning' },
              { icon: '📦', text: '3 evidence items need tagging', sev: 'warning' },
              { icon: '📄', text: '2 documents awaiting upload', sev: 'done' },
              { icon: '✍️', text: 'FIR C-1031 needs digital signature', sev: 'error' },
            ].map(a => (
              <div key={a.text} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                <span style={{ fontSize: 16, flexShrink: 0 }}>{a.icon}</span>
                <span style={{ fontSize: 13 }}>{a.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="section-card">
        <div className="section-card-header">Recent Activity</div>
        <table className="data-table">
          <thead><tr><th>Case ID</th><th>Action</th><th>Time</th><th>Status</th></tr></thead>
          <tbody>
            {[
              { id: 'C-1023', action: 'Document Uploaded', time: '10:32', ok: true },
              { id: 'C-1031', action: 'Evidence Tagged', time: '09:55', ok: true },
              { id: 'C-1018', action: 'Charge Sheet Draft Saved', time: '09:20', ok: true },
              { id: 'C-1023', action: 'FIR Submitted', time: 'Yesterday', ok: true },
            ].map((r, i) => (
              <tr key={i}>
                <td className="mono" style={{ fontSize: 12, color: 'var(--accent)' }}>{r.id}</td>
                <td>{r.action}</td>
                <td className="mono" style={{ fontSize: 11, color: 'var(--muted-foreground)' }}>{r.time}</td>
                <td><span className="badge badge-active">Done</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MyCasesView({ cases, onSelect }: { cases: typeof myCases; onSelect: (id: string) => void }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0 }}>My Cases</h2>
        <input className="field-input" type="text" placeholder="Search cases..." style={{ maxWidth: 250 }} />
      </div>
      <div className="section-card">
        <table className="data-table">
          <thead><tr><th>Case ID</th><th>Title</th><th>Type</th><th>Priority</th><th>Status</th><th>Last Updated</th><th>Actions</th></tr></thead>
          <tbody>
            {cases.map(c => (
              <tr key={c.id} style={{ cursor: 'pointer' }} onClick={() => onSelect(c.id)}>
                <td className="mono" style={{ fontSize: 12, color: 'var(--accent)' }}>{c.id}</td>
                <td style={{ fontWeight: 500 }}>{c.title}</td>
                <td>{c.type}</td>
                <td><span className={`badge ${c.priority === 'Critical' ? 'badge-error' : c.priority === 'High' ? 'badge-warning' : 'badge-done'}`}>{c.priority}</span></td>
                <td><span className={`badge ${c.status === 'Active' ? 'badge-active' : c.status === 'Pending' ? 'badge-pending' : 'badge-done'}`}>{c.status}</span></td>
                <td className="mono" style={{ fontSize: 11, color: 'var(--muted-foreground)' }}>{c.updated}</td>
                <td><button className="btn-secondary" style={{ padding: '4px 12px', fontSize: 11 }}>View</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ChargeSheetView({ caseId }: { caseId: string }) {
  const [summary, setSummary] = useState('The accused was found in possession of stolen goods valued at ₹4,50,000. CCTV footage and witness testimonies corroborate the evidence collected at the scene. Forensic analysis confirms the recovered items match the reported stolen inventory.');

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 4px' }}>📑 Charge Sheet</h2>
          <p style={{ fontSize: 12, color: 'var(--muted-foreground)', margin: 0 }}>Case {caseId} · XYZ Investigation</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn-secondary" style={{ fontSize: 12 }}>💾 SAVE DRAFT</button>
          <button className="btn-primary" style={{ fontSize: 12 }}>📤 SUBMIT TO PROSECUTOR</button>
        </div>
      </div>

      {/* Case info */}
      <div className="section-card" style={{ marginBottom: 16 }}>
        <div className="section-card-header">Case Information</div>
        <div className="section-card-body">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 16 }}>
            {[
              { label: 'Case ID', value: caseId },
              { label: 'Case Title', value: 'XYZ Investigation' },
              { label: 'Investigating Officer', value: 'Police 1' },
              { label: 'Case Status', value: 'Under Investigation' },
            ].map(f => (
              <div key={f.label}>
                <div style={{ fontSize: 11, fontFamily: 'Oswald, sans-serif', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted-foreground)', marginBottom: 4 }}>{f.label}</div>
                <div style={{ fontSize: 14, fontWeight: 500, fontFamily: f.label === 'Case ID' ? 'JetBrains Mono, monospace' : undefined, color: f.label === 'Case ID' ? 'var(--accent)' : undefined }}>{f.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Status tracker */}
      <div className="section-card" style={{ marginBottom: 16 }}>
        <div className="section-card-header">Charge Sheet Status</div>
        <div className="section-card-body">
          <div style={{ display: 'flex', gap: 0 }}>
            {[
              { label: 'Draft', done: true },
              { label: 'Submitted to Prosecutor', done: true },
              { label: 'Under Legal Review', done: false, active: true },
              { label: 'Revision Required', done: false },
              { label: 'Approved / Forwarded', done: false },
            ].map((s, i) => (
              <div key={s.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                {i > 0 && <div style={{ position: 'absolute', top: 14, right: '50%', width: '100%', height: 2, background: s.done ? 'var(--accent)' : 'var(--border)', zIndex: 0 }} />}
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: s.done ? 'var(--accent)' : s.active ? 'var(--primary)' : 'var(--secondary)', border: `2px solid ${s.done ? 'var(--accent)' : s.active ? 'var(--accent)' : 'var(--border)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, zIndex: 1, position: 'relative', color: s.done ? 'var(--accent-foreground)' : 'var(--foreground)' }}>
                  {s.done ? '✓' : s.active ? '⏳' : '—'}
                </div>
                <div style={{ fontSize: 11, marginTop: 6, textAlign: 'center', color: s.done ? 'var(--accent)' : s.active ? 'var(--foreground)' : 'var(--muted-foreground)', fontWeight: s.active ? 600 : 400 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="section-card">
        <div className="section-card-header">Charge Sheet Details</div>
        <div className="section-card-body">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 11, fontFamily: 'Oswald, sans-serif', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted-foreground)', marginBottom: 8 }}>Sections / Charges (IPC / BNS)</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {['IPC 379', 'IPC 411', 'BNS 303', 'BNS 317(2)'].map(s => (
                  <span key={s} className="badge badge-done">{s}</span>
                ))}
                <button className="btn-secondary" style={{ padding: '2px 10px', fontSize: 11 }}>+ Add</button>
              </div>
            </div>
            <div>
              <div style={{ fontSize: 11, fontFamily: 'Oswald, sans-serif', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted-foreground)', marginBottom: 8 }}>Accused / Suspect Details</div>
              <div style={{ background: 'var(--secondary)', border: '1px solid var(--border)', borderRadius: 4, padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 18 }}>👤</span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>Raj Kumar</div>
                  <div style={{ fontSize: 11, color: 'var(--muted-foreground)' }}>DOB: 15 Mar 1988 · ID: ACC-2024-0047</div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 11, fontFamily: 'Oswald, sans-serif', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted-foreground)', marginBottom: 8 }}>Evidence Supporting Charges</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <div style={{ background: 'var(--secondary)', border: '1px solid var(--border)', borderRadius: 4, padding: '8px 14px', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>
                📄 <strong>12</strong> documents
              </div>
              <div style={{ background: 'var(--secondary)', border: '1px solid var(--border)', borderRadius: 4, padding: '8px 14px', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>
                📦 <strong>5</strong> evidence records
              </div>
              <div style={{ background: 'var(--secondary)', border: '1px solid var(--border)', borderRadius: 4, padding: '8px 14px', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>
                🖼️ <strong>8</strong> photographs
              </div>
            </div>
          </div>

          <div>
            <div style={{ fontSize: 11, fontFamily: 'Oswald, sans-serif', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted-foreground)', marginBottom: 8 }}>Investigation Summary</div>
            <textarea className="field-input" rows={4} value={summary} onChange={e => setSummary(e.target.value)} style={{ resize: 'vertical' }} />
          </div>
        </div>
      </div>
    </div>
  );
}

function UploadView() {
  const [dragOver, setDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 4px' }}>📄 Upload Document</h2>
          <p style={{ fontSize: 12, color: 'var(--muted-foreground)', margin: 0 }}>Securely upload case documents with OCR processing</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Document Info */}
          <div className="section-card">
            <div className="section-card-header">Document Information</div>
            <div className="section-card-body" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ display: 'block', fontSize: 11, fontFamily: 'Oswald, sans-serif', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted-foreground)', marginBottom: 6 }}>Document Type *</label>
                <select className="field-input">
                  <option>FIR — First Information Report</option>
                  <option>Charge Sheet</option>
                  <option>Witness Statement</option>
                  <option>Forensic Report</option>
                  <option>Court Order</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 11, fontFamily: 'Oswald, sans-serif', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted-foreground)', marginBottom: 6 }}>Case ID *</label>
                <select className="field-input">
                  <option>C-1023 — XYZ Investigation</option>
                  <option>C-1031 — Bank Fraud Case</option>
                  <option>C-1018 — Cybercrime Incident</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 11, fontFamily: 'Oswald, sans-serif', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted-foreground)', marginBottom: 6 }}>Document Title *</label>
                <input className="field-input" type="text" placeholder="First Information Report - C1023" />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 11, fontFamily: 'Oswald, sans-serif', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted-foreground)', marginBottom: 6 }}>Description / Remarks</label>
                <textarea className="field-input" rows={3} placeholder="Additional notes or context for this document..." style={{ resize: 'vertical' }} />
              </div>
            </div>
          </div>

          {/* People */}
          <div className="section-card">
            <div className="section-card-header">People / Case Details</div>
            <div className="section-card-body" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[{ label: 'Suspect(s) *', placeholder: 'Search / Select Suspect' }, { label: 'Victim(s)', placeholder: 'Search / Select Victim' }, { label: 'Witness(es)', placeholder: 'Search / Select Witness' }].map(f => (
                <div key={f.label}>
                  <label style={{ display: 'block', fontSize: 11, fontFamily: 'Oswald, sans-serif', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted-foreground)', marginBottom: 6 }}>{f.label}</label>
                  <input className="field-input" type="text" placeholder={f.placeholder} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Upload zone */}
          <div className="section-card">
            <div className="section-card-header">📎 Upload File</div>
            <div className="section-card-body">
              <div
                onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={e => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files[0]; if (f) setUploadedFile(f.name); }}
                style={{
                  border: `2px dashed ${dragOver ? 'var(--accent)' : 'var(--border)'}`,
                  borderRadius: 6, padding: '40px 20px', textAlign: 'center',
                  background: dragOver ? 'rgba(201,152,58,0.06)' : 'var(--secondary)',
                  transition: 'all 0.2s', cursor: 'pointer',
                }}>
                {uploadedFile ? (
                  <div>
                    <div style={{ fontSize: 36, marginBottom: 8 }}>✅</div>
                    <div style={{ fontWeight: 600, marginBottom: 4 }}>{uploadedFile}</div>
                    <div style={{ fontSize: 12, color: 'var(--muted-foreground)' }}>File selected — ready to upload</div>
                    <button onClick={() => setUploadedFile(null)} className="btn-secondary" style={{ marginTop: 10, padding: '4px 12px', fontSize: 11 }}>Remove</button>
                  </div>
                ) : (
                  <div>
                    <div style={{ fontSize: 40, marginBottom: 8, opacity: 0.5 }}>📄</div>
                    <div style={{ fontWeight: 500, marginBottom: 4 }}>Drag & Drop document here</div>
                    <div style={{ fontSize: 12, color: 'var(--muted-foreground)', marginBottom: 12 }}>or</div>
                    <label style={{ cursor: 'pointer' }}>
                      <input type="file" style={{ display: 'none' }} onChange={e => { const f = e.target.files?.[0]; if (f) setUploadedFile(f.name); }} />
                      <span className="btn-secondary" style={{ display: 'inline-block' }}>Choose File</span>
                    </label>
                  </div>
                )}
              </div>
              <div style={{ marginTop: 12, padding: '8px 12px', background: 'var(--secondary)', borderRadius: 4, display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--muted-foreground)' }}>
                <span>📋</span>
                <div>
                  <div>Accepted: PDF, JPG, PNG, DOCX (max 50MB)</div>
                  <div style={{ marginTop: 2, color: 'var(--accent)' }}>🔍 OCR will be applied automatically to scanned documents</div>
                </div>
              </div>
            </div>
          </div>

          {/* Security notice */}
          <div style={{ background: '#0d1a10', border: '1px solid #1a4028', borderRadius: 4, padding: '12px 16px' }}>
            <div style={{ fontSize: 12, color: '#4ade80', display: 'flex', gap: 8, alignItems: 'flex-start' }}>
              <span>🔐</span>
              <div>
                <div style={{ fontWeight: 600, marginBottom: 4 }}>Secure Upload Protocol</div>
                <div style={{ color: '#166534', lineHeight: 1.4 }}>All files are encrypted in transit (TLS 1.3) and at rest (AES-256). Digital fingerprinting and audit logging are applied automatically.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 20 }}>
        <button className="btn-secondary">CANCEL</button>
        <button className="btn-primary">🔐 UPLOAD SECURELY</button>
      </div>
    </div>
  );
}

function PlaceholderView({ title }: { title: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 400, color: 'var(--muted-foreground)' }}>
      <div style={{ fontSize: 48, marginBottom: 16, opacity: 0.3 }}>👮</div>
      <h3 style={{ fontFamily: 'Oswald, sans-serif', fontSize: 18, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 8px' }}>{title}</h3>
      <p style={{ fontSize: 13 }}>This module is available in the full deployment.</p>
    </div>
  );
}
