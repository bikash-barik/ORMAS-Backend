import mongoose from "mongoose";
// Banner Model
const BannerSchema = new mongoose.Schema({
  sl_no: { type: Number },
  caption: { type: String },
  banner: { type: String },
  home_page_status: { type: String },
  publish_status: { type: String },
  timestamp: { type: Date, default: Date.now },
});
const Banner = mongoose.model("Banner", BannerSchema);
export default Banner;
