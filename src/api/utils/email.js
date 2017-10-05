const nodemailer = require('nodemailer');
const config = require('../../config/vars');

const transporter = nodemailer.createTransport(config.mail);

const mailOptions = {
  from: '"API Service 👻" <ghost@api-service.com>',
};

const sendMail = Promise.promisify(transporter.sendMail, { context: transporter });

async function mail({ to, subject, message }) {
  return new Promise((resolve, reject) => {
    transporter.sendMail(
      {
        ...mailOptions,
        to,
        subject,
        html: message,
      },
      (err, info) => {
        if (err) {
          reject(err);
        }
        resolve(info);
      },
    );
  });
}

module.exports = {
  mail,
};
