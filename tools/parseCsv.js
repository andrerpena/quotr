import fs from 'fs';
import csv from 'fast-csv';
import jsonFile from 'jsonfile';

var stream = fs.createReadStream('./data/Stock.csv');

var symbols = [];

var csvStream = csv()
    .on("data", function(data){
        symbols.push({
            symbol: data[0],
            name: data[1],
            stockexchange: data[2],
            market: data[3]
        });
    })
    .on("end", function(){

        jsonFile.writeFile('./data/Stock.json', symbols, {spaces: 2}, function(error) {
           console.log('end');
        });

    });

stream.pipe(csvStream);