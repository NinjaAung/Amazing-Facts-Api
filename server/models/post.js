/* post.js: For creating new fun facts*/
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  type: { type: String, required: true },
  fact: { type: String, required: true },
});

module.exports = mongoose.model("Post", PostSchema);