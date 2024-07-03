const timers = [];

for (let i = 1; i <= 12; i++) {
    timers.push({
        id: `timer${i}`,
        countdown: null,
        running: false,
        targetTime: null
    });
}

timers.forEach(timer => {
    const timerElement = document.getElementById(timer.id);
    const setButton = timerElement.querySelector('.set');
    const startButton = timerElement.querySelector('.start');
    const stopButton = timerElement.querySelector('.stop');
    const resetButton = timerElement.querySelector('.reset');
    const timeDisplay = timerElement.querySelector('.time');

    setButton.addEventListener('click', () => setTime(timer, timerElement, timeDisplay, startButton, resetButton));
    startButton.addEventListener('click', () => startTimer(timer, timeDisplay, startButton, stopButton));
    stopButton.addEventListener('click', () => stopTimer(timer, startButton, stopButton));
    resetButton.addEventListener('click', () => resetTimer(timer, timeDisplay, startButton, stopButton, resetButton));
});

function setTime(timer, timerElement, timeDisplay, startButton, resetButton) {
    const hours = parseInt(timerElement.querySelector('.hours').value);
    const minutes = parseInt(timerElement.querySelector('.minutes').value);

    if (!isNaN(hours) && !isNaN(minutes)) {
        const now = new Date();
        timer.targetTime = new Date();
        timer.targetTime.setHours(hours);
        timer.targetTime.setMinutes(minutes);
        timer.targetTime.setSeconds(0);

        if (timer.targetTime <= now) {
            timer.targetTime.setDate(timer.targetTime.getDate() + 1);
        }

        const timeDiff = timer.targetTime - now;
        updateDisplay(timeDiff, timeDisplay);

        startButton.disabled = false;
        resetButton.disabled = false;
    }
}

function startTimer(timer, timeDisplay, startButton, stopButton) {
    if (!timer.running) {
        timer.countdown = setInterval(() => updateTimer(timer, timeDisplay, startButton, stopButton), 1000);
        timer.running = true;
        startButton.disabled = true;
        stopButton.disabled = false;
    }
}

function stopTimer(timer, startButton, stopButton) {
    clearInterval(timer.countdown);
    timer.running = false;
    startButton.disabled = false;
    stopButton.disabled = true;
}

function resetTimer(timer, timeDisplay, startButton, stopButton, resetButton) {
    clearInterval(timer.countdown);
    timer.running = false;
    updateDisplay(0, timeDisplay);
    startButton.disabled = true;
    stopButton.disabled = true;
    resetButton.disabled = true;
}

function updateTimer(timer, timeDisplay, startButton, stopButton) {
    const now = new Date();
    const timeDiff = timer.targetTime - now;

    if (timeDiff <= 0) {
        clearInterval(timer.countdown);
        updateDisplay(0, timeDisplay);
        timer.running = false;
        startButton.disabled = true;
        stopButton.disabled = true;
    } else {
        updateDisplay(timeDiff, timeDisplay);
    }
}

function updateDisplay(time, timeDisplay) {
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);

    timeDisplay.innerHTML = 
        (hours < 10 ? "0" + hours : hours) + ":" + 
        (minutes < 10 ? "0" + minutes : minutes) + ":" + 
        (seconds < 10 ? "0" + seconds : seconds);
}