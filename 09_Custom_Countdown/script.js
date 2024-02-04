// Global variables
let countdownTitle = "";
let countdownDate = "";
let countdownValue = Date;
let countdownActive;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Input Container
const inputContainer = document.querySelector(".input-container");
const inputCountdownForm = inputContainer.querySelector("#countdownForm");
const inputDate = inputContainer.querySelector("#date-picker");

//Countdown Container
const countdownContainer = document.querySelector(".countdown-container");
const countdownContainerTitle = countdownContainer.querySelector("#countdown-title");
const countdownContainerBtn = countdownContainer.querySelector("#countdown-button");
const timeElements = countdownContainer.querySelectorAll("li span");

//Complete Container
const completeContainer = document.querySelector(".complete-container");
const completeInfo = completeContainer.querySelector("#complete-info");
const completeBtn = completeContainer.querySelector("#complete-button");

// Set Date Input Min with Today's Date
const today = new Date().toISOString().split("T")[0];
inputDate.setAttribute("min", today);

// Populate Countdown / Complete UI
function updateDOM() {
  countdownActive = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownValue - now;
    console.log(distance);

    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);

    // Hide input container
    inputContainer.hidden = true;

    //If the countdown is ended, show complete container UI
    if (distance < 0) {
      countdownContainer.hidden = true;
      clearInterval(countdownActive);
      completeInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
      completeContainer.hidden = false;
    } else {
      // else, show the countdown in progress
      // Populate Countdown
      countdownContainerTitle.textContent = `${countdownTitle}`;
      timeElements[0].textContent = `${days}`;
      timeElements[1].textContent = `${hours}`;
      timeElements[2].textContent = `${minutes}`;
      timeElements[3].textContent = `${seconds}`;
      
      // Show Countdown container
      completeContainer.hidden = true;
      countdownContainer.hidden = false;
    }
  }, 1000);
}

// Take Input from Form input
function updateForm(e) {
  e.preventDefault();
  countdownTitle = e.srcElement[0].value;
  countdownDate = e.srcElement[1].value;

  //Get number version of current Date, updateDOM
  countdownValue = new Date(countdownDate).getTime();
  updateDOM();
}

function reset() {
  // Hide countdown/complete container & show input container
  countdownContainer.hidden = true;
  completeContainer.hidden = true;
  inputContainer.hidden = false;

  clearInterval(countdownActive);
  //Reset values
  countdownTitle = "";
  countdownDate = "";
  inputCountdownForm[0].value = "";
  inputCountdownForm[1].value = "";
}

inputCountdownForm.addEventListener("submit", updateForm);
countdownContainerBtn.addEventListener("click", reset);
completeBtn.addEventListener("click",reset);
