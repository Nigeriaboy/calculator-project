function add (a, b) {
    return toTenDecimalPlaces(a + b);    
}

function subtract (a, b) {
    return toTenDecimalPlaces(a - b);    
}

function multiply (a, b) {
    return toTenDecimalPlaces(a * b);    
}

function divide (numerator, denominator) {
    if (denominator === 0) {
        return "Cannot divide by zero";
    }
    return toTenDecimalPlaces(numerator / denominator);
}

function isNumber(value){
    let num = Number(value); // convert value to a number
    return !isNaN(num); // check if the value is a valid number
}

function toTenDecimalPlaces(value) {
    return Number(value.toFixed(10)); // return the value rounded to 10 decimal places
}

// this function handles the operation/calculation based on the operator passed
function operate (operator, a, b) {
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case 'x':
            return multiply(a, b);
        case '/':
            return divide(a, b);
    }
}

function clear(){
    firstOperand = '';
    secondOperand = '';
    operator = undefined;
    result = '';
    expressionDisplay.textContent = '';
    resultDisplay.textContent = '';
}

// Check if their is dot already in the value of the argument variable
function checkDot(value) {
    return value.includes('.');
}

const  expressionDisplay = document.querySelector('#expression-display');
const  resultDisplay = document.querySelector('#result-display');
const backspaceBtn = document.querySelector('#backspace-btn');
const btnSection = document.querySelectorAll('#btn-section button');

const operatorsArray = ['+', '-', 'x', '/'];

expressionDisplay.textContent = '';
resultDisplay.textContent = '';

let firstOperand = '';
let secondOperand = '';
let operator = undefined;
let result = '';

// This section handles each button click event
btnSection.forEach((button) => {
    button.addEventListener('click', () => {
        const buttonText = button.textContent;

        // check if the button clicked is a dot
        if (buttonText === '.'){
            if (firstOperand === ''){
                firstOperand = '0.';
                expressionDisplay.textContent += firstOperand;
            }
            else if (secondOperand === '' && operator !== undefined){
                secondOperand = '0.';
                expressionDisplay.textContent += secondOperand;
            }

            else if (firstOperand && !secondOperand){
                // Checks if first operands includes dot
                if (!checkDot(firstOperand)){
                    firstOperand += '.';
                    expressionDisplay.textContent += '.';
                }

            }
            else if (secondOperand){
                // Checks if second operands includes dot
                if (!checkDot(secondOperand)){
                    secondOperand += '.';
                    expressionDisplay.textContent += '.';
                }
                
            }
        } 

        
        else if (isNumber(buttonText) && operator === undefined){
            firstOperand += buttonText;
            expressionDisplay.textContent += buttonText;
        }
        else if ((firstOperand !== '' && operator !== undefined) && isNumber(buttonText)){
            secondOperand += buttonText;
            expressionDisplay.textContent += buttonText;
            // display the direct result after the second operand is entered
            result = operate(operator, Number(firstOperand), Number(secondOperand));
            resultDisplay.textContent = result;
        }
        else if (operatorsArray.includes(buttonText) && (firstOperand !== '' && secondOperand === '')) {
            if (operator !== undefined) {
                expressionDisplay.textContent = expressionDisplay.textContent.slice(0, -2); // remove the previous operator if present
            }
            operator = buttonText;
            expressionDisplay.textContent += ` ${operator} `;
        }
        else if (buttonText === '=' && firstOperand !== '' && secondOperand !== '' && operator !== undefined) {
            // reset the operands and operator for the next calculation
            firstOperand = result; // store the result as the first operand for further calculations
            secondOperand = '';
            operator = undefined;
            expressionDisplay.textContent = `${firstOperand}`;
        }
        else if (buttonText === 'C'){
            clear();
        }

    })
})

// This section handles the backspace button click event
backspaceBtn.addEventListener('click', () => {
        expressionDisplay.textContent = (expressionDisplay.textContent).slice(0,-1);

        if (secondOperand){
            secondOperand = secondOperand.slice(0, -1);
            // if the second Operand is empty the result Display should be blank
            if (secondOperand === ''){
                resultDisplay.textContent = ''; 
            }
            else{
                result = operate(operator, Number(firstOperand), Number(secondOperand));
                resultDisplay.textContent = result;
            }

        }
        else if (!secondOperand && operator !== undefined){
            expressionDisplay.textContent = (expressionDisplay.textContent).slice(0,-2); // Removes the extra space before the operator
            operator = undefined;
            resultDisplay.textContent = '';
        }
        else{
            firstOperand = firstOperand.slice(0, -1);
        }

    }
)

