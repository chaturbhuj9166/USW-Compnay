import mongoose from "mongoose";

const newsFileSchema = new mongoose.Schema(
  {
    newsId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "News"
    },

    fileUrl: String,
    fileType: String
  },
  { timestamps: true }
);

export default mongoose.model("NewsFile", newsFileSchema);