import { useState } from 'react';
import LoginPage from './components/LoginPage';
import AdminDashboard from './components/AdminDashboard';
import PoliceDashboard from './components/PoliceDashboard';
import ProsecutorDashboard from './components/ProsecutorDashboard';
import JudgeDashboard from './components/JudgeDashboard';

type Role = 'admin' | 'police' | 'prosecutor' | 'judge';
type AppState = { screen: 'login' } | { screen: 'dashboard'; role: Role };

export default function App() {
  const [state, setState] = useState<AppState>({ screen: 'login' });

  const handleLogin = (role: Role) => setState({ screen: 'dashboard', role });
  const handleLogout = () => setState({ screen: 'login' });

  if (state.screen === 'login') return <LoginPage onLogin={handleLogin} />;

  switch (state.role) {
    case 'admin': return <AdminDashboard onLogout={handleLogout} />;
    case 'police': return <PoliceDashboard onLogout={handleLogout} />;
    case 'prosecutor': return <ProsecutorDashboard onLogout={handleLogout} />;
    case 'judge': return <JudgeDashboard onLogout={handleLogout} />;
  }
}
