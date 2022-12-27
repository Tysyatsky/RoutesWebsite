var Carousel = {   
  numVisible: 2,  // blocks shown
  padding: 40      // vertical padding
};

function rotateForward() {  // rotate forward
  var carousel = Carousel.carousel, // init
    children = carousel.children, // setting children (blocks)
    firstChild = children[0], // getting first block
    lastChild = children[children.length - 1]; // getting last
  carousel.insertBefore(lastChild, firstChild); // insert last before first
}
function rotateBackward() { // rotate back
  var carousel = Carousel.carousel,
    children = carousel.children,
    firstChild = children[0],
    lastChild = children[children.length - 1];
  carousel.insertBefore(firstChild, lastChild.nextSibling); // insert first after last child
}

window.onload = function () { // when all content loads
  var carousel = Carousel.carousel = document.getElementById('carousel'), // init (getting a block with a carousel)
    blocks = carousel.getElementsByClassName('scroll_block'), // 
    blockCount = blocks.length,
    blockWidth = Carousel.width,
    aspectRatio = blocks[0].width / blocks[0].height, // getting aspect ration
    blockHeight = blockWidth / aspectRatio, 
    padding = Carousel.padding;
  carousel.style.width = blockWidth + 'px';
  for (var i = 0; i < blockCount; ++i) {
    var block = blocks[i];
    var aspectRatio = block.offsetWidth / block.offsetHeight; // redefining aspect retio
    block.style.height = blockHeight + 'px'; // defining block height
    block.style.paddingTop = padding + 'px'; // padding for correct show
    block.style.paddingBottom = padding + 'px';
  }

  Carousel.rowHeight = carousel.getElementsByTagName('div')[0].offsetHeight; // get a row height from block in carousel
  
  if (document.body.clientWidth < 600){ // defining number of visible elements in versions for PC and telephone
    Carousel.numVisible = 1;
  }
  else{
    Carousel.numVisible = 2;
  }

  carousel.style.height = Carousel.numVisible * Carousel.rowHeight + 'px'; // size of the courosel
  carousel.style.visibility = 'visible'; // making it visible

   var wrapper = Carousel.wrapper = document.createElement('div'); // creating a wrapper for correct showing
   wrapper.id = 'carouselWrapper'; // seting a style
   wrapper.style.width = carousel.offsetWidth + 'px'; // defining width and height
   wrapper.style.height = carousel.offsetHeight + 'px';

   carousel.parentNode.insertBefore(wrapper, carousel); // set a parent wrapper for a carousel
   wrapper.appendChild(carousel); // setting a child for wrap

  // defining buttons events
  var prevButton = document.getElementById('prev'), // getting buttons from document
    nextButton = document.getElementById('next'); 
  prevButton.onclick = function () { // setting an event for a click
    prevButton.disabled = nextButton.disabled = true; // disabling buttons
    rotateForward(); // calling rotate
    prevButton.disabled = nextButton.disabled = false; // returning back buttons availability 
    carousel.style.top = '0'; // set a top position, is needed for correct showing (without it begins to shift)
  };

  nextButton.onclick = function () {
    prevButton.disabled = nextButton.disabled = true; // disabling buttons
    rotateBackward(); // calling rotate
    prevButton.disabled = nextButton.disabled = false; // returning back buttons availability 
    carousel.style.top = '0'; // set a top position
  };

};

function toggleMobileMenu(menu) { // toggling ment
  menu.classList.toggle('open'); // toggling style menu
}
