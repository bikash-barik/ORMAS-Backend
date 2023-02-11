import mongoose from "mongoose";

const ContentSchema = new mongoose.Schema({
  global_link: { type: String, required: true },
  primary_link: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  publish_status: { type: String, default: "inactive"}
});

const Content = mongoose.model("Content", ContentSchema);

export default Content;
