const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

let count = 5;
const apiKey = "KZYuugXLYMOZsZPrJR2UZuBsbBqyk69MFI2yfAL-u6c";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

function imageLoaded(){
    imagesLoaded++;
    if (imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
        count = 30
    }
}

// helper function - set attribute
function setAttributes(element, attributes){
    for (const key in attributes){
        element.setAttribute(key, attributes[key])
    }
}


// create image elements
function displayPhotos() {
    totalImages = photosArray.length;
    imagesLoaded = 0;
    console.log('total images: ' + totalImages);
    // loop through array
    photosArray.forEach((photo) => {
        // create <a>
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',

        });
        // create img
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });

        // event listener on load
        img.addEventListener('load', imageLoaded);

        // link image and place in container element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });

}


async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    // catch error here
  }
}

// on scroll, load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();
    }
});

// on page load
getPhotos();
