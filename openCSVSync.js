var csvsync = require('csvsync');
var fs = require('fs');

var csv = fs.readFileSync('catalogo.csv', {
    encoding: 'binary'
});
var data = csvsync.parse(csv,{
    delimiter: ';'
});

console.log(data);