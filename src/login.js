import mysql from "mysql";
import express from "express";
import session from "express-session";

import path from "path";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

import credentials from "./credentials.cjs";

const connection = mysql.createConnection({
    host: credentials.basededades.host,
    user: credentials.basededades.user,
    password: credentials.basededades.password,
    database: credentials.basededades.database,
    multipleStatements: true
  });

const app = express();

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

const __dirname = dirname(fileURLToPath(import.meta.url));

console.log("1:"+__dirname);
// settings
app.set("port", process.env.PORT || 3000);
app.set("views", join(__dirname, "views"));
app.set("view engine", "ejs");
console.log("2:"+__dirname);
console.log("3:"+"views");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// http://localhost:3000/
app.get('/', function(request, response) {
	// Render login template
	//response.send(path.join(__dirname + '/views/login.ejs'));
	 response.render("login", {
	 	title: "CherLock login"
	   });

});

// http://localhost:3000/auth
app.post('/auth', function(request, response) {
	// Capture the input fields
	let username = request.body.username;
	let password = request.body.password;
	// Ensure the input fields exists and are not empty
	if (username && password) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		connection.query('SELECT * FROM usuaris WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
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
				response.send('Usuario y/o Contraseña Incorrecta');
			}			
			response.end();
		});
	} else {
		response.send('Por favor ingresa Usuario y Contraseña!');
		response.end();
	}
});

// http://localhost:3000/home
app.get('/home', function(request, response) {
	// If the user is loggedin
	if (request.session.loggedin) {
		// Output username
		response.send('Te has logueado satisfactoriamente: ' + request.session.username + '!');
		// response.render("index", {
		// 	title: "CherLock Please"
		//   });
	} else {
		// Not logged in
		response.send('¡Inicia sesión para ver esta página!');
	}
	response.end();
});

app.listen(app.get("port"));
console.log("Server on port", app.get("port"));