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



let symbolArr = [];
for (let i = 0; i < 123; i++) {
  if (i < 10) symbolArr.push(`${i}`);
  if (i === 10) i = 64;
  if (i > 64 && i < 91) symbolArr.push(String.fromCharCode(i));
  if (i === 91) i = 97;
  if (i > 95 && i <= 122) symbolArr.push(String.fromCharCode(i));
}


// function convertToBase62(int) {
//   (typeof int === 'number') ? null : throwErr('argument should be type number');

//   let runningTotal = '';


//   for (let i = 0; i <= int.toString.length; i++) {
//     (parseInt(int.toString[i], 10) * Math.pow(10, (int.toString.length - i)))

//     let largestQuotient = Math.trunc(int / 62);
//     if (largestQuotient > 62 ) {

//     }

    
//   }

//   if (int >= 62) {
//     let largestQuotient = Math.trunc(int / 62);
//     let remainder = int % 62;
    
//     runningTotal += symbolArr[largestQuotient] + symbolArr[remainder];


//     console.log(runningTotal);
//   }
  
// }


function convertToBase62(int, buildingString='') {
  console.log(int);
  let remainder = int % 62;
  let intCopy = int;
  let power = -1

  let powerArr = [];
  while (intCopy >= 1)  {
    console.log(`intCopy: ${intCopy}`)
    console.log(intCopy%62)
    intCopy /= 62
    let intCopyCopy = intCopy;
    
    power += 1;
    powerArr.push(power);
  }

  powerArr.reverse()

  console.log(power);
  console.log(powerArr);

  // if (int >= 62) {

  //   let intQuotient = Math.trunc(int / 62);
  //   // while (intQuotient > 61) {
  //   //   intQuotient = Math.trunc(intQuotient / 62);
  //   //   intQuotient + 0;
  //   //   console.log(intQuotient);
  //   // }

  //   let base62Val = intQuotient;
  //   console.log({base62Val})
  //   buildingString += symbolArr[base62Val];
  //   if (remainder > -1) {
  //     return convertToBase62(remainder, buildingString);
  //   }
  // } else if (int > 0 && int < 62) {
  //   buildingString += symbolArr[int];
  //   return buildingString;
  // } else if (int === 0) {
  //   return buildingString+= '0';
  // }
}

//3906
console.log(convertToBase62(3844))
// console.log(convertFromBase62('100'))

function convertFromBase62(string) {

    (typeof string === 'string') ? null : throwErr('argument should be string');

    const base = 62;
    let decimalValueOfCharCodeA = 65;
    let uppercaseCharCodeOffset = -55;
    let lowercaseCharCodeOffset = -61;
    let runningSum = 0;
    

    for (let i = string.length -1; i > -1; i--) {

      let possibleArabicNumeral = parseInt(string[i], 10);
      let currentCharCode = string[i].charCodeAt(0);
      let base10Value = (currentCharCode >= decimalValueOfCharCodeA && string[i].charCodeAt(0) <= decimalValueOfCharCodeA + 26) ? currentCharCode + uppercaseCharCodeOffset :
      (currentCharCode >= decimalValueOfCharCodeA + 26 + 6 && currentCharCode <= decimalValueOfCharCodeA + 26 + 6 + 26 ) ? currentCharCode + lowercaseCharCodeOffset : null;
        if (possibleArabicNumeral) {
            
            runningSum += possibleArabicNumeral * Math.pow(62, string.length - i - 1);
        } else if (base10Value != null) {

            runningSum += base10Value * Math.pow(62, string.length - i - 1);
        }

    }

    return runningSum;
}

// Utility functions

function throwErr(errMessage) {
    throw Error(errMessage)
}



// Making sure the two convertor functions transform 1 to 1 or whatever.

// for (let j = 0; j < 9999; j++) {
//   let base62Num = convertToBase62(j)
//   let backToBase10Num = convertFromBase62(base62Num);

//   console.log(`j: ${j}, base62Num: ${base62Num}, backToBase10Num: ${backToBase10Num}`);
  

//   (j === backToBase10Num) ? null : throwErr(`wtf ${j} != ${backToBase10Num}`)
//   console.log('success!')
// }



//Making sure generating base62 properly

// function convertorTest(symbolArr, funcToTest) {
//   symbolArr.forEach((element, index) => {
//     let output = funcToTest(element);
//     console.log(`${element} should == ${output}`)
//   })
// }


// console.log(convertFromBase62('A'))

// convertorTest(symbolArr, convertFromBase62)


