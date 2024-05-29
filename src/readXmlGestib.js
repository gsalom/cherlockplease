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

function readProfGestib(pathname) {
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

function readHorGestib(pathname) {
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


function readAlumGestib(pathname) {
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

export {readProfGestib, readDeptGestib, readHorGestib, readAlumGestib};