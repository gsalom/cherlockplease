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
  console.log("Connected SMTP!");
});




const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: credentials.sendgrid.user,
    pass: credentials.sendgrid.password
  },
})

async function go(email, data, hora, aula, grup, profe) {
  //console.log(credentials.sendgrid.user+', '+credentials.sendgrid.password);
  try {
    
    const result = await mailTransport.sendMail({
      from: '"Cherlock Please" <cherlock@cifpfbmoll.eu>',
      to: 'gsalom@cifpfbmoll.eu',
      // to: email,
      // cc:  'cap.dept.informatica@cifpfbmoll.eu',
      subject: 'No has fet la revisió del carretó de la ' + aula + ' ' + '(' + data + ' - ' + hora + ') !!!',
      text: "El dia " + data + " a la hora " + hora + " no has revisat el carretó de la " + aula + " del " + grup + " Email: " + email
    });

    //Insert a record in the "revisionsnofetes" table:
    var sql = "insert into cherlock.revisionsnofetes (email, aula, dia, hora, grup, professorat) values ('"+email+"','"+aula+"',STR_TO_DATE('"+data+"','%d/%m/%Y'),'"+hora+"','"+grup+"','"+profe+"')";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Number of records inserted: " + result.affectedRows)
    });

    // update record in the professorat
    var sql = "UPDATE cherlock.professorat SET credit=credit-1 WHERE email='" + email+"'";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result.affectedRows + " record(s) updated")
    }) 


  } catch (err) {
    console.log('could not send mail: ' + err.message)
  }
}

export default go;