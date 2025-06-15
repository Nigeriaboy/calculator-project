function isNumber(value){
    let num = Number(value); // convert value to a number
    return !isNaN(num); // check if the value is a valid number
}

function toTenDecimalPlaces(value) {
    return Number(value.toFixed(10)); // return the value rounded to 10 decimal places
}

// this function handles the operation/calculation based on the operator passed
function operate (expression) {
    let value = expression;

    value = value.replace(/x/g, '*').replace(/%/g, '/100'); // replace 'x' with '*' and '%' with '/100'
    return eval(value);
}

function clear(){
    expressionArray = [];
    result = '';
    expressionDisplay.textContent = '';
    resultDisplay.textContent = '';
}

// Check if their is dot already in the value of the argument variable
function checkDot(value) {
    return value.includes('.');
}

const expressionDisplay = document.querySelector('#expression-display');
const resultDisplay = document.querySelector('#result-display');
const backspaceBtn = document.querySelector('#backspace-btn');
const btnSection = document.querySelectorAll('#btn-section button');

const operatorsArray = ['+', '-', 'x', '/'];

expressionDisplay.textContent = '';
resultDisplay.textContent = '';


let result = '';
let expressionArray = [];

// This section handles each button click event
btnSection.forEach((button) => {
    button.addEventListener('click', () => {
        const buttonText = button.textContent;

        // Checks if the clicked button is an operator
        if (operatorsArray.includes(buttonText) && expressionArray.length !== 0){
            // Change the operator if the last element is an operator
            if (operatorsArray.includes(expressionArray[expressionArray.length - 2])){
                expressionArray = expressionArray.slice(0, -3);
                expressionArray.push(' ');
                expressionArray.push(buttonText);
                expressionArray.push(' ');
                expressionDisplay.textContent = expressionArray.join('');
            }

            else{
                expressionArray.push(' ');
                expressionArray.push(buttonText);
                expressionArray.push(' ');
                expressionDisplay.textContent = expressionArray.join('');
            }
        }

        else if (isNumber(buttonText)) {

            // Check if the last element is a %, so that a multiplication sign can precede the number
            if (expressionArray[expressionArray.length - 1] === '%'){
                expressionArray.push(` x ${buttonText}`);
                expressionDisplay.textContent = expressionArray.join('')
                result = operate(expressionArray.join(''));
                resultDisplay.textContent = result;
            }

            else{
                expressionArray.push(buttonText);
                expressionDisplay.textContent = expressionArray.join('')
                result = operate(expressionArray.join(''));
                resultDisplay.textContent = result;
            }
        }

        else if(buttonText === '%'){
            // Disallow inputting multiple % consecutively
            if (isNumber(expressionArray[expressionArray.length - 1])){
                expressionArray.push(buttonText);
                expressionDisplay.textContent = expressionArray.join('');
                result = operate(expressionArray.join(''));
                resultDisplay.textContent = result;
            }
        }

        else if (buttonText === 'C'){
            clear();
        }

        else if (buttonText === '='){
            expressionArray = [result];
            result = '';
            expressionDisplay.textContent = expressionArray.join('');
            resultDisplay.textContent = result;
            
        }

    })
})

// This section handles the backspace button click event
backspaceBtn.addEventListener('click', () => {
        // Checks if the last element of the expressionArray is an empty space, if true then it's an operator that precedes it
        if (expressionArray[expressionArray.length - 1] === ' '){
            expressionArray = expressionArray.slice(0, -3); // Deletes the operator and the empty spaces around it
            expressionDisplay.textContent = expressionArray.join('');
        }
        else{
            expressionArray = expressionArray.slice(0,-1);
            expressionDisplay.textContent = expressionArray.join('');
        }

        // If the expression array is empty or the last element is an operator, clear the result display
        if (expressionArray.length === 0 || operatorsArray.includes(expressionArray[expressionArray.length - 1])) {
            resultDisplay.textContent = '';
        } else {
            result = operate(expressionArray.join(''));
            resultDisplay.textContent = result;
        }
    }
)

