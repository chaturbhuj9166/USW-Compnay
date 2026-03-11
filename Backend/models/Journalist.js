import mongoose from "mongoose";

const journalistSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    username: { type: String, unique: true },
    phone: String,
    password: String
  },
  { timestamps: true }
);

export default mongoose.model("Journalist", journalistSchema);