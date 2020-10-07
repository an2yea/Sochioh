//storing the userSchema
const mongoose = require("mongoose");
//Helps in handling multi-part forms
const multer = require("multer");
// Defining the path to the location of storage
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
    //Ensure using the same names while declaring the property and while using it later
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Friendship",
      },
    ],
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
