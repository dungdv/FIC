const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "dongvandungst@gmail.com",
    pass: "pktcxdhicjpofeqx",
  },
});

async function sendMail(to, subject, text, html) {
  const info = await transporter.sendMail({
    from: '"LIBERO Library" <dongvandungst@gmail.com>',
    to,
    subject,
    text,
    html,
  });
}

module.exports = { sendMail };
