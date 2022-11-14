let Calculator = {
    firstOperand: '',
    secondOperand: '',
    operator: '',
    previousEqualityResult: '',
    result: function(a, b, operator){
        a = Number(this.firstOperand);
        b = Number(this.secondOperand);
        operator = this.operator;
        switch (operator) {
            case '+':
                return add(a, b)
                break;
            case '-':
                return subtract(a, b)
                break;
            case '/' :
                return divide(a, b)
                break;
            case '*':
                return multiply(a, b)
                break; 
            case '^':
                return power(a, b)
                break;
            case '%':
                return percentage(a)
                break;  
            case 'sqrt':
                return squareRoot(a)
                break; 
            case 'mod':
                return modulo(a,b)
                break; 
            case 'neg':
                return NegPosToggle(a)
                break; 
            default :
                return ''
        }
    },
      
}





const operationsButtons = document.querySelectorAll('.op');

operationsButtons.forEach(btn => {
    btn.addEventListener('click', ()=>{
        
        if (btn.id === 'equal') 
            handleEqualBtn(btn);
        else if (btn.classList.contains('one-operand'))
             handleOneOperandOperations(btn);
        else handleTwoOperandsOperations(btn)
        
        console.log(Calculator);
             
    })
});


const screenMain = document.getElementById('main-text');
const screenSecond = document.getElementById('history-text');


function updateScreens(main, secondary) {
    screenMain.innerText = main;
    screenSecond.innerText = secondary;
}


function handleEqualBtn() {
   if (Calculator.firstOperand !== '' && screenMain.innerText === ''){
        updateScreens(Calculator.firstOperand, '');
        // screenMain.innerText = Calculator.firstOperand;
        // screenSecond.innerText = '';
        Calculator.firstOperand = '';
        Calculator.previousEqualityResult = screenMain.innerText;

    } else if (screenMain.innerText == Calculator.previousEqualityResult) {
        Calculator.firstOperand = Calculator.previousEqualityResult;
        screenMain.innerText = Calculator.result();
        screenSecond.innerText = screenSecond.innerText.replace(screenSecond.innerText.split(' ')[0], `${Calculator.previousEqualityResult}`);
        Calculator.firstOperand = Calculator.previousEqualityResult;
        Calculator.previousEqualityResult = screenMain.innerText;

    } else if (Calculator.firstOperand !== '' && screenMain.innerText !== '') {
        Calculator.secondOperand = screenMain.innerText;
        screenMain.innerText = Calculator.result();
        screenSecond.innerText += ` ${Calculator.secondOperand}`
        Calculator.firstOperand = '';
        Calculator.previousEqualityResult = screenMain.innerText;
    } 
}

function handleTwoOperandsOperations(btn) {
    if (Calculator.firstOperand === '' ){
        Calculator.firstOperand = screenMain.innerText;
        Calculator.operator = btn.value;
        screenSecond.innerText = `${Calculator.firstOperand} ${btn.innerText}` ;
        screenMain.innerText = '';

    } else if (Calculator.firstOperand !== '') {
        if (screenMain.innerText === ''){
            Calculator.operator = btn.value;
            screenSecond.innerText = `${Calculator.firstOperand} ${btn.innerText}`;
        } else {
            Calculator.secondOperand = screenMain.innerText;
            screenMain.innerText = '';
            Calculator.operator = btn.value;
            screenSecond.innerText = ` ${Calculator.result()} ${btn.innerText}`
            Calculator.firstOperand = Calculator.result();   
        }
    }
}

function handleOneOperandOperations(btn) {
        Calculator.firstOperand = screenMain.innerText || Calculator.firstOperand; 
        Calculator.operator = btn.value;
        screenMain.innerText = Calculator.result();
        screenSecond.innerText = '';
        Calculator.firstOperand = ''; 
        
}





const numbersButtons = document.querySelectorAll('.number');
numbersButtons.forEach(btn => { 
    btn.addEventListener('click', ()=>{
        if (screenMain.innerText == "0" || screenMain.innerText === Calculator.previousEqualityResult  ) {screenMain.innerText = btn.id}
        else if (screenMain.innerText.length < 15) {screenMain.innerText += btn.id;}
    })
});


const decimalPoint = document.getElementById('decimal-dot');
decimalPoint.addEventListener('click', ()=>{
    if (!(screenMain.innerText.includes(decimalPoint.value)) && screenMain.innerText.length < 14) {
        screenMain.innerText += decimalPoint.value;
    }
});

const backSpace = document.getElementById('backspace');
backSpace.addEventListener('click', ()=>{
    screenMain.innerText = screenMain.innerText.slice(0,-1);
});

const clearAll = document.getElementById('all-clear');
clearAll.addEventListener('click', ()=>{
    screenMain.innerText = 0;
    screenSecond.innerText = '';
    Calculator.firstOperand = '';
})

const pi = document.getElementById('pi');
pi.addEventListener('click', ()=>{
    screenMain.innerText = pi.value;
})



const add = function(a, b) {
	return a+b ;
};

const subtract = function(a, b) {
	return a-b;
};

const divide = function(a, b) {
    return a/b;
};

const multiply = function(a, b) {
  return a*b;
};

const power = function(a, b) {
	return a**b;
};

const percentage = function(a) {
	return a/100;
};

const squareRoot = function(a) {
	return Math.sqrt(a);
};

const modulo = function(a, b) {
    return a%b;
}

const NegPosToggle = function(a) {
    return 0-a;
}


