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
const currentYear = document.querySelector(".current-year");
let entryFieldVal = "0";
let isEqualPressed = false;
currentYear.textContent = new Date().getFullYear();
buttons.addEventListener("click", changeDisplay);
buttons.addEventListener("mouseover", toggleBackgroundColor);
buttons.addEventListener("mouseout", toggleBackgroundColor);
document.addEventListener("keydown", controlCalculator);

function toggleBackgroundColor(event) {
    const target = event.target;
    const tagName = target.tagName;
    if(tagName === "BUTTON") {
        target.style.backgroundColor = target.style.backgroundColor === "" ? "transparent" : "";
    }
}

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
            if(targetVal === "Enter") {
                isEqualPressed = true;
                if(calculator.operator) {
                    calculator.secondOperand.value = operands[1] ? operands[1] : operands[0];
                    operationSpace.textContent = 
                    `${calculator.firstOperand.value} ${calculator.operator} ${calculator.secondOperand.value}`;
                    calculator.firstOperand.value = calculator.operate(calculator.operator, Number(calculator.firstOperand.value)
                    , Number(calculator.secondOperand.value));
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
                    calculator.firstOperand.value = calculator.operate(calculator.operator, Number(operands[0])
                    , Number(operands[1]));
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
            if(targetVal === "Delete") clearAll();
            else if(targetVal === "Backspace") {
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
                    operationSpace.textContent = 
                    calculator.firstOperand.value + (calculator.operator ? ` ${calculator.operator} ` : "");
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
        calculator[operand].value = 
        !calculator[operand].isDotUsed ? calculator[operand].value + targetVal : calculator[operand].value;
        calculator[operand].isDotUsed = true;
    }
    else if(targetVal === "0") {
            if((Number(calculator[operand].value) === 0 && calculator[operand].isDotUsed) 
                || (Number(calculator[operand].value) !== 0)) calculator[operand].value += targetVal;
    }
    else {
        if(calculator[operand].isDotUsed) calculator[operand].value += targetVal;
        else {
            if(Number(calculator[operand].value) === 0) {
                calculator[operand].value = calculator[operand].value.at(0) === '-' ? `-${targetVal}` : targetVal;
            }
            else {
                calculator[operand].value += targetVal;
            }
        }
    }
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
    if(calculator[operand].value.at(valueLength - 1) === ".") calculator[operand].isDotUsed = false;
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
    calculator[operand].value = 
    operandValLength > 10 ? parseFloat(calculator[operand].value).toPrecision(7).toString() : calculator[operand].value;
}

function controlCalculator(event) {
    const key = event.key;
    const mouseEvent = new MouseEvent("click", {bubbles: true, cancellable: true});
    if((key >= "0" && key <= "9")
    || key === "Enter"
    || key === "."
    || key === "+"
    || key === "-"
    || key === "*"
    || key === "/"
    || key === "p"
    || key === "Backspace"
    || key === "Delete") {
        const button = document.querySelector(`button[value="${key}"]`);
        button.dispatchEvent(mouseEvent);
    }
}