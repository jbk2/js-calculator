document.addEventListener('DOMContentLoaded', function() {

  const btns = document.querySelectorAll('button.btn');
  let screen = document.getElementById('screen-io');
  const acBtn = Array.from(btns).find(btn => btn.dataset.value === 'AC');
  let powerOn = false
  
  
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
    } else if (value === "C") {
      zeroScreen();
    } else if ('0123456789'.includes(value)) {
      populateScreen(value)
    } else if ('÷x-+'.includes(value)) {
      toggleOperatorIcon(value);
    
      console.log(value + ' is an operator')
    };
  };

  function togglePower() {
    powerOn = !powerOn;

    powerOn ? zeroScreen() : emptyScreen()
  };

  function zeroScreen() {
    removeOperatorIcons();
    screen.innerHTML = '0';
  }

  function emptyScreen() {
    removeOperatorIcons();
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

  function removeOperatorIcons() {
    let icons = document.querySelectorAll('#operator-icons span');
    icons.forEach(icon => icon.classList.remove('visible'));
  }

  
});

// ########################################## global scope - for console testing #############################

function add(augend, addend) {
  let sum = +(augend) + +(addend);
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