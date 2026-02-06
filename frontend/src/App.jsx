
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

import Profile from "./components/Profile";

function App() {
  const [role, setRole] = useState("user");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "user"
  });

  const [interview, setInterview] = useState({
    candidate: "",
    position: "",
    date: "",
    startTime: "",
    type: "zoom",
    round: "screening",
    interviewer: "",
  });

  const [list, setList] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = JSON.parse(localStorage.getItem("user") || "{}");

    if (savedToken && savedUser.id) {
      setToken(savedToken);
      setRole(savedUser.role);
      setUser(savedUser);
      setIsLoggedIn(true);
      fetchInterviews(savedToken);
    }
  }, []);

  const fetchInterviews = async (t) => {
    try {
      const res = await axios.get(API, {
        headers: { Authorization: `Bearer ${t}` }
      });
      setList(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setRole("user");
    setUser({ name: "", email: "", password: "", role: "user" });
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const login = async () => {
    try {
      const res = await axios.post(`${AUTH_API}/login`, user);
      const { token, user: loggedInUser } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(loggedInUser));
      setToken(token);
      setRole(loggedInUser.role);
      setUser(loggedInUser);
      setIsLoggedIn(true);
      fetchInterviews(token);
    } catch {
      alert("Invalid credentials");
    }
  };

  const signup = async () => {
    try {
      const res = await axios.post(`${AUTH_API}/signup`, user);
      const { token, user: loggedInUser } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(loggedInUser));
      setToken(token);
      setRole(loggedInUser.role);
      setUser(loggedInUser);
      setIsLoggedIn(true);
      fetchInterviews(token);
    } catch (err) {
      const msg = err.response?.data?.message || "Error creating account";
      alert(msg);
    }
  };

  const submitInterview = async (formData) => {
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      if (editId) {
        await axios.put(`${API}/${editId}`, formData, config);
        setEditId(null);
      } else {
        await axios.post(API, formData, config);
      }
      setInterview({
        candidate: "",
        position: "",
        date: "",
        startTime: "",
        type: "zoom",
        round: "screening",
        interviewer: ""
      });
      alert(editId ? "Interview updated successfully!" : "Interview scheduled successfully!");
      fetchInterviews(token);
    } catch (err) {
      console.error("Schedule Error:", err);
      const msg = err.response?.data?.message || "Please check your connection or fill all fields.";
      alert(`Failed to schedule interview: ${msg}`);
    }
  };

  const editInterview = (item) => {
    setInterview(item);
    setEditId(item._id);
  };

  const deleteInterview = async (id) => {
    try {
      await axios.delete(`${API}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setList(list.filter(item => item._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Navbar role={role} isLoggedIn={isLoggedIn} onLogout={logout} user={user} />
      <div className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={!isLoggedIn ? <Login user={user} setUser={setUser} login={login} /> : <Navigate to="/dashboard" />} />
          <Route path="/signup" element={!isLoggedIn ? <Signup user={user} setUser={setUser} signup={signup} /> : <Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={
            isLoggedIn ? (
              <div style={{ width: '100%' }}>
                <AdminDashboard
                  interviews={list}
                  onEdit={editInterview}
                  onSubmit={submitInterview}
                  onDelete={deleteInterview}
                  interviewData={interview}
                  setInterview={setInterview}
                  editId={editId}
                  token={token}
                  role={role}
                />
              </div>
            ) : <Navigate to="/login" />
          } />
          <Route path="/profile" element={isLoggedIn ? <Profile token={token} user={user} /> : <Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
