import express from "express";
import cors from "cors";
import path from "path"; // पाथ मॉड्यूल इम्पोर्ट करें
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import newsRoutes from "./routes/newsRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",   // local frontend (Vite)
    "https://usw-compnay.onrender.com" // deployed frontend
  ],
  credentials: true
}));
app.use(express.json());

// ✅ यह लाइन सबसे ज़रूरी है: 'uploads' फोल्डर को पब्लिक एक्सेस देने के लिए
app.use("/uploads", express.static("uploads")); 

app.use("/api/auth", authRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/dashboard", dashboardRoutes);

const startServer = async () => {
  await connectDB();
  app.listen(5000, () => {
    console.log("Server running at port 5000");
    console.log("Images available at: http://localhost:5000/uploads/");
  });
};

startServer();