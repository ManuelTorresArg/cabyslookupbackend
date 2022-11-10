const https = require('https');
const http = require('http');
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express()
var csvsync = require('csvsync');

//Carga options con el contenido del certificado y la key
const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
  };

// Para evitar problemas de cross origin habilitamos cors para todo origen
app.use(cors());

//Esperamos una comunicación tipo GET con un parametro dinámico
app.get('/api/:producto/:codigo', (req, res) => {

    //cargamos en strProd el parametro del get
    const strProd = req.params.producto;
    const strCodigo = req.params.codigo;



    console.log(strProd+ ' ' + strCodigo) 

    //Abrimos el archivo JSON con la info filtrada a las acturas electrónicas procesadas
    let rawdata = fs.readFileSync('json_data.json');
    let rawdataCode = fs.readFileSync('json_code.json');
    //Realizamos el parsing de la info dentro de cabys
    let cabys = JSON.parse(rawdata);
    let cabysData = JSON.parse(rawdataCode)

    //inicializamos la variable donde devolveremos la info
    let miCabys='';
    
    //recorro el extracto de FF buscando la coincidencia en el CABYS
    if(strProd!='NADA') {
        for(let iType=0; iType<cabys.length; iType++) {
            for (iItem=0; iItem<cabys[iType].items.length; iItem++){
                if (cabys[iType].items[iItem]==strProd) {
                    miCabys = cabys[iType].type
                }
            }      
        } 
    } else {
        for(let iType=0; iType<cabysData.length; iType++) {
            for (iItem=0; iItem<cabysData[iType].items.length; iItem++){
                if (cabysData[iType].items[iItem]==strCodigo) {
                    miCabys = cabysData[iType].type
                }
            }      
        } 
    }

  
    //Abro el listado oficial de CABYS y lo guardo en data
    var csv = fs.readFileSync('catalogo.csv', {
        encoding: 'binary'
    });
    var data = csvsync.parse(csv,{
        delimiter: ';'
    });
    
    
    // recorro data buscando el cabys que ya encontre y agrego la descripción a micabys
    for( let item=0 ; item < data.length ; item ++) {
        if (String(data[item][0])==String(miCabys)){
            var miRespuesta = {
                'CABYS' : miCabys,
                'DESCRIPCION' : data[item][1],
                'IMPUESTO' : data[item][2],
                'CODBAR' : strCodigo
            }
        }
    }

    //muestro resultado por consola
    console.log(miRespuesta)    

    //hago res send de la respuesta
    if (miCabys.length !=0) {
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




