import React, { useEffect, useState } from "react";
import API from "../services/api";
import BlogCard from "../component/blogcard";

function Home() {
    const [blogs, setBlogs] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");

    // ✅ FETCH BLOGS
    useEffect(() => {
        API.get("/blogs")
            .then(res => setBlogs(res.data))
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        API.get("/category")
            .then(res => setCategories(res.data))
            .catch(err => console.log(err));
    }, []);

    // ✅ FILTER LOGIC (STEP 5)
    const filteredBlogs = selectedCategory
        ? blogs.filter(blog => blog.category === selectedCategory)
        : blogs;

    return (
        <div style={{ padding: "20px" }}>
            <h1>My Blog Website 🚀</h1>

            {/* ✅ STEP 5: ADD FILTER UI HERE */}
            <select
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{ marginBottom: "20px", padding: "10px" }}
            >
                <option value="">All</option>

                {categories.map((cat, index) => (
                    <option key={index} value={cat.category}>
                        {cat.category}
                    </option>
                ))}
            </select>

            {/* ✅ SHOW FILTERED BLOGS */}
            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
                {filteredBlogs.map(blog => (
                    <BlogCard key={blog.id} blog={blog} />
                ))}
            </div>
        </div>
    );
}

export default Home;