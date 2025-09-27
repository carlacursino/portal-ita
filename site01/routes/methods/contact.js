const Email = require('capstone-email');
const config = require('config');

module.exports = (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).send('Missing required fields');
  }

  options = {
    host: config.smtp.server,
    port: config.smtp.port,
    secure: false,
    auth: {
      user: config.smtp.user,
      pass: config.smtp.password,
    },
  }

  new Email('emails/contact.hbs', {
    transport: 'nodemailer',
    engine: config.cms['custom engine'],
    root: 'templates',
  }).send({
    name,
    email,
    message,
  }, {
    from: config.portal.contato.contatos.mailProjeto,
    to: { email: email, name: name },
    nodemailerConfig: options,
  },
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error sending email');
      }
      return res.status(200).send('Email sent successfully');
    }
  );
};
