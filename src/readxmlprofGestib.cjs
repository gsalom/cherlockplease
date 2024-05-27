fs = require('fs');
pathname = 'exportacioDadesCentre.xml';
var parseString = require('xml2js').parseString;

fs.readFile(pathname, function (err, data) {
  //console.log(data)
  parseString(data, function (err, result) {
    console.dir(result);
    result.CENTRE_EXPORT.PROFESSORS.forEach(element => {
      console.log(JSON.stringify(element))
      element['PROFESSOR'].forEach(element => {
        console.log(element['$'].codi)
        console.log(element['$'].nom)
        console.log(element['$'].ap1)
        console.log(element['$'].ap2)
        console.log(element['$'].departament)
      })
    });
  }
  );
});