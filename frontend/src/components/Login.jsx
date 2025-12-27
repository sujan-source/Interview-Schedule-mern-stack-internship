export default function Login({ user, setUser, login, setPage }) {
  return (
    <div className="auth-container">
      <h2>Login</h2>

      <input
        placeholder="Email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />

      <button onClick={login}>Login</button>

      <p className="switch-text">
        Don’t have an account?{" "}
        <span onClick={() => setPage("signup")}>Sign up</span>
      </p>
    </div>
  );
}
