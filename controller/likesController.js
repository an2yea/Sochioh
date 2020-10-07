// //const Like = require('../models/likes');
// const Comment = require('../models/comments');
// const Post = require('../models/post');
// const Like = require('../models/likes');

// module.exports.toggleLike = async function(req,res)
// {
//     try{
//         let likeable;
//         let deleted = false;

//         if(req.query.type == "Post")
//         {
//             likeable = await Post.findById(req.query.id).populate('likes');
//         } else {
//             likeable = await Comment.findById(req.query.id).populate('likes');
//         }

//         // If like exists already
//         let pastLike = await Like.findOne({
//             likeable= req.query.id,
//             onModel = req.query.type,
//             user: req.user._id
//         })
//         if(pastLike)
//         {
//             likeable.likes.pull(pastLike._id);
//             likeable.save();

//             pastLike.remove();
//             deleted = true;
//         }
//         else{
//             let newLike = await Like.create({
//                 user: req.user._id,
//                 likeable: req.query.id,
//                 onModel: req.query.type,
//             });

//             likeable.likes.push(newLike.id);
//             likeable.save();
//         }

//         return res.json(200, {
//             message:"Request success",
//             data:{
//                 deleted:deleted
//             }
//         })
//     }catch(err)
//     {
//         console.log(err);
//         return res.json('500',
//         {
//             message: "Internal Server Error"
//         });
//     }
// }
const Like = require("../models/likes");
const Post = require("../models/post");
const Comment = require("../models/comments");

module.exports.toggleLike = async function (req, res) {
  try {
    // likes/toggle/?id=abcdef&type=Post
    let likeable;
    let deleted = false;

    if (req.query.type == "Post") {
      likeable = await Post.findById(req.query.id).populate("likes");
    } else {
      likeable = await Comment.findById(req.query.id).populate("likes");
    }

    // check if a like already exists
    let existingLike = await Like.findOne({
      likeable: req.query.id,
      onModel: req.query.type,
      user: req.user._id,
    });

    // if a like already exists then delete it
    if (existingLike) {
      likeable.likes.pull(existingLike._id);
      likeable.save();

      existingLike.remove();
      deleted = true;
    } else {
      // else make a new like

      let newLike = await Like.create({
        user: req.user._id,
        likeable: req.query.id,
        onModel: req.query.type,
      });

      likeable.likes.push(newLike._id);
      likeable.save();
    }

    return res.status(200).json({
      message: "Request successful!",
      data: {
        deleted: deleted,
      },
    });
  } catch (err) {
    console.log(err);
    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};
