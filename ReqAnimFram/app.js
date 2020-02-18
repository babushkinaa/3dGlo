
const box1 = document.getElementById('box1');
console.dir(box1);
const start = document.querySelector('.start');
const stop = document.querySelector('.stop');
const reset = document.querySelector('.reset');
let rAf;

// box1.style.left
let box1Left = box1.offsetLeft + 2;
console.log('box1.offsetLeft: ', box1.offsetLeft);
console.log('box1Left: ', box1Left);
let box1Top = box1.offsetTop + 2;
console.log('box1.offsetTop: ', box1.offsetTop);
console.log('box1Top: ', box1Top);

function move1px(el) {
  let left = 0;
  return function() {
    if (document.documentElement.clientWidth - 150 < left) {
      left = 0;
    } else {
      left++;
    }
    el.style.left = left + 'px';
  }
}
const moveBox1 = move1px(box1);

function callback() {
  moveBox1();
  rAf = requestAnimationFrame(callback);
  start.removeEventListener('click',callback);
  start.addEventListener('click',stopCallback);
  start.textContent = 'остановить';
}
function stopCallback(){
    cancelAnimationFrame(rAf);
    start.removeEventListener('click',stopCallback);
    start.addEventListener('click',callback);
    start.textContent = 'Запустить';


};
// callback();

start.addEventListener('click',callback);
// stop.addEventListener('click',stopCallback);
reset.addEventListener('click',()=>{
    box1.style.left = box1Left + 'px';
    box1.style.top = box1Top + 'px';
    start.textContent = 'Начать';

});



