import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, default: "General" },
  image: { type: String }, 
  contributor: { type: String, default: "Admin" },
  journalistId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Journalist"
  }
}, { timestamps: true });

export default mongoose.model("News", newsSchema);