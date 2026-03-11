import express from "express";
import {
  postNews,
  getNews,
  deleteNews,
  getDashboardStats,
  getNewsById,
  updateNews
} from "../controllers/newsController.js";

// ✅ पुराने 'uplode.js' की जगह 'cloudinary.js' को इम्पोर्ट करें
import upload from "../middleware/cloudinary.js"; 

const router = express.Router();

// पोस्ट न्यूज़ - अब इमेज सीधा क्लाउडनरी पर जाएगी
router.post("/post-news", upload.single("image"), postNews);

router.get("/", getNews);

router.delete("/:id", deleteNews);

router.get("/stats", getDashboardStats);

router.get("/single/:id", getNewsById);

// न्यूज़ अपडेट - यहाँ भी क्लाउडनरी वाला मिडलवेयर काम करेगा
router.put("/update/:id", upload.single("image"), updateNews);

export default router;