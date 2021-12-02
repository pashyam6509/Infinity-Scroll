const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')

let ready =false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 10;
const apiKey = 'xFAww50JHDKmq-owuR2qaNEDdc-hGrFvXaylbzIKzPI';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

//check of all images were loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    count = 30
    apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;
  }
}
//Helper func to set attributes
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

//Create Elements for links $ photos and add to the DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  photosArray.forEach((photo)=> {
    //Create <a> to link to unsplash
    const item = document.createElement('a')
    // item.setAttribute('href', photo.links.html);
    // item.setAttribute('target', '_blank');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank'
    })

    //Create <img>
    const img = document.createElement('img');
    // img.setAttribute('src', photo.urls.regular)
    // img.setAttribute('alt', photo.alt_description)
    // img.setAttribute('title', photo.alt_description)
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description
    })

    //Put img inside <a> then put both to imageContainer element
    img.addEventListener('load', imageLoaded())
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl)
    photosArray = await response.json()
    // console.log(photosArray)
    displayPhotos();
  } catch (error) {
    console.log(error)
  }
}

//Check to see if scrolling near bottom add more pictures
window.addEventListener('scroll', ()=>{
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight-1000 && ready) {
    ready = false;
    getPhotos()
  }
})
// On Load
getPhotos()