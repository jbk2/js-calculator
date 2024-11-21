document.addEventListener('DOMContentLoaded', function() {

  const btns = document.querySelectorAll('button.btn');
  const screen = document.getElementById('screen-io');
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
      console.log(value + ' is an operator')
    };
  };

  function togglePower() {
    powerOn = !powerOn;

    powerOn ? zeroScreen() : emptyScreen()
  };

  function zeroScreen() {
    screen.innerHTML = '0';
  }

  function emptyScreen() {
    screen.innerHTML = '';
  }
  
  function populateScreen(value) {
    screen.innerHTML += value;
  };




});