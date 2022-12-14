const screenMain = document.getElementById("main-text");
const screenSecond = document.getElementById("history-text");
const operationsButtons = document.querySelectorAll(".op");
const numbersButtons = document.querySelectorAll(".number");
const decimalPoint = document.getElementById("decimal-dot");
const backSpace = document.getElementById("backspace");
const clearAll = document.getElementById("all-clear");
const pi = document.getElementById("pi");
const allButtons = document.querySelectorAll("button");

// Calculator object
let Calculator = {
   firstOperand: "",
   secondOperand: "",
   operator: "",
   previousResult: "",
   result: function (a, b, operator) {
      if (!a) {
         a = Number(this.firstOperand);
         b = Number(this.secondOperand);
         operator = this.operator;
      }

      let tempResult;
      switch (operator) {
         case "+":
            tempResult = add(a, b);
            break;
         case "-":
            tempResult = subtract(a, b);
            break;
         case "/":
            tempResult = divide(a, b);
            break;
         case "*":
            tempResult = multiply(a, b);
            break;
         case "^":
            tempResult = power(a, b);
            break;
         case "%":
            tempResult = percentage(a);
            break;
         case "sqrt":
            tempResult = squareRoot(a);
            break;
         case "mod":
            tempResult = modulo(a, b);
            break;
         case "neg":
            tempResult = NegPosToggle(a);
            break;
         default:
            tempResult = "";
      }

      if (isNaN(tempResult) || tempResult == Infinity) {
         clearAll.click();
         return "ERROR";
      } else return processLongNum(tempResult);
   },
};

// function to prevent numbers longer than display from overflowing
function processLongNum(num) {
   if (Math.trunc(num).toString().length > 15) {
      num = num.toExponential(4);
   } else if (
      Math.trunc(num).toString().length < 14 &&
      num.toString().length > 15
   ) {
      num = parseFloat(
         num.toFixed(15 - (Math.trunc(num).toString().length + 1))
      );
   }
   return num;
}

// operations buttons eventListener
operationsButtons.forEach((btn) => {
   btn.addEventListener("click", () => {
      console.table(Calculator);
      if (btn.id === "equal") handleEqualBtn(btn);
      else if (btn.classList.contains("one-operand"))
         handleOneOperandOperations(btn);
      else handleTwoOperandsOperations(btn);
   });
});

// function to handle equal button behavior
function handleEqualBtn() {
   if (
      Calculator.firstOperand === "" &&
      screenMain.innerText !== Calculator.previousResult
   ) {
      return;
   } else if (Calculator.firstOperand !== "" && screenMain.innerText === "") {
      screenMain.innerText = Number(Calculator.firstOperand);
      screenSecond.innerText = "";
      Calculator.firstOperand = "";
      Calculator.previousResult = screenMain.innerText;
   } else if (
      screenMain.innerText == Calculator.previousResult &&
      screenSecond.innerText !== ""
   ) {
      Calculator.firstOperand = Calculator.previousResult;
      screenMain.innerText = Calculator.result();
      screenSecond.innerText = screenSecond.innerText.replace(
         screenSecond.innerText.split(" ")[0],
         `${Calculator.previousResult}`
      );
      Calculator.firstOperand = "";
      Calculator.previousResult = screenMain.innerText;
   } else if (Calculator.firstOperand !== "" && screenMain.innerText !== "") {
      Calculator.secondOperand = Number(screenMain.innerText);
      screenMain.innerText = Calculator.result();
      screenSecond.innerText += ` ${Calculator.secondOperand}`;
      Calculator.firstOperand = "";
      Calculator.previousResult = screenMain.innerText;
   }
}

// function to handle operations that need two operands
function handleTwoOperandsOperations(btn) {
   if (
      Calculator.firstOperand === "" &&
      screenMain.innerText !== "" &&
      screenMain.innerText !== "ERROR"
   ) {
      Calculator.firstOperand = Number(screenMain.innerText);
      Calculator.operator = btn.value;
      screenSecond.innerText = `${Calculator.firstOperand} ${btn.innerText}`;
      screenMain.innerText = "";
   } else if (Calculator.firstOperand !== "") {
      if (screenMain.innerText === "") {
         Calculator.operator = btn.value;
         screenSecond.innerText = `${Calculator.firstOperand} ${btn.innerText}`;
      } else {
         Calculator.secondOperand = Number(screenMain.innerText);
         screenMain.innerText = "";
         screenSecond.innerText = ` ${Calculator.result()} ${btn.innerText}`;
         Calculator.firstOperand = Calculator.result();
         Calculator.operator = btn.value;
      }
   }
}

// function to handle operations that need only one operand
function handleOneOperandOperations(btn) {
   screenMain.innerText = Calculator.result(
      Number(screenMain.innerText),
      0,
      btn.value
   );
   Calculator.previousResult = screenMain.innerText;
}

// Numbers buttons events
numbersButtons.forEach((btn) => {
   btn.addEventListener("click", () => {
      if (
         screenMain.innerText == "0" ||
         screenMain.innerText === Calculator.previousResult
      ) {
         screenMain.innerText = btn.value;
      } else if (screenMain.innerText.length < 15) {
         screenMain.innerText += btn.value;
      }
   });
});

// decimal point button event
decimalPoint.addEventListener("click", () => {
   if (
      !screenMain.innerText.includes(decimalPoint.value) &&
      screenMain.innerText.length < 14 &&
      screenMain.innerText !== Calculator.previousResult
   ) {
      screenMain.innerText += decimalPoint.value;
   }
});

// backspace button event
backSpace.addEventListener("click", () => {
   if (screenMain.innerText.length < 2) screenMain.innerText = 0;
   else screenMain.innerText = screenMain.innerText.slice(0, -1);
});

// clearAll button event
clearAll.addEventListener("click", () => {
   screenMain.innerText = 0;
   screenSecond.innerText = "";
   Calculator.firstOperand = "";
   Calculator.secondOperand = "";
   Calculator.previousResult = "";
});

// Pi button event
pi.addEventListener("click", () => {
   screenMain.innerText = pi.value;
});

// keyboard support
window.addEventListener("keydown", (e) => {
   handleKeyPress(e);
});

function handleKeyPress(e) {
   allButtons.forEach((btn) => {
      if (e.key == btn.value) {
         e.preventDefault();
         btn.click();
      }
   });
   if (e.key === "p") {
      document.getElementById("pi").click();
   } else if (e.key == "m") {
      document.getElementById("modulo").click();
   } else if (e.key == "r") {
      document.getElementById("squareRt").click();
   }
}

// operations
const add = function (a, b) {
   return a + b;
};

const subtract = function (a, b) {
   return a - b;
};

const divide = function (a, b) {
   return a / b;
};

const multiply = function (a, b) {
   return a * b;
};

const power = function (a, b) {
   return a ** b;
};

const percentage = function (a) {
   return a / 100;
};

const squareRoot = function (a) {
   return Math.sqrt(a);
};

const modulo = function (a, b) {
   return a % b;
};

const NegPosToggle = function (a) {
   return -a;
};
