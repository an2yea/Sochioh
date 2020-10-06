const mongoose = require("mongoose");

const FriendshipSchema = new mongoose.Schema(
  {
    send_user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    receive_user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Friendship = mongoose.model("Frienship", FriendshipSchema);
module.exports = Friendship;
