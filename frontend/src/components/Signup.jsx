import { useNavigate } from 'react-router-dom';

export default function Signup({ user, setUser, signup }) {
  const navigate = useNavigate();

  return (
    <div className="glass-card form-container">
      <h2>Join InterView</h2>

      <div className="form-group">
        <label>Full Name</label>
        <input
          placeholder="John Doe"
          value={user.name || ""}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label>Email</label>
        <input
          placeholder="john@example.com"
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

      <div className="form-group">
        <label>Join as</label>
        <select value={user.role || 'user'} onChange={(e) => setUser({ ...user, role: e.target.value })}>
          <option value="user">Candidate</option>
          <option value="interviewer">Interviewer</option>
        </select>
      </div>

      <button className="btn-primary" onClick={signup}>Create Account</button>

      <p className="switch-text" style={{ marginTop: '20px', color: 'var(--text-muted)' }}>
        Already have an account?{" "}
        <span onClick={() => navigate("/login")} style={{ color: 'var(--primary)', cursor: 'pointer', fontWeight: 600 }}>Login</span>
      </p>
    </div>
  );
}
