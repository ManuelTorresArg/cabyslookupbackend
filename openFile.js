const fs = require('fs')


let rawdata = fs.readFileSync('json_data.json');
let cabys = JSON.parse(rawdata);
//console.log(cabys);



for(let iType=0; iType<cabys.length; iType++) {
    //console.log(cabys[iType])
    for (iItem=0; iItem<cabys[iType].items.length; iItem++){
        //console.log(cabys[iType].items[iItem])
        if (cabys[iType].items[iItem]=="transporte") {
            console.log(cabys[iType].type)
        }
    }
       
}
