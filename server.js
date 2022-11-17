const https = require('https');
const http = require('http');
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express()
const sqlite3 = require('sqlite3').verbose();
var csvsync = require('csvsync');

// Para evitar problemas de cross origin habilitamos cors para todo origen
app.use(cors());

var file = 'articulos.db';

var valores = [];

var strDescResponse = "";
var strCodBarResponse = "";
var strCabysResponse = "";

//Esperamos una comunicación tipo GET con un parametro dinámico
app.get('/api/:producto/:codigo', (req, res) => {

    //cargamos en strProd el parametro del get
    const strProd = req.params.producto;
    const strCodigo = req.params.codigo;

    console.log(strProd+ ' ' + strCodigo) 
    console.log(strProd+ ' ' + strCodigo) 

//Realizamos la consulta

valores = function (cb) {

    let respuesta = [];

        //Abrimos la base de datos
    let db = new sqlite3.Database(file, (err) => {
        if (err) {
        return console.error(err.message);
        }
        console.log('Connected to the in-memory SQlite database.');
    });

    db.all(`SELECT * FROM articulos WHERE codbar=${strCodigo}`, function(err, rows) {
    rows.forEach(function (row) {
        console.log(row.codbar, row.descripcion, row.cabys);
        strDescResponse += " + "+row.descripcion;
        strCodBarResponse = row.codbar;
        strCabysResponse = row.cabys;

        console.log(strDescResponse);
        console.log(strCodBarResponse);
        console.log(strCabysResponse);

    })

    respuesta.append(strDescResponse);
    respuesta.append(strCodBarResponse);
    respuesta.append(strCabysResponse);

});	
db.close();

return cb(null,respuesta);

}

var miRespuesta = {
    'CABYS' : valores[2],
    'DESCRIPCION' : valores[0],
    'IMPUESTO' : "Impuesto",
    'CODBAR' : strCodigo
}


    //muestro resultado por consola
    console.log(miRespuesta)    

    //hago res send de la respuesta
    if (strCabysResponse.length !=0) {
        res.send(miRespuesta)
    } else {
        res.send("No encontrado")
    }

})

//Genera el server

//HTTPS con certificado
//var server = https.createServer(options, app);

//HTTP Local Sin certificado
var server = http.createServer(app);

//puerto de escucha

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Atendiendo puerto ${PORT} HTTPS`);
})




