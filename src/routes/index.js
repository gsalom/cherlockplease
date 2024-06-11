import express from "express";
import {
  Router
} from "express";

import mysql from "mysql";
import go from "../envsmtp.js";

import credentials from "../credentials.cjs";

import session from "express-session";
import path from "path";
import {
  join,
  dirname
} from "path";
import {
  fileURLToPath
} from "url";

var con = mysql.createConnection({
  host: credentials.basededades.host,
  user: credentials.basededades.user,
  password: credentials.basededades.password,
  database: credentials.basededades.database,
  multipleStatements: true
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected Router!");
});

const router = Router();

router.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

const __dirname = dirname(fileURLToPath(
  import.meta.url));

// settings
// router.set("port", process.env.PORT || 3000);
// router.set("views", join(__dirname, "views"));
// router.set("view engine", "ejs");

router.use(express.json());
router.use(express.urlencoded({
  extended: true
}));
router.use(express.static(path.join(__dirname, 'public')));

router.get("/home", (req, res) => {
  res.render("index", {
    title: "CherLock Please"
  });
});
// http://localhost:3000/
router.get('/', function (request, response) {
  // Render login template
  //response.send(path.join(__dirname + '/views/login.ejs'));
  response.render("login", {
    title: "CherLock login"
  });
});

router.get("/error", (req, res) => {
  res.render("error", {
    title: "CherLock Error"
  });
});

router.get("/backend", (req, res) => {
  res.render("backend", {
    title: "CherLock Back End"
  });
});

router.get("/dashboard", (req, res) => {
  var labels1 = [];
  var data1 = [];
  var sql = "SELECT cherlock.revisionsnofetes.professorat, COUNT(cherlock.revisionsnofetes.email) as vegades FROM cherlock.revisionsnofetes WHERE YEAR(cherlock.revisionsnofetes.dia)=2024 GROUP BY cherlock.revisionsnofetes.professorat order by vegades;";
  var labels2 = [];
  var data2 = [];
  var sql2 = "SELECT cherlock.revisions.estat, COUNT(cherlock.revisions.estat) as total FROM cherlock.revisions  WHERE (cherlock.revisions.data_rev > '2024-04-14' AND cherlock.revisions.data_rev  < '2024-04-18') GROUP BY cherlock.revisions.estat " +
    " UNION SELECT cherlock.revisions.estat, COUNT(cherlock.revisions.estat) FROM cherlock.revisions  WHERE (cherlock.revisions.data_rev > '2024-05-19' AND cherlock.revisions.data_rev  < '2024-05-25')" +
    " UNION SELECT cherlock.horaris.tipus, COUNT(*) FROM cherlock.horaris where tipus=1 GROUP BY cherlock.horaris.tipus;";
  var labels3 = [];
  var data3 = [];
  var sql3 = "SELECT cherlock.carretons.estat, COUNT(cherlock.carretons.estat) as total FROM cherlock.carretons;";
  var labels4 = [];
  var data4 = [];
  var sql4 = "SELECT cherlock.carretons.nom as nom, cherlock.carretons.num_ord as total FROM cherlock.carretons;";

  if (sql) {
    con.query(sql, function (err, result) {
      if (err) throw err;
      // console.log(result[0].professorat);
      // console.log(result[0].vegades);
      for (var i = 0; i < result.length; ++i) {
        labels1.push(result[i].professorat + "#");
        data1.push(result[i].vegades);
      }
    })
    con.query(sql2, function (err, result) {
      if (err) throw err;
      // console.log(result[0].estat);
      // console.log(result[0].total);
      for (var i = 0; i < result.length; ++i) {
        labels2.push(result[i].estat);
        data2.push(result[i].total);
      }
    })
    con.query(sql3, function (err, result) {
      if (err) throw err;
      // console.log(result[0].estat);
      // console.log(result[0].total);
      for (var i = 0; i < result.length; ++i) {
        labels3.push(result[i].estat);
        data3.push(result[i].total);
      }
    })
    con.query(sql4, function (err, result) {
      if (err) throw err;
      for (var i = 0; i < result.length; ++i) {
        labels4.push(result[i].nom);
        data4.push(result[i].total);
      }
      res.render("dashboard", {
        title: "Panel d'Estat",
        labels1: labels1,
        data1: data1,
        labels2: labels2,
        data2: data2,
        labels3: labels3,
        data3: data3,
        labels4: labels4,
        data4: data4
      })
    })
  }
});

router.get("/about", (req, res) => {
  res.render("about", {
    title: "Sobre CherLock Please"
  });
});

