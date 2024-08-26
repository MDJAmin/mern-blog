const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const fs = require('fs');

const app = express();
const User = require("./models/User");
const Post = require("./models/Post");

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use('/uploads', express.static(uploadsDir));  // Serve static files from the uploads directory

mongoose.connect(
  "mongodb+srv://amin:HkvLRfibimGnPYha@cluster0.sd44t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);

const JWT_SECRET = "gfjnhgmkhtdtuteutekjwry3563ghtyhqsbrw4y6juqw4ywgvkohgjornpe8igftv0kmguih46";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const userDoc = await User.create({
      username,
      password: hashedPassword,
    });

    res.status(201).json(userDoc);
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    const isMatch = bcrypt.compareSync(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ userId: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });

      res.status(200).json({ message: "Login successful", token });
    } else {
      res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post('/create-post', upload.single('cover'), async (req, res) => {
  const { title, summary, content } = req.body;
  const cover = req.file ? req.file.path.replace(/\\/g, '/') : ""; 

  try {
    const newPost = await Post.create({
      title,
      summary,
      content,
      cover,
      author: req.userId 
    });

    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find().populate('author');
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
