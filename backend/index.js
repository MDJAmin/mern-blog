const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const app = express();
const User = require("./models/User");

app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://amin:HkvLRfibimGnPYha@cluster0.sd44t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);

const JWT_SECRET = "gfjnhgmkhtdtuteutekjwry3563ghtyhqsbrw4y6juqw4ywgvkohgjornpe8igftv0kmguih46";

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

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
