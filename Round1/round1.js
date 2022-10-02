// to session 13
// Output | Strings | Numbers

// Task 1: print the folowed block of string in console
/*
Output:
<div id="parent">
    <p>hello world</p>
</div>
*/

// write your code here

console.log(`<div id="parent">
<p>hello world</p>
</div>`);

// ***********************************************************
// Task2: Write a JavaScript function to check whether an `input` is a string or not
/*
Test Data :
console.log(is_string('hello'));
output: true
console.log(is_string([1, 2, 4, 0]));
output: false
*/

// write your code here

let check = (input) => typeof input === "string";

console.log(check("Adham"));

// ***********************************************************
// Task3: Write a JavaScript function to check whether a string is blank or not.
/*
Test Data :
console.log(is_Blank(''));
output: true
console.log(is_Blank('abc'));
output: false
*/

// write your code here

let is_Blank = (input) => (input.length === 0 ? `is Blank` : `is not Blank`);

console.log(is_Blank(""));
console.log(is_Blank("abc"));

// ***********************************************************
//Task4: Write a JavaScript function to split a string and convert it into an array of words.
/*
Test Data :
console.log(string_to_array("Robin Singh"));
output: ["Robin", "Singh"]
*/

// write your code here

let string_to_array = (input) =>
  typeof input === "string" ? input.split(" ") : "Input is not a String";

console.log(string_to_array("Adham Hossam"));
console.log(string_to_array(123));
// ***********************************************************
//Task5: Write a JavaScript function to hide email addresses to protect from unauthorized user.
/*
Test Data :
console.log(protect_email("robin_singh@example.com"));
output: "robin...@example.com"
*/

// write your code here

function protectEmail(email) {
  email = email.split("@");
  userEmail = email[0].split("_");
  return `${userEmail[0]}...@${email[1]}`;
}

console.log(protectEmail("robin_singh@example.com"));
// ***********************************************************
// Task6: Write a JavaScript function to find smallest value and return it.
/*
Test Data:
console.log(smallest_value(5,4,8,14))
output: 4
*/

// write your code here
function theSmallest(...input) {
  return input.reduce((a, b) => (a < b ? a : b));
}
console.log(theSmallest(5, 4, 8, 14));
// ***********************************************************
// task7: you have 2 numbers 100,2.4
// use this values one time to get output 10000

// write your code here
let a = 100,
  b = 2.4;

console.log(a ** parseInt(b));
// ***********************************************************
// task8: Create a function that will convert from KiloByte to GigaByte
/*
console.log(convertToGigaByte(1_048_576))
*/

function toGigaByte(KiloByte) {
  return `${KiloByte * 10 ** -6} GigaByte`;
}

console.log(toGigaByte(1048576));
// ***********************************************************
// Task9: Write a JavaScript function to check whether a number is an odd number.
/*
Test Data :
console.log(is_odd(3));
output: true
console.log(is_odd(2));
output: false
*/

// write your code here
let isOdd = (num) =>
  num % 2 === 1 ? `${num} is an Odd Number` : `${num} is not an Odd Number`;
console.log(isOdd(3));
console.log(isOdd(2));
// ***********************************************************
// task10: Create a function that get an average of numbers
/*
console.log(getAverage(2,5,8))
output: 7.5
*/

function getAverage(...input) {
  let result = input.reduce((a, b) => a + b);
  return result / 2;
}
console.log(getAverage(2, 5, 8));
