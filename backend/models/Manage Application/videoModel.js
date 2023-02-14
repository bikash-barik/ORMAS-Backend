import mongoose from "mongoose";

// Video Model
const VideoSchema = new mongoose.Schema({
  sl_no: { type: Number },
  headline: { type: String },
  link_type: { type: String },
  thumb_image: { type: String },
  video: { type: String },
  description: { type: String },
  home_page_status: { type: String, default: "unset" },
  publish_status: { type: String, default: "inactive" },
  timestamp: { type: Date, default: Date.now },
});
const Video = mongoose.model("Video", VideoSchema);
export default Video;
