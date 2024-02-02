const img = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const audio = document.querySelector("audio");
const progressContainer = document.querySelector(".progress-container");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const progress = document.querySelector(".progress");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");

const songs = [
  {
    name: "jacinto-1",
    displayName: "Electric Chill Machine",
    artist: "Jacinto Design",
  },
  {
    name: "jacinto-2",
    displayName: "Seven Nation Army (Remix)",
    artist: "Jacinto Design",
  },
  {
    name: "jacinto-3",
    displayName: "Goodnight, Disco Queen",
    artist: "Jacinto Design",
  },
  {
    name: "metric-1",
    displayName: "Front Row (Remix)",
    artist: "Metric/Jacinto Design",
  },
];
// Check if Playing
let isPlaying = false;

function playSong() {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
  audio.play();
}

function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
  audio.pause();
}

// Play or Pause Event Listener
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));

// Update DOM
function loadSong(song) {
  currentTimeEl.textContent = "0:00";

  title.textContent = song.displayName;
  artist.textContent = song.artist;
  audio.src = `music/${song.name}.mp3`;
  img.src = `img/${song.name}.jpg`;
}

// Current Song
let songIndex = 0;

// Previous Song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// Next Song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// On Load - Select First Song
loadSong(songs[songIndex]);

// Update Progress Bar & calculate current time of the song
function updateProgressBar(e) {
  if (isPlaying) {
    const { currentTime, duration } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    // Calculate for current time of the song

    // Delay switching current Element to avoid NaN
    if (currentTime) {
      currentTimeEl.textContent = formatTime(currentTime);
    }
  }
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return seconds < 10 ? `${minutes}:0${seconds}` : `${minutes}:${seconds}`;
}

// Calculate current song total duration
function totalSongDuration() {
  const { duration } = audio;

  // Delay switching duration Element to avoid NaN
  if (duration) {
    durationEl.textContent = formatTime(duration);
  }
}

// Set Progress Bar and play the song
function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const cal = clickX / width;

  progress.style.width = `${cal * 100}%`;

  // Set audio time & play it
  const { duration } = audio;
  audio.currentTime = cal * duration;
}

//Event Listener for Previous and Next song  selection
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
audio.addEventListener("ended", nextSong);
audio.addEventListener("loadedmetadata", totalSongDuration);
audio.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);
