// Assignment code here

// Declare an object to save the length and which type of characters should be included that selected by the user 
var passwordType = {
    length: '',
    isIncludeLowerCharacters:'',
    isIncludeUpperCharacters:'',
    isIncludeNumber:'',
    isIncludeSpecial: ''
}
// Declare an empty object to save the number of each type of character
let passwordValidation = {};
// Declare an empty string for rendering the final password
var render = '';
// Declare an array for pick up the characters type randomly
var randomType = [];


// Password creating start! Ask user input the password length
function generatePassword() {
    let passLength = parseInt(prompt("Enter you length you want for the password (at least 8 characters, no more than 128 characters)"));

    // ask the user inputs the length again if it doesn't meet the standard
    if (typeof (passLength) === 'number' && 7 < passLength && passLength < 129) {
        passwordType.length = passLength;
        characterType();
        // return a value for "passwordText" rendering
        return render;
    } else {
        alert("The password has to be at least 8 characters, no more than 128 characters!")
        return generatePassword();
    }
}

// Ask which type of characters the user wants to include
function characterType() {
    let lower = confirm("Do you want to include lower characters?");
    let upper = confirm("Do you want to include upper characters?");
    let num = confirm("Do you want to include numbers?");
    let special = confirm("Do you want to include special characters?");
    // saved the results to passwordType object
    passwordType.isIncludeLowerCharacters = lower;
    passwordType.isIncludeUpperCharacters = upper;
    passwordType.isIncludeNumber = num;
    passwordType.isIncludeSpecial = special;
    // update the randomType array & passwordValidation object
    if (passwordType.isIncludeLowerCharacters) {
        randomType.push('lower');
        passwordValidation.lower = 0;
    }
    if (passwordType.isIncludeUpperCharacters) {
        randomType.push('upper');
        passwordValidation.upper = 0;
    }
    if (passwordType.isIncludeNumber) {
        randomType.push('num');
        passwordValidation.num = 0;
    }
    if (passwordType.isIncludeSpecial) {
        randomType.push('special');
        passwordValidation.spec = 0;
    }
    //if the length of randomType is 0, ask the user to pick at least 1 type of characters 
    if(randomType.length === 0){
        alert("You must choose at least 1 characters type ")
        characterType();
    }else {
        generating();
    }
    
}

// Generating the password!
function generating() {
    // this is the length of randomType array
    let randomLength = randomType.length;
    // This is the password length that user inputted
    let length = passwordType.length;
    
    // Declare an empty string to save the generated password
    let pass = '';

    // run loop to create the password until it meets the standard
    // randomly pick a type of characters first(lower, upper, number or special characters)
    for (i = 0; i < length; i++) {
        let arrNum = Math.floor(Math.random() * randomLength);
        let pick = randomType[arrNum];
        
        // generating a specific type of single characters and add it into the empty string
        // generating a random number
        if (pick === 'num') {
            let randomNum = Math.floor(Math.random() * 10);
            passwordValidation.num++;
            pass += randomNum;
        }
        //  generating a random lower characters
        else if (pick === 'lower') {
            let randomLower = Math.floor(Math.random() * 25);
            let lowerCha = String.fromCharCode(97 + randomLower);
            passwordValidation.lower++;
            pass += lowerCha;
        }
        // generating a random upper characters
        else if (pick === 'upper') {
            let randomUpper = Math.floor(Math.random() * 25);
            let upperCha = String.fromCharCode(65 + randomUpper);
            passwordValidation.upper++;
            pass += upperCha;
        }
        // generating a random special characters
        else {
            let special = [" ", "!", "”", "#", "$", "%", "&", "’", "(", ")", "*", "+", ",", "-", ".", "/", ":", ";", "<", "=", ">", "?", "@", "[", "]", "^", "_", "`", "{", "|", "}", "~","\\"];
            let specialLength = special.length;
            let specNum = Math.floor(Math.random() * specialLength);
            let specialCha = special[specNum];
            passwordValidation.spec++;
            pass += specialCha;
        }
    }

    // validating the password to see if it meets the standard, if not, create another one
    // if passwordValidation includes 0, means it doesn't meet the standard
    let finalValidation = Object.values(passwordValidation).includes(0);

    // if the password meets the standard, pass the value to "render" and clear the original array & object
    if (finalValidation === false) {
        randomType = [];
        passwordValidation = {};
        render = pass;
    } else {
        generating(randomType);
    }
}

// ***-------Starter Code--------*** //
// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
    var password = generatePassword();
    var passwordText = document.querySelector("#password");
    passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);