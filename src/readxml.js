import fs from "fs";
import xml2js from "xml2js";

var parser = new xml2js.Parser();
 
fs.readFile( '/data.xml', function(err, data) {
    var json = parser.toJson(data);
    console.log("to json ->", json);
 });