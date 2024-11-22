document.addEventListener('DOMContentLoaded', function() {

  const btns = document.querySelectorAll('button.btn');
  let screen = document.getElementById('screen-io');
  const acBtn = Array.from(btns).find(btn => btn.dataset.value === 'AC');
  let powerOn = false
  let input = [], operator = [];
  let firstVal, secondVal
  
  // For Each button click
  btns.forEach((btn) => {
    btn.addEventListener('mousedown', function(event) {
      let btnValue = event.target.dataset.value;
      btn.classList.add('press');
      processBtn(btnValue);
    });
    
    btn.addEventListener('mouseup', function(event) {
      setTimeout(() => btn.classList.remove('press'), 100);
    });
    
    btn.addEventListener('mouseleave', function(event) {
      btn.classList.remove('press');
    });
  });

  function processBtn(value) {
    if(value === 'AC') {
      togglePower();
      clearOperator()
    } else if (value === "C") {
      zeroScreen();
      clearOperator()
    } else if ('0123456789'.includes(value)) {
      if((firstVal && firstVal.length > 0) && (operator && operator.length > 0) && (input && input.length === 0)) { emptyScreenDigits() };
      addInput(value);
      populateScreen(value)
    } else if ('÷x-+'.includes(value)) {
      setOperator(value);
      setFirstVal();
      toggleOperatorIcon(value);
      console.log(value + ' is an operator')
      console.log(operator + ' is what operator is')
    } else if (value === '=') {
      setSecondVal();
      renderCalculation(calculate());
      console.log(value + ' was pressed, need to process()')
    };
  };

  function togglePower() {
    powerOn = !powerOn;

    powerOn ? zeroScreen() : emptyScreen()
  };

  function zeroScreen() {
    removeOperatorIcons();
    clearOperator();
    clearInput();
    screen.innerHTML = '0';
  }

  function emptyScreen() {
    removeOperatorIcons();
    clearOperator();
    clearInput();
    screen.innerHTML = '';
  }

  function emptyScreenDigits() {
    clearInput();
    screen.innerHTML = '';
  }

  function toggleOperatorIcon(value) {
    removeOperatorIcons();
    let icon = document.getElementById(value);
    icon.classList.toggle('visible');
  }
  
  function populateScreen(value) {
    screen = document.getElementById('screen-io');
    if(!powerOn) return;
    if(screen.textContent === '0') {
      screen.innerHTML = value;
    } else {
      screen.innerHTML += value;
    };
  };

  function renderCalculation(value) {
    screen.innerHTML = value;
  }

  function addInput(value) {
    input.push(value);
  }

  function clearInput() {
    input = [];
  }

  function setFirstVal() {
    firstVal = input;
    input = [];
  }

  function setSecondVal() {
    secondVal = input;
    input = [];
  }

  function removeOperatorIcons() {
    let icons = document.querySelectorAll('#operator-icons span');
    icons.forEach(icon => icon.classList.remove('visible'));
  }

  function setOperator(value) {
    operator = [value];
    console.log('setting operator - ' + operator[0]);
  };

  function clearOperator() {
    operator = [];
  }
  
  // ##################### Maths functions #############################
  function add(augend, addend) {
    let sum = +(augend) + +(addend);
    console.log('i added and got ;' + sum);
    return sum;
  };
  
  function subtract(minuend, subtrahend) {
    let difference = +(minuend) - +(subtrahend);
    return difference;
  };
  
  function divide(dividend, divisor) {
    let quotient = +(dividend) / +(divisor);
    return quotient;
  };
  
  function multiply(multiplicand, multiplier) {
    let product = +(multiplicand) * +(multiplier);
    return product;
  };

  function calculate() {
    
    firstVal = firstVal.reduce((accumulator, current) => accumulator + current);
    secondVal = secondVal.reduce((accumulator, current) => accumulator + current);
    
    console.log('firstVal = ' + firstVal);
    console.log('secondVal = ' + secondVal);
    console.log('operator is ' + operator);
    console.log('operator[0] is ' + operator[0]);
    
    switch (operator[0]) {
      case '+':
        return add(firstVal, secondVal);
      break;
    }
  };
  
});

// Deal with decimals