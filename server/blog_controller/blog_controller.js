// controllers/blogController.js
const db = require("../db_connection/db_config");

exports.getBlogs = (req, res) => {
    db.query("SELECT * FROM blogs", (err, result) => {
        if (err) return res.send(err);
        res.json(result);
    });
};

exports.createBlog = (req, res) => {
    const { title, content, image, category } = req.body;

    const sql = "INSERT INTO blogs (title, content, image, category) VALUES (?, ?, ?, ?)";
    db.query(sql, [title, content, image, category], (err, result) => {
        if (err) return res.send(err);
        res.send("Blog created");
    });
};

exports.getCategories = (req, res) => {
    const sql = "SELECT DISTINCT category FROM blogs WHERE category IS NOT NULL";

    db.query(sql, (err, result) => {
        if (err) return res.send(err);
        res.json(result);
    });
};

exports.updateBlog = (req, res) => {
    const { id } = req.params;
    const { title, content, image, category } = req.body;

    const sql = "UPDATE blogs SET title = ?, content = ?, image = ?, category = ? WHERE id = ?";
    db.query(sql, [title, content, image, category, id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send("Blog updated successfully");
    });
};

exports.deleteBlog = (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM blogs WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send("Blog deleted successfully");
    });
};

exports.adminLogin = (req, res) => {
    const { username, password } = req.body;
    if (username === "admin" && password === "admin") {
        res.json({ success: true, token: "fake-jwt-token", message: "Login successful" });
    } else {
        res.status(401).json({ success: false, message: "Invalid credentials" });
    }
};