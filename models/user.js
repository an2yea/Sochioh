const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
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
});
// I didn't explicitely create it, did I ? sirf post mein hi toh hai ?haan wait let me see

const User = mongoose.model("User", UserSchema);
module.exports = User;
