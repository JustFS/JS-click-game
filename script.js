const canvas = document.getElementById('canvas');
const score = document.getElementById('score');
const days = document.getElementById('days');

let count = 0;
let daysRemaining = 60;
let getFaster = 6000;
let loopPlay = false;

window.onload = function(){

function start() {
  count = 0;
  getFaster = 6000;
  canvas.innerHTML = '';
  score.innerHTML = count;
  days.innerHTML = 60;
  // make sure to not play loop several times
  loopPlay ? '' : loop(); 
  loopPlay = true;
  loopPlay ? daysLeft() : '';
};

function daysLeft() {
  if (loopPlay === true){
    setTimeout(() => {
      days.innerHTML = daysRemaining
    }, 1000);
    if (daysRemaining > 0){
    daysRemaining--;
    daysLeft();
    } else {
      canvas.innerHTML = 'You win !';
    }

  };
};


// setup random element poping
function loop() {
  let random = Math.round(Math.random() * getFaster);
  getFaster > 700 ? getFaster = (getFaster * 0.90) : '';

  setTimeout(() => {
    cockroachPop();
    if (canvas.childElementCount > 50){
      canvas.innerHTML = '';
      canvas.innerHTML = 'Game over / score :' + count;
      loopPlay = false;
    } else {
      loop(); 
    } 
  }, random);

  console.log(getFaster);
  console.log(canvas.childElementCount);
  console.log(count);
};

// create random element
function cockroachPop() {
  const cockroach = document.createElement('span');

  cockroach.classList.add('cockroach');
  cockroach.style.top = Math.random() * 500 + 'px';
  cockroach.style.left = Math.random() * 500 + 'px';
  cockroach.style.transform = 'scale('+ (Math.random() + 0.3) + ')';  

  canvas.appendChild(cockroach);
};

// remove element clicked
document.addEventListener("click", function(e){
  const targetElement = e.target || e.srcElement;

  if (targetElement.classList.contains('cockroach')) {
    targetElement.remove();
    count++;
    score.innerHTML = count;
  };
});
};