let prevDiv = document.getElementById('prev');
let resultDiv = document.getElementById('result');
const numericButtonsArray = Array.from(document.getElementsByClassName('numeric'));
const operandButtonsArray = Array.from(document.getElementsByClassName('operand'));
const clearButton = document.getElementById('clear');
const equalsButton = document.getElementById('equals');
const convertButton = document.getElementById('convert');
let currentValue = '';
let previousValue, operation;



const addNumberToScreen = (e) => {
  /*Checking if there's already a decimal point in the current screen value so the user can input just one*/
  if(e.target.innerHTML === '.') {
    let splittedCurrentValue = currentValue.split('');
    if(splittedCurrentValue.includes('.')) return;
  }
  
  //Adds the numbers pressed to the current value
  currentValue += e.target.innerHTML;
  
  //This avoids that the user can input more numbers if the result is === Infinity
  if(resultDiv.innerHTML === 'Infinity') return;
  
  //Displays the currentValue on the screen
  resultDiv.innerHTML = currentValue;
};

const operationToDo = (e) => {
  //Clearing the resultDiv for the next input
  resultDiv.innerHTML = '';
  
  /*Checking if there's a previous value stored, if so, it calls the operate() function below (it
  also does the operation between both numbers and displays the result straight away on the
  screen on top together with the new operand selected), if there isn't a previous value stored,
  the number on the screen + the operand clicked will be set as the new previousValue, the value
  of the operation variable would be set to the button's clicked innerHTML and the currentValue
  set to an empty string (this way the next number input gets displayed in a clear screen)*/
  if(previousValue) {
    operate();
    prevDiv.innerHTML = resultDiv.innerHTML + ' ' + e.target.innerHTML;
    previousValue = prevDiv.innerHTML;
    currentValue = '';
    resultDiv.innerHTML = '';
  } else {
    if(currentValue === '') return;
    operation = e.target.innerHTML;
    previousValue = currentValue + ' ' + operation;
    currentValue = '';
    prevDiv.innerHTML = previousValue;
  } 
};

const operate = () => {
  /*This if avoids the program from breaking if the user presses an operand or the equals button
  many times without inputting new numbers*/
  if(!previousValue) return;
  
  //This part of the code would split the previousValue in a number and the operand chosen
  const splitPreviousValue = previousValue.split('');
  const operationChosen = splitPreviousValue[splitPreviousValue.length - 1];
  const numericPreviousValue = parseFloat(previousValue);
 
  //Operation 
  switch(operationChosen) {
      case '+':
        resultDiv.innerHTML = numericPreviousValue + Number(currentValue);
        break;
      case '-':
        resultDiv.innerHTML = numericPreviousValue - Number(currentValue);
        break;
      case 'x':
        resultDiv.innerHTML = numericPreviousValue * Number(currentValue);
        break;
      case '/':
        resultDiv.innerHTML = numericPreviousValue / Number(currentValue);
        break;
  }
  /*After the operation is done, this 'deletes' the previousValue stored and sets the
  currentValue to the result displayed on the calculator's screen*/
  prevDiv.innerHTML = prevDiv.innerHTML + ' ' + currentValue;
  previousValue = null;
  currentValue = resultDiv.innerHTML;
};

const convertNumbersToLetters = () => {
  /*This function creates an array of letters indexed at -1 position than the corresponding 
  number in the array to convert. It creates a new array with the corresponding letters 
  and then returns it.*/
  const arrayOfLetters = ['I', 'Z', 'R', 'A', 'S', 'G', 'T', 'B', 'P'];
  const splitCurrent = [...currentValue.toString().split('')];
  const arrayToReturn = [];

  splitCurrent.map(item => {
    if(item === '0') {
      arrayToReturn.push('O')
    } else {
    arrayToReturn.push(arrayOfLetters[Number(item) - 1]);
    }
  });
  prevDiv.innerHTML = arrayToReturn.join('');
};

const clearScreen = () => {
  operation = null;
  previousValue = '';
  currentValue = '';
  prevDiv.innerHTML = '';
  resultDiv.innerHTML = '';
};



numericButtonsArray.forEach(btn => {
  btn.addEventListener('click', addNumberToScreen);
});

operandButtonsArray.forEach(btn => {
  btn.addEventListener('click', operationToDo);
});

equalsButton.addEventListener('click', operate);

clearButton.addEventListener('click', clearScreen);

convertButton.addEventListener('click', () => {
  /*It acts as an equal buttons too and displays the result of the operation (is there's one to
  be done) in both numbers and letters*/
  operate();
  convertNumbersToLetters();
});


