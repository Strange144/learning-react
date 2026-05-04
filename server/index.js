// index.js
const express = require("express");
const cors = require("cors");

const blogRoutes = require("./routes/blog_router");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/", blogRoutes);

app.listen(5000, () => {
    console.log("Server running on port 5000");
});

