import fs from "fs";
import xml2js from "xml2js";

var parser = new xml2js.Parser();
 
// fs.readFile( '/data.xml', function(err, data) {
//     var json = parser.toJson(data);
//     console.log("to json ->", json);
//  });


let pathname="data.xml";

// fs.readFile(pathname, function (err, data) {
//     parser.parseString(data, function(err, result) {
//         console.log('Complete result:');
//         console.log('Try to access element:');
//         console.log(result); //Work
//     });
// });


fs.readFile('data.xml', function(err, data) {
    console.log(err);
    console.log(data);
    parser.parseString(data, function (err, result) {

        console.log(result.urlset.url[0].loc);
    });
});