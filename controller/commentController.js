const Comment = require("../models/comments");
const Post = require("../models/post");
const Like = require("../models/likes");
const commentsMailer = require('../mailers/commentMailer');
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
      post.save();
      comment = await comment.populate("user", "name email").execPopulate();
      commentsMailer.newComment(comment);
      // Save it to mongoDb database
      // console.log("comment created :", comment);
      // console.log("post updated : ", post);
      // console.log("Created the post");
      // res.redirect("/");
      if (req.xhr) {
        console.log("AJAX ");
        req.flash("success", "Comment Created !");

        return res.status(200).json({
          data: {
            comment: comment,
          },
          message: "Post created!",
        });
      }
      req.flash("success", "Comment Created !");
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
    console.log("body::::", req.params, req.user.id, comment.user._id);
    if (comment.user._id == req.user.id) {
      let postId = comment.post;
      comment.remove();

      let post = await Post.findByIdAndUpdate(postId, {
        $pull: { comments: req.params.id },
      });

      await Like.deleteMany({ likeable: comment._id, onModel: "Comment" });

      if (req.xhr) {
        return res.status(200).json({
          data: {
            comment_id: req.params.id,
          },
          message: "Post deleted",
        });
      }
      req.flash("success", "Comment Deleted");
      return res.redirect("back");
    } else {
      req.flash("error", "Unauthorised");
      return res.redirect("back");
    }
  } catch(err) {
    req.flash("error", err);
    return;
  }
};
