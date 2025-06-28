function isNumber(value){
    if (value === ' '){
        return false;
    }
    else{
        let num = Number(value); // convert value to a number
        return !isNaN(num); // check if the value is a valid number
    }

}

function toTenDecimalPlaces(value) {
    return Number(value.toFixed(10)); // return the value rounded to 10 decimal places
}

// this function handles the operation/calculation based on the operator passed
function operate (expression) {
    let value = expression;

    value = value.replace(/x/g, '*').replace(/%/g, '/100'); // replace 'x' with '*' and '%' with '/100'
    return toTenDecimalPlaces(eval(value)); // evaluate the expression and return the result rounded to 10 decimal places
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
let len = expressionArray.length;

// This section handles each button click event
btnSection.forEach((button) => {
    button.addEventListener('click', () => {
        const buttonText = button.textContent;
        len = expressionArray.length;

        // Checks if the clicked button is an operator
        if (operatorsArray.includes(buttonText) && len !== 0){
            // Change the operator if the last element is an operator
            if (operatorsArray.includes(expressionArray[len - 2])){
                expressionArray = expressionArray.slice(0, -3);
                expressionArray.push(' ');
                expressionArray.push(buttonText);
                expressionArray.push(' ');
                expressionDisplay.textContent = expressionArray.join('');
            }

            // don't add division or multiplication sign when the last element is an opening bracket
            else if ((buttonText === '/' || buttonText === 'x') && expressionArray[len - 1] === '(') return ;

            else{
                expressionArray.push(' ');
                expressionArray.push(buttonText);
                expressionArray.push(' ');
                expressionDisplay.textContent = expressionArray.join('');
            }
        }

        else if (isNumber(buttonText)) {

            // Check if the last element is a %, so that a multiplication sign can precede the number
            if (expressionArray[len - 1] === '%'){
                expressionArray.push(' ')
                expressionArray.push('x');
                expressionArray.push(' ');
                expressionArray.push(buttonText);
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
            if (isNumber(expressionArray[len - 1])){
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
            expressionArray = String(result).split(''); // Convert the result to an array of characters
            result = '';
            expressionDisplay.textContent = expressionArray.join('');
            resultDisplay.textContent = result;
            
        }

        else if (buttonText === '.'){

            let getLastOperand = () => {
                let lastOperatorIndex = -1;

                for (let i = len - 1; i >= 0; i--){
                    if (operatorsArray.includes(expressionArray[i])){
                        lastOperatorIndex = i;
                        break;
                    }
                }

                return expressionArray.slice(lastOperatorIndex + 1).join('');
            };

            const lastOperand = getLastOperand();

            // Don't put dot if dot already exist in the lastOperand
            if (checkDot(lastOperand)){
                return ;
            }

            // No dot present -add a "0" before dot if needed
            if (len === 0 || operatorsArray.includes(expressionArray[len - 2])){
                expressionArray.push(0);
            }

            expressionArray.push('.');
            expressionDisplay.textContent = expressionArray.join('');
        }

        
        else if (buttonText === '( )'){
            // function to check how many open and close bracket are in the expression
            let openingBracket;
            let closingBracket;

            let numberOfEachBracket = () => {
                openingBracket = 0;
                closingBracket = 0;
                expressionArray.forEach(e => {
                    if ( e === '('){
                        openingBracket++;
                    }
                    else if (e === ')'){
                        closingBracket++;
                    }
                })
            }

            numberOfEachBracket();

            if (len !== 0 && (isNumber(expressionArray[len - 1]) || expressionArray[len - 1] === '%') && openingBracket > closingBracket){
                expressionArray.push(')');
            }
            else if (openingBracket > closingBracket && expressionArray[len - 1] === ')'){
                expressionArray.push(')')
            }
            else if ((len !== 0 && (expressionArray[len - 1] === ')' || isNumber(expressionArray[len - 1])) && (openingBracket === closingBracket || openingBracket > closingBracket)) || (openingBracket === closingBracket && expressionArray[len - 1] === '%')){
                expressionArray.push(' ')
                expressionArray.push('x');
                expressionArray.push(' ')
                expressionArray.push('(');

            }

            else{
                expressionArray.push('(');
            }

            expressionDisplay.textContent = expressionArray.join('');
            result = operate(expressionArray.join(''))
            resultDisplay.textContent = result;


        }

        else if (buttonText === '+/-'){
                // if expression array is empty
            if (expressionArray.length === 0){
                expressionArray.push('(')
                expressionArray.push(' ');
                expressionArray.push('-');
                expressionArray.push(' ');
                expressionDisplay.textContent = expressionArray.join('');
                return;
            }

            for (let i = len - 1; i >= 0; i--){
                // if the last element is a closing bracket, open another negative bracket
                if (expressionArray[i] === ')'){
                    expressionArray.push(' ');
                    expressionArray.push('x');
                    expressionArray.push(' ');
                    expressionArray.push('(');
                    expressionArray.push(' ');
                    expressionArray.push('-');
                    expressionArray.push(' ');
                    expressionDisplay.textContent = expressionArray.join('');
                    break;
                }

                else if (expressionArray[i] === '('){
                     expressionArray.push('(');
                    expressionArray.push(' ');
                    expressionArray.push('-');
                    expressionArray.push(' ');
                    expressionDisplay.textContent = expressionArray.join('');
                    break;
                }

                // if number is negative, change it to positive
                else if (expressionArray[i] === '-' && expressionArray[i - 2] === '('){
                    expressionArray.splice(i - 2, 3);
                    expressionDisplay.textContent = expressionArray.join('');
                    break;
                }

                else if (operatorsArray.includes(expressionArray[i]) && expressionArray[i - 2] !== '('){
                    expressionArray.splice(i + 3, 0,'(');
                    expressionArray.splice(i + 4, 0, ' ');
                    expressionArray.splice(i + 5, 0, '-');
                    expressionArray.splice(i + 6, 0, ' ');
                    expressionDisplay.textContent = expressionArray.join('');
                    break;
                }

                else if (operatorsArray.includes(expressionArray[i])){
                    expressionArray.push('(')
                    expressionArray.push(' ');
                    expressionArray.push('-');
                    expressionArray.push(' ');
                    expressionDisplay.textContent = expressionArray.join('');
                    break;
                }

                // if their is no operator in the expression, add it this way
                else if (i === 0){
                    expressionArray.unshift(' ')
                    expressionArray.unshift('-');
                    expressionArray.unshift(' ');
                    expressionArray.unshift('(');
                    expressionDisplay.textContent = expressionArray.join('');
                    break;
                }


            }
        }

    })
})

// This section handles the backspace button click event
backspaceBtn.addEventListener('click', () => {
        len = expressionArray.length;
        // Checks if the last element of the expressionArray is an empty space, if true then it's an operator that precedes it
        if (expressionArray[len - 1] === ' '){
            expressionArray = expressionArray.slice(0, -3); // Deletes the operator and the empty spaces around it
            expressionDisplay.textContent = expressionArray.join('');
            resultDisplay.textContent = '';
        }
        else{
            expressionArray = expressionArray.slice(0,-1);
            expressionDisplay.textContent = expressionArray.join('');
        }

        // If the expression array is empty or the last element is an operator, clear the result display
        if (len === 0 || operatorsArray.includes(expressionArray[len - 2])) {
            resultDisplay.textContent = '';
        } else {
            result = operate(expressionArray.join(''));
            resultDisplay.textContent = result;
        }

        console.log(`lenght = ${len}`)
    }
)