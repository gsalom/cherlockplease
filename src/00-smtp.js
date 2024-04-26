const nodemailer = require('nodemailer')

const credentials = require('./credentials')

const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: credentials.sendgrid.user,
    pass: credentials.sendgrid.password,
  },
})

async function go() {
  try {
    const result = await mailTransport.sendMail({
      from: '"Cherlock Please" <cherlock@cifpfbmoll.eu>',
      to: 'jmota@cifpfbmoll.eu',
      subject: 'No has revisat el carretó!',
      text: "Te hem llevat un punt per no haver revisat el carrertó de l'aula A000. Seguim Controlant!!!!",
    })
    console.log('mail sent successfully: ', result)
  } catch (err) {
    console.log('could not send mail: ' + err.message)
  }
}

go()