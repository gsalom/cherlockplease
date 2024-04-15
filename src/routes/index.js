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

router.get("/horaris", (req, res) => {
  res.render("horaris", { title: "Horaris de revisió" });
});

router.get("/carretons", (req, res) => {
  res.render("carretons", { title: "Estat carretons" });
});

router.get("/professorat", (req, res) => {
  res.render("professorat", { title: "Professorat" });
});

router.get('/prova', (req, res) => {
  
  // Fetch users from the database
con.query('SELECT * FROM professorat', (error, results) => {
    if (error) {
        console.error('Error fetching users from the database: ' + error.stack);
        return res.status(500).json({ error: 'Failed to fetch users' });
  }

  // Send the fetched data as a response
  res.render("prova", {  title: "prova", data: results });
});
});


export default router;
