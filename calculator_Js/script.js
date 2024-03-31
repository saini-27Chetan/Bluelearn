let firstNum = '';
let secondNum = '';
let operator = '';
let result = '';

// Adding events on buttons
// Number pad
const numBtns = document.getElementsByClassName('num-btn');

for (let i = 0; i < numBtns.length; i++) {
    numBtns[i].addEventListener('click', () => {
        if (operator === '') {
            firstNum = numBtns[i].innerText;
            result += firstNum;
        } else {
            secondNum = numBtns[i].innerText;
            result += secondNum;
        }
        updateDisplay(result);
    });
}

// Operator 
const operatorBtns = document.getElementsByClassName('operator-btn');
for (let i = 0; i < operatorBtns.length; i++) {
    operatorBtns[i].addEventListener('click', () => {
        operator = operatorBtns[i].innerText;

        result += operator;

        updateDisplay(result);
    });
}

// Calculator Display
const display = document.getElementById('calculator-display');
const updateDisplay = (param) => {
    display.innerText = param;
}

// Clear button functionality
const clearBtn = document.getElementsByClassName('clear-btn')[0];
clearBtn.addEventListener('click', () => {
    result = '';
    updateDisplay('0');
})

// Equal button functionality
const equalBtn = document.getElementsByClassName('equal-btn')[0];
equalBtn.addEventListener('click', () => {
    result = applyDMAS(result);

    updateDisplay(result);
});

function applyDMAS(expression) {
    // Remove any spaces in the expression
    expression = expression.replace(/\s/g, '');

    // Regular expression to match numbers, operators, and parentheses
    var regex = /(\d+(\.\d+)?|\(|\)|\+|\-|\*|\/)/g;

    // Tokenize the expression
    var tokens = expression.match(regex);

    // Stack to hold operators and operands
    var operatorStack = [];
    var operandStack = [];

    // Helper function to perform arithmetic operation
    function performOperation() {
        var b = parseFloat(operandStack.pop());
        var a = parseFloat(operandStack.pop());
        var operator = operatorStack.pop();
        switch (operator) {
            case '+':
                operandStack.push(a + b);
                break;
            case '-':
                operandStack.push(a - b);
                break;
            case '*':
                operandStack.push(a * b);
                break;
            case '/':
                operandStack.push(a / b);
                break;
        }
    }

    // Loop through tokens and evaluate expression
    for (var i = 0; i < tokens.length; i++) {
        var token = tokens[i];
        if (token === '(') {
            operatorStack.push(token);
        } else if (token === ')') {
            while (operatorStack.length > 0 && operatorStack[operatorStack.length - 1] !== '(') {
                performOperation();
            }
            operatorStack.pop(); 
        } else if (token === '+' || token === '-') {
            while (operatorStack.length > 0 && (operatorStack[operatorStack.length - 1] === '+' || operatorStack[operatorStack.length - 1] === '-' || operatorStack[operatorStack.length - 1] === '*' || operatorStack[operatorStack.length - 1] === '/')) {
                performOperation();
            }
            operatorStack.push(token);
        } else if (token === '*' || token === '/') {
            while (operatorStack.length > 0 && (operatorStack[operatorStack.length - 1] === '*' || operatorStack[operatorStack.length - 1] === '/')) {
                performOperation();
            }
            operatorStack.push(token);
        } else { 
            operandStack.push(token);
        }
    }

    // Perform remaining operations
    while (operatorStack.length > 0) {
        performOperation();
    }
    
    return parseFloat(operandStack.pop()).toFixed(4);
}