import mysql from "mysql";
import credentials from "./credentials.cjs";

var con = mysql.createConnection({
  host: credentials.basededades.host,
  user: credentials.basededades.user,
  password: credentials.basededades.password,
  database: credentials.basededades.database
});

async function notgo(email, data, hora, aula) {
  //console.log(credentials.sendgrid.user+', '+credentials.sendgrid.password);
var  valor=3;

  try {   
    // veure si enviar email o no
    var sql = "select count(*) as hies from cherlock.revisionsnofetes where email='"+email+"' and aula='"+aula+"' and date_format(dia, '%d/%m/%y')='"+data+"' and hora='"+hora+"'";

    await con.query(sql, function (err, result) {
      if (err) throw err;
      //console.log(sql);
      console.log(result[0].hies);
      valor=result[0].hies
      //console.log(result.affectedRows + " record(s) updated")
    }) 


  } catch (err) {
    console.log('could not send mail: ' + err.message)
  }
  return valor
}

export default notgo;