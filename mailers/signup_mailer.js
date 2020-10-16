const nodeMailer = require('../config/nodemailer');

exports.newAccount = (user)=>
{
    console.log("Inside newUser");
    console.log(user.email);
    nodeMailer.transporter.sendMail({
        from: "its.gupta.ananya@gmail.com",
        to: user.email,
        subject: "Sign Up Success",
        html: '<h1>Hey ! Your Account was created Successfully</h1>'

    }, (err,info)=>{
        if(err)
        {
            console.log("Error in Sending Mail",err);
            return;
        }
          console.log("Message Sent", info);
          return;
    })
}