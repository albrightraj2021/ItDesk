// src/components/AdminLogin.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value, name } = e.target;
    // select uses id="role" in markup below
    setFormData((prev) => ({ ...prev, [id || name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.role) return alert("Please select your role");

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL || "http://127.0.0.1:8000"}/api/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      const data = await res.json();
      console.log("🔍 Login Response:", data);

      if (!res.ok) {
        alert(data.error || "Invalid username or password!");
        return;
      }

      // Save user info to localStorage
      localStorage.setItem("userName", data.username || formData.username);
      // Use selected role from dropdown (user's choice) instead of backend role
      const role = formData.role.toLowerCase();
      localStorage.setItem("userRole", role);

      // Role-based navigation based on user selection
      switch (role) {
        case "super admin":
          navigate("/superadmin/Admin/AdminDB");
          break;
        case "admin":
          navigate("/admin/dashboard");
          break;
        case "networkz systems":
          navigate("/");
          break;
        case "bdm":
          navigate("/bdm/dashboard");
          break;
        case "it desk":
          navigate("/it/dashboard");
          break;
        default:
          alert("Unauthorized role!");
          break;
      }
    } catch (error) {
      console.error("❌ Server error:", error);
      alert("Server error! Please try again later.");
    }
  };

  return (
    <div
      className="login-wrapper"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#f5f7fa",
      }}
    >
      <div
        className="login-panel"
        style={{
          background: "#fff",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 6px 18px rgba(10,20,40,0.06)",
          width: "340px",
          textAlign: "center",
        }}
      >
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="username"
            placeholder="Username"
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "12px", margin: "10px 0", borderRadius: "8px", border: "1px solid #ccc" }}
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "12px", margin: "10px 0", borderRadius: "8px", border: "1px solid #ccc" }}
          />
          <select
            id="role"
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "12px", margin: "10px 0", borderRadius: "8px", border: "1px solid #ccc" }}
            defaultValue=""
          >
            <option value="">Select Role</option>
            <option value="super admin">Super Admin</option>
            <option value="admin">Admin</option>
            <option value="networkz systems">Networkz Systems</option>
            <option value="bdm">BDM</option>
            <option value="it desk">IT Desk</option>
          </select>
          <button
            type="submit"
            style={{ width: "100%", padding: "12px", background: "#007bff", color: "#fff", border: "none", borderRadius: "8px", marginTop: "15px", cursor: "pointer" }}
          >
            Login
          </button>
        </form>
        <div style={{ marginTop: "15px", fontSize: "14px", color: "#66788a" }}>
          Don’t have an account?{" "}
          <a href="/reg" style={{ color: "#007bff" }}>
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