router.get("/contact", (req, res) => {
  res.render("contact", {
    title: "Contacte"
  });
});

router.get("/mail", (req, res) => {
  go(req.query.email, req.query.data, req.query.hora, req.query.aula, req.query.grup, decodeURI(req.query.profe));
  res.render("emailenviat", {
    title: "Email Enviat",
    datemail: req.query.email,
    datdata: req.query.data,
    dathora: req.query.hora,
    dataula: req.query.aula,
    datgrup: req.query.grup,
    datprofe: req.query.profe
  });
});

import {
  readProfGestib,
  readDeptGestib
} from '../readXmlGestib.js';
import {
  readHorGestib,
  readAlumGestib
} from '../readXmlGestib.js';

router.get("/loadXml", (req, res) => {
  //Insert a record in the "dept, alumnat, professorat, etc"  table des de Gestib:
  var tipus = req.query.id;
  var results = [];
  var sql = "";
  var err = false;
  var resu = "ok";
  var cont = 0;
  var pathname = 'exportacioDadesCentre.xml';
  // var pathname = req.query.fitxer;
  if (tipus == "xml3") {
    results = readDeptGestib("src/" + pathname);
    if (results == []) {
      err = true;
      resu = "ko";
    }
    results.CENTRE_EXPORT.DEPARTAMENTS.forEach(element => {
      results = "Carregant depts ...." + '\n';
      element['DEPARTAMENT'].forEach(element => {
        cont = cont + 1;
        sql = "INSERT INTO `departaments` (`codi`, `nom`, `email`, `importGestIB` ) VALUES ('" + element['$'].codi + "', '" + element['$'].descripcio + "', '@cifpfbmoll.eu', 1);"
        results = results + cont + ': ' + element['$'].codi + ' ' + element['$'].descripcio + '\n';
        con.query(sql, function (err, result) {
          if (err) throw err;
          resu = resu + ":" + result.affectedRows;
        })
      })
    });
  }
  if (tipus == "xml1") {
    results = readProfGestib("src/" + pathname);
    if (results == []) {
      err = true;
      resu = "ko";
    }
    results.CENTRE_EXPORT.PROFESSORS.forEach(element => {
      results = "Carregant professorat ...." + '\n';
      element['PROFESSOR'].forEach(element => {
        cont = cont + 1;
        sql = "INSERT INTO `professorat2` (`codi`, `nom`, `llin1`, `llin2`, `departament`, `credit`, `email`) VALUES ('" + element['$'].codi + "', '" + element['$'].nom + "', '" + element['$'].ap1 + "', '" + element['$'].ap2 + "', '" + element['$'].departament + "',5" + ", '@cifpfbmoll.eu');"
        results = results + cont + ': ' + element['$'].codi + ' ' + element['$'].nom + ' ' + element['$'].ap1 + ' ' + element['$'].ap2 + '\n';
        con.query(sql, function (err, result) {
          if (err) throw err;
          resu = resu + ":" + result.affectedRows;
        })
      })
    });
  }
  if (tipus == "xml2") {
    results = readAlumGestib("src/" + pathname);
    if (results == []) {
      err = true;
      resu = "ko";
    }
    results.CENTRE_EXPORT.ALUMNES.forEach(element => {
      var cont = 0;
      results = "Carregant alumnat ...." + '\n';
      element['ALUMNE'].forEach(element => {
        cont = cont + 1;
        sql = "INSERT INTO `alumnat` (`codi`, `nom`, `llin1`, `llin2`, `grup`, `credit`, `email`) VALUES ('" + element['$'].codi + "', '" + element['$'].nom + "', '" + element['$'].ap1 + "', '" + element['$'].ap2 + "', '" + element['$'].grup + "',5" + ", '@cifpfbmoll.eu');"
        results = results + cont + ': ' + element['$'].codi + ' ' + element['$'].nom + ' ' + element['$'].ap1 + ' ' + element['$'].ap2 + '\n';
        con.query(sql, function (err, result) {
          if (err) throw err;
          resu = resu + ":" + result.affectedRows;
        })
      })
    });
  }
  if (tipus == "xml4") {
    results = readHorGestib("src/" + pathname);
    if (results == []) {
      err = true;
      resu = "ko";
    }
    results.CENTRE_EXPORT.HORARIP.forEach(element => {
      results = "Carregant horaris ...." + '\n';
      element['SESSIO'].forEach(element => {
        cont = cont + 1;
        sql = "INSERT INTO `horaris2` (`id_prof`, `id_cicle`, `id_grup`,`id_aula`, `dia`, `hora`, `durada`, `tipus`) VALUES ('" + element['$'].professor + "', '" + element['$'].curs + "', '" + element['$'].grup + "', '" + element['$'].aula + "', " + element['$'].dia + ",'" + element['$'].hora + "', " + element['$'].durada + ", 1);"
        results = results + cont + ': ' + element['$'].professor + ' ' + element['$'].curs + ' ' + element['$'].grup + ' ' + element['$'].dia + ' ' + element['$'].hora + '\n';
        con.query(sql, function (err, result) {
          if (err) throw err;
          resu = resu + ":" + result.affectedRows;
        })
      })
    });
  }
  res.render("carregarXmls", {
    title: "Carrega d'Xmls",
    fitxer: pathname,
    codi: results,
    apply: req.query.accio,
    errors: err,
    results: resu
  });
});

