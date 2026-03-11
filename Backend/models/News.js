import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, default: "General" },
  image: { type: String }, // यह इमेज या वीडियो दोनों का नाम स्टोर करेगा
  contributor: { type: String, default: "Admin" }, // ✅ जर्नलिस्ट का नाम यहाँ सेव होगा
  journalistId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Journalist"
  }
}, { timestamps: true });

export default mongoose.model("News", newsSchema);