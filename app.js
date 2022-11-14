let Calculator = {
    firstOperand: '',
    secondOperand: '',
    operator: '',
    result: '',
    operate: function(a, b, operator){
        a = Number(this.firstOperand);
        b = Number(this.secondOperand);
        operator = this.operator;
        switch (operator) {
            case '+':
                this.result = add(a, b)
                break;
            case '-':
                this.result = subtract(a, b)
                break;
            case '/' :
                this.result = divide(a, b)
                break;
            case '*':
                this.result = multiply(a, b)
                break; 
            case '^':
                this.result = power(a, b)
                break;
            case '%':
                this.result = percentage(a)
                break;  
            case 'sqrt':
                this.result = squareRoot(a)
                break; 
            case 'mod':
                this.result = modulo(a,b)
                break; 
        }
    }
        
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
    if (Calculator.firstOperand === '' ) {

    } else if (Calculator.firstOperand !== '' && screenMain.innerText === ''){
        Calculator.result = Calculator.firstOperand;
        screenMain.innerText = Calculator.result;
        screenSecond.innerText = ``;
        Calculator.firstOperand = '';
    } else {
            Calculator.secondOperand = screenMain.innerText;
            Calculator.operate();
            screenMain.innerText = `${Calculator.result}`;
            Calculator.operator = '';
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
            screenSecond.innerText = `${Calculator.result || Calculator.firstOperand} ${btn.innerText}`;
        } else {
            Calculator.secondOperand = screenMain.innerText;
            Calculator.operate();
            screenMain.innerText = '';
            Calculator.operator = btn.value;
            screenSecond.innerText = ` ${Calculator.result} ${btn.innerText}`
            Calculator.firstOperand = Calculator.result;   
        }
    }
}

function handleOneOperandOperations(btn) {

        Calculator.firstOperand = screenMain.innerText || Calculator.result; 
        Calculator.operator = btn.value;
        Calculator.operate();
        screenMain.innerText = Calculator.result;
        screenSecond.innerText = '';
}


const screenMain = document.getElementById('main-text');
const screenSecond = document.getElementById('history-text');


const numbersButtons = document.querySelectorAll('.number');
numbersButtons.forEach(btn => { 

    btn.addEventListener('click', ()=>{
        if (screenMain.innerText == "0" || screenMain.innerText == Calculator.result ) {screenMain.innerText = btn.id}
        else {screenMain.innerText += btn.id;}
    })
});



// function operate(a, b, operator){
//     a = Number(a);
//     b = Number(b);
//     let result;
//     switch (operator) {
//         case '+':
//             result = add(a, b)
//             break;
//         case '-':
//             result = subtract(a, b)
//             break;
//         case '/' :
//             result = divide(a, b)
//             break;
//         case '*':
//             result = multiply(a, b)
//             break; 
//         case '^':
//             result = power(a, b)
//             break;
//         case '%':
//             result = percentage(a)
//             break;  
//         case 'sqrt':
//             result = squareRoot(a)
//             break; 
//         case 'mod':
//             result = modulo(a,b)
//             break;  
//     }
//     return result;
// }



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
	return Math. sqrt(a);
};

const modulo = function(a, b) {
    return a%b;
}


