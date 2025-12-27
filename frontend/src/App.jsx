
import { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import AdminDashboard from "./components/AdminDashboard";
import UserDashboard from "./components/UserDashboard";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import About from "./components/About";


const API = "http://localhost:5000/api/interviews";
const AUTH_API = "http://localhost:5000/api/auth";

function App() {
  const [page, setPage] = useState("login"); // login | signup | dashboard
  const [role, setRole] = useState("user"); // admin | user
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));


  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [interview, setInterview] = useState({
    candidate: "",
    position: "",
    date: "",
    time: "",
  });

  const [list, setList] = useState([]);
  const [editId, setEditId] = useState(null);

  // ✅ CHECK LOGIN STATUS
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = JSON.parse(localStorage.getItem("user") || "{}");


    if (savedToken && savedUser.role) {
      setToken(savedToken);
      setRole(savedUser.role);
      // ✅ RESTORE FULL USER DETAILS
      setUser({
        name: savedUser.name || "",
        email: savedUser.email || "",
        password: ""
      });
      setIsLoggedIn(true);
      setPage("dashboard");
    }
  }, []);

  // ... (Load interviews logic remains same)

  const logout = () => {
    setIsLoggedIn(false);
    setRole("user");
    setUser({ name: "", email: "", password: "" });
    setPage("login");
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  // ✅ LOGIN
  const login = async () => {
    if (!user.email || !user.password) {
      alert("Enter email and password");
      return;
    }

    try {
      const res = await axios.post(`${AUTH_API}/login`, user);

      const { token, user: loggedInUser } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(loggedInUser));
      setToken(token);

      // ✅ UPDATE STATE WITH NAME
      setUser({ ...user, name: loggedInUser.name, email: loggedInUser.email });

      // 🔐 ROLE CHECK
      setRole(loggedInUser.role);

      setIsLoggedIn(true);
      setPage("dashboard");
    } catch {
      alert("Invalid credentials");
    }
  };


  // ✅ SIGNUP
  const signup = async () => {
    if (!user.email || !user.password) {
      alert("Enter email and password");
      return;
    }

    try {
      const res = await axios.post(`${AUTH_API}/signup`, user);

      const { token, user: loggedInUser } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(loggedInUser));
      setToken(token);
      setRole(loggedInUser.role);

      alert(`Account created! You are logged in as: ${loggedInUser.role.toUpperCase()}`);
      setIsLoggedIn(true);
      setPage("dashboard");

      // ✅ PERSIST USER NAME (Don't clear it!)
      setUser({ name: loggedInUser.name, email: loggedInUser.email, password: "" });
    } catch {
      alert("User already exists");
    }
  };

  // ✅ ADD / UPDATE INTERVIEW
  const submitInterview = async () => {
    if (!interview.candidate || !interview.position) {
      alert("Fill all fields");
      return;
    }

    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      if (editId) {
        await axios.put(`${API}/${editId}`, interview, config);
        setEditId(null);
      } else {
        await axios.post(API, interview, config);
      }

      setInterview({
        candidate: "",
        position: "",
        date: "",
        time: "",
      });

      // Refresh list
      const res = await axios.get(API, config);
      setList(res.data);

    } catch (err) {
      console.error(err);
    }
  };

  // ✅ EDIT
  const editInterview = (item) => {
    setInterview(item);
    setEditId(item._id);
  };

  // ✅ DELETE
  const deleteInterview = async (id) => {
    try {
      await axios.delete(`${API}/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setList(list.filter(item => item._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>

      {/* ===== NAVBAR ===== */}
      <Navbar role={role} isLoggedIn={isLoggedIn} onLogout={logout} />

      {/* ===== MAIN CONTENT ===== */}
      <div className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />

          <Route path="/login" element={
            !isLoggedIn ? (
              <div className="container">
                <Login user={user} setUser={setUser} login={login} setPage={setPage} />
              </div>
            ) : (
              <Navigate to="/dashboard" />
            )
          } />

          <Route path="/signup" element={
            !isLoggedIn ? (
              <div className="container">
                <Signup user={user} setUser={setUser} signup={signup} setPage={setPage} />
              </div>
            ) : (
              <Navigate to="/dashboard" />
            )
          } />

          <Route path="/dashboard" element={
            isLoggedIn ? (
              <div className="container">
                {role === "admin" ? (
                  <AdminDashboard
                    interviews={list}
                    onEdit={editInterview}
                    onSubmit={submitInterview}
                    onDelete={deleteInterview}
                    interviewData={interview}
                    setInterview={setInterview}
                    editId={editId}
                  />
                ) : (
                  <UserDashboard interviews={list} userName={user.name} />
                )}
              </div>
            ) : (
              <Navigate to="/login" />
            )
          } />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>

      <Footer />
    </>
  );
}

export default App;
