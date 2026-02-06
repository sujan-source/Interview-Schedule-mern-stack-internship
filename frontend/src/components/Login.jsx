import { useNavigate } from 'react-router-dom';

export default function Login({ user, setUser, login }) {
  const navigate = useNavigate();

  return (
    <div className="glass-card form-container">
      <h2>Welcome Back</h2>
      <div className="form-group">
        <label>Email</label>
        <input
          placeholder="your@email.com"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          placeholder="••••••••"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
      </div>

      <button className="btn-primary" onClick={login}>Login</button>

      <p className="switch-text" style={{ marginTop: '20px', color: 'var(--text-muted)' }}>
        Don’t have an account?{" "}
        <span onClick={() => navigate("/signup")} style={{ color: 'var(--primary)', cursor: 'pointer', fontWeight: 600 }}>Sign up</span>
      </p>
    </div>
  );
}
