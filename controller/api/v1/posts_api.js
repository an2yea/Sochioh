const Post = require("../../../models/post");
const Comment = require("../../../models/comments");
module.exports.index = async function (req, res) {
  let posts = await Post.find({})
    .sort("-createdAt")
    .populate("user")
    .populate({
      path: "comments",
      populate: {
        path: "users",
      },
    });
  return res.json(200, {
    message: "List of posts",
    posts: posts,
  });
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
    // if (post.user == req.user.id) {
    post.remove();
    await Comment.deleteMany({ post: req.params.id });
    return res.json(200, {
      message: "Post and associated commetns deleted succesfully",
    });
    //} else {
    //return res.redirect("back");
    //}
  } catch (err) {
    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};
