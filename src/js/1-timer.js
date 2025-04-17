import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const inputEl    = document.querySelector("#datetime-picker");
const startBtn   = document.querySelector("[data-start]");
const daysEl     = document.querySelector("[data-days]");
const hoursEl    = document.querySelector("[data-hours]");
const minutesEl  = document.querySelector("[data-minutes]");
const secondsEl  = document.querySelector("[data-seconds]");

let userSelectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const picked = selectedDates[0];
    if (picked <= Date.now()) {
      iziToast.error({ title: "Error", message: "Please choose a date in the future" });
      startBtn.disabled = true;
    } else {
      userSelectedDate = picked;
      startBtn.disabled = false;
    }
  },
};

flatpickr(inputEl, options);

const addLeadingZero = value => String(value).padStart(2, "0");

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour   = minute * 60;
  const day    = hour * 24;

  const days    = Math.floor(ms / day);
  const hours   = Math.floor((ms % day) / hour);
  const minutes = Math.floor((ms % hour) / minute);
  const seconds = Math.floor((ms % minute) / second);

  return { days, hours, minutes, seconds };
}

startBtn.addEventListener("click", () => {
  startBtn.disabled = true;
  inputEl.disabled  = true;

  const intervalId = setInterval(() => {
    const diff = userSelectedDate - Date.now();

    if (diff <= 0) {
      clearInterval(intervalId);
      daysEl.textContent    = "00";
      hoursEl.textContent   = "00";
      minutesEl.textContent = "00";
      secondsEl.textContent = "00";
      inputEl.disabled      = false;
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(diff);

    daysEl.textContent    = addLeadingZero(days);
    hoursEl.textContent   = addLeadingZero(hours);
    minutesEl.textContent = addLeadingZero(minutes);
    secondsEl.textContent = addLeadingZero(seconds);
  }, 1000);
});
