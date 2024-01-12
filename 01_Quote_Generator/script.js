// Get quotes from API
const quoteContainer = document.querySelector("#quote-container");
const quote = document.querySelector("#quote");
const author = document.querySelector("#author");
const twitterBtn = document.querySelector("#twitter");
const quoteTextArea = document.querySelector(".quote-area");
const loader = document.querySelector("#loader");

// start loading animation
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// loading completed and remove the loader
function complete() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}
// API call
function getQuotes() {
  // Start the loader
  loading();
  const apiUrl = "https://api.quotable.io/random";

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      setQuote(data);
    })
    .catch((error) => alert("Oopsie daisy, there is some error", error));
}
getQuotes();


function setQuote(data) {
  // If text size is too long then decrease the font-size
  if (data.content.length > 120) {
    quoteTextArea.classList.add("long-quote-text");
    quoteTextArea.classList.remove("quote-text");
  } else {
    quoteTextArea.classList.remove("long-quote-text");
    quoteTextArea.classList.add("quote-text");
  }
  // remove the loader
  quote.textContent = data.content;
  author.textContent = data.author;
  complete();
}

function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote.textContent} - ${author.textContent}`;
  window.open(twitterUrl, "_blank");
}

/* 
// Another api : https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json
// This API will produce CORS error. So to solve this we will use `proxy`

function anothergetQuote() {
  const proxyURL = "https://cors-anywhere.herokuapp.com/"; //This might be sometimes down so it will be better to make your own proxy

  const apiURL =
    proxyURL +
    "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
  fetch(apiURL)
    .then((response) => response.json())
    .then((data) => console.log("API 2 data: ", data))
    .catch((error) => {
      alert("Oopsie daisy, there is some error", error);
    });
}

anothergetQuote()
 */