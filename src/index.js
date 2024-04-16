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
app.use(morgan("cherlock"));

// routes
app.use(indexRoutes);

// static files
app.use(express.static(join(__dirname, "public")));

// listening the Server
app.listen(app.get("port"));
console.log("Server on port", app.get("port"));

app.get('/prova', (req, res) => {
  
    // Fetch profes from the database
  con.query('SELECT * FROM professorat', (error, results) => {
      if (error) {
          console.error('Error fetching profes from the database: ' + error.stack);
          return res.status(500).json({ error: 'Failed to fetch professorat' });
    }

    // Send the fetched data as a response
     res.json(results);
  });
});

app.get('/carretons2', async (req, res) => {
  await con.query('SELECT * FROM carretons', (error, results) => {
    if (error) {
        console.error('Error fetching carretons from the database: ' + error.stack);
        return res.status(500).json({ error: 'Failed to fetch carretons' });
  }
  // Send the fetched data as a response
  const html = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Carretons</title>
            <style>
                table {
                    border-collapse: collapse;
                    width: 100%;
                }

                th, td {
                    text-align: left;
                    padding: 8px;
                    border: 1px solid #ddd;
                }
            </style>
        </head>
        <body>
            <h1>Carretons</h1>

            <table>
                <thead>
                    <tr>
                        ${fields.map(field => `<th>${field.name}</th>`).join('')}
                    </tr>
                </thead>
                <tbody>
                    ${rows.map(row => `
                        <tr>
                            ${row.map(value => `<td>${value}</td>`).join('')}
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </body>
        </html>
    `;

    res.send(html);
});
});