router.get("/load", (req, res) => {
  //Insert a record in the "revisions fetes" table:
  var sql = req.query.codi;
  var errors = "e->";
  var results = "r->";
  if ((sql) && sql.includes("INSERT")) {
    con.query(sql, function (err, result) {
      errors = errors + ":" + err;
      if (err) throw err;
      results = results + ":" + result.affectedRows;
    });

    //Update el codi de l'aula dins les revisions fetes
    var sql = "UPDATE cherlock.revisions r INNER JOIN cherlock.aules a on  r.aula=a.nom and r.id_aula is null SET r.id_aula = a.codi";
    con.query(sql, function (err, result) {
      errors = errors + ":" + err;
      //console.log(errors);
      if (err) throw err;
      //console.log(result.affectedRows + " record(s) updated");
      results = results + ":" + result.affectedRows;
      //console.log(results);
    })
  } else {
    errors = "fitxer no *.sql"
    results = "ko"
  }
  res.render("carregarrevisions", {
    title: "Carrega de revisions",
    fitxer: req.query.fitxer,
    codi: req.query.codi,
    apply: req.query.accio,
    errors: errors,
    results: results
  });
});

router.get("/carretons", (req, res) => {
  // Fetch carretons from the database
  var total = 0;
  var sql = "select * from carretons";
  con.query(sql, (error, results) => {
    if (error) {
      console.error('Error fetching professorat from the database: ' + error.stack);
      return res.status(500).json({
        error: 'Failed to fetch professorat'
      });
    }
    total = results.length;
  })
  con.query('SELECT id_car,c.nom,a.nom as nom_aula,c.estat, c.num_ord FROM cherlock.carretons c, cherlock.aules a WHERE c.codi_aula=a.codi order by a.nom LIMIT ' + (req.query.regini * 10) + ', 10;', (error, results) => {
    if (error) {
      console.error('Error fetching carretons from the database: ' + error.stack);
      return res.status(500).json({
        error: 'Failed to fetch carretons'
      });
    }
    // Send the fetched data as a response
    res.render("carretons", {
      title: "Carretons",
      data: results,
      numreg: total,
      regini: req.query.regini,
      taula: "/carretons"
    });
  });
});

router.get("/assignacions", (req, res) => {
  // Fetch assignacions from the database
  var total = 0;
  var sql = "select * from carretons";
  con.query(sql, (error, results) => {
    if (error) {
      console.error('Error fetching carretons from the database: ' + error.stack);
      return res.status(500).json({
        error: 'Failed to fetch carretons'
      });
    }
    total = results.length;
  })
  con.query('SELECT id_car,c.nom,a.nom as nom_aula,c.estat, c.num_ord FROM cherlock.carretons c, cherlock.aules a WHERE c.codi_aula=a.codi order by a.nom LIMIT ' + (req.query.regini * 10) + ', 10;', (error, results) => {
    if (error) {
      console.error('Error fetching assignacions from the database: ' + error.stack);
      return res.status(500).json({
        error: 'Failed to fetch assignacions'
      });
    }
    // Send the fetched data as a response
    res.render("assignacions", {
      title: "Assignacions",
      data: results,
      numreg: total,
      regini: req.query.regini,
      taula: "/assignacions"
    });
  });
});

