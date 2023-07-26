const nodemailer = require('nodemailer');
const htmlToText = require('html-to-text');
const hbs = require('nodemailer-express-handlebars');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `${process.env.API_NAME} <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      // Sendgrid
    }

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  }

  // Send the actual email
  async send(template, subject, context) {
    const transporter = this.newTransport();

    const handlebarOptions = {
      viewEngine: {
        partialsDir: `${__dirname}/../views/email/`,
        defaultLayout: false
      },
      viewPath: `${__dirname}/../views/email/`
    };

    transporter.use('compile', hbs(handlebarOptions));

    // 2) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      template,
      context
    };

    // 3) Create a transport and send email
    await transporter.sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send(
      'welcome',
      `Welcome to the ${process.env.API_NAME} Family!`,
      {
        userName: this.firstName,
        siteUrl: this.url,
        apiName: process.env.API_NAME
      }
    );
  }

  async sendPasswordReset() {
    await this.send(
      'forgotPassword',
      `Your password reset token (valid for only 10 minutes)! ${process.env.API_NAME} Family.`,
      {
        userName: this.firstName,
        resetUrl: this.url
      }
    );
  }
};
