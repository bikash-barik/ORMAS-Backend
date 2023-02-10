import mongoose from "mongoose";

const PermissionSchema = new mongoose.Schema({
  feature: { type: String },
  category: { type: String },
  authorRights: { type: Boolean },
  editorRights: { type: Boolean },
  publisherRights: { type: Boolean },
  managerRights: { type: Boolean },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Permission = mongoose.model('Permission', PermissionSchema);

export default Permission;