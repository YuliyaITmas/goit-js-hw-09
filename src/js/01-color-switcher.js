const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
const body = document.querySelector('body');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

startButton.addEventListener('click', () => {
  color.onStart();
});

stopButton.addEventListener('click', () => {
  color.onStop();
});

stopButton.disabled = true;

const color = {
  isActive: false,
  intervalID: null,
  
  onStart() {
    if (this.isActive) {
      stopButton.disabled = true;
      return;
    }
    this.isActive = true;
    startButton.disabled = true;
    stopButton.disabled = false;
    this.intervalID = setInterval(() => {
      body.style.background = getRandomHexColor();
    }, 1000);
  },

  onStop() {
    clearInterval(this.intervalID);
    this.isActive = false;
    startButton.disabled = false;
    stopButton.disabled = true;
  },
};
