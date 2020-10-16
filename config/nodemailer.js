const nodemailer = require("nodemailer");

const ejs = require("ejs");
const path = require("path");
let transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "its.gupta.ananya@gmail.com",
    pass: "Itsagoodday123",
  },
});

let renderTemplate = (data, relativePath) => {
  let mailHTML;
  ejs.renderFile(
    path.join(__dirname, "../views/mailers", relativePath),
    data,
    function (err, template) {
      if (err) {
        console.log("Error in rendering page");
        return;
      }
      mailHTML = template;
    }
  );
  return mailHTML;
};


module.exports = {
  transporter: transporter,
  renderTemplate: renderTemplate,
};
