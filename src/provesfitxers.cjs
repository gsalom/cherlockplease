var http = require('http');
var fs = require('fs');
http.createServer(function (req, res) {
  fs.readFile('index.js', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
console.log("Connectat al port 3000")
}).listen(3000);
