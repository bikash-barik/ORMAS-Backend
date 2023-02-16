import mongoose from "mongoose";

const PrimaryLinkSchema = new mongoose.Schema({
  global_link: { type: String },
  link_name: { type: String },
  sl_no: { type: Number },
  link_type: { type: String },
  function_name: { type: String },
  window_status: { type: String },
  publish_status: { type: String, default: "unset" }
});

const PrimaryLink = mongoose.model("PrimaryLink", PrimaryLinkSchema);

export default PrimaryLink;
