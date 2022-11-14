let Calculator = {
    firstOperand: '',
    secondOperand: '',
    operator: '',
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
        
        if (btn.id === 'equal') handleEqualBtn(btn);
        else if (btn.classList.contains('one-operand')) handleOneOperandOperations(btn);
        else handleTwoOperandsOperations(btn)
        
        console.log(Calculator);
             
    })
});


function handleEqualBtn(btn) {
    if (Calculator.firstOperand === '') {
        
    } else if (Calculator.firstOperand !== '' && screenMain.innerText === ''){
        screenMain.innerText = Calculator.firstOperand;
        screenSecond.innerText = '';
        Calculator.firstOperand = '';
    } else if (Calculator.firstOperand !== '' && screenMain.innerText !== '') {
            Calculator.secondOperand = screenMain.innerText;
            screenMain.innerText = Calculator.result();
            screenSecond.innerText += ` ${Calculator.secondOperand}`
            Calculator.firstOperand = '';

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


const screenMain = document.getElementById('main-text');
const screenSecond = document.getElementById('history-text');


const numbersButtons = document.querySelectorAll('.number');
numbersButtons.forEach(btn => { 

    btn.addEventListener('click', ()=>{
        if (screenMain.innerText == "0" || screenMain.innerText == Calculator.result ) {screenMain.innerText = btn.id}
        else if (screenMain.innerText.length < 15) {screenMain.innerText += btn.id;}
    })
});


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


