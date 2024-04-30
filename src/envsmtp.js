import nodemailer from 'nodemailer';
import mysql from "mysql";
import credentials from "./credentials.cjs";

var con = mysql.createConnection({
  host: credentials.basededades.host,
  user: credentials.basededades.user,
  password: credentials.basededades.password,
  database: credentials.basededades.database
});

con.connect(function (err) {
  if (err) throw err;
});




const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: credentials.sendgrid.user,
    pass: credentials.sendgrid.password
  },
})

async function go(email, data, hora, aula, grup) {
  //console.log(credentials.sendgrid.user+', '+credentials.sendgrid.password);
  try {
    const result = await mailTransport.sendMail({
      from: '"Cherlock Please" <cherlock@cifpfbmoll.eu>',
      to: 'gsalom@cifpfbmoll.eu',

      //to: email,
      //cc:  'cap.dept.informatica@cifpfbmoll.eu',
      // to: email,
      subject: 'No has fet la revisió del carretó de la ' + aula + ' ' + '(' + data + ' - ' + hora + ') !!!',
      text: "El dia " + data + " a la hora " + hora + " no has revisat el carretó de la " + aula + " del " + grup + " Email: " + email
    })
    /*con.query('SELECT * FROM professorat', (error, results) => {
      if (error) {
        console.error('Error fetching professorat from the database: ' + error.stack);
      }
    })
    console.log('mail sent successfully: ', result)*/
  } catch (err) {
    console.log('could not send mail: ' + err.message)
  }
}

export default go;