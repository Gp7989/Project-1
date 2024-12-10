const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';
let previousInput = '';
let operator = '';

function updateDisplay(value) {
  display.textContent = value || '0';
}

function handleNumber(num) {
  currentInput += num;
  updateDisplay(currentInput);
}

function handleOperator(op) {
  if (currentInput === '' && previousInput === '') return;
  if (currentInput !== '') {
    if (previousInput !== '') {
      calculate();
    }
    operator = op;
    previousInput = currentInput;
    currentInput = '';
  }
}

function calculate() {
  const prev = parseFloat(previousInput);
  const curr = parseFloat(currentInput);

  if (isNaN(prev) || isNaN(curr)) return;

  let result;
  switch (operator) {
    case '+':
      result = prev + curr;
      break;
    case '-':
      result = prev - curr;
      break;
    case '*':
      result = prev * curr;
      break;
    case '/':
      result = prev / curr;
      break;
    default:
      return;
  }

  currentInput = result.toString();
  operator = '';
  previousInput = '';
  updateDisplay(currentInput);
}

function handleDelete() {
  currentInput = currentInput.slice(0, -1);
  updateDisplay(currentInput);
}

function handleClear() {
  currentInput = '';
  previousInput = '';
  operator = '';
  updateDisplay('0');
}

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const action = button.getAttribute('data-action');

    if (action === 'number') {
      handleNumber(button.textContent);
    } else if (action === 'operator') {
      handleOperator(button.textContent);
    } else if (action === 'equals') {
      calculate();
    } else if (action === 'delete') {
      handleDelete();
    } else if (action === 'clear') {
      handleClear();
    }
  });
});
