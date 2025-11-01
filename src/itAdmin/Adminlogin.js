import React from "react";

const ItAdminLogin = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const username = e.target.username.value.trim();
    const password = e.target.password.value.trim();

    if (username === "admin" && password === "admin123") {
      localStorage.setItem("adminName", username);
      window.location.href = "index.html";
    } else {
      alert("Invalid username or password!");
    }
  };

  return (
    <div>
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

        /* Responsive adjustments */
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
          <h2> It Admin Login</h2>
          <form id="loginForm" onSubmit={handleSubmit}>
            <input type="text" id="username" name="username" placeholder="Username" required />
            <input type="password" id="password" name="password" placeholder="Password" required />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ItAdminLogin;
