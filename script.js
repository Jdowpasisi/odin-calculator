class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  clear() {
    this.currentOperand = '0';
    this.previousOperand = '';
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
    if (this.currentOperand === '') {
      this.currentOperand = '0';
    }
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return;
    if (this.currentOperand === '0' && number !== '.') {
      this.currentOperand = number.toString();
    } else {
      this.currentOperand = this.currentOperand.toString() + number.toString();
    }
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return;
    if (this.previousOperand !== '') {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    
    if (isNaN(prev)) return;
    if (isNaN(current)) return;
    if (!this.operation) return;

    switch (this.operation) {
      case '+':
        computation = prev + current;
        break;
      case '-':
        computation = prev - current;
        break;
      case '*':
        computation = prev * current;
        break;
      case '/':
        if (current === 0) {
          computation = "Error: Div by 0";
        } else {
          computation = prev / current;
        }
        break;
      default:
        return;
    }

    
    if (typeof computation === 'string') {
      this.currentOperand = computation;
    } else {
        
      this.currentOperand = Math.round(computation * 10000) / 10000;
    }
    
    this.operation = undefined;
    this.previousOperand = '';
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.currentOperand;
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = 
        `${this.previousOperand} ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText = '';
    }
  }
}

function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) { 
  if (b === 0) return "Error: Div by 0";
  return a / b; 
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-action="calculate"]');
const deleteButton = document.querySelector('[data-action="delete"]');
const allClearButton = document.querySelector('[data-action="clear"]');
const previousOperandTextElement = document.querySelector('.previous-operand');
const currentOperandTextElement = document.querySelector('.current-operand');

const calculator = new Calculator(
  previousOperandTextElement, 
  currentOperandTextElement
);

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener('click', () => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearButton.addEventListener('click', () => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener('click', () => {
  calculator.delete();
  calculator.updateDisplay();
});

document.addEventListener('keydown', (e) => {
  if (e.key >= 0 && e.key <= 9) {
    calculator.appendNumber(e.key);
    calculator.updateDisplay();
  } else if (e.key === '.') {
    calculator.appendNumber(e.key);
    calculator.updateDisplay();
  } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
    calculator.chooseOperation(e.key);
    calculator.updateDisplay();
  } else if (e.key === 'Enter' || e.key === '=') {
    calculator.compute();
    calculator.updateDisplay();
  } else if (e.key === 'Escape') {
    calculator.clear();
    calculator.updateDisplay();
  } else if (e.key === 'Backspace') {
    calculator.delete();
    calculator.updateDisplay();
  }
});