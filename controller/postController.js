const Post = require("../models/post");
const Comment = require("../models/comments");
const Like = require("../models/likes");

module.exports.create = async function (req, res) {
  console.log("body : ", req.body);
  try {
    await Post.create({
      content: req.body.content,
      user: req.user._id,
    });
    if (req.xhr) {
      return res.json(200, {
        message: "Post created",
        data: {
          post: post,
        },
      });
    }
    req.flash(("success", "Post Published"));
    return res.redirect("back");
  } catch (err) {
    req.flash("error", err);
    console.log("Error in creating post", err);
    return res.redirect("back");
  }
};

module.exports.destroy = async function (req, res) {
  try {
    let post = await Post.findById(req.params.id);
    // .id means converting object id to string
    console.log("body : ", req.body);
    // if (!post) {
    //   console.log("Post does not exist");
    //   return res.redirect("back");
    // }
    if (post.user == req.user.id) {
      await Like.deleteMany({ likeable: post, onModel: "Post" });
      await Like.deleteMany({ _id: { $in: post.comments } });

      post.remove();
      await Comment.deleteMany({ post: req.params.id });
      if (req.xhr) {
        return res.status(200).json({
          data: {
            post_id: req.params.id,
          },
          message: "Post Deleted",
        });
      }
      req.flash("success", "Post and associated comments deleted!");
      return res.redirect("back");
    } else {
      req.flash("error", "This post cannot be deleted by You");

      return res.redirect("back");
    }
  } catch (err) {
    req.flash("error", err);
    console.log("Error in deleting post", err);
  }
};
