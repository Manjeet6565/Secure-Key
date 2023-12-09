// all elemnt ko side me lana first me // all data ko fetch kar sakate hai iss trah se 
// coustom atribute ko ka use karke fetch kra sakte hai 
const inputSlider=document.querySelector("[data-lengthSlider]");
const lengthDisplay=document.querySelector("[data-lengthNumber]");
const PasswordDisplay=document.querySelector("[data-paswordDisplay]");
const copyBtn=document.querySelector("[data-copy]");
const copyMsg=document.querySelector("[data-CopyMsg]");
const uppercaseCheck=document.querySelector("#uppercase");
const lowercaseCheck=document.querySelector("#Lowercase");
const numbersCheck=document.querySelector("#numbers");
const symbolsCheck=document.querySelector("#symbols");
const indicator=document.querySelector("[date-indicator]");
const generateBtn=document.querySelector(".genrateButton");
const allCheckbox=document.querySelectorAll("input[type=checkbox]");
const symbols ='`@#$%^&*(-=_+):;?/[{}]';
 
let password="";
let passwordLength=15;
let checkCount=0;
//  call funtion
handleSlider();

// set strength circle color to gry

// set passord length 
function handleSlider() {
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;

}
// create a funtion to set indicator
function setIndicator(color) { 
    indicator.style.backgroundColor=color;
    // crete shadow

}

function getRndInteger(min, max) {
 return Math.floor(Math.random() * (max-min))+min;
/*  math .raondom se value 0 se 1 ke bich me aaye gi
or math.random() * (max-min) se multiply kar denge to value ab 0 se le kar max-min tak me aaye gi
math.floor issliye use kiye hai jo value decimal,point me aaye gi usko roundof kar derga*/
}
function genrateRandomNumber() {
    return getRndInteger(0,9);
}
 function genrateLowerCase() {
    return String.fromCharCode(getRndInteger(97,123));
    // ASSCI of lower case of a is 23 and z is 123
    // is code string issliye use kiye hai value aaye ga integer ke form aaye ga to issliye use kiye hai
 }
function genrateUpperCase() {
    return String.fromCharCode(getRndInteger(65,91));
    // ASSCI of upper case of a is 65 and z is 91
}

function genrateSymbols() {
  const random=getRndInteger(0,symbols.length);
  return symbols.charAt(randNUM);
}

function calcStrength() {
    let hasUpper= false;
    let hasLower=false;
    let hasNum=false;
    let haSymb=false
    if(uppercaseCheck.checkd) hasUpper=true;
    if(lowercaseCheck.checkd) hasLower=true;
    if(numbersCheck.checkd) hasNum=true;
    if(symbolsCheck.checkd) haSymb=true;
    
    if(hasUpper && hasLower && (hasNum || haSymb && passwordLength>=8)) {
        setIndicator('#0f0');
    }
    else if(
        (hasLower || hasUpper) && 
        (hasNum || haSymb) &&
        passwordLength>=6 
    ) {
        setIndicator('#0f0');
    }
    
}

// writetext wala fuction async hai issliye use kiye hai

async function copyContent() {
    try { 
        // error handling  // chances of error are coming then try bolck and catch block

        // clipboard pe click karna hai to navigator method ka use karnege 
   await navigator.clipboard.writeText(PasswordDisplay.value);
//   qwait only wrok on async function  
//    jab clipboard pe click hoga to copied uge ga 
        copyMsg.innerText="copied";
     
}
//   agar error aa jaye to catch ka use karte hai
  catch(e){
    copyMsg.innerText="failed";
  }
  
//   to make copy wala span visible

  copyMsg.classList.add("active");


   setTimeout(() => {
    copyMsg.classList.remove("active");
   }, 2000);
}


function shufflePassword(array){
    for(let i=Array.length-i; i>0; i--){
        const j=Math.floor(Math.random ()*(i+1));
        const temp= array[i];
       array[i]=array[j];
        array[j]= temp;
    }
    let str="";
    array.forEach((el) => (str+=el));
    return str;

}

//  jab click karnege to atlist ek pe tick hon chaiye  par event listener 
// call all chekcbox 
function handleCheckBoxChange() {
    checkCount=0;
    allCheckbox.forEach( (checkbox) => {
        if(checkbox.checked) 
        checkCount++;
    }

    );
    // special condition
    //  password ke value change hua to kitna value hoga  uske liye ye condintion lagaya gaya hai
    if(passwordLength < checkCount) {
        passwordLength=checkCount;
        handleSlider();
    }
}

 allCheckbox.forEach((checkbox) => {
  checkbox.addEventListener('change', handleCheckBoxChange)
 } )

inputSlider.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    handleSlider();
    
  });
  
  copyBtn.addEventListener('click', () => {
    if (PasswordDisplay.value) {
        copyContent();
    }
});



//   genrate passowrd par event listner lagana hai
   generateBtn.addEventListener('click', () => {
    //   none of checkbox are selected
    if(checkCount <=0) 
     return;
    
    if(passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }
    //     lets start the find the new password
    // remove old paswod
    password="";

    // let's put the stuff mentioned by checkbox


 
  /*if(uppercaseCheck.checked) {
        password += genrateUpperCase();
    }

    if(lowercaseCheck.checked) {
        password += genrateLowerCase();

    }

    if(numbersCheck.checked) {
        password += genrateRandomNumber();
    }

    if(symbolsCheck.checked) {
        password += genrateSymbols();
    }
    issk ek or method hai  using array
 */
    let funArr = [];

    if (uppercaseCheck.checked)
        funArr.push(genrateUpperCase);
    
    if (lowercaseCheck.checked)
        funArr.push(genrateLowerCase);
    
    if (numbersCheck.checked)
        funArr.push(genrateRandomNumber);
    
    if (symbolsCheck.checked) // Corrected this line
        funArr.push(genrateSymbols);
    
    
    // Also, corrected the variable name in the shufflePassword function
    function shufflePassword(array) {
        for (let i = array.length - 1; i > 0; i--) {
            // find j out random using shufflepasword  (this first step )
            /* shuflle password use karne matalb jo password create kar rahe hai uska length pata tha issliye 
            na dekhe to use kiye hai */

            const j = Math.floor(Math.random() * (i + 1));
            // second step for swaping 
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        let str = "";
        array.forEach((el) => (str += el));
        return str;
    }
    

    

//    compulsory addition
  for(let i=0; i<funArr.length; i++) {
    password+=funArr[i]();
  }
//     remaning addition
 for(let i=0; i<passwordLength-funArr.length; i++) {
    let randIndex=getRndInteger(0, funArr.length);
    password+=funArr[randIndex]();
 }
//   suffle the pasword
 password= shufflePassword(Array.from(password));
//  show ui
 PasswordDisplay.value=password;
//   call the calculate strength
 calcStrength();
    
   });


  


     