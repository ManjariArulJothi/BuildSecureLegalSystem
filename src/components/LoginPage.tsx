import { useState } from 'react';

interface LoginPageProps {
  onLogin: (role: 'admin' | 'police' | 'prosecutor' | 'judge') => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [mfaCode, setMfaCode] = useState('');
  const [step, setStep] = useState<'credentials' | 'mfa'>('credentials');
  const [selectedRole, setSelectedRole] = useState<'admin' | 'police' | 'prosecutor' | 'judge'>('admin');
  const [error, setError] = useState('');

  const handleCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId || !password) { setError('All fields are required.'); return; }
    setError('');
    setStep('mfa');
  };

  const handleMfa = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mfaCode) { setError('Enter the MFA code.'); return; }
    onLogin(selectedRole);
  };

  const roles = [
    { id: 'admin' as const, label: 'Administrator', icon: '🛡️' },
    { id: 'police' as const, label: 'Police Officer', icon: '👮' },
    { id: 'prosecutor' as const, label: 'Prosecutor', icon: '⚖️' },
    { id: 'judge' as const, label: 'Judge', icon: '👨‍⚖️' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--background)', display: 'flex', flexDirection: 'column' }}>
      {/* Top bar */}
      <div style={{ background: 'var(--card)', borderBottom: '1px solid var(--border)', padding: '10px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 20 }}>🛡️</span>
          <div>
            <div style={{ fontFamily: 'Oswald, sans-serif', fontSize: 16, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--accent)', textTransform: 'uppercase' }}>Secure Legal & Investigation System</div>
            <div style={{ fontSize: 11, color: 'var(--muted-foreground)', letterSpacing: '0.05em' }}>MINISTRY OF JUSTICE — CLASSIFIED SYSTEM</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 6px #4ade80' }} />
          <span style={{ fontSize: 11, color: 'var(--muted-foreground)', fontFamily: 'JetBrains Mono, monospace' }}>SYSTEM ONLINE</span>
        </div>
      </div>

      {/* Main */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
        <div style={{ width: '100%', maxWidth: 440 }}>
          {/* Shield emblem */}
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div style={{ width: 72, height: 72, background: 'var(--primary)', border: '2px solid var(--accent)', borderRadius: 8, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, marginBottom: 12, boxShadow: '0 0 30px rgba(201,152,58,0.2)' }}>🔐</div>
            <h1 style={{ fontFamily: 'Oswald, sans-serif', fontSize: 24, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--foreground)', margin: '0 0 4px' }}>Secure Login</h1>
            <p style={{ fontSize: 12, color: 'var(--muted-foreground)', letterSpacing: '0.05em', margin: 0 }}>Authorized Personnel Only</p>
          </div>

          <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 6, overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>
            {/* Gold top strip */}
            <div style={{ height: 3, background: 'linear-gradient(90deg, var(--accent), #e8c060, var(--accent))' }} />

            <div style={{ padding: 28 }}>
              {step === 'credentials' ? (
                <form onSubmit={handleCredentials}>
                  {/* Role selector */}
                  <div style={{ marginBottom: 20 }}>
                    <label style={{ display: 'block', fontSize: 11, fontFamily: 'Oswald, sans-serif', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted-foreground)', marginBottom: 8 }}>Access Role</label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                      {roles.map(r => (
                        <button key={r.id} type="button" onClick={() => setSelectedRole(r.id)}
                          style={{ padding: '8px 10px', background: selectedRole === r.id ? 'var(--primary)' : 'var(--secondary)', border: `1px solid ${selectedRole === r.id ? 'var(--accent)' : 'var(--border)'}`, borderRadius: 'var(--radius)', cursor: 'pointer', color: selectedRole === r.id ? '#fff' : 'var(--secondary-foreground)', fontSize: 12, display: 'flex', alignItems: 'center', gap: 6, transition: 'all 0.15s', fontFamily: 'Source Sans 3, sans-serif' }}>
                          <span>{r.icon}</span> {r.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <label style={{ display: 'block', fontSize: 11, fontFamily: 'Oswald, sans-serif', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted-foreground)', marginBottom: 6 }}>👤 User ID</label>
                    <input className="field-input" type="text" placeholder="Enter your User ID" value={userId} onChange={e => setUserId(e.target.value)} />
                  </div>

                  <div style={{ marginBottom: 8 }}>
                    <label style={{ display: 'block', fontSize: 11, fontFamily: 'Oswald, sans-serif', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted-foreground)', marginBottom: 6 }}>🔒 Password</label>
                    <div style={{ position: 'relative' }}>
                      <input className="field-input" type={showPassword ? 'text' : 'password'} placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} style={{ paddingRight: 40 }} />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted-foreground)', fontSize: 14 }}>
                        {showPassword ? '🙈' : '👁'}
                      </button>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right', marginBottom: 20 }}>
                    <a href="#" style={{ fontSize: 12, color: 'var(--accent)', textDecoration: 'none' }}>Forgot Password?</a>
                  </div>

                  {error && <div style={{ background: '#2a0f14', border: '1px solid #7f1d1d', borderRadius: 4, padding: '8px 12px', fontSize: 12, color: '#f87171', marginBottom: 12 }}>⚠️ {error}</div>}

                  <button type="submit" className="btn-primary" style={{ width: '100%', padding: '12px 24px', fontSize: 15 }}>
                    🔐 SECURE LOGIN
                  </button>
                </form>
              ) : (
                <form onSubmit={handleMfa}>
                  <div style={{ textAlign: 'center', marginBottom: 20 }}>
                    <div style={{ fontSize: 28, marginBottom: 8 }}>📱</div>
                    <h3 style={{ fontFamily: 'Oswald, sans-serif', fontSize: 16, letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 4px' }}>Multi-Factor Authentication</h3>
                    <p style={{ fontSize: 12, color: 'var(--muted-foreground)', margin: 0 }}>Enter the 6-digit code from your authenticator app</p>
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <input className="field-input mono" type="text" placeholder="000000" maxLength={6} value={mfaCode} onChange={e => setMfaCode(e.target.value.replace(/\D/g, ''))} style={{ textAlign: 'center', fontSize: 22, letterSpacing: '0.3em' }} />
                  </div>
                  {error && <div style={{ background: '#2a0f14', border: '1px solid #7f1d1d', borderRadius: 4, padding: '8px 12px', fontSize: 12, color: '#f87171', marginBottom: 12 }}>⚠️ {error}</div>}
                  <button type="submit" className="btn-primary" style={{ width: '100%', padding: '12px 24px', fontSize: 15 }}>VERIFY & ENTER</button>
                  <button type="button" onClick={() => setStep('credentials')} className="btn-secondary" style={{ width: '100%', marginTop: 8, fontSize: 13 }}>← BACK</button>
                </form>
              )}
            </div>

            <div style={{ padding: '12px 28px', borderTop: '1px solid var(--border)', background: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
              <span style={{ fontSize: 11, color: 'var(--muted-foreground)', display: 'flex', alignItems: 'center', gap: 4 }}>🔒 256-bit Encrypted</span>
              <span style={{ color: 'var(--border)' }}>|</span>
              <span style={{ fontSize: 11, color: 'var(--muted-foreground)' }}>🛡️ MFA Protected</span>
              <span style={{ color: 'var(--border)' }}>|</span>
              <span style={{ fontSize: 11, color: 'var(--muted-foreground)' }}>📋 Audit Logged</span>
            </div>
          </div>

          <p style={{ textAlign: 'center', fontSize: 11, color: 'var(--muted-foreground)', marginTop: 20 }}>
            ⚠️ Unauthorized access is a criminal offense. All activity is monitored and logged.
          </p>
        </div>
      </div>
    </div>
  );
}
