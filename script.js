let countdown;
let running = false;
let targetTime;

const timeDisplay = document.getElementById('time');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');

const setButton1 = document.getElementById('set1');
const setButton2 = document.getElementById('set2');
const setButton3 = document.getElementById('set3');

setButton1.addEventListener('click', setTime1);
setButton2.addEventListener('click', setTime2);
setButton2.addEventListener('click', setTime3);

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);

function setTime1() {
    const hours = parseInt(document.getElementById('hours1').value);
    const minutes = parseInt(document.getElementById('minutes1').value);

    if (!isNaN(hours) && !isNaN(minutes)) {
        const now = new Date();
        targetTime = new Date();
        targetTime.setHours(hours);
        targetTime.setMinutes(minutes);
        targetTime.setSeconds(0);

        if (targetTime <= now) {
            targetTime.setDate(targetTime.getDate() + 1);
        }

        const timeDiff = targetTime - now;
        updateDisplay(timeDiff);

        startButton.disabled = false;
        resetButton.disabled = false;
    }
}

function setTime2() {
    const hours = parseInt(document.getElementById('hours2').value);
    const minutes = parseInt(document.getElementById('minutes2').value);

    if (!isNaN(hours) && !isNaN(minutes)) {
        const now = new Date();
        targetTime = new Date();
        targetTime.setHours(hours);
        targetTime.setMinutes(minutes);
        targetTime.setSeconds(0);

        if (targetTime <= now) {
            targetTime.setDate(targetTime.getDate() + 1);
        }

        const timeDiff = targetTime - now;
        updateDisplay(timeDiff);

        startButton.disabled = false;
        resetButton.disabled = false;
    }
}

function setTime3() {
    const hours = parseInt(document.getElementById('hours3').value);
    const minutes = parseInt(document.getElementById('minutes3').value);

    if (!isNaN(hours) && !isNaN(minutes)) {
        const now = new Date();
        targetTime = new Date();
        targetTime.setHours(hours);
        targetTime.setMinutes(minutes);
        targetTime.setSeconds(0);

        if (targetTime <= now) {
            targetTime.setDate(targetTime.getDate() + 1);
        }

        const timeDiff = targetTime - now;
        updateDisplay(timeDiff);

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