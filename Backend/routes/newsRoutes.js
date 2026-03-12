import express from "express";
import {
  postNews,
  getNews,
  deleteNews,
  getDashboardStats,
  getNewsById,
  updateNews
} from "../controllers/newsController.js";


import upload from "../middleware/cloudinary.js"; 

const router = express.Router();
router.post("/post-news", upload.single("image"), postNews);

router.get("/", getNews);

router.delete("/:id", deleteNews);

router.get("/stats", getDashboardStats);

router.get("/single/:id", getNewsById);

router.put("/update/:id", upload.single("image"), updateNews);

export default router;