router.get("/lassignacions", (req, res) => {
  // Fetch lassignacions from the database
  var nomcarreto=[];
  var sql = "SELECT * FROM cherlock.ordinadors o, cherlock.carretons c where o.carreto=c.id_car and c.id_car=" + req.query.id;
  con.query(sql, (error, resu) => {
    if (error) {
      console.error('Error fetching assignacions from the database: ' + error.stack);
      return res.status(500).json({
        error: 'Failed to fetch assignacions'
      });
    }
    nomcarreto=JSON.stringify(resu)
  })
  var sql="SELECT c.nom as carreto, o.nom, concat(a.llin1,' ',a.llin2,', ',a.nom) as assignat, o.estat, o.comentaris FROM cherlock.ordinadors o, cherlock.carretons c, (select a.codi, a.llin1, a.llin2, a.nom FROM cherlock.alumnat a UNION ALL select p.codi, p.llin1, p.llin2, p.nom FROM cherlock.professorat p) a where o.carreto=c.id_car and o.assignacio=a.codi and c.id_car=" + req.query.id;
  con.query(sql, (error, results) => {
    if (error) {
      console.error('Error fetching carretons from the database: ' + error.stack);
      return res.status(500).json({
        error: 'Failed to fetch carretons'
      });
    }
    // Send the fetched data as a response
    res.render("lassignacions", {
      title: "LListat d'Assignacions",
      data: results,
      numreg: results.length,
      carreto: nomcarreto
    });
  });
});

router.get("/car_forms", (req, res) => {
  // Fetch carretons from the database
  var sql = "SELECT * FROM carretons where id_car=" + req.query.id;
  con.query(sql, (error, results) => {
    if (error) {
      console.error('Error fetching carretons from the database: ' + error.stack);
      return res.status(500).json({
        error: 'Failed to fetch carretons'
      });
    }
    // Send the fetched data as a response
    res.render("car_forms", {
      title: "Edició Carretons",
      data: results
    });
  });
});

router.get("/car_Update", (req, res) => {

  //Insert a record in the "carretons" table:
  var sql = "UPDATE cherlock.carretons c SET c.num_ord=" + req.query.stock + ", c.codi_aula='" + req.query.aula + "', c.estat='" + req.query.estat + "' WHERE  c.id_car=" + req.query.id;
  var errors = "e->";
  var results = "r->";
  if (sql) {
    //Update  dades carretons amb les modificacions fetes
    con.query(sql, function (err, result) {
      errors = errors + ":" + err;

      if (err) throw err;
      //console.log("Number of records inserted: " + result.affectedRows);
      results = results + ":" + result.affectedRows;
      errors = errors + ":" + err;
    });
  }
});


router.get("/prof_forms", (req, res) => {
  // Fetch professorat from the database
  var sql = "SELECT * FROM professorat where id_prof=" + req.query.id;
  con.query(sql, (error, results) => {
    if (error) {
      console.error('Error fetching professorat from the database: ' + error.stack);
      return res.status(500).json({
        error: 'Failed to fetch professorat'
      });
    }
    // Send the fetched data as a response
    res.render("prof_forms", {
      title: "Edició Professorat",
      data: results
    });
  });
});

router.get("/prof_Update", (req, res) => {

  //Insert a record in the "revisions fetes" table:
  var sql = "UPDATE cherlock.professorat p SET p.credit=" + req.query.credit + ", p.codi='" + req.query.codi + "', p.nom='" + req.query.nom + "', p.llin1='" + req.query.llin1 + "',p.llin2='" + req.query.llin2 + "', p.email='" + req.query.email + "', p.departament=" + req.query.departament + ",p.comentaris='" + req.query.comentaris + "' WHERE  p.id_prof=" + req.query.id;
  var errors = "e->";
  var results = "r->";
  if (sql) {
    //Update  dades professorat amb les modificacions fetes
    con.query(sql, function (err, result) {
      errors = errors + ":" + err;

      if (err) throw err;
      //console.log("Number of records inserted: " + result.affectedRows);
      results = results + ":" + result.affectedRows;
      errors = errors + ":" + err;
    });
  }
});

router.get('/professorat', (req, res) => {
  // Fetch professorat from the database
  var total = 0;
  var sql = "select * from professorat";
  con.query(sql, (error, results) => {
    if (error) {
      console.error('Error fetching professorat from the database: ' + error.stack);
      return res.status(500).json({
        error: 'Failed to fetch professorat'
      });
    }
    total = results.length;
  })
  var sql = "SELECT * FROM professorat LIMIT " + (req.query.regini * 10) + ", 10;";
  con.query(sql, (error, results) => {
    if (error) {
      console.error('Error fetching professorat from the database: ' + error.stack);
      return res.status(500).json({
        error: 'Failed to fetch professorat'
      });
    }
    var sql = "select count(*) as total from professorat";
    // Send the fetched data as a response
    res.render("professorat", {
      title: "Professorat",
      data: results,
      numreg: total,
      regini: req.query.regini,
      taula: "/professorat"
    });
  });
});

