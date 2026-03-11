import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import newsRoutes from "./routes/newsRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

dotenv.config();
const app = express();

// ✅ CORS Fix: अब किसी भी लैपटॉप से रिक्वेस्ट ब्लॉक नहीं होगी
app.use(cors()); 
app.use(express.json());

// ✅ हेल्थ चेक रूट
app.get("/", (req, res) => res.send("UWS API is Live!"));

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/dashboard", dashboardRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error("DB Connection Error:", error);
  }
};

startServer();