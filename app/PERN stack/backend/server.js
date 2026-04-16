import express from "express";
import pkg from "pg";
import cors from "cors";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pkg;

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);
app.use(express.json());

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

pool
  .query("SELECT NOW()")
  .then(() => console.log("Connected to PostgreSQL"))
  .catch((err) => console.error("DB connection failed:", err));

app.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    await pool.query("INSERT INTO users (email, password) VALUES ($1, $2)", [
      email,
      hashed,
    ]);

    res.json({ success: true });
  } catch (err) {
    res.json({ success: false, error: "User may already exist" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  if (result.rows.length === 0) {
    return res.json({ success: false });
  }

  const user = result.rows[0];

  const match = await bcrypt.compare(password, user.password);

  if (match) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