router.get('/lprofes', (req, res) => {
  // Fetch aules from the database
  con.query('SELECT codi, concat(llin1," ",llin2,", ",nom) as profe FROM professorat', (error, results) => {
    if (error) {
      console.error('Error fetching aules from the database: ' + error.stack);
      return res.status(500).json({
        error: 'Failed to fetch aules'
      });
    }
    // Send the fetched data as a response
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(results));
  });
});


router.get('/departaments', (req, res) => {
  // Fetch departaments from the database
  var total = 0;
  con.query('SELECT * FROM departaments LIMIT ' + (req.query.regini * 10) + ', 10;', (error, results) => {
    if (error) {
      console.error('Error fetching professorat from the database: ' + error.stack);
      return res.status(500).json({
        error: 'Failed to fetch professorat'
      });
    }
    total = results.length;
    // Send the fetched data as a response
    res.render("departaments", {
      title: "Departaments",
      data: results,
      numreg: total,
      regini: req.query.regini,
      taula: "/departaments"
    });
  });
});

router.get('/ldepartaments', (req, res) => {
  // Fetch departaments from the database
  con.query('SELECT codi,nom FROM departaments', (error, results) => {
    if (error) {
      console.error('Error fetching professorat from the database: ' + error.stack);
      return res.status(500).json({
        error: 'Failed to fetch professorat'
      });
    }
    // Send the fetched data as a response
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(results));
  });
});

router.get('/cicles', (req, res) => {
  // Fetch cicles from the database
  var total = 0;
  con.query('SELECT * FROM cicles LIMIT ' + (req.query.regini * 10) + ', 10;', (error, results) => {
    if (error) {
      console.error('Error fetching cicles from the database: ' + error.stack);
      return res.status(500).json({
        error: 'Failed to fetch cicles'
      });
    }
    total = results.length;
    // Send the fetched data as a response
    res.render("cicles", {
      title: "Cicles",
      data: results,
      numreg: total,
      regini: req.query.regini,
      taula: "/cicles"
    });
  });
});

router.get('/aules', (req, res) => {
  // Fetch aules from the database
  var total = 0;
  var sql = "select * from aules";
  con.query(sql, (error, results) => {
    if (error) {
      console.error('Error fetching aules from the database: ' + error.stack);
      return res.status(500).json({
        error: 'Failed to fetch aules'
      });
    }
    total = results.length;
  })
  con.query('SELECT * FROM aules order by bloc, pis LIMIT ' + (req.query.regini * 10) + ', 10;', (error, results) => {
    if (error) {
      console.error('Error fetching aules from the database: ' + error.stack);
      return res.status(500).json({
        error: 'Failed to fetch aules'
      });
    }
    // Send the fetched data as a response
    res.render("aules", {
      title: "Aules",
      data: results,
      numreg: total,
      regini: req.query.regini,
      taula: "/aules"
    });
  });
});

router.get('/laules', (req, res) => {
  // Fetch aules from the database
  con.query('SELECT codi,nom FROM aules', (error, results) => {
    if (error) {
      console.error('Error fetching aules from the database: ' + error.stack);
      return res.status(500).json({
        error: 'Failed to fetch aules'
      });
    }
    // Send the fetched data as a response
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(results));
  });
});

router.get('/lcarretons', (req, res) => {
  // Fetch aules from the database
  con.query('SELECT codi,nom FROM carretons', (error, results) => {
    if (error) {
      console.error('Error fetching aules from the database: ' + error.stack);
      return res.status(500).json({
        error: 'Failed to fetch carretons'
      });
    }
    // Send the fetched data as a response
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(results));
  });
});

router.get('/grups', (req, res) => {
  // Fetch grups from the database
  var total = 0;
  var sql = "select * from grups where estat=1";
  con.query(sql, (error, results) => {
    if (error) {
      console.error('Error fetching grups from the database: ' + error.stack);
      return res.status(500).json({
        error: 'Failed to fetch grups'
      });
    }
    total = results.length;
  })
  con.query('SELECT g.*, a.nom as aula, concat(p.llin1," ",p.llin2,", ",p.nom) as tutor1 FROM cherlock.grups g, cherlock.aules a , cherlock.professorat p where g.aula=a.codi and g.id_tutor=p.codi LIMIT ' + (req.query.regini * 10) + ', 10;', (error, results) => {
    if (error) {
      console.error('Error fetching grups from the database: ' + error.stack);
      return res.status(500).json({
        error: 'Failed to fetch grups'
      });
    }
    // Send the fetched data as a response
    res.render("grups", {
      title: "Grups",
      data: results,
      numreg: total,
      regini: req.query.regini,
      taula: "/grups"
    });
  });
});

