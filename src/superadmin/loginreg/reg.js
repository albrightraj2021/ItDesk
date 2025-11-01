import React, { useState } from "react";
import "./reg.css";

const SSignup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "admin",
  });

  const [showPassword, setShowPassword] = useState(false);

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
        window.location.href = "/admin-login";
      } else {
        alert("Registration failed!");
      }
    } catch (error) {
      alert("Server error!");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Sign-Up</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" id="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
          <input type="email" id="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <input type={showPassword ? "text" : "password"} id="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
          <div className="show-password">
            <input type="checkbox" id="showPass" checked={showPassword} onChange={() => setShowPassword(!showPassword)} />
            <label htmlFor="showPass">Show Password</label>
          </div>
          <div className="role-group">
            {["admin", "employee", "manager", "leader", "hr"].map((roleOption) => (
              <label key={roleOption}>
                <input type="radio" name="role" value={roleOption} checked={formData.role === roleOption} onChange={handleChange} />{" "}
                {roleOption.charAt(0).toUpperCase() + roleOption.slice(1)}
              </label>
            ))}
          </div>
          <button type="submit" className="register-btn">Register</button>
        </form>
      </div>
    </div>
  );
};

export default SSignup;
