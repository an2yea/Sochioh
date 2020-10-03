const Comment = require("../models/comments");
const Post = require("../models/post");

module.exports.create = async function (req, res) {
  console.log(" body : ", req.body);
  try {
    let post = await Post.findById(req.body.post);

    if (post) {
      let comment = await Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id,
      });
      post.comments.push(comment); // Array push
      post.save(); // Save it to mongoDb database
      console.log("comment created :", comment);
      console.log("post updated : ", post);
      console.log("Created the post");
      res.redirect("/");
    }
  } catch (err) {
    console.log("error in creating comment", err);
    return res.redirect("back");
  }
};
module.exports.destroy = async function (req, res) {
  try {
    let comment = await Comment.findById(req.params.id);
    if (comment.user.id == req.user.id) {
      let postId = comment.post;
      comment.remove();

      let post = await Post.findByIdAndUpdate(postId, {
        $pull: { comments: req.params.id },
      });
      return res.redirect("back");
    } else {
      return res.redirect("back");
    }
  } catch {
    console.log("Error in deleting comment", err);
    return res.redirect("back");
  }
};