router.get("/grup_forms", (req, res) => {
  // Fetch professorat from the database
  var sql = "SELECT * FROM grups where id_grup=" + req.query.id;
  con.query(sql, (error, results) => {
    if (error) {
      console.error('Error fetching professorat from the database: ' + error.stack);
      return res.status(500).json({
        error: 'Failed to fetch professorat'
      });
    }
    // Send the fetched data as a response
    res.render("grup_forms", {
      title: "Edició Grups",
      data: results
    });
  });
});

router.get("/grup_Update", (req, res) => {

  //Insert a record in the "revisions fetes" table:
  var sql = "UPDATE cherlock.grups g SET g.id_tutor='" + req.query.tutor + "', g.aula=" + req.query.aula + ", g.estat=" + req.query.estat + " WHERE  g.id_grup=" + req.query.id;
  var errors = "e->";
  var results = "r->";
  if (sql) {
    //Update  dades professorat amb les modificacions fetes
    con.query(sql, function (err, result) {
      errors = errors + ":" + err;

      if (err) throw err;
      //console.log("Number of records inserted: " + result.affectedRows);
      results = results + ":" + result.affectedRows;
      errors = errors + ":" + err;
    });
  }
});

router.get('/lgrups', (req, res) => {
  // Fetch grups from the database
  con.query('SELECT codi, nom as grup FROM grups', (error, results) => {
    if (error) {
      console.error('Error fetching grups from the database: ' + error.stack);
      return res.status(500).json({
        error: 'Failed to fetch grups'
      });
    }
    // Send the fetched data as a response
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(results));
  });
});

router.get('/horaris', (req, res) => {
  // Fetch horaris from the database
  var total = 0;
  var sql = "select * from horaris";
  con.query(sql, (error, results) => {
    if (error) {
      console.error('Error fetching professorat from the database: ' + error.stack);
      return res.status(500).json({
        error: 'Failed to fetch professorat'
      });
    }
    total = results.length;
  })
  var sql = "SELECT h.id_hor, g.nom as grup, a.nom as aula, concat(p.llin1,' ',p.llin2,', ',p.nom) as profe, h.dia, h.hora, h.realitzada, h.tipus FROM cherlock.horaris h, cherlock.professorat p, cherlock.grups g, cherlock.aules a  where h.id_grup=g.codi and h.id_prof=p.codi and h.id_aula=a.codi order by g.nom, h.dia, h.hora LIMIT " + (req.query.regini * 10) + ", 10;";
  con.query(sql, (error, results) => {
    if (error) {
      console.error('Error fetching horaris from the database: ' + error.stack);
      return res.status(500).json({
        error: 'Failed to fetch horaris'
      });
    }
    // Send the fetched data as a response
    res.render("horaris", {
      title: "Horaris",
      data: results,
      numreg: total,
      regini: req.query.regini,
      taula: "/horaris"
    });
  });
});

router.get("/hor_forms", (req, res) => {
  // Fetch horaris from the database
  var sql = "SELECT * FROM horaris where id_hor=" + req.query.id;
  con.query(sql, (error, results) => {
    if (error) {
      console.error('Error fetching horaris from the database: ' + error.stack);
      return res.status(500).json({
        error: 'Failed to fetch horaris'
      });
    }
    // Send the fetched data as a response
    res.render("hor_forms", {
      title: "Edició Horaris",
      data: results
    });
  });
});

router.get("/hor_Update", (req, res) => {

  //Insert a record in the "horaris" table:
  var sql = "UPDATE cherlock.horaris h SET h.id_prof='" + req.query.codi + "', h.tipus=" + req.query.tipus + " WHERE  h.id_hor=" + req.query.id;
  var errors = "e->";
  var results = "r->";
  if (sql) {
    //Update  dades horaris amb les modificacions fetes
    con.query(sql, function (err, result) {
      errors = errors + ":" + err;

      if (err) throw err;
      //console.log("Number of records inserted: " + result.affectedRows);
      results = results + ":" + result.affectedRows;
      errors = errors + ":" + err;
    });
  }
});



