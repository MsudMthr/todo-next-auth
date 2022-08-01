import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  todo: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  idCompleted: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.models.Todo || mongoose.model("Todo", todoSchema);
