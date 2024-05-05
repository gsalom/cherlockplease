var fs = require('fs');
var mysql = require('mysql');
var credentials = require('./credentials.cjs');
var http = require('http');

var con = mysql.createConnection({
  host: credentials.basededades.host,
  user: credentials.basededades.user,
  password: credentials.basededades.password,
  database: credentials.basededades.database
});


http.createServer(function (req, res) {
    var data;
    fs.readFile('rev.sql', function(err, data) {
    con.connect(function(err) {
            if (err) throw err;
            console.log("Connected!"+data);
            con.query(data, function (err, result) {
              if (err) throw err;
              console.log("1 file sql executed.");
            });
            con.end();
            console.log("DisConnected!");
          });
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end()
  })
console.log("Connectat al port 3000")
}).listen(3000);