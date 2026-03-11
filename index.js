const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // 1. Import CORS
const Article = require('./model/article'); 

const app = express();

// 2. MIDDLEWARE
app.use(cors()); // 3. Enable CORS for React connection
app.use(express.json()); 

const dbURI = "mongodb+srv://Eslam852:Eslam852%40%23%24@my-first-project.dzvbk7v.mongodb.net/MyBlogDB?retryWrites=true&w=majority&appName=My-First-Project";

mongoose.connect(dbURI)
  .then(() => console.log(`Connected successfully to DB`))
  .catch((error) => console.error(`Error connecting:`, error.message));

// 4. UPDATED ROUTE (Matched to your React axios call)
app.post('/api/register', async (req, res) => { 
    try {
        // React sends: { name, email, password }
        // Note: Your Article model uses 'age', ensure it matches what you send!
        const { name, email, password } = req.body;
        
        const newArticle = new Article({ 
            name, 
            email, 
            password 
        });

        await newArticle.save(); 
        res.status(201).json({ message: "Success! Saved in Atlas" });
    } catch (error) {
        res.status(500).json({ error: "Failed to save data", message: error.message });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Search the database for a user with this email
        const user = await Article.findOne({ email: email });

        // 2. Check if the user was found
        if (!user) {
            return res.status(404).json({ message: "Email not found! Please sign up." });
        }

        // 3. Check if the password matches
        if (user.password !== password) {
            return res.status(401).json({ message: "Incorrect password!" });
        }

        // 4. If both are correct
        res.status(200).json({ message: "Login successful!", userName: user.name });

    } catch (error) {
        res.status(500).json({ error: "Server error", message: error.message });
    }
});

app.post("/api/passwordChange", async (req, res) => {
    try {
        const { userEmail, pass1 } = req.body;
        const user = await Article.findOne({ email: userEmail });

        if (!user) {
            // Send 404 so React knows the email is wrong
            return res.status(404).json({ message: "User not found!" });
        }

        user.password = pass1;
        await user.save();

        // Send 200 so React triggers the success alert
        res.status(200).json({ message: "Password updated successfully!" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});
// 5. CHANGE PORT to 5000 (React uses 3000)
app.listen(5000, () => console.log(`Server listening on: 5000`));