fs = require('fs');
pathname = 'data2.xml';
var parseString = require('xml2js').parseString;

fs.readFile(pathname, function (err, data) {
  console.log(data)

  parseString(data, function (err, result) {
    console.dir(result.xml);
    // for(i=0;i<result.xml.notificacion.length;i++)
    //   console.log(result.xml.notificacion[i].subtitulo[0]);
     result.xml.deploylist.forEach(element => {
      console.log(JSON.stringify(element))
      console.log(element['$'].count)
     });
  }
);
});