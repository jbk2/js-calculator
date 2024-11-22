document.addEventListener('DOMContentLoaded', function () {
  const btns = document.querySelectorAll('button.btn');
  const icons = document.querySelectorAll('#operator-icons span');
  const screen = document.getElementById('screen-io');

  let powerOn = false;
  let input = [];
  let operator = null;
  let firstVal = null;
  let resultDisplayed = false;

  // Add event listener to buttons
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
        updateScreen('0');
        break;

      case /\d/.test(value): // Numbers
        handleDigit(value);
        break;

      case value === '.': // Decimal point
        handleDecimal();
        break;

      case '÷x-+'.includes(value): // Operators
        handleOperator(value);
        break;

      case value === '=': // Equals
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
  }

  function updateScreen(content) {
    screen.innerHTML = content;
  }

  function clearOperatorIcons() {
    icons.forEach(icon => icon.classList.remove('visible'));
  }

  function handleDigit(value) {
    if (resultDisplayed) {
      // Start fresh after a result
      resetCalculator();
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
    if (resultDisplayed) {
      firstVal = parseFloat(screen.innerHTML);
      resultDisplayed = false;
    } else if (!firstVal) {
      firstVal = parseFloat(input.join(''));
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
    if (!firstVal || !operator) return;

    const secondVal = parseFloat(input.join(''));
    const result = calculate(firstVal, secondVal, operator);

    updateScreen(result);
    firstVal = result; // Set result as the new first value
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