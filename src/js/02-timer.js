import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

let selectedTime;
let timerId = null;

const dayCounter = document.querySelector('[data-days]');
const hoursCounter = document.querySelector('[data-hours]');
const minutesCounter = document.querySelector('[data-minutes]');
const secondsCounter = document.querySelector('[data-seconds]');

const pickerTime = document.querySelector('input');
const buttonStart = document.querySelector('button');

buttonStart.disabled = true;
buttonStart.addEventListener('click', () => {
  timer.start();
  pickerTime.disabled = true;
});

const timer = {
  isActive: false,
  start() {
    if (this.isActive) {
      return;
    }
    this.isActive = true;
    buttonStart.disabled = true;

    timerId = setInterval(() => {
      const startTime = Date.now();
      const deltaTime = selectedTime - startTime;
      const { days, hours, minutes, seconds } = convertMs(deltaTime);
      console.log(`${days}::${hours}::${minutes}::${seconds}`);
      dayCounter.textContent = days;
      hoursCounter.textContent = hours;
      minutesCounter.textContent = minutes;
      secondsCounter.textContent = seconds;
      if (
        dayCounter.textContent === '00' &&
        hoursCounter.textContent === '00' &&
        minutesCounter.textContent === '00' &&
        secondsCounter.textContent === '00'
      ) {
        clearInterval(timerId);
      }
    }, 1000);
  },
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  // onChange(selectedDates) {
  //   if (selectedDates[0].getTime() < Date.now()) {
  //     Notify.failure('Please choose a date in the future', {
  //       clickToClose: true,
  //       position: 'right-top',
  //       distance: '15px',
  //       borderRadius: '15px',
  //       timeout: 1500,
  //       showOnlyTheLastOne: true,
  //     });
  //     return;
  //   } else buttonStart.disabled = false;
  // },

  onClose(selectedDates) {
    if (selectedDates[0].getTime() < Date.now()) {
      Notify.failure('Please choose a date in the future', {
        clickToClose: true,
        position: 'right-top',
        distance: '15px',
        borderRadius: '15px',
        timeout: 1500,
        showOnlyTheLastOne: true,
        pauseOnHover: true,
      });
    } else {
      Notify.success('Press start to run the countdown timer', {
        clickToClose: true,
        position: 'right-top',
        distance: '15px',
        borderRadius: '15px',
        timeout: 2000,
        showOnlyTheLastOne: true,
        pauseOnHover: true,
      });
      buttonStart.disabled = false;
      pickerTime.disabled = false;
      return (selectedTime = selectedDates[0].getTime());
    }
  },
  timer,
};

flatpickr('#datetime-picker', options);









// function getTimeComponents(time) {
//   const days = addLeadingZero(Math.floor(time / (1000 * 60 * 60 * 24)));
//   const hours = addLeadingZero(
//     Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
//   );
//   const mins = addLeadingZero(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
//   const secs = addLeadingZero(Math.floor((time % (1000 * 60)) / 1000));
//   return { days, hours, mins, secs };
// }
