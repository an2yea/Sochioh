const Post = require("../modules/post");
module.exports.create = function (req, res) {
  console.log("body : ", req.body);
  Post.create(
    {
      content: req.body.content,
      user: req.user._id,
    },
    function (err, post) {
      if (err) {
        console.log("Error creating post");
        return;
      }
      return res.resdirect("back");
    }
  );
};
