const Post = require("../models/post");
const Comment = require("../models/comments");

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
      return res.redirect("back");
    }
  );
};

module.exports.destroy = function (req, res) {
  Post.findById(req.params.id, function (err, post) {
    // .id means converting object id to string
    console.log("body : ", req.body);
    if (err) {
      console.log("error");
      return;
    }
    if (!post) {
      console.log("Post does not exist");
      return res.redirect("back");
    }
    if (post.user == req.user.id) {
      post.remove();
      Comment.deleteMany({ post: req.params.id }, function (err) {
        return res.redirect("back");
      });
    } else {
      return res.redirect("back");
    }
  });
};
