import nodemailer from 'nodemailer'


const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'cherlock@cifpfbmoll.eu',
    pass: 'Cherlock202021',
  },
})

async function go(email) {
  try {
    const result = await mailTransport.sendMail({
      from: '"Cherlock Please" <cherlock@cifpfbmoll.eu>',
      to: 'gsalom@cifpfbmoll.eu',
      subject: 'No has revisat el carretó!',
      text: "Te hem llevat un punt per no haver revisat el carrertó de l'aula A000. Seguim Controlant!!!!" + email,
    })
    console.log('mail sent successfully: ', result)
  } catch (err) {
    console.log('could not send mail: ' + err.message)
  } 
}

export default go;  