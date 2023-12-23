import { Schema, model } from "mongoose";
import { handleSaveError, updateValidation } from "./hooks.js";

const userSchema = new Schema(
  {
    nickname: {
      type: String,
      required: [true, "Set nickname for user"],
    },

    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    
    progress: Number,
    token: String,
  },
  { versionKey: false }
);

userSchema.pre("findOneAndUpdate", updateValidation);
userSchema.post("save", handleSaveError);
userSchema.post("findOneAndUpdate", handleSaveError);

const User = model("user", userSchema);

export default User;
