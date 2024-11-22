document.addEventListener('DOMContentLoaded', function () {
  const icons = document.querySelectorAll('#operator-icons span');
  const screen = document.getElementById('screen-io');
  let powerOn = false;
  let input = [];
  let operator = null;
  let firstVal = null;
  let resultDisplayed = false;

  document.getElementById('keypad').addEventListener('click', (event) => {
    const btn = event.target.closest('button.btn');
    if (!btn) return;
    const value = btn.dataset.value;

    btn.classList.add('press');
    setTimeout(() => btn.classList.remove('press'), 100);

    processBtn(value);
  });

  function processBtn(value) {
    if (!powerOn && value !== 'AC') return;
  
    switch (true) {
      case value === 'AC':
        togglePower();
        resetCalculator();
        break;
  
      case value === 'C':
        resetInput();
        resetOperator();
        updateScreen('0');
        break;
  
      case /\d/.test(value):
        handleDigit(value);
        break;
  
      case value === '.':
        handleDecimal();
        break;
  
      case '÷x-+'.includes(value):
        handleOperator(value);
        break;
  
      case value === '=':
        handleEquals();
        break;
    }
  }
  
  function togglePower() {
    powerOn = !powerOn;
    resetCalculator();
    powerOn ? updateScreen('0') : updateScreen('');
  }

  function resetCalculator() {
    input = [];
    operator = null;
    firstVal = null;
    resultDisplayed = false;
    clearOperatorIcons();
  }
  
  function resetInput() {
    input = [];
    resultDisplayed = false;
    firstVal = null;
    operator = null;
  }

  function resetOperator() {
    operator = null;
  }

  function updateScreen(content) {
    screen.innerHTML = content;
  }

  function clearOperatorIcons() {
    icons.forEach(icon => icon.classList.remove('visible'));
  }

  function handleDigit(value) {
    if (resultDisplayed) {
      resetCalculator(); // Start fresh after a result
    }
    input.push(value);
    updateScreen(input.join(''));
  }

  function handleDecimal() {
    if (!input.includes('.')) {
      input.push('.');
      updateScreen(input.join(''));
    }
  }

  function handleOperator(value) {
    // handle various states of input & firstVal:
    if (resultDisplayed) { // Use result as the first value for the next operation
      firstVal = parseFloat(screen.innerHTML);
      resultDisplayed = false;
    } else if (!firstVal && input.length > 0) { // Set the first value from input if not already set
      firstVal = parseFloat(input.join(''));
    } else if (firstVal && input.length > 0) { // Perform calculation if first value and operator exist
      firstVal = calculate(firstVal, parseFloat(input.join('')), operator);
      updateScreen(firstVal);
    } else if (!firstVal) { // If no input and no first value, assume a new calculation
      return;
    }
  
    operator = value;
    input = [];
    toggleOperatorIcon(value);
  }

  function toggleOperatorIcon(value) {
    clearOperatorIcons();
    const icon = document.getElementById(value);
    if (icon) icon.classList.add('visible');
  }

  function handleEquals() {
    if (!firstVal || !operator || input.length === 0) return;
  
    const secondVal = parseFloat(input.join(''));
    const result = calculate(firstVal, secondVal, operator);
  
    updateScreen(result);
    firstVal = result; // Use result as the new first value
    operator = null;
    input = [];
    resultDisplayed = true;
    clearOperatorIcons();
  }
  
  function calculate(first, second, operator) {
    switch (operator) {
      case '+': return first + second;
      case '-': return first - second;
      case '÷': return second === 0 ? 'Error' : first / second;
      case 'x': return first * second;
      default: return 'Error';
    }
  }
});