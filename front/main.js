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
