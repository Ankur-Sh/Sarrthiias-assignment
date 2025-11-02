// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

// ✅ Use CORS before routes
app.use(
    cors({
        origin: "http://localhost:3000", // frontend origin
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type"],
    })
);

app.use(express.json());

// ✅ MongoDB connection
mongoose
    .connect(
        "mongodb+srv://asblaster100:testing123@cluster0.opkvswq.mongodb.net/"
    )
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

// ✅ Schema and Model
const contentSchema = new mongoose.Schema({
    title: String,
    type: String, // e.g., "Handout" or "Note"
    category: String,
    link: String,
});

const Content = mongoose.model("Content", contentSchema);

// ✅ Routes
app.get("/api/content", async (req, res) => {
    try {
        const items = await Content.find();
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch content" });
    }
});

app.post("/api/content", async (req, res) => {
    try {
        const newItem = new Content(req.body);
        await newItem.save();
        res.json(newItem);
    } catch (error) {
        res.status(500).json({ error: "Failed to add content" });
    }
});

app.put("/api/content/:id", async (req, res) => {
    try {
        const updated = await Content.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: "Failed to update content" });
    }
});

app.delete("/api/content/:id", async (req, res) => {
    try {
        await Content.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete content" });
    }
});

// ✅ Simple Admin Login
app.post("/api/admin/login", (req, res) => {
    const { username, password } = req.body;
    const ADMIN_USER = "testing123";
    const ADMIN_PASS = "testing123";

    if (username === ADMIN_USER && password === ADMIN_PASS) {
        res.json({ success: true });
    } else {
        res.status(401).json({
            success: false,
            message: "Invalid credentials",
        });
    }
});

// ✅ Default route
app.get("/", (req, res) => {
    res.send("Backend running 🚀");
});

// ✅ Start server
const PORT = 5001;
app.listen(PORT, () =>
    console.log(`🚀 Server running on http://localhost:${PORT}`)
);
