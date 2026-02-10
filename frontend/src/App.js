
import React, { useState } from "react";
import "./App.css";
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("patient");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/auth/login', {
        username,
        password
      });
      if (response.data.status === 'success') {
        
        navigate(`/dashboard/${role}`);
      } else {
        alert(response.data.message || 'Login failed');
      }
    } catch (error) {
      const msg = error?.response?.data?.message || error.message || 'Login failed';
      alert(msg);
    }
  };

  return (
    <>
      <div className="image" style={{ backgroundImage: "url('/hospital1.jpg')" }}>
        <div className="header">Hospital Management System</div>

        <div className="container" role="main">
          <h2> Login</h2>
          <div className="subtitle">Hospital Information System</div>

          <input
            className="inputField"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
          />

          <input
            className="inputField"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />

          <select
            className="inputField"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            aria-label="Select role"
          >
            <option value="doctor">Doctor</option>
            <option value="nurse">Nurse</option>
            <option value="patient">Patient</option>
            <option value="admin">Admin</option>
          </select>

          <button className="primary" onClick={handleLogin}>Sign In</button>

          <div className="help">Contact IT if you have trouble logging in.</div>
        </div>

        <div className="footer"> @Department of Health Ministry</div>
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/dashboard/:role" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;