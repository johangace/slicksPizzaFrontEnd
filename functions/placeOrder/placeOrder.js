const nodemailer = require('nodemailer');

// create transport for nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

// test send 📧

exports.handler = async (event, context) => {
  const info = await transporter.sendMail({
    from: 'Miami Slices <miamislices@example.com>',
    to: 'orders@example.com',
    subject: 'new order',
    html: `<p> Hey Pizza order is ready</p>`,
  });
  console.log(info);
  return {
    statusCode: 200,
    body: JSON.stringify(info),
  };
};
