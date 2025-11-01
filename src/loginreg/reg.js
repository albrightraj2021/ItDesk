// src/components/Signup.jsx
import React, { useState } from "react";
import './reg.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "admin", // default
  });

  const handleChange = (e) => {
    const { id, value, name } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id || name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password, role } = formData;

    if (username.length < 3) return alert("Username must be at least 3 characters.");
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return alert("Enter a valid email.");
    if (password.length < 6) return alert("Password must be at least 6 characters.");

    const payload = { username, email, password, role };

    try {
      const res = await fetch("http://127.0.0.1:8000/api/users/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("Registration successful!");
        window.location.href = "/Admin/Adminlogin"; // redirect to login page (change route if needed)
      } else {
        const data = await res.json();
        alert(`Registration failed: ${JSON.stringify(data)}`);
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Server error!");
    }
  };

  const roles = ["super admin", "admin", "networkz systems", "bdm", "it desk"];

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="title">Sign-Up</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" id="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
          <input type="email" id="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <input type="password" id="password" placeholder="Password" value={formData.password} onChange={handleChange} required />

          <div className="role-group">
            {roles.map((roleOption) => (
              <label key={roleOption}>
                <input
                  type="radio"
                  name="role"
                  value={roleOption}
                  checked={formData.role === roleOption}
                  onChange={handleChange}
                />
                <span>{roleOption.split(" ").map(w => w[0].toUpperCase() + w.slice(1)).join(" ")}</span>
              </label>
            ))}
          </div>

          <button type="submit" className="register-btn">Register</button>

          <div className="helper">
            Already have an account? <a href="/Admin/Adminlogin">Login</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
