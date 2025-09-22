import mongoose from "mongoose";

const apiLinkSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    url: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("ApiLink", apiLinkSchema);