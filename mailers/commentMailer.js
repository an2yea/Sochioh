const nodeMailer = require('../config/nodemailer');

exports.newComment = (comment)=>
{
    console.log("Inside New Comment",comment);
    nodeMailer.transporter.sendMail({
        from:"ananyaguptaag2001@gmail.com",
        to: comment.user.email,
        subject:"New Comment",
        html :"<h1> Hey ! Your Comment Was Published",

    },(err,info) =>
    {
        if(err)
    {
        console.log("Error in Sending Mail",err);
        return;
    }
      console.log("Message Sent", info);
      return;
    });
}