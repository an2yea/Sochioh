const mongoose = require("mongoose");

const multer = require("multer");
const path = require("path");
const avatar_path = path.join("/uploads/users/avatars");
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    //yha capital P tha..jabki form got it
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
  },
  { timestamps: true }
);

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", avatar_path));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

//static functions
UserSchema.statics.uploaded_avatar = multer({ storage: storage }).single(
  "avatar"
);
UserSchema.statics.avatarPath = avatar_path;
const User = mongoose.model("User", UserSchema);
module.exports = User;
