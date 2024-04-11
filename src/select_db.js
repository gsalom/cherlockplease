var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "diouxx",
  database: "cherlock"
});

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM professorat", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});