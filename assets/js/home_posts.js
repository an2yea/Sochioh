{
  let createPost = function(){
      let newPostForm = $('#new-post-form');

      newPostForm.submit(function (e){
        e.preventDefault();

        $.ajax({
            type:'post',
            url:'/posts/create',
            data = newPostForm.serialize(),
            success: function (data){
              let newPost = newPostDom(data.data.post);
              $("#posts-list-container>ul").prepend(newPost);
              deletePost($(" .delete-post-button", newPost));
    
              new PostComments(data.data.post._id);

              new ToggleLike($(" .toggle-like-button", newPost));
              new Noty({
                theme: "relax",
                text: "Post published!",
                type: "success",
                layout: "topRight",
                timeout: 1500,
              }).show();
            },error: function(error)
            {
                console.log(error.responseText)
            }
        });
      });
  }

//method to create in dom
let newPostDom = function (post){
  return $(`<li id="post-${post._id}">
  <p>
  <small>
    <a class="delete-post-buttton"></a>href="/posts/destroy/<%=post.id%>"> Delete Post </a>
  </small>
  ${ post.content}
  <br />
  <small> ${post.user.name}
   </small>
   <br>
   <small> 
     <a class="toggle-like" data-likes="<%= post.likes.length %>" href="/likes/toggle/?id=${post._id}&type=Post">
     0 Likes 
 </a>
   </small>
</p>
<div class="post-comments">
  <form id= "post-${post._id}-comments-form" action="/comments/create" method="POST">
    <input
      type="text"
      name="content"
      placeholder="Type here to add comment"
    />
    <input type="hidden" name="post" value="${ post.id }" />
    <input type="submit" value="post comment" />
  </form>

  <div class="post-comment-list">
    <ul id="post-comments-${post._id}">
      <% for (comment of post.comments) { %> <%- include('_comment') %> <% }%>
    </ul>
  </div>
</div>
</li>`);
};

//deleting post from DOM
let deletePost = function(deletelink)
{
  $(deletelink).click(function(e)
  {
    e.preventDefault();

    $.ajax({
      type:'get',
      url: $(deletelink).prop('href'),
      success: function(data) {
        $(`post-${data.data.post_id}`).remove();
        console.log(req.body);
        new Noty({
          theme:"relax",
          text:"Post Deleted",
          type:"success",
          layout:"topRight",
          timeout: 1500,
        }).show();
      },
      error: function (error){
        console.log(error.responseText);
      }
    });
  });
};

//Converting posts to AJAX
let convertPostsToAjax = function () {
  $("#posts-list-container>ul>li").each(function () {
    let self = $(this);
    let deleteButton = $(" .delete-post-button", self);
    deletePost(deleteButton);

    // get the post's id by splitting the id attribute
    let postId = self.prop("id").split("-")[1];
    new PostComments(postId);
  });
};

createPost();
convertPostsToAjax();
}
