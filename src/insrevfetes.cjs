var mysql = require('mysql');

var credentials = require('./credentials.cjs');

var con = mysql.createConnection({
  host: credentials.basededades.host,
  user: credentials.basededades.user,
  password: credentials.basededades.password,
  database: credentials.basededades.database
});

//Insert

con.connect(function (err) {
if (err) throw err;
console.log("Connected!");

//Insert a record in the "customers" table:
var sql = "insert into cherlock.revisionsnofetes (email, aula, dia, hora, grup, professorat) values ('gsalom@cifpfbmoll.eu','C300',STR_TO_DATE('26/04/2024','%d/%m/%Y'),'17:20:00','IFC31X','ESTARELLAS MATAS, RAFAEL')";
con.query(sql, function (err, result) {
  if (err) throw err;
  console.log("Number of records inserted: " + result.affectedRows)
});

var sql = "UPDATE cherlock.professorat SET credit=credit-1 WHERE email='restarellasmatas@cifpfbmoll.eu'";
con.query(sql, function (err, result) {
  if (err) throw err;
  console.log(result.affectedRows + " record(s) updated")
})
});

//<%= "./mail?email="+dat.email %>+<%= "&data="+dat.data_rev %>+<%="&hora="+dat.hora %>+<%="&aula="+dat.nom %>+<%="&grup="+dat.grup %>><%= dat.email %>