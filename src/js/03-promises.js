import { Notify } from 'notiflix/build/notiflix-notify-aio';

const options = {
  position: 'right-top',
  distance: '15px',
  borderRadius: '15px',
  timeout: 3000,
  clickToClose: true,
  cssAnimationStyle: 'from-right',
  useIcon: false,
  pauseOnHover: true,
};

const form = document.querySelector('form');

form.addEventListener('submit', onCreatePromise);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onCreatePromise(event) {
  event.preventDefault();

  const { delay, step, amount } = event.currentTarget.elements;
  let inputDelay = Number(delay.value);
  let inputStep = Number(step.value);
  let inputAmount = Number(amount.value);

  for (let i = 1; i <= inputAmount; i += 1) {
    
    createPromise(i, inputDelay)
      .then(({ position, delay }) => {
        Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`,
          options
        );
      })
      .catch(({ position, delay }) => {
        Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`,
          options
        );
      });
      inputDelay += inputStep;
  }
}

// createPromise(2, 1500)
//   .then(({ position, delay }) => {
//     console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
//   })
//   .catch(({ position, delay }) => {
//     console.log(`❌ Rejected promise ${position} in ${delay}ms`);
//   });
