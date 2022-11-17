const https = require('https');
const http = require('http');
const express = require('express');
const cors = require('cors');
const app = express()
const sqlite3 = require('sqlite3').verbose();

app.use(cors());
var file = 'mis_datos4.db';

var db = new sqlite3.Database(file, (err) => {
    if (err) {
    return console.error(err.message);
    }
    console.log('Conectado a articulos.db');
});

app.get("/cabys/:codigo", (req, res) => {

    const strCodigo = req.params.codigo;
    const sql = "SELECT * FROM articulos WHERE codbar="+strCodigo;

    var descripcion = "";
    var cabys ="";
  
    db.all(sql, [], (err, result) => {
      if (err) {
        return console.error(err.message);
      }
      result.forEach((row) => {
        console.log(row)
        descripcion += " + " + row.descripcion;        
      });

      console.log(descripcion);

      var miRespuesta = {
        'CABYS' : result[0].cabys,
        'DESCRIPCION' : descripcion,
        'IMPUESTO' : "Impuesto",
        'CODBAR' : strCodigo
    }

    console.log(miRespuesta);

    res.send(miRespuesta);

      
      
    });
  });

  var server = http.createServer(app);

  server.listen(3000, () => {
        console.log("Puerto: 3000")
    })
