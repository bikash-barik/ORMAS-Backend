import mongoose from "mongoose";

const officerProfileSchema = mongoose.Schema(
  {
    officername: {
      type: String,
      required: true,
    },
    qualification:{
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    serial: {
      type: String,
      required: true,
    },
    createdon:{
       type:Date,
       required: true,
    },
    photo: {
        type: String,
        required: true,
        default:
          "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
      },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const OfficerProfile = mongoose.model("OfficerProfile", officerProfileSchema);

export default OfficerProfile;
