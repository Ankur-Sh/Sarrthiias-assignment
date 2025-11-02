import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function AdminDashboard({ setIsAdmin }) {
    const [items, setItems] = useState([]);
    const [form, setForm] = useState({
        title: "",
        category: "",
        type: "Handout",
        link: "",
    });
    const [editingId, setEditingId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const isAdmin = localStorage.getItem("isAdmin");
        if (!isAdmin) navigate("/admin");
        fetchItems();
    }, [navigate]);

    const fetchItems = async () => {
        try {
            const res = await fetch("http://localhost:5001/api/content");
            const data = await res.json();
            setItems(data);
        } catch (err) {
            console.error("Fetch items error:", err);
            setItems([]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editingId) {
                // ✅ Update existing item
                await fetch(`http://localhost:5001/api/content/${editingId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(form),
                });
            } else {
                // ✅ Create new item
                await fetch("http://localhost:5001/api/content", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(form),
                });
            }

            setForm({ title: "", category: "", type: "Handout", link: "" });
            setEditingId(null);
            fetchItems();
        } catch (err) {
            console.error("Save error:", err);
        }
    };

    const handleEdit = (item) => {
        // Fill form fields with the selected item's data
        setForm({
            title: item.title,
            category: item.category,
            type: item.type,
            link: item.link,
        });
        setEditingId(item._id);
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:5001/api/content/${id}`, {
                method: "DELETE",
            });
            fetchItems();
        } catch (err) {
            console.error("Delete error:", err);
        }
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setForm({ title: "", category: "", type: "Handout", link: "" });
    };

    const handleLogout = () => {
        localStorage.removeItem("isAdmin");
        if (typeof setIsAdmin === "function") setIsAdmin(false);
        navigate("/admin");
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h2>Admin Dashboard</h2>
                <button onClick={handleLogout} className="logout-btn">
                    Logout
                </button>
            </div>

            <form onSubmit={handleSubmit} className="add-form">
                <input
                    placeholder="Title"
                    value={form.title}
                    onChange={(e) =>
                        setForm({ ...form, title: e.target.value })
                    }
                    required
                />
                <input
                    placeholder="Category"
                    value={form.category}
                    onChange={(e) =>
                        setForm({ ...form, category: e.target.value })
                    }
                    required
                />
                <input
                    placeholder="Link"
                    value={form.link}
                    onChange={(e) => setForm({ ...form, link: e.target.value })}
                />
                <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                >
                    <option>Handout</option>
                    <option>Note</option>
                </select>

                <div style={{ display: "flex", gap: "10px" }}>
                    <button type="submit">
                        {editingId ? "Update" : "Add"}
                    </button>
                    {editingId && (
                        <button
                            type="button"
                            style={{ backgroundColor: "#999" }}
                            onClick={handleCancelEdit}
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            <ul className="content-list">
                {items.map((item) => (
                    <li key={item._id} className="list-item">
                        <div>
                            <strong>{item.title}</strong> ({item.type})<br />
                            <small>{item.category}</small>
                        </div>
                        <div style={{ display: "flex", gap: "8px" }}>
                            <button onClick={() => handleEdit(item)}>
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(item._id)}
                                style={{ backgroundColor: "#d9534f" }}
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
