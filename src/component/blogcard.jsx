import React from "react";

function BlogCard({ blog }) {
    return (
        <div style={styles.card}>
            <img
                src={blog.image || "https://via.placeholder.com/300"}
                alt="blog"
                style={styles.image}
            />

            {/* CATEGORY */}
            <p style={styles.category}>{blog.category}</p>

            <h2>{blog.title}</h2>
            <p>{blog.content.substring(0, 100)}...</p>
        </div>
    );
}

const styles = {
    card: {
        border: "1px solid #ddd",
        padding: "15px",
        borderRadius: "10px",
        width: "300px"
    },
    image: {
        width: "100%",
        height: "200px",
        objectFit: "cover"
    },
    category: {
        color: "blue",
        fontWeight: "bold"
    }
};

export default BlogCard;

