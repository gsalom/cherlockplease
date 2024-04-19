import {
  Router
} from "express";

import mysql from "mysql";

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "diouxx",
  database: "cherlock"
});

con.connect(function (err) {
  if (err) throw err;

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

router.get("/carretons", (req, res) => {
  // Fetch professorat from the database
  con.query('SELECT id_car,c.nom,a.nom as nom_aula,c.estat, c.num_ord FROM cherlock.carretons c, cherlock.aules a WHERE c.codi_aula=a.codi', (error, results) => {
    if (error) {
      console.error('Error fetching carretons from the database: ' + error.stack);
      return res.status(500).json({
        error: 'Failed to fetch carretons'
      });
    }
    // Send the fetched data as a response
    res.render("carretons", {
      title: "Estat carretons",
      data: results
    });
  });
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
  con.query('SELECT * FROM aules', (error, results) => {
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
router.get('/grups', (req, res) => {
  // Fetch grups from the database
  con.query('SELECT g.*, a.nom as aula FROM cherlock.grups g, aules a where g.aula=a.codi', (error, results) => {
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


router.get('/horaris', (req, res) => {
  // Fetch professorat from the database
  con.query('SELECT c.nom as cicle, a.nom as aula, concat(p.llin1," ",p.llin2,", ",p.nom) as profe, h.dia, h.hora, h.realitzada, h.tipus FROM cherlock.horaris h, cherlock.professorat p, cherlock.cicles c, cherlock.aules a  where h.id_cicle=c.codi and h.id_prof=p.codi and h.id_aula=a.codi', (error, results) => {
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


router.get('/revisions', (req, res) => {
  // Fetch revisions from the database
  con.query('SELECT date_format(r.data_rev, "%d/%m/%y") as dia, r.hora_rev, concat(p.llin1," ",p.llin2,", ",p.nom) as profe, r.aula, c.nom as carreto, r.estat, r.comentaris FROM cherlock.revisions r, cherlock.professorat p, cherlock.carretons c where r.email=p.email and r.id_aula=c.codi_aula', (error, results) => {
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
  con.query('SELECT date_format(r.data_rev, "%d/%m/%y") as dia, r.hora_rev, concat(p.llin1," ",p.llin2,", ",p.nom) as profe, r.aula, c.nom as carreto, r.estat, r.comentaris FROM cherlock.revisions r, cherlock.professorat p, cherlock.carretons c where r.email=p.email and r.id_aula=c.codi_aula and r.estat<>"OK"', (error, results) => {
    if (error) {
      console.error('Error fetching revisions from the database: ' + error.stack);
      return res.status(500).json({
        error: 'Failed to fetch revisions'
      });
    }
    // Send the fetched data as a response
    res.render("incidencies", {
      title: "Incideències",
      dataini: new Date(req.query.dataini),
      datafi: new Date(req.query.datafin),
      data: results
    });
  });
});

router.get('/emails', (req, res) => {

  // Fetch revisions from the database
  con.query('WITH recursive Date_Ranges AS (select "'+req.query.dataini+'" as dia union all select dia + interval 1 day from Date_Ranges where dia < "'+req.query.datafin+'") select d.dia as data_rev, p.* from Date_Ranges d, (select p.email, concat(p.llin1," ",p.llin2,", ",p.nom) as profe, h.dia, h.hora, a.nom from cherlock.professorat p, cherlock.horaris h, cherlock.aules a where h.tipus=1 and h.email=p.email and h.id_aula=a.codi and not exists (select 1 from cherlock.revisions r where r.email=h.email and DAYOFWEEK(r.data_rev)-1=h.dia)) p where dayofweek(d.dia)-1 = p.dia', (error, results) => {
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
      data: results
    });
  });
});

router.get('/consulta', (req, res) => {
// Fetch revisions from the database

// Send the fetched data as a response
res.render("consulta", {
  title: "Consulta"
});
});





export default router;