// exemple de funcio per fer sql ...
import mysql from "mysql";
import credentials from "./credentials.cjs";

var con = mysql.createConnection({
  host: credentials.basededades.host,
  user: credentials.basededades.user,
  password: credentials.basededades.password,
  database: credentials.basededades.database
});

async function notgo(email, data, hora, aula) {
  try {
    // veure si enviar email o no
    var sql = "select count(*) as hies from cherlock.revisionsnofetes where email='" + email + "' and aula='" + aula + "' and date_format(dia, '%d/%m/%y')='" + data + "' and hora='" + hora + "'";

    await con.query(sql, function (err, result) {
      if (err) throw err;
      //console.log(sql);
      console.log(result[0].hies);
      return result[0].hies;
    })
  } catch (err) {
    console.log('could not send mail: ' + err.message)
  }
}

export default notgo;