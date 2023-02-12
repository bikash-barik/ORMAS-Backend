import mongoose from "mongoose";
// Achievement Model
const AchievementSchema = new mongoose.Schema({
  sl_no: { type: Number },
  achievement_name: { type: String },
  snippet: { type: String },
  description: { type: String },
  home_page_status: { type: String },
  publish_status: { type: String },
  timestamp: { type: Date, default: Date.now },
});
const Achievement = mongoose.model("Achievement", AchievementSchema);
export default Achievement;
