// TODO: Poner sonidos a los 25 y al terminar el descanso
// TODO: Agregar comentarios
import timerHTML from './timer.html?raw';
import './style.css';

document.querySelector('#app').innerHTML = timerHTML;

document.querySelector('#btn-init').addEventListener('click', initWork);
document.querySelector('#btn-stop').addEventListener('click', initRelax);

var timerInterval;

var main_section = document.getElementById('main');
var total_section = document.getElementById('total');

var element_timer = document.querySelector('#main #timer');
var total_timer = document.querySelector('#total #timer');

var nothing_tag = document.getElementById('nothing-tag');
var working_tag = document.getElementById('working-tag');
var relaxing_tag = document.getElementById('relaxing-tag');

var btn_init = document.getElementById('btn-init');
var btn_stop = document.getElementById('btn-stop');

var working_legend = document.getElementById('working-legend');
var relaxing_legend = document.getElementById('relaxing-legend');

var work_time = 0;
var relax_time = 0;
var total_time = 0;

function initWork(){
  clearInterval(timerInterval);

  nothing_tag.style.display = 'none';
  relaxing_tag.style.display = 'none';
  working_tag.style.display = 'block';

  btn_init.style.display = 'none';
  btn_stop.style.display = 'block';

  main_section.style.visibility = 'visible';
  main_section.style.opacity = '1';
  main_section.style.height = '40%';

  relaxing_legend.style.display = 'none';
  working_legend.style.display = 'block';

  main_section.style.setProperty('--acent-color', 'var(--working-color)');

  total_section.style.visibility = 'visible';
  total_section.style.opacity = '1';
  total_section.style.height = '100%';

  timerInterval = setInterval(() => {
    work_time++;

    let secs = work_time % 60;
    let mins = (~~(work_time / 60)) % 60;
    let hrs = ~~(work_time / 3600);

    secs = secs < 10 ? '0' + secs : secs;
    mins = mins < 10 ? '0' + mins : mins;
    hrs = hrs < 10 ? '0' + hrs : hrs;

    element_timer.innerHTML = hrs + ':' + mins + ':' + secs;

    total_time++;

    let total_secs = total_time % 60;
    let total_mins = (~~(total_time / 60)) % 60;
    let total_hrs = ~~(total_time / 3600);

    total_secs = total_secs < 10 ? '0' + total_secs : total_secs;
    total_mins = total_mins < 10 ? '0' + total_mins : total_mins;
    total_hrs = total_hrs < 10 ? '0' + total_hrs : total_hrs;

    total_timer.innerHTML = total_hrs + ':' + total_mins + ':' + total_secs;
  }, 1000);
}

function initRelax(){
  clearInterval(timerInterval);

  working_tag.style.display = 'none';
  relaxing_tag.style.display = 'block';

  btn_stop.style.display = 'none';
  btn_init.style.display = 'block';

  relaxing_legend.style.display = 'block';
  working_legend.style.display = 'none';

  main_section.style.setProperty('--acent-color', 'var(--relaxing-color)');

  // Calcular tiempo de descanso
  // t < 1 min
  if (work_time < 60) {
    // d = 0 min
    relax_time += 0;
    relaxing_tag.style.display = 'none';
    nothing_tag.style.display = 'block';
    element_timer.innerHTML = "00:00:00";
    work_time = 0;
    return;
  // t < 5 min
  } else if (work_time < 300) {
    // d = 1 min
    relax_time += 60;
  // t < 60 min
  } else if (work_time < 3600) {
    // d = (seconds / 5)
    relax_time += ~~(work_time / 5);
  // t > 60 min
  } else {
    // d = (seconds / 4)
    relax_time += ~~(work_time / 4);
  }

  work_time = 0;

  timerInterval = setInterval(() => {
    let secs = relax_time % 60;
    let mins = (~~(relax_time / 60)) % 60;
    let hrs = ~~(relax_time / 3600);

    secs = secs < 10 ? '0' + secs : secs;
    mins = mins < 10 ? '0' + mins : mins;
    hrs = hrs < 10 ? '0' + hrs : hrs;

    element_timer.innerHTML = hrs + ':' + mins + ':' + secs;
    relax_time--;

    if (relax_time <= 0) return;
  }, 1000);
}

// DONE: TODO: Cambiar botones al iniciar o terminar el timer
// DONE: TODO: Cambia el contenido del timer al iniciar un descanso
// DONE: TODO: Cambiar el color del timer cuando está en descanso
// DONE: TODO: Mostrar el tiempo total
// DONE: TODO: mover los demás elementos a variables