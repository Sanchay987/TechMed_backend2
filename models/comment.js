const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    postId: {
        type: String,
        required: true,
    },
    comments: {
        type: String,
        required: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);