router.get('/revisions', (req, res) => {
  // Fetch revisions from the database
  con.query('WITH recursive Date_Ranges AS (select "' + req.query.dataini + '" as dia union all select dia + interval 1 day from Date_Ranges where dia < "' + req.query.datafin + '") select date_format(d.dia, "%d/%m/%y") as dia, rev.* from Date_Ranges d, (SELECT r.*, concat(p.llin1," ",p.llin2,", ",p.nom) as profe, c.nom as carreto FROM cherlock.revisions r, cherlock.professorat p, cherlock.carretons c where r.email=p.email and r.id_aula=c.codi_aula) rev where d.dia=rev.data_rev order by d.dia, rev.hora_rev', (error, results) => {
    if (error) {
      console.error('Error fetching revisions from the database: ' + error.stack);
      return res.status(500).json({
        error: 'Failed to fetch revisions'
      });
    }
    // Send the fetched data as a response
    res.render("revisions", {
      title: "Revisions",
      dataini: new Date(req.query.dataini),
      datafi: new Date(req.query.datafin),
      data: results
    });
  });
});

router.get('/incidencies', (req, res) => {
  // Fetch revisions from the database


  con.query('WITH recursive Date_Ranges AS (select "' + req.query.dataini + '" as dia union all select dia + interval 1 day from Date_Ranges where dia < "' + req.query.datafin + '") select date_format(d.dia, "%d/%m/%y") as dia, ko.* from Date_Ranges d, (select r.*, concat(p.llin1," ",p.llin2,", ",p.nom) as profe, c.nom as carreto from cherlock.revisions r, cherlock.professorat p, cherlock.carretons c where r.estat<>"OK" and r.email=p.email and r.id_aula=c.codi_aula) ko where d.dia=ko.data_rev order by d.dia, ko.hora_rev', (error, results) => {
    if (error) {
      console.error('Error fetching revisions from the database: ' + error.stack);
      return res.status(500).json({
        error: 'Failed to fetch revisions'
      });
    }
    // Send the fetched data as a response
    res.render("incidencies", {
      title: "Incidències",
      dataini: new Date(req.query.dataini),
      datafi: new Date(req.query.datafin),
      data: results
    });
  });
});

router.get('/emails', (req, res) => {

  // Fetch revisions from the database
  //con.query('WITH recursive Date_Ranges AS (select "' + req.query.dataini + '" as dia union all select dia + interval 1 day from Date_Ranges where dia < "' + req.query.datafin + '") select date_format(d.dia, "%d/%m/%y") as data_rev, p.* from Date_Ranges d, (select p.email, concat(p.llin1," ",p.llin2,", ",p.nom) as profe, h.dia, h.hora, g.nom as grup, a.nom from cherlock.professorat p, cherlock.horaris h, cherlock.aules a, cherlock.grups g where h.id_grup=g.codi and h.tipus=1 and h.email=p.email and h.id_aula=a.codi and not exists (select 1 from cherlock.revisions r where r.email=h.email and DAYOFWEEK(r.data_rev)-1=h.dia)) p where dayofweek(d.dia)-1 = p.dia', (error, results) => {

  con.query('select pnc.*, (select IF(count(*)>0, 1, 0) from revisionsnofetes rnf where rnf.email=pnc.email and pnc.data_rev=date_format(rnf.dia, "%d/%m/%y") and pnc.hora=rnf.hora) as hies from (WITH recursive Date_Ranges AS (select "' + req.query.dataini + '" as dia union all select dia + interval 1 day from Date_Ranges where dia < "' + req.query.datafin + '") select date_format(d.dia, "%d/%m/%y") as data_rev, p.* from Date_Ranges d, (select p.email, concat(p.llin1," ",p.llin2,", ",p.nom) as profe, h.dia, h.hora, g.nom as grup, a.nom from cherlock.professorat p, cherlock.horaris h, cherlock.aules a, cherlock.grups g where h.id_grup=g.codi and h.tipus=1 and h.email=p.email and h.id_aula=a.codi and not exists (select 1 from cherlock.revisions r where r.email=h.email and DAYOFWEEK(r.data_rev)-1=h.dia)) p where dayofweek(d.dia)-1 = p.dia) pnc', (error, results) => {

    if (error) {
      console.error('Error fetching revisions from the database: ' + error.stack);
      return res.status(500).json({
        error: 'Failed to fetch revisions'
      });
    }
    // Send the fetched data as a response
    res.render("emails", {
      title: "Revisions no fetes",
      dataini: new Date(req.query.dataini),
      datafi: new Date(req.query.datafin),
      data: results,
    });
  });
});

