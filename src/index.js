import express from "express";
import morgan from "morgan";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
 
// Routes
import indexRoutes from "./routes/index.js";


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


// Initialize express
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

// settings
app.set("port", process.env.PORT || 3000);
app.set("views", join(__dirname, "views"));
app.set("view engine", "ejs");

// middlewares
app.use(morgan("dev"));

// routes
app.use(indexRoutes);

// static files
app.use(express.static(join(__dirname, "public")));

// listening the Server
app.listen(app.get("port"));
console.log("Server on port", app.get("port"));

app.get('/prova', (req, res) => {
  
    // Fetch users from the database
  con.query('SELECT * FROM professorat', (error, results) => {
      if (error) {
          console.error('Error fetching users from the database: ' + error.stack);
          return res.status(500).json({ error: 'Failed to fetch users' });
    }

    // Send the fetched data as a response
     res.json(results);
  });
});