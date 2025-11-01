import React, { useState } from "react";

const SAdminLogin = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.role === "super admin") {
        localStorage.setItem("userName", data.username);
        localStorage.setItem("userRole", data.role);
        alert("Login successful!");
        window.location.href = "/superadmin/Admin/AdminDB";
      } else {
        alert("Invalid credentials or not authorized!");
      }
    } catch (error) {
      alert("Server error!");
    }
  };

  return (
    <div>
      {/* Keep your old styles */}
      <style>{`
        :root {
            --bg: #ffffff;
            --panel: #fff;
            --accent: #51A2FF;
            --text: #0a3c8a;
            --muted: #66788a;
            --card-shadow: 0 6px 18px rgba(10,20,40,0.06);
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        body, html, #root {
            height: 100%;
            width: 100%;
        }

        .login-wrapper {
            background-color: var(--bg);
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            padding: 20px;
        }

        .login-panel {
            background-color: var(--panel);
            padding: 40px;
            border-radius: 12px;
            box-shadow: var(--card-shadow);
            width: 100%;
            max-width: 320px;
            text-align: center;
        }

        .login-panel h2 {
            color: var(--text);
            margin-bottom: 30px;
        }

        .login-panel input {
            width: 100%;
            padding: 12px 15px;
            margin: 10px 0;
            border-radius: 8px;
            border: 1px solid #ccc;
            outline: none;
        }

        .login-panel input:focus {
            border-color: var(--accent);
            box-shadow: 0 0 5px var(--accent);
        }

        .login-panel button {
            width: 100%;
            padding: 12px;
            background-color: var(--accent);
            color: #fff;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 16px;
            margin-top: 15px;
        }

        .login-panel button:hover {
            background-color: #3a8edb;
        }

        @media (max-width: 480px) {
            .login-panel {
                padding: 30px 20px;
                width: 100%;
                max-width: 300px;
            }

            .login-panel h2 {
                font-size: 1.5rem;
            }

            .login-panel button {
                font-size: 15px;
            }
        }
      `}</style>

      <div className="login-wrapper">
        <div className="login-panel">
          <h2>Admin Login</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              id="username"
              placeholder="Username"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              id="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SAdminLogin;
