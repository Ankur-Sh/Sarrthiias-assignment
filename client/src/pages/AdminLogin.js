import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function AdminLogin({ setIsAdmin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        // if already logged in (state might be set), redirect
        if (localStorage.getItem("isAdmin") === "true") {
            navigate("/dashboard");
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await fetch("http://localhost:5001/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            if (res.ok) {
                // persist and update top-level state
                localStorage.setItem("isAdmin", "true");
                if (typeof setIsAdmin === "function") setIsAdmin(true);
                navigate("/dashboard");
            } else {
                setError("Invalid username or password");
            }
        } catch (err) {
            console.error(err);
            setError(
                "⚠️ Failed to connect to backend. Please check your server."
            );
        }
    };

    return (
        <div className="login-container">
            <h2>Admin Login</h2>
            <form onSubmit={handleLogin} className="login-form">
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
                {error && <p style={{ color: "red" }}>{error}</p>}
            </form>
        </div>
    );
}
