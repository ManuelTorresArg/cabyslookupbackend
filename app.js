const https = require('https');
const http = require('http');
const express = require('express');
const cors = require('cors');
const app = express()
const sqlite3 = require('sqlite3').verbose();

app.use(cors());
var file = 'mis_datos.db';

var db = new sqlite3.Database(file, (err) => {
    if (err) {
    return console.error(err.message);
    }
    console.log('Conectado a articulos.db');
});

app.get("/cabys/:codigo", (req, res) => {

    const strCodigo = req.params.codigo;
    const sql = "SELECT * FROM articulos WHERE codbar="+strCodigo;

    console.log(strCodigo);

    var descripcion = "";
    var cabys ="";
  
    db.all(sql, [], (err, result) => {
      if (err) {
        return console.error(err.message);
      }
      result.forEach((row) => {
        console.log(row)
        descripcion += " - " + row.descripcion;        
      });

      console.log(result);
      console.log(isEmptyObject(result));


      if (! isEmptyObject(result)) {
          var miRespuesta = {
          'CABYS' : result[0].cabys,
          'CODBAR' : result[0].codbar,
          'DESCCABYS' : result[0].desccabys,
          'DESCRIPCION' : descripcion,
          'IMPUESTO' : result[0].impuesto,
          'CODBAR' : strCodigo
          }
      } else {

        var miRespuesta = {
          'CABYS' : "Error",
          'CODBAR' : "Error",
          'DESCCABYS' : "Error",
          'DESCRIPCION' : "Error",
          'IMPUESTO' : "Error",
          'CODBAR' : "Error"
          }
      }


    console.log(miRespuesta);

    res.send(miRespuesta);      
      
    });
  });

  //Toma el valor del puerto del entorno, no es necesario agregarlo en la URL para render

  const port = process.env.PORT || 3000;

  var server = http.createServer(app);

  server.listen(port, () => {
        console.log(`Puerto: ${port}`)
    })

  function isEmptyObject(obj){
      return Object.keys(obj).length === 0;
      }