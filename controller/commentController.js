const Comment = require("../models/comments");
const Post = require("../models/post");

module.exports.create = function (req, res) {
  console.log(" body : ", req.body);
  Post.findById(req.body.post, function (err, post) {
    console.log("Entered creation");
    if (post) {
      console.log("Found the post");
      Comment.create(
        {
          content: req.body.content,
          post: req.body.post,
          user: req.user._id,
        },
        function (err, comment) {
          if (err) {
            console.log("Error adding coment");
            return;
          }
          post.comments.push(comment); // Array push
          post.save(); // Save it to mongoDb database
          console.log("comment created :", comment);
          console.log("post updated : ", post);
          console.log("Created the post");
          res.redirect("/");
        }
      );
    } else {
      console.log("Post not found");
    }
  });
};
