const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const Article = require('./model/article'); 

const app = express();

// 1. MIDDLEWARE 
// This allows your Vercel frontend to talk to this Railway backend
app.use(cors()); 
app.use(express.json()); 

// 2. DATABASE CONNECTION
// It checks Railway's variables first, then falls back to your local string
const dbURI = process.env.MONGO_URI || "mongodb+srv://Eslam852:Eslam852%40%23%24@my-first-project.dzvbk7v.mongodb.net/MyBlogDB?retryWrites=true&w=majority&appName=My-First-Project";

mongoose.connect(dbURI)
  .then(() => console.log(`Connected successfully to DB`))
  .catch((error) => console.error(`Error connecting:`, error.message));

// 3. ROUTES
app.post('/api/register', async (req, res) => { 
    try {
        const { name, email, password } = req.body;
        const newArticle = new Article({ name, email, password });
        await newArticle.save(); 
        res.status(201).json({ message: "Success! Saved in Atlas" });
    } catch (error) {
        res.status(500).json({ error: "Failed to save data", message: error.message });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Article.findOne({ email: email });

        if (!user) {
            return res.status(404).json({ message: "Email not found! Please sign up." });
        }
        if (user.password !== password) {
            return res.status(401).json({ message: "Incorrect password!" });
        }
        res.status(200).json({ message: "Login successful!", userName: user.name });
    } catch (error) {
        res.status(500).json({ error: "Server error", message: error.message });
    }
});

app.post("/api/passwordChange", async (req, res) => {
    try {
        const { userEmail, pass1 } = req.body;
        const user = await Article.findOne({ email: userEmail });
        if (!user) return res.status(404).json({ message: "User not found!" });

        user.password = pass1;
        await user.save();
        res.status(200).json({ message: "Password updated successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// 4. DYNAMIC PORT (The Fix for "Unexposed Service")
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));