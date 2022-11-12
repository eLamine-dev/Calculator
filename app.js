function operate(a, b, operator){
    
    switch (operator) {
        case '+':
            add(a, b)
            break;
        case '-':
            subtract(a, b)
            break;
        case '/':
            divide(a, b)
            break;
        case '*':
            multiply(a, b)
            break; 
        case '^':
            power(a, b)
            break;
        case '%':
            percentage(a)
            break;  
        case 'sqrt':
            squareRoot(a)
            break;   
    }
}

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