router.get("/ordinadors", (req, res) => {
  // Fetch carretons from the database
  var total = 0;
  var sql = "select * from ordinadors";
  con.query(sql, (error, results) => {
    if (error) {
      console.error('Error fetching ordinadors from the database: ' + error.stack);
      return res.status(500).json({
        error: 'Failed to fetch ordinadors'
      });
    }
    total = results.length;
  })
  var sql = "SELECT o.id_ord, o.nom, concat(a.llin1,' ',a.llin2,', ',a.nom) as assignat, c.nom as carreto, o.comentaris as estat FROM cherlock.ordinadors o,  cherlock.carretons c, (select a.codi, a.llin1, a.llin2, a.nom FROM cherlock.alumnat a UNION ALL select p.codi, p.llin1, p.llin2, p.nom FROM cherlock.professorat p) a where o.carreto=c.id_car and o.assignacio=a.codi order by o.nom LIMIT " + (req.query.regini * 10) + ", 10;";
  con.query(sql, (error, results) => {
    if (error) {
      console.error('Error fetching ordinadors from the database: ' + error.stack);
      return res.status(500).json({
        error: 'Failed to fetch ordinadors'
      });
    }
    // Send the fetched data as a response
    res.render("ordinadors", {
      title: "Ordinadors",
      data: results,
      numreg: total,
      regini: req.query.regini,
      taula: "/ordinadors"
    });
  });
});

router.get("/ord_forms", (req, res) => {
  // Fetch ordinadors from the database
  var sql = "SELECT * FROM ordinadors where id_ord=" + req.query.id;
  con.query(sql, (error, results) => {
    if (error) {
      console.error('Error fetching ordinadors from the database: ' + error.stack);
      return res.status(500).json({
        error: 'Failed to fetch ordinadors'
      });
    }
    // Send the fetched data as a response
    res.render("ord_forms", {
      title: "Edició Ordinadors",
      data: results
    });
  });
});

router.get("/ord_Update", (req, res) => {

  //Insert a record in the "carretons" table:
  var sql = "UPDATE cherlock.ordinadors c SET c.num_ord=" + req.query.stock + ", c.codi_aula='" + req.query.aula + "', c.estat='" + req.query.estat + "' WHERE  c.id_car=" + req.query.id;
  var errors = "e->";
  var results = "r->";
  if (sql) {
    //Update  dades ordinadors amb les modificacions fetes
    con.query(sql, function (err, result) {
      errors = errors + ":" + err;

      if (err) throw err;
      //console.log("Number of records inserted: " + result.affectedRows);
      results = results + ":" + result.affectedRows;
      errors = errors + ":" + err;
    });
  }
});

router.get('/consulta', (req, res) => {
  // Fetch revisions from the database

  // Send the fetched data as a response
  res.render("consulta", {
    title: "Consulta revisions"
  });
});

router.get('/config', (req, res) => {
  // Fetch revisions from the database

  // Send the fetched data as a response
  res.render("configuracio", {
    title: "Configuració"
  });
});

router.get('/prova', (req, res) => {
  // Fetch revisions from the database

  // Send the fetched data as a response
  res.render("proves", {
    title: "Menu"
  });
});





// http://localhost:3000/auth
router.post('/auth', function (request, response) {
  // Capture the input fields
  let username = request.body.username;
  let password = request.body.password;
  // Ensure the input fields exists and are not empty
  if (username && password) {
    // Execute SQL query that'll select the account from the database based on the specified username and password
    con.query('SELECT * FROM usuaris WHERE username = ? AND password = ?', [username, password], function (error, results, fields) {
      // If there is an issue with the query, output the error
      if (error) throw error;
      // If the account exists
      if (results.length > 0) {
        // Authenticate the user
        request.session.loggedin = true;
        request.session.username = username;
        // Redirect to home page
        response.redirect('/home');
      } else {
        //response.send('Usuario y/o Contraseña Incorrecta');
        response.redirect('/error');
      }
      response.end();
    });
  } else {
    response.send('Por favor ingresa Usuario y Contraseña!');
    response.end();
  }
});

// http://localhost:3000/home
// app.get('/home', function(request, response) {
// 	// If the user is loggedin
// 	if (request.session.loggedin) {
// 		// Output username
// 		response.send('Te has logueado satisfactoriamente: ' + request.session.username + '!');
// 		// response.render("index", {
// 		// 	title: "CherLock Please"
// 		//   });
// 	} else {
// 		// Not logged in
// 		response.send('¡Inicia sesión para ver esta página!');
// 	}
// 	response.end();
// });



export default router;