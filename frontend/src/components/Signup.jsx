export default function Signup({ user, setUser, signup, setPage }) {
  return (
    <div className="auth-container">
      <h2>Signup</h2>

      <input
        placeholder="Full Name"
        value={user.name || ""}
        onChange={(e) => setUser({ ...user, name: e.target.value })}
      />

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

      {/* Note: In a real app we might want a name field too, but keeping it simple to match App.jsx state */}

      <button onClick={signup}>Create Account</button>

      <p className="switch-text">
        Already have an account?{" "}
        <span onClick={() => setPage("login")}>Login</span>
      </p>
    </div>
  );
}
