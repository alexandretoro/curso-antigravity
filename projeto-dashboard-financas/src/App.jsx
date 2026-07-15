import React from 'react';
import { useAuth } from './hooks/useAuth';
import { Login } from './views/Login/Login';
import { Dashboard } from './views/Dashboard/Dashboard';

function App() {
  const { user, loading, login, logout, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0a0a0c',
        color: '#f3f4f6',
        fontFamily: 'sans-serif'
      }}>
        <div style={{ fontSize: '1rem', letterSpacing: '0.05em' }}>INICIALIZANDO SISTEMA...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login onLogin={login} />;
  }

  return <Dashboard user={user} onLogout={logout} />;
}

export default App;
