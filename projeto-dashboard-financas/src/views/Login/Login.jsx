import React, { useState } from 'react';
import './Login.css';

// SVG Logos de Alta Fidelidade (Anexo 1)
const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.74-3.95-1.72-.1.65-.06 1.34-.07 2.01-.02 3.76-2.23 7.57-5.99 8.68-3.9 1.15-8.54-.78-9.89-4.65-1.45-4.14 1.37-9.45 5.86-10.17 1.04-.17 2.11-.08 3.14-.07v4.07c-1.12-.13-2.36-.04-3.32.59-1.34.88-1.73 2.87-1.02 4.29.74 1.48 2.56 2.31 4.19 1.98 1.66-.34 2.88-1.92 2.88-3.62V.02z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const RedditIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M24 11.5c0-1.65-1.35-3-3-3-.96 0-1.86.48-2.42 1.24-1.64-1-3.85-1.64-6.24-1.72l1.37-4.31 3.73.84c.07 1.01.9 1.82 1.92 1.82 1.05 0 1.91-.86 1.91-1.91s-.86-1.91-1.91-1.91c-.74 0-1.38.43-1.71 1.05l-4.22-.95c-.24-.05-.47.09-.54.33L11 8.01c-2.45.06-4.71.7-6.38 1.72-.56-.75-1.45-1.23-2.4-1.23-1.65 0-3 1.35-3 3 0 1.12.62 2.1 1.54 2.61-.04.26-.06.52-.06.79 0 3.72 4.36 6.75 9.75 6.75s9.75-3.03 9.75-6.75c0-.26-.02-.52-.05-.78.9-.52 1.51-1.49 1.51-2.6zm-17 1c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
  </svg>
);

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.859-3.578-7.859-8s3.53-8 7.859-8c2.46 0 4.105 1.025 5.047 1.926l3.227-3.107C18.29 1.79 15.45.96 12.24.96c-6.12 0-11.08 4.96-11.08 11.04s4.96 11.04 11.08 11.04c6.39 0 10.63-4.47 10.63-10.8 0-.725-.075-1.275-.175-1.955H12.24z"/>
  </svg>
);

export function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Por favor, informe seu e-mail.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Por favor, digite um e-mail válido.');
      return;
    }

    if (!password) {
      setError('Por favor, digite sua senha.');
      return;
    }

    if (password.length < 4) {
      setError('A senha deve ter pelo menos 4 caracteres.');
      return;
    }

    setLoading(true);

    // Simular latencia de rede
    setTimeout(() => {
      onLogin(email);
      setLoading(false);
    }, 800);
  };

  const handleSocialClick = (platform) => {
    setEmail(`${platform.toLowerCase()}@toro.com`);
    setPassword('123456');
    setError('');
  };

  return (
    <div className="login-container fade-in">

      {/* Card de Login */}
      <div className="login-card">
        <div className="login-card-header">
          <h2>Bem-vindo de volta!</h2>
          <p>Escolha como deseja entrar</p>
        </div>

        {/* Mockup de Celulares - Estilo Anexo I */}
        <div className="phone-rack">
          <div className="phone-screen bg-tiktok" onClick={() => handleSocialClick('TikTok')}>
            <div className="phone-notch"></div>
            <div className="phone-content">
              <span className="logo-badge"><TikTokIcon /></span>
            </div>
          </div>
          <div className="phone-screen bg-facebook" onClick={() => handleSocialClick('Facebook')}>
            <div className="phone-notch"></div>
            <div className="phone-content">
              <span className="logo-badge"><FacebookIcon /></span>
            </div>
          </div>
          <div className="phone-screen bg-instagram" onClick={() => handleSocialClick('Instagram')}>
            <div className="phone-notch"></div>
            <div className="phone-content">
              <span className="logo-badge"><InstagramIcon /></span>
            </div>
          </div>
          <div className="phone-screen bg-reddit" onClick={() => handleSocialClick('Reddit')}>
            <div className="phone-notch"></div>
            <div className="phone-content">
              <span className="logo-badge"><RedditIcon /></span>
            </div>
          </div>
          <div className="phone-screen bg-google" onClick={() => handleSocialClick('Google')}>
            <div className="phone-notch"></div>
            <div className="phone-content">
              <span className="logo-badge"><GoogleIcon /></span>
            </div>
          </div>
        </div>

        <div className="divider-container">
          <span className="divider-line"></span>
          <span className="divider-text">ou continue com e-mail</span>
          <span className="divider-line"></span>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Carregando...' : 'Entrar'}
          </button>
        </form>

        <div className="login-footer">
          <a href="#forgot" className="footer-link" onClick={(e) => { e.preventDefault(); alert('Esquecer a senha está desabilitado na simulação local.'); }}>Esqueceu a senha?</a>
          <a href="#register" className="footer-link" onClick={(e) => { e.preventDefault(); alert('Para criar conta, basta digitar seu e-mail no formulário e entrar.'); }}>Criar conta</a>
        </div>
      </div>
    </div>
  );
}
