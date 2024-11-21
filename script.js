document.addEventListener('DOMContentLoaded', function() {

  let btns = document.querySelectorAll('button.btn');

  btns.forEach((btn) => {
    btn.addEventListener('mousedown', function(event) {
      btn.classList.add('press'); // Add the press class when the button is clicked
    });

    btn.addEventListener('mouseup', function(event) {
      setTimeout(() => btn.classList.remove('press'), 100); // Remove the press class after 100ms
    });

    btn.addEventListener('mouseleave', function(event) {
      btn.classList.remove('press'); // Remove the press class if the cursor leaves the button
    });
  });

});