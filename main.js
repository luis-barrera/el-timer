// Obtenemos el archivo timer.html como un string
import timerHTML from './timer.html?raw';
// Importamos los stilos de manera automática en el build
import './style.css';
// Audios
import workAudioURL from './assets/mixkit-classic-melodic-clock-strike-1058.mp3';
import relaxAudioURL from './assets/mixkit-racing-countdown-timer-1051.mp3';
import helpBtnURL from './assets/help.svg';

// Insertamos el archivo timer.html dentro del index.html
document.querySelector('#app').innerHTML = timerHTML;
document.querySelector('#help-btn').setAttribute('src', helpBtnURL);

// Agregamos eventos a los botones
document.querySelector('#btn-init').addEventListener('click', initWork);
document.querySelector('#btn-stop').addEventListener('click', initRelax);
document.querySelector('#close-help').addEventListener('click', closeHelp);
document.querySelector('#help-btn').addEventListener('click', showHelp);
// Atajos de teclado
document.querySelector('body').addEventListener('keypress', (event) => {
  // Leer la tecla presionada
  switch (event.key) {
    // Espacio, para iniciar/detener Timer
    case " ":
      if (work_time == 0) {
        initWork();
      } else {
        initRelax();
      }
      break;
    // h, para cerrar/abrir ayuda
    case "h":
      if (help_window.style.display == 'block'){
        closeHelp();
      } else {
        showHelp();
      }
      break;
    default:
      break;
  }
});

// Interval usado en la app
var timerInterval;

// Obtener elementos de las secciones
var main_section = document.getElementById('main');
var total_section = document.getElementById('total');

// Elementos de timer
var element_timer = document.querySelector('#main #timer');
var total_timer = document.querySelector('#total #timer');

// Elementos de tags de status
var nothing_tag = document.getElementById('nothing-tag');
var working_tag = document.getElementById('working-tag');
var relaxing_tag = document.getElementById('relaxing-tag');

// Elementos de los botones
var btn_init = document.getElementById('btn-init');
var btn_stop = document.getElementById('btn-stop');

// Elemntos de los mensajes dentro del timer
var working_legend = document.getElementById('working-legend');
var relaxing_legend = document.getElementById('relaxing-legend');

// Elemento ventana help
var help_window = document.getElementById('help');
// Botón help
var help_button = document.getElementById('help-btn');

// Objetos audios
var work_audio = new Audio(workAudioURL);
var relax_audio = new Audio(relaxAudioURL);

// Contador de segundos
var work_time = 0;
var relax_time = 0;
var total_time = 0;

// Función de trabajar
function initWork(){
  // Limpia interval anterior
  clearInterval(timerInterval);

  // Limpia el tiempo del anterior
  element_timer.innerHTML = "00:00:00";

  // Oculta todas las tags de status, muestra el tag de working
  nothing_tag.style.display = 'none';
  relaxing_tag.style.display = 'none';
  working_tag.style.display = 'block';

  // Oculta el botón de Inciar trabajo
  btn_init.style.display = 'none';
  // Muestra el botón de Terminar trabajo
  btn_stop.style.display = 'block';

  // Muestra el timer
  main_section.style.visibility = 'visible';
  main_section.style.opacity = '1';
  main_section.style.height = '40%';

  // Cambiar la legenda en el timer
  relaxing_legend.style.display = 'none';
  working_legend.style.display = 'block';

  // Cambia el color del timer
  main_section.style.setProperty('--acent-color', 'var(--working-color)');

  // Muestra la section de total
  total_section.style.visibility = 'visible';
  total_section.style.opacity = '1';
  total_section.style.height = '100%';

  // Interval actualizado cada segundo
  timerInterval = setInterval(() => {
    // Aumentamos el contador 1 segundo
    work_time++;

    // Calculamos los segundos, minutos y horas de trabajo
    let secs = work_time % 60;
    let mins = (~~(work_time / 60)) % 60;  // Trucazo
    let hrs = ~~(work_time / 3600);        // Trucazo

    // Calculamos el string correcto para que simule un reloj digital
    secs = secs < 10 ? '0' + secs : secs;
    mins = mins < 10 ? '0' + mins : mins;
    hrs = hrs < 10 ? '0' + hrs : hrs;

    // Actualizamos el contenido del timer
    element_timer.innerHTML = hrs + ':' + mins + ':' + secs;

    // Aumentamos el contador total
    total_time++;

    // Calculamos los segundos, minutos y horas totales
    let total_secs = total_time % 60;
    let total_mins = (~~(total_time / 60)) % 60;
    let total_hrs = ~~(total_time / 3600);

    // Calculamos el string correcto para que simule un reloj digital
    total_secs = total_secs < 10 ? '0' + total_secs : total_secs;
    total_mins = total_mins < 10 ? '0' + total_mins : total_mins;
    total_hrs = total_hrs < 10 ? '0' + total_hrs : total_hrs;

    // Actualizamos el contenido del timer
    total_timer.innerHTML = total_hrs + ':' + total_mins + ':' + total_secs;

    // Si llevamos 25 minutos 
    if (work_time == 1500) work_audio.play()
  }, 1000);
}

