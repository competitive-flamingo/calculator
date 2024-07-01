const add = function (a, b) {
    return a + b;
}

const subtract = function (a, b) {
    return a - b;
}

const multiply = function (a, b) {
    return a * b;
}

const divide = function (a, b) {
    return a / b;
}

const calculator = {
    "+" : add,
    "-" : subtract,
    "*" : multiply,
    "/" : divide,
    operate : function(operator, firstOperand, secondOperand) {
        return this[operator](firstOperand, secondOperand);
    }
};

function populateDisplay(event) {
    const target = event.target;
    if(target.className === "digit") {
        const targetNumber = Number(target.textContent);
        const entryNumber = Number(entryField.textContent);
        entryField.textContent = entryNumber * 10 + targetNumber;
        entryFieldVal = Number(entryField.textContent);
        console.log(entryFieldVal);
    }
}

let firstOperand = null;
let secondOperand = null;
let operator = null;
let entryFieldVal = 0;



