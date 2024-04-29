import nodemailer from 'nodemailer';
import credentials from "./credentials.cjs";

//var credentials = require('./credentials.cjs');

const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: credentials.sendgrid.user,
    pass: credentials.sendgrid.password
  },
})

async function go(email,data,hora,aula,grup) {
  console.log(credentials.sendgrid.user+', '+credentials.sendgrid.password);
  try {
    const result = await mailTransport.sendMail({
      from: '"Cherlock Please" <cherlock@cifpfbmoll.eu>',
      to: 'gsalom@cifpfbmoll.eu',
      cc: 'gsalom@cifpfbmoll.eu',
      // to: email,
      subject: 'No has fet la revisió del carretó de la '+aula+' '+'('+data+' - '+hora+') !!!',
      text: "El dia "+ data +" a la hora "+ hora +" no has revisat el carretó de la "+ aula +" del "+ grup + " Email: "+ email,
    })
    console.log('mail sent successfully: ', result)
  } catch (err) {
    console.log('could not send mail: ' + err.message)
  } 
}

export default go;  