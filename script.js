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

let calculator = {
    "+" : add,
    "-" : subtract,
    "*" : multiply,
    "/" : divide,
    firstOperand : {
        isDotUsed : false,
        value: "0",
    },
    secondOperand : {
        isDotUsed : false,
        value : null,
    },
    operator : null,
    operate : function(operator, firstOperand, secondOperand) {
        return this[operator](firstOperand, secondOperand).toString();
    }
};

const operationSpace = document.querySelector(".operation-space");
const typingSpace = document.querySelector(".typing-space");
const buttons = document.querySelector(".buttons");
let entryFieldVal = "0";
let isEqualPressed = false;
buttons.addEventListener("click", changeDisplay);

function changeDisplay(event) {
    const target = event.target;
    const targetVal = target.value;
    const operands = operationSpace.textContent.split(` ${calculator.operator} `);
    switch(target.className) {
        case "dig":
            if(isEqualPressed) clearAll();
            if(!calculator.operator) {
                if(isDigitLimitReached("firstOperand")) break;
                setOperandValue(targetVal, "firstOperand");
                entryFieldVal = calculator.firstOperand.value;
                operationSpace.textContent = entryFieldVal;
            }
            else {
                if(isDigitLimitReached("secondOperand")) break;
                setOperandValue(targetVal, "secondOperand");
                entryFieldVal = calculator.secondOperand.value;
                const slicedOperationSpace = operationSpace.textContent.split(` ${calculator.operator} `).slice(0, 1);
                slicedOperationSpace.push(entryFieldVal);
                operationSpace.textContent = slicedOperationSpace.join(` ${calculator.operator} `);
            }
            typingSpace.textContent = entryFieldVal;
            isEqualPressed = false;
            break;  
        case "op":
            if(targetVal === "=") {
                isEqualPressed = true;
                if(calculator.operator) {
                    calculator.secondOperand.value = operands[1] ? operands[1] : operands[0];
                    operationSpace.textContent = `${calculator.firstOperand.value} ${calculator.operator} ${calculator.secondOperand.value}`;
                    calculator.firstOperand.value = calculator.operate(calculator.operator, Number(calculator.firstOperand.value), Number(calculator.secondOperand.value));
                    formateOperand("firstOperand");
                    calculator.secondOperand.value = null;
                    entryFieldVal = calculator.firstOperand.value;
                    typingSpace.textContent = entryFieldVal;
                }
                else {
                    operationSpace.textContent = typingSpace.textContent = operands[0];
                }
            }
            else {
                isEqualPressed = false;
                if(operands[1]) {
                    calculator.firstOperand.value = calculator.operate(calculator.operator, Number(operands[0]), Number(operands[1]));
                    formateOperand("firstOperand");
                    calculator.secondOperand.value = null;
                    calculator.operator = targetVal;
                    operationSpace.textContent = `${calculator.firstOperand.value} ${calculator.operator} `;
                    entryFieldVal = calculator.firstOperand.value;
                    typingSpace.textContent = entryFieldVal;
                }
                else {
                    calculator.operator = targetVal;
                    operationSpace.textContent = `${operands[0]} ${calculator.operator} `;
                }
            }
            break;
        case "sys":
            if(targetVal === "clr") clearAll();
            else if(targetVal === "del") {
                if(isEqualPressed) {
                    operationSpace.textContent = entryFieldVal;
                    if(calculator.operator) calculator.operator = null;
                }
                else if(calculator.secondOperand.value) {
                    deleteDigit("secondOperand");
                    operationSpace.textContent = `${operands[0]} ${calculator.operator} ${calculator.secondOperand.value}`;
                    entryFieldVal = calculator.secondOperand.value;
                    typingSpace.textContent = entryFieldVal;
                }
                else {
                    deleteDigit("firstOperand");
                    entryFieldVal = calculator.firstOperand.value;
                    operationSpace.textContent = typingSpace.textContent = entryFieldVal;
                }
            }
            else {
                if(isEqualPressed) {
                    clearAll();
                    toggleSign("firstOperand");
                    operationSpace.textContent = calculator.firstOperand.value;
                    entryFieldVal = calculator.firstOperand.value;
                }
                else if(operands[1]) {
                    toggleSign("secondOperand");
                    operationSpace.textContent = `${operands[0]} ${calculator.operator} ${calculator.secondOperand.value}`;
                    entryFieldVal = calculator.secondOperand.value;
                }
                else {
                    toggleSign("firstOperand");
                    operationSpace.textContent = calculator.firstOperand.value + (calculator.operator ? ` ${calculator.operator} ` : "");
                    entryFieldVal = calculator.firstOperand.value;
                }
                typingSpace.textContent = entryFieldVal;
            }
            isEqualPressed = false;
            break;
            
    }
}

function setOperandValue(targetVal, operand) {
    if(!calculator[operand].value) calculator[operand].value = "0";
    if(targetVal === ".") {
        calculator[operand].value = !calculator[operand].isDotUsed ? calculator[operand].value + targetVal : calculator[operand].value;
        calculator[operand].isDotUsed = true;
    }
    else if(targetVal === "0") {
        calculator[operand].value = Number(calculator[operand].value) === 0 ? calculator[operand].value : calculator[operand].value + targetVal;
    }
    else calculator[operand].value = Number(calculator[operand].value) === 0 ? (calculator[operand].value[0] === "-" ? `-${targetVal}` : targetVal) : calculator[operand].value + targetVal;
}


function clearAll() {
    calculator.firstOperand = {
        isDotUsed: false,
        value: "0",
    }
    calculator.secondOperand = {
        isDotUsed: false,
        value: null,
    }
    calculator.operator = null;
    entryFieldVal = "0";
    isEqualPressed = false;
    typingSpace.textContent = operationSpace.textContent = entryFieldVal;
}

function deleteDigit(operand) {
    let valueLength = calculator[operand].value.length;
    calculator[operand].value = calculator[operand].value.slice(0, valueLength - 1);
    switch(calculator[operand].value) {
        case "":
        case "-":
            calculator[operand].value = "0";
            break;
    }
}

function toggleSign(operand) {
    const splitOperand = calculator[operand].value.split("");
    if(splitOperand[0] === "-") splitOperand.shift();
    else splitOperand.unshift("-");
    calculator[operand].value = splitOperand.join("");
}

function isDigitLimitReached(operand) {
    return calculator[operand].value && calculator[operand].value.length === 10;
}


function formateOperand(operand) {
    const operandValLength = calculator[operand].value.length;
    calculator[operand].value = operandValLength > 10 ? parseFloat(calculator[operand].value).toPrecision(7).toString() : calculator[operand].value;
}


