import { Router } from "express";

import mysql from "mysql";

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "diouxx",
  database: "cherlock"
});

con.connect(function(err) {
  if (err) throw err;

});

const router = Router();

router.get("/", (req, res) => {
  res.render("index", { title: "CherLock Please" });
});

router.get("/about", (req, res) => {
  res.render("about", { title: "Sobre CherLock Please" });
});

router.get("/contact", (req, res) => {
  res.render("contact", { title: "Contacte" });
});

router.get("/carretons", (req, res) => {
  // Fetch professorat from the database
con.query('SELECT id_car,c.nom,a.nom as nom_aula,c.estat, c.num_ord FROM cherlock.carretons c, cherlock.aules a WHERE c.codi_aula=a.codi', (error, results) => {
  if (error) {
      console.error('Error fetching carretons from the database: ' + error.stack);
      return res.status(500).json({ error: 'Failed to fetch carretons' });
}
// Send the fetched data as a response
  res.render("carretons", { title: "Estat carretons", data: results });
});
});

router.get('/professorat', (req, res) => {
  // Fetch professorat from the database
con.query('SELECT * FROM professorat', (error, results) => {
    if (error) {
        console.error('Error fetching professorat from the database: ' + error.stack);
        return res.status(500).json({ error: 'Failed to fetch professorat' });
  }
  // Send the fetched data as a response
  res.render("professorat", {  title: "Professorat", data: results });
});
});

router.get('/horaris', (req, res) => {
  // Fetch professorat from the database
con.query('SELECT c.nom as cicle, a.nom as aula, concat(p.llin2," ",p.llin1,", ",p.nom) as profe, h.dia, h.hora, h.realitzada, h.tipus FROM cherlock.horaris h, cherlock.professorat p, cherlock.cicles c, cherlock.aules a  where h.id_cicle=c.codi and h.id_prof=p.codi and h.id_aula=a.codi', (error, results) => {
    if (error) {
        console.error('Error fetching horaris from the database: ' + error.stack);
        return res.status(500).json({ error: 'Failed to fetch horaris' });
  }
  // Send the fetched data as a response
  res.render("horaris", {  title: "Horaris", data: results });
});
});


export default router;
