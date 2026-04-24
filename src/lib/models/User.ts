import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide your username"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Please provide your password"],
      trim: true,
    },
  },
  { timestamps: true },
);

const User = models.users || model("users", userSchema);

export default User;
