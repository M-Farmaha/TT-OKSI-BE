import { Schema, model } from "mongoose";
import { handleSaveError, updateValidation } from "./hooks.js";

const testSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    options: {
      type: [String],
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

testSchema.pre("findOneAndUpdate", updateValidation);
testSchema.post("save", handleSaveError);
testSchema.post("findOneAndUpdate", handleSaveError);

const Test = model("test", testSchema);

export default Test;
