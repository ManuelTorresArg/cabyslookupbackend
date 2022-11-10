const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');

miCatalogo = [];

fs.createReadStream('catalogo.csv', { encoding: 'binary' })
.pipe(csv.parse({ 
    headers: true,
    delimiter: ';'
 }))
.on('error', error => console.error(error))
.on('data', row => {
    console.log((row))
    miCatalogo.push({valor:1})
})
.on('end', rowCount => console.log(`Parsed ${rowCount} rows`));

console.log(miCatalogo)