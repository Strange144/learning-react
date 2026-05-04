// routes/blogRoutes.js
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Backend is working 🚀");
});

const { getBlogs, createBlog, getCategories, updateBlog, deleteBlog, adminLogin } = require("../blog_controller/blog_controller");
const multer = require("multer");
const path = require("path");

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

router.get("/blogs", getBlogs);
router.post("/blogs", createBlog);
router.put("/blogs/:id", updateBlog);
router.delete("/blogs/:id", deleteBlog);
router.get("/category", getCategories);

router.post("/login", adminLogin);

router.post("/upload", upload.single("image"), (req, res) => {
    if (!req.file) return res.status(400).send("No file uploaded.");
    res.json({ imageUrl: `http://localhost:5000/uploads/${req.file.filename}` });
});

module.exports = router;