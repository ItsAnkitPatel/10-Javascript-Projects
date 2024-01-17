// https://api.unsplash.com/photos/?client_id=YOUR_ACCESS_KEY
const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let readyToLoadMorePhotos = false;
let imagesLoadedCount = 0;
let totalImages = 0;
let initialLoad = true;

let photosArray = [];
//We are doing this because: If the user internet is slow we will first load the 5 images only
let initialCount = 5;
const apiKEY = "Au8NpSZ6fTnMFy87YhhtjjLsqyvz9gqMYgYM9snFBwo";
let apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKEY}&count=${initialCount}`;

// Check if all images are loaded
function imageLoaded() {
  imagesLoadedCount++;
  if (imagesLoadedCount === totalImages) {
    loader.hidden = true;
    readyToLoadMorePhotos = true;
    if (initialLoad) {
      // When the initial 5 images get loaded we will change the count to 30
      updateAPIURLWithNewCount(30);
      addScrollEvent();
      initialLoad = false;
    }
  }
}

// Create Links,Elements for photos and add them to DOM
function displayPhotos() {
  imagesLoadedCount = 0;
  totalImages = photosArray.length;

  photosArray.forEach((photo) => {
    // creating <a> to link to unsplash
    const a = document.createElement("a");
    setAttributes(a, {
      href: photo.links.html,
      target: "_blank",
    });

    // create <img> for each photo
    const img = document.createElement("img");

    //Call setAttributes() function
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    imageLoaded();
    // put <img> inside <a> then put both inside the imageContainer
    a.appendChild(img);
    imageContainer.appendChild(a);
  });
}

// Helper function to setAttributes
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Get photos from Unsplash API
function getPhotos() {
  fetch(apiURL)
    .then((response) => response.json())
    .then((data) => {
      photosArray = data;
      displayPhotos(); //Start creating elements
    })
    .catch((err) => console.log(err));
}

function updateAPIURLWithNewCount(newCount) {
  apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKEY}&count=${newCount}`;
}

// Check to see if scrolling near bottom of the page if yes then load more photos
function addScrollEvent() {
  window.addEventListener("scroll", function () {
    if (
      window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 1000 &&
      readyToLoadMorePhotos
    ) {
      // reset the values
      readyToLoadMorePhotos = false;
      getPhotos();
    }
  });
}

// On load
getPhotos();
