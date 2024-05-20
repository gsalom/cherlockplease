// funciona llegint fitxer

fs = require('fs'),
pathname='data.xml';

fs.readFile(pathname, function (err, data) {
     parser.parseString(data, function(err, result) {
       console.log('Complete result:');
       console.log('Try to access element:');
       console.log(result); //Work
    });
});


// fs.readFile('/data.xml', function(err, data) {
//     console.log(err);
//     console.log(data);
//     parser.parseString(data, function (err, result) {

//         console.log(result.urlset.url[0].loc);
//     });
// });


// funciona llegint variable
// var parseString = require('xml2js').parseString;
// var xml = "<root>Hello xml2js!</root>"
// parseString(xml, function (err, result) {
//     console.dir(result);
// });




// funciona llegint un fitxer
fs = require('fs'),
xml2js = require('xml2js'),
fitxer='data.xml';
    parser = new xml2js.Parser(),
    fs.readFile(fitxer, (err, data) => {
        parser.parseString(data, (err, result) => {
            console.log('Complete result2:');
            console.dir(result),
            console.log('Done.')
      })
    })


    // var parser = new DOMParser();
    // var xmlDoc = parser.parseFromString(xml,'text/xml');
    
    // var subtitulo = xmlDoc.getElementsByTagName("subtitulo")[0].innerHTML;
    // var texto = xmlDoc.getElementsByTagName("html")[0].innerHTML;
    // var url = xmlDoc.getElementsByTagName("url")[0].innerHTML;