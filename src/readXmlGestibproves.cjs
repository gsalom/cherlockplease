fs = require('fs');
pathname = 'exportacioDadesCentre.xml';
var parseString = require('xml2js').parseString;

fs.readFile(pathname, function (err, data) {
  //console.log(data)
  parseString(data, function (err, result) {
    //console.dir(result);
    result.CENTRE_EXPORT.HORARIP.forEach(element => {
      //console.log(JSON.stringify(element))
      element['SESSIO'].forEach(element => {
        console.log(element['$'].professor)
        console.log(element['$'].curs)
        console.log(element['$'].grup)
        console.log(element['$'].dia)
        console.log(element['$'].hora)
        console.log(element['$'].durada)
        console.log(element['$'].aula)
      })
    });
  });
});