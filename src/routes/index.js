import {
  Router
} from "express";

import mysql from "mysql";

import go from "../envsmtp.js";

import credentials from "../credentials.cjs";

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

router.get("/", (req, res) => {
  res.render("index", {
    title: "CherLock Please"
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
      console.log(result[0].nom);
      console.log(result[0].total);
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

import readDeptGestib from "../readXmlGestib.js";

router.get("/loadXml", (req, res) => {
  //Insert a record in the "dept, alumnat, professorat, etc"  table des de Gestib:
  var tipus = req.query.id;
  var results = [];
  var sql = "";
  var err = false;
  var resu = "ok";
  var pathname = 'exportacioDadesCentre.xml';
  if (tipus == "xml3") {
    results = readDeptGestib("src/" + pathname);
    if (results == []) {
      err = true;
      resu = "ko";
    }
    results.CENTRE_EXPORT.DEPARTAMENTS.forEach(element => {
      results = "Carregant depts ...." + '\n';
      element['DEPARTAMENT'].forEach(element => {
        sql = "INSERT INTO `departaments` (`codi`, `nom`, `email`) VALUES ('" + element['$'].codi + "', '" + element['$'].descripcio + "', '@cifpfbmoll.eu');"
        results = results + element['$'].codi + ' ' + element['$'].descripcio + '\n';
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
        // console.log(element['$'].codi)
        // console.log(element['$'].nom)
        // console.log(element['$'].ap1)
        // console.log(element['$'].ap2)
        // console.log(element['$'].departament)
      element['PROFESSOR'].forEach(element => {
        sql = "INSERT INTO `professorat` (`codi`, `nom`, `email`) VALUES ('" + element['$'].codi + "', '" + element['$'].descripcio + "', '@cifpfbmoll.eu');"
        results = results + element['$'].codi + ' ' + element['$'].descripcio + '\n';
        con.query(sql, function (err, result) {
          if (err) throw err;
          resu = resu + ":" + result.affectedRows;
        })
      })
    });
  }
  if (tipus == "xml2") {
    results = readAlumnGestib("src/" + pathname);
    if (results == []) {
      err = true;
      resu = "ko";
    }
    results.CENTRE_EXPORT.ALUMNAES.forEach(element => {
      results = "Carregant alumnat ...." + '\n';
        // console.log(element['$'].codi)
        // console.log(element['$'].nom)
        // console.log(element['$'].ap1)
        // console.log(element['$'].ap2)
        // console.log(element['$'].grup)
      element['ALUMNE'].forEach(element => {
        sql = "INSERT INTO `professorat` (`codi`, `nom`, `email`) VALUES ('" + element['$'].codi + "', '" + element['$'].descripcio + "', '@cifpfbmoll.eu');"
        results = results + element['$'].codi + ' ' + element['$'].descripcio + '\n';
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
  console.log(req.query);
  if ((sql) && sql.includes("INSERT")) {
    con.query(sql, function (err, result) {
      errors = errors + ":" + err;
      //console.log(errors);
      if (err) throw err;
      //console.log("Number of records inserted: " + result.affectedRows);
      results = results + ":" + result.affectedRows;
      //console.log(results);
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
  }
  else {
    errors="fitxer no *.sql"
    results="ko"
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
  // Fetch professorat from the database
  con.query('SELECT id_car,c.nom,a.nom as nom_aula,c.estat, c.num_ord FROM cherlock.carretons c, cherlock.aules a WHERE c.codi_aula=a.codi order by a.nom', (error, results) => {
    if (error) {
      console.error('Error fetching carretons from the database: ' + error.stack);
      return res.status(500).json({
        error: 'Failed to fetch carretons'
      });
    }
    // Send the fetched data as a response
    res.render("carretons", {
      title: "Carretons",
      data: results
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
  con.query('SELECT * FROM professorat', (error, results) => {
    if (error) {
      console.error('Error fetching professorat from the database: ' + error.stack);
      return res.status(500).json({
        error: 'Failed to fetch professorat'
      });
    }
    // Send the fetched data as a response
    res.render("professorat", {
      title: "Professorat",
      data: results
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
  con.query('SELECT * FROM departaments', (error, results) => {
    if (error) {
      console.error('Error fetching professorat from the database: ' + error.stack);
      return res.status(500).json({
        error: 'Failed to fetch professorat'
      });
    }
    // Send the fetched data as a response
    res.render("departaments", {
      title: "Departaments",
      data: results
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
  con.query('SELECT * FROM cicles', (error, results) => {
    if (error) {
      console.error('Error fetching cicles from the database: ' + error.stack);
      return res.status(500).json({
        error: 'Failed to fetch cicles'
      });
    }
    // Send the fetched data as a response
    res.render("cicles", {
      title: "Cicles",
      data: results
    });
  });
});

router.get('/aules', (req, res) => {
  // Fetch aules from the database
  con.query('SELECT * FROM aules order by bloc, pis', (error, results) => {
    if (error) {
      console.error('Error fetching aules from the database: ' + error.stack);
      return res.status(500).json({
        error: 'Failed to fetch aules'
      });
    }
    // Send the fetched data as a response
    res.render("aules", {
      title: "Aules",
      data: results
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


router.get('/grups', (req, res) => {
  // Fetch grups from the database
  con.query('SELECT g.*, a.nom as aula, concat(p.llin1," ",p.llin2,", ",p.nom) as tutor1 FROM cherlock.grups g, cherlock.aules a , cherlock.professorat p where g.aula=a.codi and g.id_tutor=p.codi', (error, results) => {
    if (error) {
      console.error('Error fetching grups from the database: ' + error.stack);
      return res.status(500).json({
        error: 'Failed to fetch grups'
      });
    }
    // Send the fetched data as a response
    res.render("grups", {
      title: "Grups",
      data: results
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
  // Fetch professorat from the database
  con.query('SELECT h.id_hor, g.nom as grup, a.nom as aula, concat(p.llin1," ",p.llin2,", ",p.nom) as profe, h.dia, h.hora, h.realitzada, h.tipus FROM cherlock.horaris h, cherlock.professorat p, cherlock.grups g, cherlock.aules a  where h.id_grup=g.codi and h.id_prof=p.codi and h.id_aula=a.codi order by g.nom, h.dia, h.hora', (error, results) => {
    if (error) {
      console.error('Error fetching horaris from the database: ' + error.stack);
      return res.status(500).json({
        error: 'Failed to fetch horaris'
      });
    }
    // Send the fetched data as a response
    res.render("horaris", {
      title: "Horaris",
      data: results
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


export default router;