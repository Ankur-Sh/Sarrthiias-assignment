import React, { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import Navbar from "./components/Navbar";

function App() {
    // initialize state from localStorage
    const [isAdmin, setIsAdmin] = useState(
        localStorage.getItem("isAdmin") === "true"
    );

    // keep localStorage in sync if it changes elsewhere (optional)
    useEffect(() => {
        const onStorage = (e) => {
            if (e.key === "isAdmin") {
                setIsAdmin(e.newValue === "true");
            }
        };
        window.addEventListener("storage", onStorage);
        return () => window.removeEventListener("storage", onStorage);
    }, []);

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />

                {/* Pass setIsAdmin so Login can set it after successful login */}
                <Route
                    path="/admin"
                    element={
                        isAdmin ? (
                            <Navigate to="/dashboard" />
                        ) : (
                            <AdminLogin setIsAdmin={setIsAdmin} />
                        )
                    }
                />

                {/* Pass setIsAdmin so Dashboard can call it on logout */}
                <Route
                    path="/dashboard"
                    element={
                        isAdmin ? (
                            <AdminDashboard setIsAdmin={setIsAdmin} />
                        ) : (
                            <Navigate to="/admin" />
                        )
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
