import mongoose from "mongoose";
import User from "./userModel.js";

const userActivitySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  email: { type: String, required: true },
  loginDateTime: { type: Date, required: true },
  logoutDateTime: { type: Date },
});

const UserActivity = mongoose.model("UserActivity", userActivitySchema);

export default UserActivity;
