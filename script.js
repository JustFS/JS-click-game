const canvas = document.getElementById('canvas');
const score = document.getElementById('score');
const days = document.getElementById('days');
const endScreen = document.getElementById('endScreen');

let loopPlay = false; 

function start() {

  let getFaster = 6000;
  let count = 0;
  let daysRemaining = 10;

  canvas.innerHTML = '';
  score.innerHTML = count;
  days.innerHTML = daysRemaining;

  // make sure to not play loop several times
  loopPlay ? getFaster = 6000 : loop(); 
  console.log('après formule => ' + getFaster);
  
  loopPlay = true;

  function loop() {
    let randomTimeout = Math.round(Math.random() * getFaster);
    getFaster > 700 ? getFaster = (getFaster * 0.90) : '';
  
    setTimeout(() => {
      if (daysRemaining === 0){
        youWin();
      } else if (canvas.childElementCount < 20){
        virusPop();
        loop();
      } else {
        gameOver();
      }
    }, randomTimeout);  
    console.log(getFaster);

    
  };

canvas.addEventListener('click', () => {
  daysRemaining--;
  days.innerHTML = daysRemaining;
});

const gameOver = () => {
  endScreen.innerHTML = `<div class="gameOver">Game over <br/>score : ${count} </div>`;
  endScreen.style.visibility = 'visible';
  endScreen.style.opacity = '1';
  loopPlay = false;
};

const youWin = () => {
  const accuracy = Math.round(count / 10 * 100);
  endScreen.innerHTML = `<div class="youWin">Well done ! You overcome this mother fucker ! <br/>Accuarcy: ${accuracy} %</div>`;
  endScreen.style.visibility = 'visible';
  endScreen.style.opacity = '1';
  loopPlay = false; 
}

// create random element
function virusPop() {
  const virus = new Image();

  virus.src = "./media/basic-pics/pngwave.png"

  virus.classList.add('virus');
  virus.style.top = Math.random() * 500 + 'px';
  virus.style.left = Math.random() * 500 + 'px';

  let x, y;
  x = y = (Math.random() * 45) + 30;
  virus.style.setProperty('--x', `${ x }px`);
  virus.style.setProperty('--y', `${ y }px`);

  let plusMinus = Math.random() < 0.5 ? -1 : 1;
  let trX = Math.random() * 500 * plusMinus;
  let trY = Math.random() * 500 * plusMinus;
  virus.style.setProperty('--trX', `${ trX }%`);
  virus.style.setProperty('--trY', `${ trY }%`);

  canvas.appendChild(virus);
};

  // remove element clicked
  document.addEventListener("click", function(e){
    const targetElement = e.target || e.srcElement;

    if (targetElement.classList.contains('virus')) {
      targetElement.remove();
      count++;
      score.innerHTML = count;
    };
  });
};

endScreen.addEventListener('click', () => {
  start();
  endScreen.style.visibility = 'hidden';
});