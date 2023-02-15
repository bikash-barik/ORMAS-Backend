import mongoose from "mongoose";

const GlobalLinkSchema = new mongoose.Schema({
  link_name: {type: String},
  sl_no: {type: Number},
  link_type: {type: String},
  function_name: {type: String},
  window_status: {type: String},
  view_in_menu_item: {type: String},
  view_in_footer_link: {type: Boolean},
  publish_status: {type: String, default: "unset"}
});

const GlobalLink = mongoose.model('GlobalLink', GlobalLinkSchema);

export default GlobalLink;
