require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.urlencoded({ extended: true }));
const dns = require('node:dns');

// TODO: Handle edge cases in convertToBase62() involving no remainders. Most of the problems are coming from the one's place



// Basic Configuration
// const PORT = 8080;

// app.use(cors());

// app.use('/public', express.static(`${process.cwd()}/public`));

// app.get('/', function(req, res) {
//   res.sendFile(process.cwd() + '/views/index.html');
// });


// let i = 0;
// // Your first API endpoint
// app.post('/api/shorturl', function (req, res) {
    
//     let urlSansProtocol = '';

//     if (req.body.url.slice(0, 7) === 'http://') {
//         urlSansProtocol = req.body.url.slice(7);
//     } else if (req.body.url.slice(0, 8) === 'https://') {
//         urlSansProtocol = req.body.url.slice(8);
//     } else {
//         res.json({error: 'Invalid url'})
//         return;
//     }

//     let hostname = urlSansProtocol.slice(0, urlSansProtocol.indexOf('/'));
//     console.log(hostname);

//     dns.lookup(hostname, (err, address, family) => {
//         err ? console.log(err) && res.json({error: 'Invalid url'}) : console.log(address);

//         if (err) return;
//         res.json({ original_url: req.body.url, short_url: `${i}`});
        
//         let originalReq = req;
//         app.get(`/api/shorturl/${i}`, (req, res) => {
//             res.redirect(originalReq.body.url)
//         })
//         i++;
//     })



// });

// app.listen(PORT, function() {
//   console.log(`Listening on port ${PORT}`);
// });



let symbolArr = [];
for (let i = 0; i < 123; i++) {
  if (i < 10) symbolArr.push(`${i}`);
  if (i === 10) i = 64;
  if (i > 64 && i < 91) symbolArr.push(String.fromCharCode(i));
  if (i === 91) i = 97;
  if (i > 95 && i <= 122) symbolArr.push(String.fromCharCode(i));
}




function convertToBase62(int, placeValueArr=[]) {
  console.log({int});

  let intCopy = int;
  let power = -1
  let intCopyMultiplier = 1;

  // Handle case where no remainder
  // if (int === 0) {
  //   placeValueArr.push({base62CurrentPlaceValue: 0, base10CurrentPlaceValue: 0, powerOfPlace: 0});

  //   return convertToBase62(-1, placeValueArr);
  // }

  while (intCopy >= 1)  {

    intCopy /= 62
    
    if (intCopy < 62 && intCopy >= 1) {
      intCopyMultiplier = Math.trunc(intCopy);
    }
    
    power += 1;
    
  }

  


  if (power > -1) {
    let currentLargestValue = Math.pow(62, power) * intCopyMultiplier;

    let base62CurrentLargestValue = symbolArr[intCopyMultiplier];



    placeValueArr.push({base62CurrentPlaceValue: base62CurrentLargestValue, base10CurrentPlaceValue: currentLargestValue, powerOfPlace: power});

    console.log({int}, {currentLargestValue})
    let newInt = int - currentLargestValue;



    

    return convertToBase62(newInt, placeValueArr);
  } else {
    let finalString = '';

    // placeValueArr.push({base62CurrentPlaceValue: symbolArr[remainder], base10CurrentPlaceValue: remainder, powerOfPlace: 0});

    placeValueArr.forEach((element) => {
      finalString += element.base62CurrentPlaceValue;
    })

    console.log({placeValueArr})
    return finalString;
  }

}

//3906
console.log(convertToBase62(655));
console.log(convertFromBase62('100'))

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


