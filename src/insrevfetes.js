var mysql = require('mysql');

import credentials from "./credentials.cjs";

var con = mysql.createConnection({
  host: credentials.basededades.host,
  user: credentials.basededades.user,
  password: credentials.basededades.password,
  database: credentials.basededades.database
});
//Insert
/*
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  //Insert a record in the "customers" table:
  var sql = "INSERT INTO cherlock.revisionsnofetes (name, address) VALUES ('Company Inc', 'Highway 37')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
  });
});


<%= "./mail?email="+dat.email %>+<%= "&data="+dat.data_rev %>+<%="&hora="+dat.hora %>+<%="&aula="+dat.nom %>+<%="&grup="+dat.grup %>><%= dat.email %>