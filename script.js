let countdown;
let running = false;
let targetTime;

const timeDisplay = document.getElementById('time');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');

// Set buttons
const setButton1 = document.getElementById('set1');
const setButton2 = document.getElementById('set2');
const setButton3 = document.getElementById('set3');
const setButton4 = document.getElementById('set4');
const setButton5 = document.getElementById('set5');

// Add event listeners
setButton1.addEventListener('click', () => setTime('hours1', 'minutes1', 'seconds1'));
setButton2.addEventListener('click', () => setTime('hours2', 'minutes2', 'seconds2'));
setButton3.addEventListener('click', () => setTime('hours3', 'minutes3', 'seconds3'));
setButton4.addEventListener('click', () => setTime('hours4', 'minutes4', 'seconds4'));
setButton5.addEventListener('click', () => setTime('hours5', 'minutes5', 'seconds5'));

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);

// Set the time to the inputted time
function setTime(hoursId, minutesId, secondsId) {
    const hours = parseInt(document.getElementById(hoursId).value) || 0;
    const minutes = parseInt(document.getElementById(minutesId).value) || 0;
    const seconds = parseInt(document.getElementById(secondsId).value) || 0;

    const now = new Date();
    targetTime = new Date();
    targetTime.setHours(hours);
    targetTime.setMinutes(minutes);
    targetTime.setSeconds(seconds);

    if (targetTime <= now) {
        targetTime.setDate(targetTime.getDate() + 1);
    }

    const timeDiff = targetTime - now;
    updateDisplay(timeDiff);

    startButton.disabled = false;
    resetButton.disabled = false;
    startTimer();
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
    const now = new Date();
    const timeDiff = targetTime - now;

    if (timeDiff <= 0) {
        clearInterval(countdown);
        updateDisplay(0);
        running = false;
        startButton.disabled = true;
        stopButton.disabled = true;
    } else {
        updateDisplay(timeDiff);
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