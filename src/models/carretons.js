import mysql from "mysql";


function consultaCarretons() {
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "diouxx",
        database: "cherlock"
      });
      
      con.connect(function (err) {
        if (err) throw err;
      });
      
    con.query('SELECT id_car,c.nom,a.nom as nom_aula,c.estat, c.num_ord FROM cherlock.carretons c, cherlock.aules a WHERE c.codi_aula=a.codi order by a.nom', (error, results) => {
            if (error) {
                console.error('Error fetching carretons from the database: ' + error.stack);
                return res.status(500).json({
                    error: 'Failed to fetch carretons'
                });
            }
            return results
        })
        }
   

export {consultaCarretons};
    