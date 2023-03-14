const nodeMailer = require("nodemailer");
module.exports = async (email, subject, text) => {
  try {
    const transporter = nodeMailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      service: "gmail",
      auth: {
        user: "melissaineza8@gmail.com",
        pass: "pqpzmcakauahxpae",
      },
    });

    await transporter.sendMail({
      from: "melissaineza8@gmail.com",
      to: email,
      subject: subject,
      text: text,
    });

    console.log("email sent successfully");
  } catch (error) {
    console.log("email not sent");
    console.log(error);
    return error;
  }
};
