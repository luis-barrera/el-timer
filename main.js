import './style.css';
import timerHTML from './timer.html?raw';

document.querySelector('#app').innerHTML = timerHTML;

document.querySelector('#btn-init').addEventListener('click', initWork);
document.querySelector('#btn-stop').addEventListener('click', initRelax);

var timerInterval;
var workingTimer = document.querySelector('#working #timer');
var relaxingTimer = document.querySelector('#relaxing #timer');
var totalTimer = document.querySelector('#total #timer')

var workTime = 0;
var relaxTime = 0;
var totalTime = 0;

function initWork(){
  clearInterval(timerInterval);

  timerInterval = setInterval(() => {
    workTime++;

    let secs = workTime % 60;
    let mins = (~~(workTime / 60)) % 60;
    let hrs = ~~(workTime / 3600);

    secs = secs < 10 ? '0' + secs : secs;
    mins = mins < 10 ? '0' + mins : mins;
    hrs = hrs < 10 ? '0' + hrs : hrs;

    workingTimer.innerHTML = hrs + ':' + mins + ':' + secs;

    totalTime++;

    let total_secs = totalTime % 60;
    let total_mins = (~~(totalTime / 60)) % 60;
    let total_hrs = ~~(totalTime / 3600);

    total_secs = total_secs < 10 ? '0' + total_secs : total_secs;
    total_mins = total_mins < 10 ? '0' + total_mins : total_mins;
    total_hrs = total_hrs < 10 ? '0' + total_hrs : total_hrs;

    totalTimer.innerHTML = total_hrs + ':' + total_mins + ':' + total_secs;
  }, 1000);
}

function initRelax(){
  clearInterval(timerInterval);
  workTime = 0;
  workingTimer.innerHTML = "00:00:00";

  // Calcular tiempo de descanso
  // t < 1 min
  if (workTime < 60) {
    // d = 0 min
    relaxTime = 0;
    return;
  // t < 5 min
  } else if (workTime < 300) {
    // d = 1 min
    relaxTime = 60;
  // t < 60 min
  } else if (workTime < 3600) {
    // d = (seconds / 5)
    relaxTime = ~~(workTime / 5);
  // t > 60 min
  } else {
    // d = (seconds / 4)
    relaxTime = ~~(workTime / 4);
  }

  timerInterval = setInterval(() => {
    let secs = relaxTime % 60;
    secs = secs < 10 ? '0' + secs : secs;
    let mins = (~~(relaxTime / 60)) % 60;
    mins = mins < 10 ? '0' + mins : mins;
    let hrs = ~~(relaxTime / 3600);
    hrs = hrs < 10 ? '0' + hrs : hrs;

    relaxingTimer.innerHTML = hrs + ':' + mins + ':' + secs;
    relaxTime--;

    if (relaxTime <= 0){return}
  }, 1000);
}