fs = require('fs'),
  pathname = './data.xml';
var parseString = require('xml2js').parseString;

fs.readFile(pathname, function (err, data) {
  console.log(data)

  parseString(data, function (err, result) {
    console.dir(result);
    console.dir(result.notificacion.subtitulo);
    result.notificacion.subtitulo.forEach((element) => console.log(element));

  });

});


