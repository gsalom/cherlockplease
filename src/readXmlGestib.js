import fs from 'fs';
// pathname = 'exportacioDadesCentre.xml';
// var parseString = require().parseString;
import {
  parseString
} from 'xml2js';

function readDeptGestib(pathname) {
  let results = [];
  console.log(pathname)
  const data = fs.readFileSync(pathname, {
    encoding: 'utf8',
    flag: 'r'
  });
  parseString(data, function (err, result) {
    results = result;
  });
  return results;
}

export default readDeptGestib;