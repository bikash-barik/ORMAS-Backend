import mongoose from "mongoose";
// WhatsNew Model
const WhatsNewSchema = new mongoose.Schema({
  sl_no: { type: Number },
  headline: { type: String },
  description: { type: String },
  document: { type: String },
  home_page_status: { type: String },
  publish_status: { type: String },
  timestamp: { type: Date, default: Date.now },
});
const WhatsNew = mongoose.model("WhatsNew", WhatsNewSchema);
export default WhatsNew;