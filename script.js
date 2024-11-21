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
      if(event.target.dataset.value === 'AC') { togglePower() };
      if(!Object.is(parseInt(btnValue), NaN)) { populateScreen(btnValue) };
      
    });
    
    btn.addEventListener('mouseup', function(event) {
      setTimeout(() => btn.classList.remove('press'), 100);
    });
    
    btn.addEventListener('mouseleave', function(event) {
      btn.classList.remove('press');
    });
  });
  
  
  function togglePower() {
    powerOn = !powerOn;

    if(powerOn) { 
      screen.innerHTML = '0';
    } else {
      screen.innerHTML = '';
    }
  };
  
  function populateScreen(value) {
    screen.innerHTML += value;
  };




});