// Función de trabajar
function initRelax(){
  // Aumentamos el contador 1 segundo
  clearInterval(timerInterval);

  // Cambiar la legenda en el timer
  working_tag.style.display = 'none';
  relaxing_tag.style.display = 'block';

  // Cambia el botón
  btn_stop.style.display = 'none';
  btn_init.style.display = 'block';

  // Cambia el texto dentro del timer
  relaxing_legend.style.display = 'block';
  working_legend.style.display = 'none';

  // Calcular tiempo de descanso
  // El tiempo se va acumulando
  // t < 1 min
  if (work_time < 60) {
    // d = 0 min
    relax_time += 0;
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

  // Reseteamos el contador de trabajo
  work_time = 0;
  // Reseteamos el contenido del timer
  element_timer.innerHTML = "00:00:00";

  // Si el tiempo de descanso es 0
  // Cambiar la leyenda del estatus y terminar la función
  if (relax_time == 0) {
    relaxing_tag.style.display = 'none';
    nothing_tag.style.display = 'block';
    return;
  }

  // Cambiar el color del timer
  main_section.style.setProperty('--acent-color', 'var(--relaxing-color)');

  // Interval cada 1 segundo
  timerInterval = setInterval(() => {
    // Si el tiempo llega a cero cerrar la función
    if (relax_time < 0) return;

    // Calculamos los segundos, minutos y horas de descanso
    let secs = relax_time % 60;
    let mins = (~~(relax_time / 60)) % 60;
    let hrs = ~~(relax_time / 3600);

    // Calcular el contenido del timer para que parezca un reloj digital
    secs = secs < 10 ? '0' + secs : secs;
    mins = mins < 10 ? '0' + mins : mins;
    hrs = hrs < 10 ? '0' + hrs : hrs;

    // Cambiar el contenido del timer
    element_timer.innerHTML = hrs + ':' + mins + ':' + secs;
    // Disminuir el tiempo de descanso
    relax_time--;

    // Cuando termine el tiempo de descanso reproducir un sentido
    if (relax_time == 0) {
      relax_audio.play();
    }
    
  }, 1000);
}

function closeHelp() {
  help_window.style.display = 'none';
  help_button.style.display = 'block';
}

function showHelp() {
  help_window.style.display = 'block';
  help_button.style.display = 'none';
}

// DONE: TODO: Cambiar botones al iniciar o terminar el timer
// DONE: TODO: Cambia el contenido del timer al iniciar un descanso
// DONE: TODO: Cambiar el color del timer cuando está en descanso
// DONE: TODO: Mostrar el tiempo total
// DONE: TODO: mover los demás elementos a variables
// DONE: TODO: Poner sonidos a los 25 y al terminar el descanso
// DONE: TODO: Agregar comentarios