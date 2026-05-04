import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post("/login", { username, password });
            if (res.data.success) {
                localStorage.setItem("adminToken", res.data.token);
                navigate("/admin");
            }
        } catch (error) {
            alert("Invalid credentials. Try admin / admin");
        }
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "10px", width: "300px", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
                <h2>Admin Login</h2>
                <input 
                    type="text" 
                    placeholder="Username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                    style={{ padding: "10px" }}
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                    style={{ padding: "10px" }}
                />
                <button type="submit" style={{ padding: "10px", backgroundColor: "blue", color: "white", border: "none", cursor: "pointer" }}>
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;
