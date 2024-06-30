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

let firstOperand;
let secondOperand;
let operator;

