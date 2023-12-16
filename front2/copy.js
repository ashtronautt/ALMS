function moveLastPropertyToBeginning(carousel) {
  const books = carousel.querySelectorAll('.carouselBook');
  const lastBook = books[books.length - 1];
  const parent = lastBook.parentNode;

  parent.removeChild(lastBook);
  parent.insertBefore(lastBook, parent.firstChild);
}

const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const myCarousel = document.getElementById('myCarousel');

nextButton.addEventListener('click', () => {
  moveLastPropertyToBeginning(myCarousel);
});

prevButton.addEventListener('click', () => {
  const firstBook = myCarousel.querySelector('.carouselBook');
  const parent = firstBook.parentNode;

  parent.removeChild(firstBook);
  parent.appendChild(firstBook);
});

// Add the following code to ensure only 5 items are visible initially
document.addEventListener('DOMContentLoaded', () => {
  const books = myCarousel.querySelectorAll('.carouselBook');
  for (let i = 0; i < books.length - 5; i++) {
    myCarousel.removeChild(books[i]);
  }
});