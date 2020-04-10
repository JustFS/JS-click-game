const canvas = document.getElementById('canvas');
const score = document.getElementById('score');

let count = 0;
let getFast = 6000;
let boolLoop = false;

function start() {
  count = 0;
  getFast = 6000;
  score.innerHTML = count;
  canvas.innerHTML = '';
  boolLoop ? '' : loop(); 
  boolLoop = true;
};

// SETUP RANDOM ELEMENT POPING
function loop() {
  let random = Math.round(Math.random() * getFast);
  getFast > 700 ? getFast = getFast * 0.90 : getFast;

  setTimeout(() => {
    cockroachPop();
    if (canvas.childElementCount > 50){
      canvas.innerHTML = '';
      canvas.innerHTML = 'Game over / score :' + count;

    } else {
      loop(); 
    } 
  }, random);

  console.log(getFast);
  console.log(canvas.childElementCount);
  console.log(count);
};

// CREATE RANDOM ELEMENT
function cockroachPop() {
  const cockroach = document.createElement('span');

  cockroach.classList.add('cockroach');
  cockroach.style.top = Math.random() * 500 + 'px';
  cockroach.style.left = Math.random() * 900 + 'px';

  canvas.appendChild(cockroach);
};

// REMOVE ELEMENT CLICKED
document.addEventListener("click", function(e){
  const targetElement = e.target || e.srcElement;

  if (targetElement.classList.contains('cockroach')) {
    targetElement.remove();
    count++;
    score.innerHTML = count;
  };
});