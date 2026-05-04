import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Admin() {
    const [blogs, setBlogs] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [existingImage, setExistingImage] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("adminToken");
        if (!token) {
            navigate("/login");
        }
        fetchBlogs();
    }, [navigate]);

    const fetchBlogs = async () => {
        try {
            const res = await API.get("/blogs");
            setBlogs(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleImageUpload = async () => {
        if (!imageFile) return null;
        const formData = new FormData();
        formData.append("image", imageFile);

        try {
            const res = await API.post("/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            return res.data.imageUrl;
        } catch (error) {
            console.error("Error uploading image:", error);
            return null;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        let imageUrl = existingImage;
        if (imageFile) {
            const uploadedUrl = await handleImageUpload();
            if (uploadedUrl) imageUrl = uploadedUrl;
        }

        const blogData = { title, content, category, image: imageUrl };

        try {
            if (editingId) {
                await API.put(`/blogs/${editingId}`, blogData);
                alert("Blog updated successfully");
            } else {
                await API.post("/blogs", blogData);
                alert("Blog created successfully");
            }
            fetchBlogs();
            resetForm();
        } catch (error) {
            console.error("Error saving blog:", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this blog?")) {
            try {
                await API.delete(`/blogs/${id}`);
                fetchBlogs();
            } catch (error) {
                console.error("Error deleting blog:", error);
            }
        }
    };

    const handleEdit = (blog) => {
        setEditingId(blog.id);
        setTitle(blog.title);
        setContent(blog.content);
        setCategory(blog.category);
        setExistingImage(blog.image);
        setImageFile(null);
        window.scrollTo(0, 0);
    };

    const resetForm = () => {
        setEditingId(null);
        setTitle("");
        setContent("");
        setCategory("");
        setImageFile(null);
        setExistingImage("");
    };

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        navigate("/login");
    };

    return (
        <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h1>Admin Panel</h1>
                <button onClick={handleLogout} style={{ padding: "10px", backgroundColor: "red", color: "white", border: "none", cursor: "pointer" }}>Logout</button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", padding: "20px", border: "1px solid #ccc", marginBottom: "30px", borderRadius: "8px" }}>
                <h2>{editingId ? "Edit Blog" : "Add New Blog"}</h2>
                <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required style={{ padding: "10px" }} />
                <input type="text" placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} required style={{ padding: "10px" }} />
                <textarea placeholder="Content" value={content} onChange={e => setContent(e.target.value)} required style={{ padding: "10px", height: "100px" }} />
                
                <label>Upload Image:</label>
                <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0])} style={{ padding: "10px" }} />
                {existingImage && !imageFile && <img src={existingImage} alt="Current" style={{ width: "100px" }} />}

                <div style={{ display: "flex", gap: "10px" }}>
                    <button type="submit" style={{ padding: "10px", backgroundColor: "green", color: "white", border: "none", cursor: "pointer", flex: 1 }}>
                        {editingId ? "Update Blog" : "Create Blog"}
                    </button>
                    {editingId && (
                        <button type="button" onClick={resetForm} style={{ padding: "10px", backgroundColor: "gray", color: "white", border: "none", cursor: "pointer" }}>
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            <h2>Manage Blogs</h2>
            <ul style={{ listStyle: "none", padding: 0 }}>
                {blogs.map(blog => (
                    <li key={blog.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px", borderBottom: "1px solid #ddd" }}>
                        <span>{blog.title} ({blog.category})</span>
                        <div>
                            <button onClick={() => handleEdit(blog)} style={{ marginRight: "10px", padding: "5px 10px", backgroundColor: "orange", color: "white", border: "none", cursor: "pointer" }}>Edit</button>
                            <button onClick={() => handleDelete(blog.id)} style={{ padding: "5px 10px", backgroundColor: "red", color: "white", border: "none", cursor: "pointer" }}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Admin;
