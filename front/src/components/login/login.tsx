import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './login.css';
import { useAuth } from '../../auth/authcontext';
import { login as loginRequest } from '../../api/authApi';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('아이디와 비밀번호를 모두 입력하세요.');
      return;
    }

    setLoading(true);
    try {
      const user = await loginRequest({ username, password });
      login(user);
      navigate('/');
    } catch (err: any) {
      // 서버 응답 메시지 우선 노출
      const message =
        err?.response?.data?.message ||
        err?.message ||
        '로그인에 실패했습니다. 다시 시도해 주세요.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <section className="login-visual">
        <h1 className="login-brand">GRUPGO</h1>
        <p className="login-tagline">대학 생활을 한 곳에서 관리하는 스마트 캠퍼스 도구</p>
        <ul className="login-keywords">
          <li>식사 주문</li>
          <li>일정 관리</li>
          <li>공강 활동 기록</li>
        </ul>
      </section>

      <section className="login-panel">
        <form onSubmit={handleSubmit} className="login-form">
          <h2>로그인</h2>

          <div className="form-group">
            <label htmlFor="username">아이디</label>
            <input
              type="text"
              id="username"
              value={username}
              placeholder="아이디를 입력하세요."
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              value={password}
              placeholder="비밀번호를 입력하세요."
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          {error && <p className="login-error" role="alert">{error}</p>}

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? '로그인 중...' : '로그인'}
          </button>

          <div className="login-links">
            <span>회원이 아니신가요?</span>
            <Link to="/signup">회원가입</Link>
            <Link to="/">메인으로</Link>
          </div>

          <p className="login-hint">데모 계정: demo / demo1234</p>
        </form>
      </section>
    </div>
  );
};

export default Login;
