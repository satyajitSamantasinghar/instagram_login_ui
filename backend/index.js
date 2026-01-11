const express = require("express");
const dotenv = require("dotenv");
const cors = require('cors');

dotenv.config();

const connectDB = require("./config/db");
const loginRoutes = require("./routes/loginRoutes");

connectDB();

const app = express();
 app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://instagram-login-ui.vercel.app"
  ],
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(express.json());

app.use("/api/login", loginRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
