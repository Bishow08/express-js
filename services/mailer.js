const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
 host: "smtp.gmail.com",
 port: 465,
 secure: true,
 auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASS,
 },   
});

const sendMail = async( {email, subject, htmlMsg} ) => {
    const { messageId } = await transporter.sendMail(
        {
            from: '"Bishal Ghamal" <bishalb019308@nec.edu.np>', // sender address
            to: [email, "ghamalabhi10@gmail.com"], // list of receivers
            subject, // Subject line
            html: htmlMsg, // html body
          });
          return messageId;

};

module.exports = { sendMail };