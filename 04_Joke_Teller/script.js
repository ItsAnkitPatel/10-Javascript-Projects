const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

// Disable/Enable function
function toggleButton() {
  button.disabled = !button.disabled;
}
// Passing Jokes to VoiceRSS API
function tellMe(joke) {
  VoiceRSS.speech({
    key: "5689b3c4a7624ee19fcdc3319935d6cd",
    src: joke,
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

// Get jokes from api
async function getJokes() {
  let joke = "";
  const apiURL =
    "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit";
  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    console.log(data);
    if (data.setup) {
      joke = `${data.setup}   ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    // Text-to-Speech
    tellMe(joke);
    // Disable button
    toggleButton();
  } catch (error) {
    console.log(error);
  }
}

// Event Listeners
button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);
