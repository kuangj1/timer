let countdown;
let running = false;
let targetTime;

const timeDisplay = document.getElementById('time');
const setButton = document.getElementById('set');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');

setButton.addEventListener('click', setTime);
startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);

function setTime() {
    const hours = parseInt(document.getElementById('hours').value) || 0;
    const minutes = parseInt(document.getElementById('minutes').value) || 0;
    const seconds = parseInt(document.getElementById('seconds').value) || 0;
    targetTime = (hours * 3600 + minutes * 60 + seconds) * 1000;

    if (targetTime > 0) {
        updateDisplay(targetTime);
        startButton.disabled = false;
        resetButton.disabled = false;
    }
}

function startTimer() {
    if (!running) {
        countdown = setInterval(updateTimer, 1000);
        running = true;
        startButton.disabled = true;
        stopButton.disabled = false;
    }
}

function stopTimer() {
    clearInterval(countdown);
    running = false;
    startButton.disabled = false;
    stopButton.disabled = true;
}

function resetTimer() {
    clearInterval(countdown);
    running = false;
    updateDisplay(0);
    startButton.disabled = true;
    stopButton.disabled = true;
    resetButton.disabled = true;
}

function updateTimer() {
    targetTime -= 1000;
    if (targetTime <= 0) {
        clearInterval(countdown);
        updateDisplay(0);
        running = false;
        startButton.disabled = true;
        stopButton.disabled = true;
    } else {
        updateDisplay(targetTime);
    }
}

function updateDisplay(time) {
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);

    timeDisplay.innerHTML = 
        (hours < 10 ? "0" + hours : hours) + ":" + 
        (minutes < 10 ? "0" + minutes : minutes) + ":" + 
        (seconds < 10 ? "0" + seconds : seconds);
}
