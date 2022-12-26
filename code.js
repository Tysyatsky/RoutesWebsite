var Carousel = {   // Images are forced into a width of this many pixels.
  numVisible: 2,  // The number of images visible at once.
  duration: 600,  // Animation duration in milliseconds.
  padding: 40      // Vertical padding around each image, in pixels.
};

function rotateForward() {
  var carousel = Carousel.carousel,
    children = carousel.children,
    firstChild = children[0],
    lastChild = children[children.length - 1];
  carousel.insertBefore(lastChild, firstChild);
}
function rotateBackward() {
  var carousel = Carousel.carousel,
    children = carousel.children,
    firstChild = children[0],
    lastChild = children[children.length - 1];
  carousel.insertBefore(firstChild, lastChild.nextSibling);
}

window.onload = function () {
  var carousel = Carousel.carousel = document.getElementById('carousel'),
    images = carousel.getElementsByClassName('scroll_block'),
    numImages = images.length,
    imageWidth = Carousel.width,
    aspectRatio = images[0].width / images[0].height,
    imageHeight = imageWidth / aspectRatio,
    padding = Carousel.padding,
    rowHeight = Carousel.rowHeight = imageHeight + 2 * padding;
  carousel.style.width = imageWidth + 'px';
  for (var i = 0; i < numImages; ++i) {
    var image = images[i],
      frame = document.createElement('div');
    frame.className = 'pictureFrame';
    var aspectRatio = image.offsetWidth / image.offsetHeight;
    image.style.width = frame.style.width = imageWidth + 'px';
    image.style.height = imageHeight + 'px';
    image.style.paddingTop = padding + 'px';
    image.style.paddingBottom = padding + 'px';
    frame.style.height = rowHeight + 'px';
    carousel.insertBefore(frame, image);
    frame.appendChild(image);
  }

  Carousel.rowHeight = carousel.getElementsByTagName('div')[0].offsetHeight;
  if (document.body.clientWidth < 600){
    Carousel.numVisible = 1;
  }
  else{
    Carousel.numVisible = 2;
  }
  carousel.style.height = Carousel.numVisible * Carousel.rowHeight + 'px'; // size of the courosel
  carousel.style.visibility = 'visible';
  var wrapper = Carousel.wrapper = document.createElement('div');
  wrapper.id = 'carouselWrapper';
  wrapper.style.width = carousel.offsetWidth + 'px';
  wrapper.style.height = carousel.offsetHeight + 'px';

  carousel.parentNode.insertBefore(wrapper, carousel); // wrap
  wrapper.appendChild(carousel);


  var prevButton = document.getElementById('prev'),
    nextButton = document.getElementById('next');
  prevButton.onclick = function () {
    prevButton.disabled = nextButton.disabled = true;
    rotateForward();
    prevButton.disabled = nextButton.disabled = false;
    carousel.style.top = '0';
  };
  nextButton.onclick = function () {
    prevButton.disabled = nextButton.disabled = true;
    rotateBackward();
    prevButton.disabled = nextButton.disabled = false;
    carousel.style.top = '0';
  };
};

function toggleMobileMenu(menu) {
  menu.classList.toggle('open');
}
