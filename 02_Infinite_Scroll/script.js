// https://api.unsplash.com/photos/?client_id=YOUR_ACCESS_KEY
const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let photosArray = [];
const count = 10;
const apiKEY = "Au8NpSZ6fTnMFy87YhhtjjLsqyvz9gqMYgYM9snFBwo";
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKEY}&count=${count}`;

// Get photos from Unsplash API
function getPhotos() {
  fetch(apiURL)
    .then((response) => response.json())
    .then((data) => {
      photosArray = data;
      displayPhotos();
    })
    .catch((err) => console.log(err));
}
getPhotos();

// Helper function to setAttributes
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}
// Create Links,Elements for photos and add them to DOM
function displayPhotos() {
  photosArray.forEach((photo) => {
    // creating <a> to link to unsplash
    const a = document.createElement("a");
    setAttributes(a, {
      href: photo.links.html,
      target: "_blank",
    });

    // create <img> for each photo
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    // put <img> inside <a> then both inside the imageContainer
    a.appendChild(img);
    imageContainer.appendChild(a);
  });
}
