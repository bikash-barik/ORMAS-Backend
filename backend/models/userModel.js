import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    full_name: {
      type: String,
      required: true
    },
    sl_no: {
      type: Number,
      required: true
    },
    gender: {
      type: String,
      required: true
    },
    date_of_birth: {
      type: Date,
      required: true
    },
    image: {
      type: String,
      required: true,
      default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    },
    office_phone: {
      type: String,
      required: true
    },
    mobile_no: {
      type: String,
      required: true
    },
    username: { //user id in the frontend
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    privilege: {
      type: String,
      required: true
    },
    status: {
      type: String,
      default: "inactive"
    }
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// will encrypt password everytime its saved
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;
