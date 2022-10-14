require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.urlencoded({ extended: true }));
const dns = require('node:dns');

/*

// Basic Configuration
const PORT = 8080;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

let tempRedirectPathsArr = [];

// Your first API endpoint
app.post('/api/shorturl', function (req, res) {

    if (req.body.url.slice(0, 7) === 'http://' || req.body.url.slice(0, 8) === 'https://') {

        dns.lookup(req.body.url, (err, address, family) => {
            err ? console.log(err) : console.log(address);

            res.json({ greeting: req.body.url });
        })

        

    }
});

app.listen(PORT, function() {
  console.log(`Listening on port ${PORT}`);
});*/


// account for 6 spaces between lower and upper case
function convertFromBase62(string) {

    (typeof string === 'string') ? null : throwErr('argument should be string');

    const base = 62;
    let decimalValueOfCharCodeA = 65;
    let uppercaseCharCodeOffset = -54;
    let lowercaseCharCodeOffset = -60;
    let runningSum = 0;
    

    for (let i = string.length -1; i > -1; i--) {
        let possibleArabicNumeral = parseInt(string[i], 10);
      /*  let base10Value = (string[i].charCodeAt(0)) ? string[i].charCodeAt(0) + charCodeOffset : */
        if (possibleArabicNumeral) {
            
            runningSum += possibleArabicNumeral * Math.pow(62, string.length - i - 1);
        } else if (base10Value > 10 && base10Value < 63) {

            runningSum += base10Value * Math.pow(62, string.length - i - 1);
        }

        
    }

    return runningSum;
}

//console.log(convertFromBase62('A'));

function throwErr(errMessage) {
    throw Error(errMessage)
}

console.log('A'.charCodeAt(0))