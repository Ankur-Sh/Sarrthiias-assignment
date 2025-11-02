import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

export default function Navbar() {
    return (
        <nav className="navbar">
            <Link to="/" className="nav-logo">
                📚 Notes Portal
            </Link>
            <div>
                <Link to="/">Home</Link>
                <Link to="/admin">Admin</Link>
            </div>
        </nav>
    );
}
